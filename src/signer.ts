import type {
    Signer,
    TransactionRequest,
    Provider,
    SigningKey,
    TransactionLike,
    JsonRpcApiProvider,
    TransactionResponse,
    TransactionResponseParams,
} from 'ethers';
import { ethers } from './ethers';
import { OpGasPriceOracle, OpGasPriceOracle__factory } from './typechain';
import { getL1Fee } from './op';

const {
    resolveProperties,
    Wallet: ethWallet,
    HDNodeWallet,
    Transaction,
    TransactionResponse: ethTransactionResponse,
    VoidSigner: ethVoidSigner,
    JsonRpcSigner: ethJsonRpcSigner,
} = ethers;

// For value calculation
export const ARB_CHAIN = 42161n;
export const ARB_GAS_LIMIT = 5_000_000n;
export const DEFAULT_GAS_LIMIT = 500_000n;

// For bumps
export const DEFAULT_GAS_PRICE_BUMP = 2;
export const DEFAULT_GAS_LIMIT_BUMP = 1.3;

// For failover
export const GAS_LIMIT_FAILOVER = 2_000_000n;

export interface TransactionRequestExt extends TransactionRequest {
    l1Fee?: bigint;
    txCost?: bigint;
}

export async function populateTransaction(
    signer: SignerExt,
    tx: TransactionRequestExt = {},
): Promise<TransactionRequestExt> {
    const provider = (signer.appProvider || signer.provider) as Provider;
    const signerAddress = signer.address || (await signer.getAddress());

    const gasPriceBump = (await signer.gasPriceBump?.()) || DEFAULT_GAS_PRICE_BUMP;
    const gasLimitBump = (await signer.gasLimitBump?.()) || DEFAULT_GAS_LIMIT_BUMP;
    const customPriorityFee = await signer.customPriorityFee?.();

    if (!tx.from) {
        tx.from = signerAddress;
    } else if (tx.from !== signerAddress) {
        throw new Error('Wrong signer for transaction');
    }

    const [chainId, feeData, nonce, balance, l1Fee] = await Promise.all([
        tx.chainId ? undefined : provider.getNetwork().then(({ chainId }) => chainId),
        tx.maxFeePerGas || tx.gasPrice || tx.maxFeePerGas === 0n || tx.gasPrice === 0n
            ? undefined
            : provider.getFeeData(),
        tx.nonce || tx.nonce === 0 ? undefined : provider.getTransactionCount(signerAddress, 'pending'),
        tx.txCost || !signer.autoValue ? undefined : provider.getBalance(signerAddress),
        tx.l1Fee || !signer.opGasPriceOracle ? 0n : getL1Fee(signer.opGasPriceOracle, tx),
    ]);

    if (chainId) {
        tx.chainId = chainId;
    }

    let gasPrice = 0n;

    if (feeData) {
        if (feeData.maxFeePerGas || feeData.maxFeePerGas === 0n) {
            if (!tx.type) {
                tx.type = 2;
            }

            const maxPriorityFeePerGas =
                typeof tx.maxPriorityFeePerGas === 'bigint'
                    ? (tx.maxPriorityFeePerGas as bigint)
                    : (customPriorityFee ?? (feeData.maxPriorityFeePerGas || 0n));
            const maxFeePerGas =
                feeData.maxFeePerGas <= maxPriorityFeePerGas
                    ? maxPriorityFeePerGas + 10n
                    : feeData.maxFeePerGas;

            tx.maxFeePerGas = BigInt(Math.floor(Number(maxFeePerGas) * gasPriceBump));
            tx.maxPriorityFeePerGas = maxPriorityFeePerGas;
            delete tx.gasPrice;

            gasPrice = tx.maxFeePerGas + (tx.maxPriorityFeePerGas as bigint);
        } else if (feeData.gasPrice || feeData.gasPrice === 0n) {
            if (!tx.type && tx.type !== 0) {
                tx.type = 0;
            }
            tx.gasPrice = feeData.gasPrice;
            delete tx.maxFeePerGas;
            delete tx.maxPriorityFeePerGas;

            gasPrice = tx.gasPrice;
        }
    } else {
        gasPrice = tx.maxFeePerGas
            ? BigInt(tx.maxFeePerGas) + BigInt(tx.maxPriorityFeePerGas || 0n)
            : BigInt(tx.gasPrice || 0n);
    }

    if (nonce || nonce === 0) {
        tx.nonce = nonce;
    }

    if (balance && BigInt(tx.value || 0) >= balance) {
        if (tx.chainId === ARB_CHAIN) {
            tx.value = balance - (gasPrice * ARB_GAS_LIMIT + l1Fee);
        } else {
            tx.value = balance - (gasPrice * DEFAULT_GAS_LIMIT + l1Fee);
        }

        const gasLimit = await provider.estimateGas(tx);

        tx.gasLimit = gasLimit !== 21000n ? BigInt(Math.floor(Number(gasLimit) * gasLimitBump)) : gasLimit;
        tx.value = balance - (gasPrice * (tx.gasLimit as bigint) + l1Fee);
    }

    if (!tx.gasLimit) {
        try {
            const gasLimit = await provider.estimateGas(tx);

            tx.gasLimit =
                gasLimit !== 21000n ? BigInt(Math.floor(Number(gasLimit) * gasLimitBump)) : gasLimit;
        } catch (error) {
            if (signer.gasLimitFailover) {
                tx.gasLimit = GAS_LIMIT_FAILOVER;
            } else {
                throw error;
            }
        }
    }

    if (l1Fee) {
        tx.l1Fee = l1Fee;
    }

    if (!tx.txCost) {
        tx.txCost = gasPrice * BigInt(tx.gasLimit) + l1Fee;
    }

    return resolveProperties(tx);
}

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

export class Wallet extends ethWallet {
    autoValue: boolean;
    gasPriceBump?: feeMultiplier;
    gasLimitBump?: feeMultiplier;
    customPriorityFee?: customPriorityFee;
    gasLimitFailover: boolean;

    opGasPriceOracle?: OpGasPriceOracle;

    constructor(key: string | SigningKey, provider?: Provider, options: WalletOptions = {}) {
        super(key, provider);

        this.autoValue = options.autoValue ?? true;
        this.gasPriceBump = options.gasPriceBump;
        this.gasLimitBump = options.gasLimitBump;
        this.customPriorityFee = options.customPriorityFee;
        this.gasLimitFailover = options.gasLimitFailover ?? false;

        this.opGasPriceOracle = options.opGasPriceOracle
            ? OpGasPriceOracle__factory.connect(options.opGasPriceOracle, provider)
            : undefined;
    }

    static fromMnemonic(mneomnic: string, provider?: Provider, index = 0, options?: WalletOptions) {
        const defaultPath = `m/44'/60'/0'/0/${index}`;
        const { privateKey } = HDNodeWallet.fromPhrase(mneomnic, undefined, defaultPath);
        return new Wallet(privateKey, provider, options);
    }

    populateTransaction(tx: TransactionRequest): Promise<TransactionLike> {
        return populateTransaction(this, tx) as Promise<TransactionLike>;
    }
}

export class VoidSigner extends ethVoidSigner {
    autoValue: boolean;
    gasPriceBump?: feeMultiplier;
    gasLimitBump?: feeMultiplier;
    customPriorityFee?: customPriorityFee;
    gasLimitFailover: boolean;

    opGasPriceOracle?: OpGasPriceOracle;

    constructor(address: string, provider?: Provider, options: WalletOptions = {}) {
        super(address, provider);

        this.autoValue = options.autoValue ?? true;
        this.gasPriceBump = options.gasPriceBump;
        this.gasLimitBump = options.gasLimitBump;
        this.customPriorityFee = options.customPriorityFee;
        this.gasLimitFailover = options.gasLimitFailover ?? false;

        this.opGasPriceOracle = options.opGasPriceOracle
            ? OpGasPriceOracle__factory.connect(options.opGasPriceOracle, provider)
            : undefined;
    }

    populateTransaction(tx: TransactionRequest): Promise<TransactionLike> {
        return populateTransaction(this, tx) as Promise<TransactionLike>;
    }

    async sendTransaction(tx: TransactionRequest): Promise<TransactionResponse> {
        const _tx = Transaction.from({
            ...(await this.populateTransaction(tx)),
            from: undefined,
        });

        return new ethTransactionResponse(
            {
                ...(_tx as unknown as TransactionResponseParams),
                blockNumber: null,
                blockHash: null,
                hash: _tx.unsignedSerialized,
                index: 0,
            },
            this.provider as Provider,
        );
    }
}

export class JsonRpcSigner extends ethJsonRpcSigner {
    autoValue: boolean;
    gasPriceBump?: feeMultiplier;
    gasLimitBump?: feeMultiplier;
    customPriorityFee?: customPriorityFee;
    gasLimitFailover: boolean;

    opGasPriceOracle?: OpGasPriceOracle;

    appProvider?: Provider;

    constructor(
        provider: JsonRpcApiProvider & { appProvider?: Provider; options?: WalletOptions },
        address: string,
    ) {
        super(provider, address);

        const options: WalletOptions = provider.options || {};

        this.autoValue = options.autoValue ?? true;
        this.gasPriceBump = options.gasPriceBump;
        this.gasLimitBump = options.gasLimitBump;
        this.customPriorityFee = options.customPriorityFee;
        this.gasLimitFailover = options.gasLimitFailover ?? false;

        this.opGasPriceOracle = options.opGasPriceOracle
            ? OpGasPriceOracle__factory.connect(options.opGasPriceOracle, provider.appProvider || provider)
            : undefined;

        this.appProvider = provider.appProvider;
    }

    populateTransaction(tx: TransactionRequest): Promise<TransactionLike> {
        return populateTransaction(this, tx) as Promise<TransactionLike>;
    }

    async sendUncheckedTransaction(tx: TransactionRequest): Promise<string> {
        return super.sendUncheckedTransaction((await populateTransaction(this, tx)) as TransactionLike);
    }
}
