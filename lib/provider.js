"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = exports.FeeDataExt = void 0;
const ethers_1 = require("./ethers");
const typechain_1 = require("./typechain");
const multicall_1 = require("./multicall");
const feeEstimator_1 = require("./feeEstimator");
const { AbiCoder, JsonRpcProvider: ethJsonRpcProvider, Network: ethNetwork, FeeData: ethFeeData, defineProperties, } = ethers_1.ethers;
function toJson(value) {
    if (value == null) {
        return null;
    }
    return value.toString();
}
class FeeDataExt extends ethFeeData {
    maxPriorityFeePerGasSlow;
    maxPriorityFeePerGasMedium;
    constructor(gasPrice, maxFeePerGas, maxPriorityFeePerGas, maxPriorityFeePerGasSlow, maxPriorityFeePerGasMedium) {
        super(gasPrice, maxFeePerGas, maxPriorityFeePerGas);
        defineProperties(this, {
            gasPrice: typeof gasPrice === 'bigint' ? gasPrice : null,
            maxFeePerGas: typeof maxFeePerGas === 'bigint' ? maxFeePerGas : null,
            maxPriorityFeePerGas: typeof maxPriorityFeePerGas === 'bigint' ? maxPriorityFeePerGas : null,
            maxPriorityFeePerGasSlow: typeof maxPriorityFeePerGasSlow === 'bigint' ? maxPriorityFeePerGasSlow : null,
            maxPriorityFeePerGasMedium: typeof maxPriorityFeePerGasMedium === 'bigint'
                ? maxPriorityFeePerGasMedium
                : null,
        });
    }
    /**
     *  Returns a JSON-friendly value.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toJSON() {
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
exports.FeeDataExt = FeeDataExt;
/**
 * Static network & Multicaller by default
 *
 * (Multicaller inspired by https://github.com/ethers-io/ext-provider-multicall)
 */
class Provider extends ethJsonRpcProvider {
    staticNetwork;
    #network;
    // Fetch feeHistory
    feeHistory;
    // Provider without multicall capabilities
    subProvider;
    multicall;
    multicallAllowFailure;
    // To disable multicall use multicallMaxCount: 0
    multicallMaxCount;
    multicallInterval;
    multicallQueue;
    multicallTimer;
    constructor(url, network, options) {
        super(url, network, options);
        this.feeHistory = options?.feeHistory ?? false;
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
        this.multicall = this.subProvider.then((provider) => typechain_1.Multicall__factory.connect(options?.multicall || multicall_1.MULTICALL_ADDRESS, provider));
        this.multicallAllowFailure = options?.multicallAllowFailure ?? true;
        this.multicallMaxCount = options?.multicallMaxCount ?? 1000;
        this.multicallInterval = options?.multicallInterval ?? 30;
        this.multicallQueue = [];
        this.multicallTimer = null;
    }
    get _network() {
        (0, ethers_1.assert)(this.#network, 'network is not available yet', 'NETWORK_ERROR');
        return this.#network;
    }
    async _detectNetwork() {
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
    async getFeeData() {
        const [gasPrice, maxFeePerGas, maxPriorityFeePerGas, [maxPriorityFeePerGasMedium, maxPriorityFeePerGasSlow],] = await Promise.all([
            (async () => {
                try {
                    return BigInt(await this.send('eth_gasPrice', []));
                }
                catch {
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
                }
                catch {
                    return 0n;
                }
            })(),
            (async () => {
                try {
                    if (!this.feeHistory) {
                        return [null, null];
                    }
                    const blocks = 10;
                    const { priorityFeePerGasAvg } = (0, feeEstimator_1.formatFeeHistory)(await this.send('eth_feeHistory', [blocks, 'pending', [10, 25]]), blocks);
                    return [priorityFeePerGasAvg[0], priorityFeePerGasAvg[1]];
                }
                catch {
                    return [null, null];
                }
            })(),
        ]);
        return new FeeDataExt(gasPrice, maxFeePerGas, maxPriorityFeePerGas, maxPriorityFeePerGasMedium, maxPriorityFeePerGasSlow);
    }
    /**
     * Multicaller
     */
    async _drainCalls() {
        try {
            (await (await this.multicall).aggregate3.staticCall(this.multicallQueue
                .slice(0, this.multicallMaxCount)
                .map(({ request: { to: target, data: callData } }) => {
                return {
                    target,
                    callData,
                    allowFailure: this.multicallAllowFailure,
                };
            }))).forEach(([status, data], i) => {
                this.multicallQueue[i].resolve({ status, data });
                this.multicallQueue[i].resolved = true;
            });
        }
        catch (err) {
            this.multicallQueue.forEach((queue) => {
                queue.reject(err);
                queue.resolved = true;
            });
        }
        this.multicallQueue = this.multicallQueue.filter(({ resolved }) => !resolved);
        if (this.multicallQueue.length) {
            this._drainCalls();
        }
        else {
            this.multicallTimer = null;
        }
    }
    _queueCall(to, data = '0x') {
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
    async _perform(req) {
        if (req.method === 'call' && this.multicallMaxCount > 0) {
            const { from, to, value, data, blockTag } = req.transaction;
            // Only aggregate static calls without value and with latest block tag
            if (!from && to && !value && (!blockTag || blockTag === 'latest')) {
                const { status, data: result } = await this._queueCall(to, data);
                if (status) {
                    return result;
                }
                else {
                    // Throw a CallException
                    throw AbiCoder.getBuiltinCallException('call', { to, data }, result);
                }
            }
        }
        return super._perform(req);
    }
}
exports.Provider = Provider;
