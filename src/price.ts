import type { ERC20, OffchainOracle } from './typechain';

export const OFFCHAIN_ORACLE_ADDRESS = '0x00000000000D6FFc74A8feb35aF5827bf57f6786';

// Return token price in wei (Use formatEther to get price in decimals)
export async function getRateToEth(oracle: OffchainOracle, erc20: unknown): Promise<bigint> {
    const token = erc20 as ERC20;

    const [decimals, price] = await Promise.all([token.decimals(), oracle.getRateToEth(token.target, true)]);

    return (price * 10n ** decimals) / 10n ** 18n;
}
