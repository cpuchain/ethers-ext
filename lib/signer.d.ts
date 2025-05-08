import type { Signer, TransactionRequest, Provider, SigningKey, TransactionLike, JsonRpcApiProvider, TransactionResponse } from 'ethers';
import { OpGasPriceOracle } from './typechain';
declare const ethWallet: typeof import("ethers").Wallet, ethVoidSigner: typeof import("ethers").VoidSigner, ethJsonRpcSigner: typeof import("ethers").JsonRpcSigner;
export declare const ARB_CHAIN = 42161n;
export declare const ARB_GAS_LIMIT = 5000000n;
export declare const DEFAULT_GAS_LIMIT = 500000n;
export declare const DEFAULT_GAS_PRICE_BUMP = 2;
export declare const DEFAULT_GAS_LIMIT_BUMP = 1.3;
export declare const GAS_LIMIT_FAILOVER = 2000000n;
export interface TransactionRequestExt extends TransactionRequest {
    l1Fee?: bigint;
    txCost?: bigint;
}
export declare function populateTransaction(signer: SignerExt, tx?: TransactionRequestExt): Promise<TransactionRequestExt>;
export type feeMultiplier = () => Promise<number> | number;
export type customPriorityFee = () => Promise<bigint> | bigint;
export interface WalletOptions {
    autoValue?: boolean;
    gasPriceBump?: feeMultiplier;
    gasLimitBump?: feeMultiplier;
    customPriorityFee?: customPriorityFee;
    gasLimitFailover?: boolean;
    opGasPriceOracle?: string;
}
export interface SignerExt extends Omit<WalletOptions, 'opGasPriceOracle'>, Signer {
    appProvider?: Provider;
    opGasPriceOracle?: OpGasPriceOracle;
    address?: string;
}
export declare class Wallet extends ethWallet {
    autoValue: boolean;
    gasPriceBump?: feeMultiplier;
    gasLimitBump?: feeMultiplier;
    customPriorityFee?: customPriorityFee;
    gasLimitFailover: boolean;
    opGasPriceOracle?: OpGasPriceOracle;
    constructor(key: string | SigningKey, provider?: Provider, options?: WalletOptions);
    static fromMnemonic(mneomnic: string, provider?: Provider, index?: number, options?: WalletOptions): Wallet;
    populateTransaction(tx: TransactionRequest): Promise<TransactionLike>;
}
export declare class VoidSigner extends ethVoidSigner {
    autoValue: boolean;
    gasPriceBump?: feeMultiplier;
    gasLimitBump?: feeMultiplier;
    customPriorityFee?: customPriorityFee;
    gasLimitFailover: boolean;
    opGasPriceOracle?: OpGasPriceOracle;
    constructor(address: string, provider?: Provider, options?: WalletOptions);
    populateTransaction(tx: TransactionRequest): Promise<TransactionLike>;
    sendTransaction(tx: TransactionRequest): Promise<TransactionResponse>;
}
export declare class JsonRpcSigner extends ethJsonRpcSigner {
    autoValue: boolean;
    gasPriceBump?: feeMultiplier;
    gasLimitBump?: feeMultiplier;
    customPriorityFee?: customPriorityFee;
    gasLimitFailover: boolean;
    opGasPriceOracle?: OpGasPriceOracle;
    appProvider?: Provider;
    constructor(provider: JsonRpcApiProvider & {
        appProvider?: Provider;
        options?: WalletOptions;
    }, address: string);
    populateTransaction(tx: TransactionRequest): Promise<TransactionLike>;
    sendUncheckedTransaction(tx: TransactionRequest): Promise<string>;
}
export {};
