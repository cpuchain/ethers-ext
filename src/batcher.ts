import type {
    BaseContract,
    Block,
    BlockTag,
    ContractEventName,
    Log,
    EventLog,
    Provider,
    JsonRpcProvider,
    TransactionReceipt,
    TransactionResponse,
} from 'ethers';
import { chunk, sleep } from './utils';
import { multiQueryFilter } from './events';
import { getBlockReceipts } from './blockReceipts';
import { CallTrace, traceBlock, traceTransaction } from './traceBlock';

export type BatchOnProgress = (progress: {
    type: string;
    chunkIndex: number;
    chunkLength: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chunks: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    retry?: boolean;
    retryMax?: number;
    retryOn?: number;

    onProgress?: BatchOnProgress;
}

/**
 * Helper class to fetch large amount of blocks / transactions / contract events
 * as quick as possible using batching and concurrent calls
 */
export class EthersBatcher {
    concurrencySize: number;

    /**
     * Batch sizes (how many requests per one batch request)
     */
    blockBatch: number;
    txBatch: number;
    // For eth_getLogs use 1 for no batch or 3 for minimal batch
    // (Some RPC providers like infura disabled batch request on eth_getLogs)
    eventBatch: number;
    // eth_getLogs block range
    eventRange: number;

    delays?: number;

    retry: boolean; // Boolean to enable retries
    retryMax: number; // Max retry count
    retryOn: number; // Retry on millisecond

    onProgress?: BatchOnProgress;

    constructor({
        concurrencySize,
        blockBatch,
        txBatch,
        eventBatch,
        eventRange,
        delays,
        retry,
        retryMax,
        retryOn,
        onProgress,
    }: EthersBatcherParams) {
        this.concurrencySize = concurrencySize || 10;

        this.blockBatch = blockBatch || 10;
        this.txBatch = txBatch || this.blockBatch;
        this.eventBatch = eventBatch || 3;
        this.eventRange = eventRange || 5000;

        this.delays = delays;

        this.retry = retry ?? true;
        this.retryMax = retryMax || 3;
        this.retryOn = retryOn || 500;

        this.onProgress = onProgress;
    }

    async createBatchRequest<Input, Output>(
        type: string,
        inputs: Input[],
        outputFunc: (input: Input) => Promise<Output>,
        batchSize: number,
    ): Promise<Output[]> {
        let chunkIndex = 0;
        const results: Output[] = [];

        for (const chunks of chunk(inputs, this.concurrencySize * batchSize)) {
            const chunksResult = (
                await Promise.all(
                    chunk(chunks, batchSize).map(async (_inputs, batchIndex) => {
                        // 40ms since default batch requests are collected with 50ms from provider
                        await sleep(40 * batchIndex);

                        return (async () => {
                            let retries = 0;
                            let err;

                            while (
                                (!this.retry && retries === 0) ||
                                (this.retry && retries < this.retryMax)
                            ) {
                                try {
                                    return await Promise.all(_inputs.map((input) => outputFunc(input)));
                                } catch (e) {
                                    retries++;
                                    err = e;

                                    await sleep(this.retryOn);
                                }
                            }

                            throw err;
                        })();
                    }),
                )
            ).flat();

            results.push(...chunksResult);

            chunkIndex += chunks.length;

            if (this.onProgress) {
                this.onProgress({
                    type,
                    chunkIndex,
                    chunkLength: inputs.length,
                    chunks,
                    chunksResult,
                    resultLength: chunksResult.flat().length,
                });
            }

            if (this.delays) {
                await sleep(this.delays);
            }
        }

        return results;
    }

    async getBlocks(provider: Provider, blockTags: BlockTag[], prefetchTxs?: boolean): Promise<Block[]> {
        return await this.createBatchRequest<BlockTag, Block>(
            'Blocks',
            blockTags,
            async (blockTag) => {
                const block = await provider.getBlock(blockTag, prefetchTxs);

                if (!block) {
                    throw new Error(`No block for ${blockTag}`);
                }

                return block;
            },
            this.blockBatch,
        );
    }

    async getTransactions(provider: Provider, txids: string[]): Promise<TransactionResponse[]> {
        return await this.createBatchRequest<string, TransactionResponse>(
            'Transactions',
            txids,
            async (txid) => {
                const tx = await provider.getTransaction(txid);

                if (!tx) {
                    throw new Error(`No tx for ${txid}`);
                }

                return tx;
            },
            this.txBatch,
        );
    }

    async getTransactionReceipts(provider: Provider, txids: string[]): Promise<TransactionReceipt[]> {
        return await this.createBatchRequest<string, TransactionReceipt>(
            'TransactionReceipts',
            txids,
            async (txid) => {
                const tx = await provider.getTransactionReceipt(txid);

                if (!tx) {
                    throw new Error(`No tx for ${txid}`);
                }

                return tx;
            },
            this.txBatch,
        );
    }

    async getBlockReceipts(provider: JsonRpcProvider, blockTags: BlockTag[]): Promise<TransactionReceipt[]> {
        const network = await provider.getNetwork();

        return (
            await this.createBatchRequest<BlockTag, TransactionReceipt[]>(
                'BlockReceipts',
                blockTags,
                async (blockTag) => {
                    return getBlockReceipts(provider, blockTag, network);
                },
                this.blockBatch,
            )
        ).flat();
    }

    async traceBlock(
        provider: JsonRpcProvider,
        blockTags: BlockTag[],
        onlyTopCall?: boolean,
    ): Promise<CallTrace[]> {
        return (
            await this.createBatchRequest<BlockTag, CallTrace[]>(
                'InternalTransactions',
                blockTags,
                async (blockTag) => {
                    return traceBlock(provider, blockTag, onlyTopCall);
                },
                this.blockBatch,
            )
        ).flat();
    }

    async traceTransaction(
        provider: JsonRpcProvider,
        txids: string[],
        onlyTopCall?: boolean,
    ): Promise<CallTrace[]> {
        return await this.createBatchRequest<string, CallTrace>(
            'InternalTransactions',
            txids,
            async (txid) => {
                return traceTransaction(provider, txid, onlyTopCall);
            },
            this.txBatch,
        );
    }

    /**
     * Get Logs / DecodedLogs for an address / addresses / contract
     */
    async getEvents({
        address,
        provider,
        contract,
        event = '*',
        fromBlock = 0,
        toBlock,
    }: {
        address?: string | string[];
        provider?: Provider;
        contract?: BaseContract;
        event?: ContractEventName;
        fromBlock?: number;
        toBlock?: number;
    }): Promise<(Log | EventLog)[]> {
        // Must have valid number here to build correct array
        if (!toBlock) {
            toBlock = await (provider || (contract?.runner as Provider)).getBlockNumber();
        }

        const eventTags = [];

        for (let i = fromBlock; i < toBlock; i += this.eventRange) {
            const j = i + this.eventRange - 1 > toBlock ? toBlock : i + this.eventRange - 1;

            eventTags.push({ fromBlock: i, toBlock: j });
        }

        return (
            await this.createBatchRequest<{ fromBlock: number; toBlock: number }, (Log | EventLog)[]>(
                'Events',
                eventTags,
                async ({ fromBlock, toBlock }) => {
                    if (address || !contract) {
                        return await multiQueryFilter({
                            address,
                            provider,
                            contract,
                            event,
                            fromBlock,
                            toBlock,
                        });
                    }
                    return await contract.queryFilter(event, fromBlock, toBlock);
                },
                this.eventBatch,
            )
        ).flat();
    }
}
