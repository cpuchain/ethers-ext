import type { JsonRpcProvider, BlockTag, BlockParams, TransactionResponse } from 'ethers';
export interface CallTrace {
    from: string;
    gas: number;
    gasUsed: number;
    to: string;
    input: string;
    output?: string;
    calls?: any;
    value: bigint;
    type: string;
    blockNumber: number;
    blockHash?: string;
    txHash: string;
}
export declare function formatCallTrace(params: any, txHash: string, blockParams: BlockParams): CallTrace;
export declare function traceBlock(provider: JsonRpcProvider, blockTag: BlockTag, onlyTopCall?: boolean): Promise<CallTrace[]>;
export declare function traceTransaction(provider: JsonRpcProvider, hash: string, onlyTopCall?: boolean, txResp?: TransactionResponse): Promise<CallTrace>;
