"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OFFCHAIN_ORACLE_ADDRESS = void 0;
exports.getRateToEth = getRateToEth;
exports.OFFCHAIN_ORACLE_ADDRESS = '0x00000000000D6FFc74A8feb35aF5827bf57f6786';
// Return token price in wei (Use formatEther to get price in decimals)
async function getRateToEth(oracle, erc20) {
    const token = erc20;
    const [decimals, price] = await Promise.all([token.decimals(), oracle.getRateToEth(token.target, true)]);
    return (price * 10n ** decimals) / 10n ** 18n;
}
