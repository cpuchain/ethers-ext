import type { EventEmitter } from 'stream';
import type { Eip1193Provider, JsonRpcProvider, BrowserProviderOptions } from 'ethers';
import { type WalletOptions, JsonRpcSigner } from './signer';
declare const ethBrowserProvider: typeof import("ethers").BrowserProvider;
export interface AddEthereumChainParams {
    chainName?: string;
    chainSymbol?: string;
    rpcUrl?: string;
    explorerUrl?: string;
}
export declare function switchChain(chainId: bigint, ethereum: Eip1193Provider & {
    isTrust?: boolean;
}, params?: AddEthereumChainParams): Promise<void>;
export type browserCallBack = (...args: any[]) => void;
export interface BrowserProviderOptionsExt extends BrowserProviderOptions, AddEthereumChainParams, WalletOptions {
    chainChanged?: browserCallBack;
    accountsChanged?: browserCallBack;
    disconnect?: browserCallBack;
}
export declare class BrowserProvider extends ethBrowserProvider {
    ethereum: Eip1193Provider & EventEmitter;
    appProvider?: JsonRpcProvider;
    options?: BrowserProviderOptionsExt;
    chainChanged?: browserCallBack;
    accountsChanged?: browserCallBack;
    disconnect?: browserCallBack;
    constructor(ethereum: Eip1193Provider & EventEmitter, appProvider?: JsonRpcProvider, options?: BrowserProviderOptionsExt);
    getSigner(address: string): Promise<JsonRpcSigner>;
    /**
     * EIP-6963 Browser Provider discovery to support multiple wallets
     *
     * https://github.com/ethers-io/ethers.js/commit/f5469dd0e0719389d51e0106ee36d07a7ebef875
     */
    static discoverProviders(appProvider?: JsonRpcProvider, options?: BrowserProviderOptionsExt): Promise<BrowserProvider[]>;
}
export {};
