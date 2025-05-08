"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GAS_PRICE_ORACLE_ADDRESS = void 0;
exports.getL1Fee = getL1Fee;
const ethers_1 = require("./ethers");
const { Transaction, parseUnits, parseEther, ZeroAddress } = ethers_1.ethers;
exports.GAS_PRICE_ORACLE_ADDRESS = '0x420000000000000000000000000000000000000F';
// Calculate L1 submission fee for op-stack chains
async function getL1Fee(oracle, tx) {
    const { unsignedSerialized } = Transaction.from({
        chainId: tx?.chainId || 10000n,
        data: tx?.data || '0x',
        gasLimit: tx?.gasLimit || 10_000_000,
        gasPrice: tx?.gasPrice || parseUnits('10000', 'gwei'),
        nonce: tx?.nonce || 100_000,
        to: tx?.to instanceof Promise ? (await tx?.to) : tx?.to || ZeroAddress,
        type: tx?.type || 0,
        value: tx?.value || parseEther('10000'),
    });
    return ((await oracle.getL1Fee(unsignedSerialized)) * 13n) / 10n;
}
