export interface FeeHistoryResp {
    oldestBlock?: string;
    baseFeePerGas?: string[];
    gasUsedRatio?: number[];
    reward?: string[][];
    baseFeePerBlobGas?: string[];
    blobGasUsedRatio?: number[];
}
export interface FeeHistoryBlock {
    number: number | string;
    gasUsedRatio: number;
    baseFeePerGas: bigint;
    priorityFeePerGas: bigint[];
}
export interface FormattedFeeHistory {
    blocks: FeeHistoryBlock[];
    baseFeePerGasAvg: bigint;
    priorityFeePerGasAvg: bigint[];
}
export declare function formatFeeHistory(result: FeeHistoryResp, historicalBlocks: number, includePending?: boolean): FormattedFeeHistory;
