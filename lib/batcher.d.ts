import type { BaseContract, Block, BlockTag, ContractEventName, Log, EventLog, Provider, JsonRpcProvider, TransactionReceipt, TransactionResponse } from 'ethers';
import { CallTrace } from './traceBlock';
export type BatchOnProgress = (progress: {
    type: string;
    chunkIndex: number;
    chunkLength: number;
    chunks: any;
    chunksResult: any;
    resultLength: number;
}) => void;
export interface EthersBatcherParams {
    concurrencySize?: number;
    blockBatch?: number;
    txBatch?: number;
    eventBatch?: number;
    eventRange?: number;
    delays?: number;
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
    retryMax: number;
    retryOn: number;
    onProgress?: BatchOnProgress;
    constructor({ concurrencySize, blockBatch, txBatch, eventBatch, eventRange, delays, retryMax, retryOn, onProgress, }: EthersBatcherParams);
    createBatchRequest<Input, Output>(type: string, inputs: Input[], outputFunc: (input: Input) => Promise<Output>, batchSize: number): Promise<Output[]>;
    getBlocks(provider: Provider, blockTags: BlockTag[], prefetchTxs?: boolean): Promise<Block[]>;
    getTransactions(provider: Provider, txids: string[]): Promise<TransactionResponse[]>;
    getTransactionReceipts(provider: Provider, txids: string[]): Promise<TransactionReceipt[]>;
    getBlockReceipts(provider: JsonRpcProvider, blockTags: BlockTag[]): Promise<TransactionReceipt[]>;
    traceBlock(provider: JsonRpcProvider, blockTags: BlockTag[], onlyTopCall?: boolean): Promise<CallTrace[]>;
    traceTransaction(provider: JsonRpcProvider, txids: string[], onlyTopCall?: boolean): Promise<CallTrace[]>;
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
