import type { BaseContract, Interface, Overrides } from 'ethers';
import type { Multicall } from './typechain';
export declare const MULTICALL_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";
export interface CallV3 {
    contract?: BaseContract;
    address?: string;
    interface?: Interface;
    name: string;
    params?: any[];
    allowFailure?: boolean;
}
export declare function multicall(multi: Multicall, calls: CallV3[], overrides?: Overrides): Promise<any[]>;
