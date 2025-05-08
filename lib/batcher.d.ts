import type { BaseContract, Block, BlockTag, ContractEventName, Log, EventLog, Provider, TransactionReceipt, TransactionResponse } from 'ethers';
export type BatchOnProgress = (progress: {
    chunkIndex: number;
    chunkLength: number;
    chunks: any;
    resultLength: number;
}) => void;
export interface EthersBatcherParams {
    concurrencySize?: number;
    blockBatch?: number;
    txBatch?: number;
    eventBatch?: number;
    eventRange?: number;
    delays?: number;
    retry?: boolean;
    retryMax?: number;
    retryOn?: number;
    onProgress?: BatchOnProgress;
}
/**
 * Helper class to fetch large amount of blocks / transactions / contract events
 * as quick as possible using batching and concurrent calls
 */
export declare class EthersBatcher {
    concurrencySize: number;
    /**
     * Batch sizes (how many requests per one batch request)
     */
    blockBatch: number;
    txBatch: number;
    eventBatch: number;
    eventRange: number;
    delays?: number;
    retry: boolean;
    retryMax: number;
    retryOn: number;
    onProgress?: BatchOnProgress;
    constructor({ concurrencySize, blockBatch, txBatch, eventBatch, eventRange, delays, retry, retryMax, retryOn, onProgress, }: EthersBatcherParams);
    createBatchRequest<Input, Output>(inputs: Input[], outputFunc: (input: Input) => Promise<Output>, batchSize: number): Promise<Output[]>;
    getBlocks(provider: Provider, blockTags: BlockTag[], prefetchTxs?: boolean): Promise<Block[]>;
    getTransactions(provider: Provider, txids: string[]): Promise<TransactionResponse[]>;
    getTransactionReceipts(provider: Provider, txids: string[]): Promise<TransactionReceipt[]>;
    /**
     * Get Logs / DecodedLogs for an address / addresses / contract
     */
    getEvents({ address, provider, contract, event, fromBlock, toBlock, }: {
        address?: string | string[];
        provider?: Provider;
        contract?: BaseContract;
        event?: ContractEventName;
        fromBlock?: number;
        toBlock?: number;
    }): Promise<(Log | EventLog)[]>;
}
