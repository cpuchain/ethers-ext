import type {
    BlockTag,
    Network,
    Networkish,
    FetchRequest,
    JsonRpcApiProviderOptions,
    PerformActionRequest,
    TransactionReceipt,
    TransactionResponse,
} from 'ethers';
import { ethers, assert } from './ethers';
import { Multicall, Multicall__factory } from './typechain';
import { MULTICALL_ADDRESS } from './multicall';
import { chainNames, EnsResolver } from './ens';
import { formatFeeHistory } from './feeEstimator';
import { chunk, sleep } from './utils';
import { CallTrace, traceBlock, traceTransaction } from './traceBlock';
import { getBlockReceipts } from './blockReceipts';

const {
    AbiCoder,
    JsonRpcProvider: ethJsonRpcProvider,
    Network: ethNetwork,
    FeeData: ethFeeData,
    defineProperties,
} = ethers;

export interface MulticallResult {
    status: boolean;
    data: string;
}

export interface MulticallHandle {
    request: { to: string; data: string };
    resolve: (result: MulticallResult) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reject: (error: any) => void;
    resolved: boolean;
}

function toJson(value: null | bigint): null | string {
    if (value == null) {
        return null;
    }
    return value.toString();
}

export class FeeDataExt extends ethFeeData {
    readonly maxPriorityFeePerGasSlow!: null | bigint;

    readonly maxPriorityFeePerGasMedium!: null | bigint;

    constructor(
        gasPrice?: null | bigint,
        maxFeePerGas?: null | bigint,
        maxPriorityFeePerGas?: null | bigint,
        maxPriorityFeePerGasSlow?: null | bigint,
        maxPriorityFeePerGasMedium?: null | bigint,
    ) {
        super(gasPrice, maxFeePerGas, maxPriorityFeePerGas);

        defineProperties<FeeDataExt>(this, {
            gasPrice: typeof gasPrice === 'bigint' ? (gasPrice as bigint) : null,
            maxFeePerGas: typeof maxFeePerGas === 'bigint' ? (maxFeePerGas as bigint) : null,
            maxPriorityFeePerGas:
                typeof maxPriorityFeePerGas === 'bigint' ? (maxPriorityFeePerGas as bigint) : null,
            maxPriorityFeePerGasSlow:
                typeof maxPriorityFeePerGasSlow === 'bigint' ? (maxPriorityFeePerGasSlow as bigint) : null,
            maxPriorityFeePerGasMedium:
                typeof maxPriorityFeePerGasMedium === 'bigint'
                    ? (maxPriorityFeePerGasMedium as bigint)
                    : null,
        });
    }

    /**
     *  Returns a JSON-friendly value.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toJSON(): any {
        return {
            _type: 'FeeData',
            gasPrice: toJson(this.gasPrice),
            maxFeePerGas: toJson(this.maxFeePerGas),
            maxPriorityFeePerGas: toJson(this.maxPriorityFeePerGas),
            maxPriorityFeePerGasSlow: toJson(this.maxPriorityFeePerGasSlow),
            maxPriorityFeePerGasMedium: toJson(this.maxPriorityFeePerGasMedium),
        };
    }
}

export interface ProviderOptions extends JsonRpcApiProviderOptions {
    chainId?: bigint | number;

    ensResolver?: typeof EnsResolver;

    feeHistory?: boolean;

    multicall?: string;
    multicallAllowFailure?: boolean;
    multicallMaxCount?: number;
    multicallStallTime?: number;
}

/**
 * Static network & Multicaller by default
 *
 * (Multicaller inspired by https://github.com/ethers-io/ext-provider-multicall)
 */
export class Provider extends ethJsonRpcProvider {
    staticNetwork: Promise<Network>;
    #network?: Network;

    ensResolver: Promise<typeof EnsResolver>;

    // Fetch feeHistory
    feeHistory: boolean;

    /**
     * Multicall obj
     */
    multicall: Multicall;

    multicallAllowFailure: boolean;
    // To disable multicall use multicallMaxCount: 0
    multicallMaxCount: number;
    multicallStallTime: number;
    multicallQueue: MulticallHandle[];
    multicallTimer: null | ReturnType<typeof setTimeout>;

    constructor(url?: string | FetchRequest, network?: Networkish, options?: ProviderOptions) {
        // 30ms (default)
        const multicallStallTime = options?.multicallStallTime ?? 30;
        // 10ms (default) + 30ms (default)
        const batchStallTime = multicallStallTime + (options?.batchStallTime ?? 10);

        super(url, network, {
            ...(options || {}),
            batchStallTime,
        });

        this.feeHistory = options?.feeHistory ?? false;

        this.staticNetwork = (async () => {
            if (network) {
                return ethNetwork.from(network);
            }

            const _network = ethNetwork.from(await new ethJsonRpcProvider(url).getNetwork());

            if (options?.chainId && BigInt(_network.chainId) !== BigInt(options.chainId)) {
                throw new Error('Wrong network');
            }

            this.#network = _network;

            return _network;
        })();

        // Set default ENS resolver
        this.ensResolver = this.staticNetwork.then(({ chainId }) => {
            const ensType = chainNames[Number(chainId)] || 'ENS';

            if (options?.ensResolver) {
                return options.ensResolver;
            }

            if (ensType === 'ENS') {
                return EnsResolver;
            }

            throw new Error('Unsupported EMS type');
        });

        this.multicall = Multicall__factory.connect(options?.multicall || MULTICALL_ADDRESS, this);

        this.multicallAllowFailure = options?.multicallAllowFailure ?? true;
        this.multicallMaxCount = options?.multicallMaxCount ?? 1000;
        this.multicallStallTime = multicallStallTime;
        this.multicallQueue = [];
        this.multicallTimer = null;
    }

    get _network(): Network {
        assert(this.#network, 'network is not available yet', 'NETWORK_ERROR');
        return this.#network;
    }

    async _detectNetwork(): Promise<Network> {
        try {
            return await this.staticNetwork;
        } catch (error) {
            // Prevent internal loop to keep alive
            if (!super.destroyed) {
                super.destroy();
            }
            throw error;
        }
    }

    /**
     * Override getFeeData func from AbstractProvider to get results as-is.
     *
     * Return fee as is from provider, it is up to populateTransaction func to compose them
     *
     * Note that in some networks (like L2), maxFeePerGas can be smaller than maxPriorityFeePerGas and if so,
     * using the value as is could throw an error from RPC as maxFeePerGas should be always bigger than maxPriorityFeePerGas
     */
    async getFeeData(): Promise<FeeDataExt> {
        const [
            gasPrice,
            maxFeePerGas,
            maxPriorityFeePerGas,
            [maxPriorityFeePerGasMedium, maxPriorityFeePerGasSlow],
        ] = await Promise.all([
            (async () => {
                try {
                    return BigInt(await this.send('eth_gasPrice', []));
                } catch {
                    return 0n;
                }
            })(),
            (async () => {
                const block = await this.getBlock('latest');

                return block?.baseFeePerGas ?? null;
            })(),
            (async () => {
                try {
                    return BigInt(await this.send('eth_maxPriorityFeePerGas', []));
                } catch {
                    return 0n;
                }
            })(),
            (async () => {
                try {
                    if (!this.feeHistory) {
                        return [null, null];
                    }

                    const blocks = 10;
                    const { priorityFeePerGasAvg } = formatFeeHistory(
                        await this.send('eth_feeHistory', [blocks, 'pending', [10, 25]]),
                        blocks,
                    );

                    return [priorityFeePerGasAvg[0], priorityFeePerGasAvg[1]];
                } catch {
                    return [null, null];
                }
            })(),
        ]);

        return new FeeDataExt(
            gasPrice,
            maxFeePerGas,
            maxPriorityFeePerGas,
            maxPriorityFeePerGasMedium,
            maxPriorityFeePerGasSlow,
        );
    }

    /**
     * Override EnsResolver to use our optimized resolver class object
     */
    async getResolver(name: string): Promise<null | EnsResolver> {
        return (await this.ensResolver).fromName(this, name);
    }

    async lookupAddress(address: string, reverseCheck?: boolean): Promise<null | string> {
        return (await this.ensResolver).lookupAddress(this, address, reverseCheck);
    }

    /**
     * Wrapper around waitForTransaction to have default confirmation
     * Doesn't throw on timeout and instead returns null
     */
    async wait(hashOrTx: null | string | TransactionResponse): Promise<null | TransactionReceipt> {
        try {
            if (!hashOrTx) {
                return null;
            }

            const hash = (hashOrTx as TransactionResponse)?.hash || (hashOrTx as string);

            return await this.waitForTransaction(hash, 1, 60 * 1000);
        } catch {
            return null;
        }
    }

    async getBlockReceipts(blockTag: BlockTag): Promise<TransactionReceipt[]> {
        return getBlockReceipts(this, blockTag, this.#network);
    }

    async traceBlock(blockTag: BlockTag, onlyTopCall?: boolean): Promise<CallTrace[]> {
        return traceBlock(this, blockTag, onlyTopCall);
    }

    async traceTransaction(hash: string, onlyTopCall?: boolean): Promise<CallTrace> {
        return traceTransaction(this, hash, onlyTopCall);
    }

    /**
     * Multicaller
     */
    async _drainCalls() {
        try {
            const results = (
                await Promise.all(
                    chunk(this.multicallQueue, this.multicallMaxCount).map(async (_chunk, chunkIndex) => {
                        // Avoid batching but do concurrent requests
                        await sleep(40 * chunkIndex);

                        return await this.multicall.aggregate3.staticCall(
                            _chunk.map(({ request: { to: target, data: callData } }) => ({
                                target,
                                callData,
                                allowFailure: this.multicallAllowFailure,
                            })),
                        );
                    }),
                )
            ).flat();

            results.forEach(([status, data], i) => {
                this.multicallQueue[i].resolve({ status, data } as MulticallResult);
                this.multicallQueue[i].resolved = true;
            });
        } catch (err) {
            this.multicallQueue.forEach((queue) => {
                queue.reject(err);
                queue.resolved = true;
            });
        }

        this.multicallQueue = this.multicallQueue.filter(({ resolved }) => !resolved);

        if (this.multicallQueue.length) {
            this._drainCalls();
        } else {
            this.multicallTimer = null;
        }
    }

    _queueCall(to: string, data = '0x'): Promise<MulticallResult> {
        if (!this.multicallTimer) {
            this.multicallTimer = setTimeout(() => {
                this._drainCalls();
            }, this.multicallStallTime);
        }

        return new Promise((resolve, reject) => {
            this.multicallQueue.push({ request: { to, data }, resolve, reject, resolved: false });
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async _perform<T = any>(req: PerformActionRequest): Promise<T> {
        if (req.method === 'call' && this.multicallMaxCount > 0) {
            const { from, to, value, data, blockTag } = req.transaction;

            const isAggregate3 = to === this.multicall.target && data?.startsWith('0x82ad56cb');

            // Only aggregate static calls without value and with latest block tag
            if (!from && to && !value && (!blockTag || blockTag === 'latest') && !isAggregate3) {
                const { status, data: result } = await this._queueCall(to, data);

                if (status) {
                    return result as T;
                } else {
                    // Throw a CallException
                    throw AbiCoder.getBuiltinCallException('call', { to, data }, result);
                }
            }
        }

        return super._perform(req);
    }
}
