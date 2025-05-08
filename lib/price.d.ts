import type { OffchainOracle } from './typechain';
export declare const OFFCHAIN_ORACLE_ADDRESS = "0x00000000000D6FFc74A8feb35aF5827bf57f6786";
export declare function getRateToEth(oracle: OffchainOracle, erc20: unknown): Promise<bigint>;
