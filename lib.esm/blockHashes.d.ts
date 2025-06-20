import type { Provider } from 'ethers';
import { Multicall } from './typechain';
/**
 * Compare last 80 blocks to find reorgs
 */
export interface BlockHash {
    number: number;
    hash?: string;
}
export declare function fetchBlockHashes(provider: Provider & {
    multicall?: Multicall;
}, knownBlock?: number, depth?: number): Promise<BlockHash[]>;
/**
 * Retuns reorged block or else undefined
 */
export declare function compareBlockHashes(fromLocal: BlockHash[], fromNode: BlockHash[]): number | undefined;
