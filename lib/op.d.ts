import type { TransactionRequest } from 'ethers';
import { OpGasPriceOracle } from './typechain';
export declare const GAS_PRICE_ORACLE_ADDRESS = "0x420000000000000000000000000000000000000F";
export declare function getL1Fee(oracle: OpGasPriceOracle, tx?: TransactionRequest): Promise<bigint>;
