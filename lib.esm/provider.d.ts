import type { BlockTag, Network, Networkish, FetchRequest, JsonRpcApiProviderOptions, PerformActionRequest, TransactionReceipt, TransactionResponse } from 'ethers';
import { Multicall } from './typechain';
import { EnsResolver } from './ens';
import { CallTrace } from './traceBlock';
declare const ethJsonRpcProvider: typeof import("ethers").JsonRpcProvider, ethFeeData: typeof import("ethers").FeeData;
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
export declare class FeeDataExt extends ethFeeData {
    readonly maxPriorityFeePerGasSlow: null | bigint;
    readonly maxPriorityFeePerGasMedium: null | bigint;
    constructor(gasPrice?: null | bigint, maxFeePerGas?: null | bigint, maxPriorityFeePerGas?: null | bigint, maxPriorityFeePerGasSlow?: null | bigint, maxPriorityFeePerGasMedium?: null | bigint);
    /**
     *  Returns a JSON-friendly value.
     */
    toJSON(): any;
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
export declare class Provider extends ethJsonRpcProvider {
    #private;
    staticNetwork: Promise<Network>;
    ensResolver: Promise<typeof EnsResolver>;
    feeHistory: boolean;
    /**
     * Multicall obj
     */
    multicall: Multicall;
    multicallAllowFailure: boolean;
    multicallMaxCount: number;
    multicallStallTime: number;
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
    getFeeData(): Promise<FeeDataExt>;
    /**
     * Override EnsResolver to use our optimized resolver class object
     */
    getResolver(name: string): Promise<null | EnsResolver>;
    lookupAddress(address: string, reverseCheck?: boolean): Promise<null | string>;
    /**
     * Wrapper around waitForTransaction to have default confirmation
     * Doesn't throw on timeout and instead returns null
     */
    wait(hashOrTx: null | string | TransactionResponse): Promise<null | TransactionReceipt>;
    getBlockReceipts(blockTag: BlockTag): Promise<TransactionReceipt[]>;
    traceBlock(blockTag: BlockTag, onlyTopCall?: boolean): Promise<CallTrace[]>;
    traceTransaction(hash: string, onlyTopCall?: boolean): Promise<CallTrace>;
    /**
     * Multicaller
     */
    _drainCalls(): Promise<void>;
    _queueCall(to: string, data?: string): Promise<MulticallResult>;
    _perform<T = any>(req: PerformActionRequest): Promise<T>;
}
export {};
