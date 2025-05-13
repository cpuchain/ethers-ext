"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonRpcSigner = exports.VoidSigner = exports.Wallet = exports.GAS_LIMIT_FAILOVER = exports.DEFAULT_GAS_LIMIT_BUMP = exports.DEFAULT_GAS_PRICE_BUMP = exports.DEFAULT_GAS_LIMIT = exports.ARB_GAS_LIMIT = exports.ARB_CHAIN = void 0;
exports.populateTransaction = populateTransaction;
const ethers_1 = require("./ethers");
const typechain_1 = require("./typechain");
const op_1 = require("./op");
const { resolveProperties, Wallet: ethWallet, HDNodeWallet, Transaction, TransactionResponse: ethTransactionResponse, VoidSigner: ethVoidSigner, JsonRpcSigner: ethJsonRpcSigner, } = ethers_1.ethers;
// For value calculation
exports.ARB_CHAIN = 42161n;
exports.ARB_GAS_LIMIT = 5000000n;
exports.DEFAULT_GAS_LIMIT = 500000n;
// For bumps
exports.DEFAULT_GAS_PRICE_BUMP = 2;
exports.DEFAULT_GAS_LIMIT_BUMP = 1.3;
// For failover
exports.GAS_LIMIT_FAILOVER = 2000000n;
async function populateTransaction(signer, tx = {}) {
    const provider = (signer.appProvider || signer.provider);
    const signerAddress = signer.address || (await signer.getAddress());
    const gasPriceBump = (await signer.gasPriceBump?.()) || exports.DEFAULT_GAS_PRICE_BUMP;
    const gasLimitBump = (await signer.gasLimitBump?.()) || exports.DEFAULT_GAS_LIMIT_BUMP;
    const customPriorityFee = await signer.customPriorityFee?.();
    if (!tx.from) {
        tx.from = signerAddress;
    }
    else if (tx.from !== signerAddress) {
        throw new Error('Wrong signer for transaction');
    }
    const [chainId, feeData, nonce, balance, l1Fee] = await Promise.all([
        tx.chainId ? undefined : provider.getNetwork().then(({ chainId }) => chainId),
        tx.maxFeePerGas || tx.gasPrice || tx.maxFeePerGas === 0n || tx.gasPrice === 0n
            ? undefined
            : provider.getFeeData(),
        tx.nonce || tx.nonce === 0 ? undefined : provider.getTransactionCount(signerAddress, 'pending'),
        tx.txCost || !signer.autoValue ? undefined : provider.getBalance(signerAddress),
        tx.l1Fee || !signer.opGasPriceOracle ? 0n : (0, op_1.getL1Fee)(signer.opGasPriceOracle, tx),
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
            const maxPriorityFeePerGas = typeof tx.maxPriorityFeePerGas === 'bigint'
                ? tx.maxPriorityFeePerGas
                : (customPriorityFee ?? (feeData.maxPriorityFeePerGas || 0n));
            const maxFeePerGas = feeData.maxFeePerGas <= maxPriorityFeePerGas
                ? maxPriorityFeePerGas + 10n
                : feeData.maxFeePerGas;
            tx.maxFeePerGas = BigInt(Math.floor(Number(maxFeePerGas) * gasPriceBump));
            tx.maxPriorityFeePerGas = maxPriorityFeePerGas;
            delete tx.gasPrice;
            gasPrice = tx.maxFeePerGas + tx.maxPriorityFeePerGas;
        }
        else if (feeData.gasPrice || feeData.gasPrice === 0n) {
            if (!tx.type && tx.type !== 0) {
                tx.type = 0;
            }
            tx.gasPrice = feeData.gasPrice;
            delete tx.maxFeePerGas;
            delete tx.maxPriorityFeePerGas;
            gasPrice = tx.gasPrice;
        }
    }
    else {
        gasPrice = tx.maxFeePerGas
            ? BigInt(tx.maxFeePerGas) + BigInt(tx.maxPriorityFeePerGas || 0n)
            : BigInt(tx.gasPrice || 0n);
    }
    if (nonce || nonce === 0) {
        tx.nonce = nonce;
    }
    if (balance && BigInt(tx.value || 0) >= balance) {
        if (tx.chainId === exports.ARB_CHAIN) {
            tx.value = balance - (gasPrice * exports.ARB_GAS_LIMIT + l1Fee);
        }
        else {
            tx.value = balance - (gasPrice * exports.DEFAULT_GAS_LIMIT + l1Fee);
        }
        const gasLimit = await provider.estimateGas(tx);
        tx.gasLimit = gasLimit !== 21000n ? BigInt(Math.floor(Number(gasLimit) * gasLimitBump)) : gasLimit;
        tx.value = balance - (gasPrice * tx.gasLimit + l1Fee);
    }
    if (!tx.gasLimit) {
        try {
            const gasLimit = await provider.estimateGas(tx);
            tx.gasLimit =
                gasLimit !== 21000n ? BigInt(Math.floor(Number(gasLimit) * gasLimitBump)) : gasLimit;
        }
        catch (error) {
            if (signer.gasLimitFailover) {
                tx.gasLimit = exports.GAS_LIMIT_FAILOVER;
            }
            else {
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
class Wallet extends ethWallet {
    autoValue;
    gasPriceBump;
    gasLimitBump;
    customPriorityFee;
    gasLimitFailover;
    opGasPriceOracle;
    constructor(key, provider, options = {}) {
        super(key, provider);
        this.autoValue = options.autoValue ?? true;
        this.gasPriceBump = options.gasPriceBump;
        this.gasLimitBump = options.gasLimitBump;
        this.customPriorityFee = options.customPriorityFee;
        this.gasLimitFailover = options.gasLimitFailover ?? false;
        this.opGasPriceOracle = options.opGasPriceOracle
            ? typechain_1.OpGasPriceOracle__factory.connect(options.opGasPriceOracle, provider)
            : undefined;
    }
    static fromMnemonic(mneomnic, provider, index = 0, options) {
        const defaultPath = `m/44'/60'/0'/0/${index}`;
        const { privateKey } = HDNodeWallet.fromPhrase(mneomnic, undefined, defaultPath);
        return new Wallet(privateKey, provider, options);
    }
    populateTransaction(tx) {
        return populateTransaction(this, tx);
    }
}
exports.Wallet = Wallet;
class VoidSigner extends ethVoidSigner {
    autoValue;
    gasPriceBump;
    gasLimitBump;
    customPriorityFee;
    gasLimitFailover;
    opGasPriceOracle;
    constructor(address, provider, options = {}) {
        super(address, provider);
        this.autoValue = options.autoValue ?? true;
        this.gasPriceBump = options.gasPriceBump;
        this.gasLimitBump = options.gasLimitBump;
        this.customPriorityFee = options.customPriorityFee;
        this.gasLimitFailover = options.gasLimitFailover ?? false;
        this.opGasPriceOracle = options.opGasPriceOracle
            ? typechain_1.OpGasPriceOracle__factory.connect(options.opGasPriceOracle, provider)
            : undefined;
    }
    populateTransaction(tx) {
        return populateTransaction(this, tx);
    }
    async sendTransaction(tx) {
        const _tx = Transaction.from({
            ...(await this.populateTransaction(tx)),
            from: undefined,
        });
        return new ethTransactionResponse({
            ..._tx,
            blockNumber: null,
            blockHash: null,
            hash: _tx.unsignedSerialized,
            index: 0,
        }, this.provider);
    }
}
exports.VoidSigner = VoidSigner;
class JsonRpcSigner extends ethJsonRpcSigner {
    autoValue;
    gasPriceBump;
    gasLimitBump;
    customPriorityFee;
    gasLimitFailover;
    opGasPriceOracle;
    appProvider;
    constructor(provider, address) {
        super(provider, address);
        const options = provider.options || {};
        this.autoValue = options.autoValue ?? true;
        this.gasPriceBump = options.gasPriceBump;
        this.gasLimitBump = options.gasLimitBump;
        this.customPriorityFee = options.customPriorityFee;
        this.gasLimitFailover = options.gasLimitFailover ?? false;
        this.opGasPriceOracle = options.opGasPriceOracle
            ? typechain_1.OpGasPriceOracle__factory.connect(options.opGasPriceOracle, provider.appProvider || provider)
            : undefined;
        this.appProvider = provider.appProvider;
    }
    populateTransaction(tx) {
        return populateTransaction(this, tx);
    }
    async sendUncheckedTransaction(tx) {
        return super.sendUncheckedTransaction((await populateTransaction(this, tx)));
    }
}
exports.JsonRpcSigner = JsonRpcSigner;
