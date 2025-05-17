import type { JsonRpcProvider, BlockTag, Network, TransactionReceipt } from 'ethers';
export declare function getBlockReceipts(provider: JsonRpcProvider, blockTag: BlockTag, network?: Network): Promise<TransactionReceipt[]>;
