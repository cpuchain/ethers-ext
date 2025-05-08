import type { FeeData, Network, Networkish, FetchRequest, JsonRpcApiProviderOptions, PerformActionRequest, JsonRpcProvider } from 'ethers';
import { Multicall } from './typechain';
declare const ethJsonRpcProvider: typeof JsonRpcProvider;
export interface MulticallResult {
    status: boolean;
    data: string;
}
export interface MulticallHandle {
    request: {
        to: string;
        data: string;
    };
    resolve: (result: MulticallResult) => void;
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
export declare class Provider extends ethJsonRpcProvider {
    #private;
    staticNetwork: Promise<Network>;
    subProvider: Promise<JsonRpcProvider>;
    multicall: Promise<Multicall>;
    multicallAllowFailure: boolean;
    multicallMaxCount: number;
    multicallInterval: number;
    multicallQueue: MulticallHandle[];
    multicallTimer: null | ReturnType<typeof setTimeout>;
    constructor(url?: string | FetchRequest, network?: Networkish, options?: ProviderOptions);
    get _network(): Network;
    _detectNetwork(): Promise<Network>;
    /**
     * Override getFeeData func from AbstractProvider to get results as-is.
     *
     * Return fee as is from provider, it is up to populateTransaction func to compose them
     *
     * Note that in some networks (like L2), maxFeePerGas can be smaller than maxPriorityFeePerGas and if so,
     * using the value as is could throw an error from RPC as maxFeePerGas should be always bigger than maxPriorityFeePerGas
     */
    getFeeData(): Promise<FeeData>;
    /**
     * Multicaller
     */
    _drainCalls(): Promise<void>;
    _queueCall(to: string, data?: string): Promise<MulticallResult>;
    _perform<T = any>(req: PerformActionRequest): Promise<T>;
}
export {};
