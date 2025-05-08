import type {
    FeeData,
    Network,
    Networkish,
    FetchRequest,
    JsonRpcApiProviderOptions,
    PerformActionRequest,
    JsonRpcProvider,
} from 'ethers';
import { ethers, assert } from './ethers';
import { Multicall, Multicall__factory } from './typechain';
import { MULTICALL_ADDRESS } from './multicall';

const { AbiCoder, JsonRpcProvider: ethJsonRpcProvider, Network: ethNetwork, FeeData: ethFeeData } = ethers;

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

export interface ProviderOptions extends JsonRpcApiProviderOptions {
    chainId?: bigint | number;

    multicall?: string;
    multicallAllowFailure?: boolean;
    multicallMaxCount?: number;
    multicallInterval?: number;
}

/**
 * Static network & Multicaller by default
 *
 * (Multicaller inspired by https://github.com/ethers-io/ext-provider-multicall)
 */
export class Provider extends ethJsonRpcProvider {
    staticNetwork: Promise<Network>;
    #network?: Network;

    // Provider without multicall capabilities
    subProvider: Promise<JsonRpcProvider>;
    multicall: Promise<Multicall>;

    multicallAllowFailure: boolean;
    // To disable multicall use multicallMaxCount: 0
    multicallMaxCount: number;
    multicallInterval: number;
    multicallQueue: MulticallHandle[];
    multicallTimer: null | ReturnType<typeof setTimeout>;

    constructor(url?: string | FetchRequest, network?: Networkish, options?: ProviderOptions) {
        super(url, network, options);

        this.staticNetwork = (async () => {
            if (network) {
                return ethNetwork.from(network);
            }

            const _network = ethNetwork.from(await new ethJsonRpcProvider(url).getNetwork());

            if (options?.chainId && BigInt(_network.chainId) !== BigInt(options.chainId)) {
                throw new Error('Wrong network');
            }

            return _network;
        })();

        this.subProvider = this.staticNetwork.then((staticNetwork) => {
            this.#network = staticNetwork;

            return new ethJsonRpcProvider(url, staticNetwork, {
                ...options,
                staticNetwork,
            });
        });

        this.multicall = this.subProvider.then((provider) =>
            Multicall__factory.connect(options?.multicall || MULTICALL_ADDRESS, provider),
        );

        this.multicallAllowFailure = options?.multicallAllowFailure ?? true;
        this.multicallMaxCount = options?.multicallMaxCount ?? 1000;
        this.multicallInterval = options?.multicallInterval ?? 30;
        this.multicallQueue = [];
        this.multicallTimer = null;
    }

    get _network(): Network {
        assert(this.#network, 'network is not available yet', 'NETWORK_ERROR');
        return this.#network;
    }

    async _detectNetwork(): Promise<Network> {
        return this.staticNetwork;
    }

    /**
     * Override getFeeData func from AbstractProvider to get results as-is.
     *
     * Return fee as is from provider, it is up to populateTransaction func to compose them
     *
     * Note that in some networks (like L2), maxFeePerGas can be smaller than maxPriorityFeePerGas and if so,
     * using the value as is could throw an error from RPC as maxFeePerGas should be always bigger than maxPriorityFeePerGas
     */
    async getFeeData(): Promise<FeeData> {
        const [maxFeePerGas, maxPriorityFeePerGas, gasPrice] = await Promise.all([
            (async () => {
                const block = await this.getBlock('latest');

                return block?.baseFeePerGas || null;
            })(),
            (async () => {
                try {
                    return BigInt(await this.send('eth_gasPrice', []));
                } catch {
                    return 0n;
                }
            })(),
            (async () => {
                try {
                    return BigInt(await this.provider.send('eth_maxPriorityFeePerGas', []));
                } catch {
                    return 0n;
                }
            })(),
        ]);

        return new ethFeeData(gasPrice, maxFeePerGas, maxPriorityFeePerGas);
    }

    /**
     * Multicaller
     */
    async _drainCalls() {
        try {
            (
                await (
                    await this.multicall
                ).aggregate3.staticCall(
                    this.multicallQueue
                        .slice(0, this.multicallMaxCount)
                        .map(({ request: { to: target, data: callData } }) => {
                            return {
                                target,
                                callData,
                                allowFailure: this.multicallAllowFailure,
                            };
                        }),
                )
            ).forEach(([status, data], i) => {
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
            }, this.multicallInterval);
        }

        return new Promise((resolve, reject) => {
            this.multicallQueue.push({ request: { to, data }, resolve, reject, resolved: false });
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async _perform<T = any>(req: PerformActionRequest): Promise<T> {
        if (req.method === 'call' && this.multicallMaxCount > 0) {
            const { from, to, value, data, blockTag } = req.transaction;

            // Only aggregate static calls without value and with latest block tag
            if (!from && to && !value && (!blockTag || blockTag === 'latest')) {
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
