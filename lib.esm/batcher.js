"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthersBatcher = void 0;
exports.createBatchRequest = createBatchRequest;
const utils_1 = require("./utils");
const events_1 = require("./events");
const blockReceipts_1 = require("./blockReceipts");
const traceBlock_1 = require("./traceBlock");
async function createBatchRequest(params = {}, type, inputs, outputFunc, batchSize) {
    const concurrencySize = params.concurrencySize || 10;
    const retryMax = params.retryMax || 2;
    const retryOn = params.retryOn || 500;
    let chunkIndex = 0;
    const results = [];
    for (const chunks of (0, utils_1.chunk)(inputs, concurrencySize * batchSize)) {
        const timeStart = Date.now();
        const chunksResult = (await Promise.all((0, utils_1.chunk)(chunks, batchSize).map(async (_inputs, batchIndex) => {
            // 40ms since default batch requests are collected with 50ms from provider
            await (0, utils_1.sleep)(40 * batchIndex);
            return (async () => {
                let retries = 0;
                let err;
                while (retries <= retryMax) {
                    try {
                        return await Promise.all(_inputs.map((input) => outputFunc(input)));
                    }
                    catch (e) {
                        retries++;
                        err = e;
                        await (0, utils_1.sleep)(retryOn);
                    }
                }
                throw err;
            })();
        }))).flat();
        results.push(...chunksResult);
        chunkIndex += chunks.length;
        if (params.onProgress) {
            params.onProgress({
                type,
                chunkIndex,
                chunkLength: inputs.length,
                chunks,
                chunksResult,
                resultLength: chunksResult.flat().length,
            });
        }
        if (params.delays && Date.now() - timeStart < params.delays) {
            await (0, utils_1.sleep)(params.delays - (Date.now() - timeStart));
        }
    }
    return results;
}
/**
 * Helper class to fetch large amount of blocks / transactions / contract events
 * as quick as possible using batching and concurrent calls
 */
class EthersBatcher {
    concurrencySize;
    /**
     * Batch sizes (how many requests per one batch request)
     */
    blockBatch;
    txBatch;
    // For eth_getLogs use 1 for no batch or 3 for minimal batch
    // (Some RPC providers like infura disabled batch request on eth_getLogs)
    eventBatch;
    // eth_getLogs block range
    eventRange;
    delays;
    retryMax; // Max retry count
    retryOn; // Retry on millisecond
    onProgress;
    constructor({ concurrencySize, blockBatch, txBatch, eventBatch, eventRange, delays, retryMax, retryOn, onProgress, }) {
        this.concurrencySize = concurrencySize || 10;
        this.blockBatch = blockBatch || 10;
        this.txBatch = txBatch || this.blockBatch;
        this.eventBatch = eventBatch || 3;
        this.eventRange = eventRange || 5000;
        this.delays = delays;
        this.retryMax = retryMax || 2;
        this.retryOn = retryOn || 500;
        this.onProgress = onProgress;
    }
    async createBatchRequest(type, inputs, outputFunc, batchSize) {
        return createBatchRequest(this, type, inputs, outputFunc, batchSize);
    }
    async getBlocks(provider, blockTags, prefetchTxs) {
        return await this.createBatchRequest('Blocks', blockTags, async (blockTag) => {
            const block = await provider.getBlock(blockTag, prefetchTxs);
            if (!block) {
                throw new Error(`No block for ${blockTag}`);
            }
            return block;
        }, this.blockBatch);
    }
    async getTransactions(provider, txids) {
        return await this.createBatchRequest('Transactions', txids, async (txid) => {
            const tx = await provider.getTransaction(txid);
            if (!tx) {
                throw new Error(`No tx for ${txid}`);
            }
            return tx;
        }, this.txBatch);
    }
    async getTransactionReceipts(provider, txids) {
        return await this.createBatchRequest('TransactionReceipts', txids, async (txid) => {
            const tx = await provider.getTransactionReceipt(txid);
            if (!tx) {
                throw new Error(`No tx for ${txid}`);
            }
            return tx;
        }, this.txBatch);
    }
    async getBlockReceipts(provider, blockTags) {
        const network = await provider.getNetwork();
        return (await this.createBatchRequest('BlockReceipts', blockTags, async (blockTag) => {
            return (0, blockReceipts_1.getBlockReceipts)(provider, blockTag, network);
        }, this.blockBatch)).flat();
    }
    async traceBlock(provider, blockTags, onlyTopCall) {
        return (await this.createBatchRequest('InternalTransactions', blockTags, async (blockTag) => {
            return (0, traceBlock_1.traceBlock)(provider, blockTag, onlyTopCall);
        }, this.blockBatch)).flat();
    }
    async traceTransaction(provider, txids, onlyTopCall) {
        return await this.createBatchRequest('InternalTransactions', txids, async (txid) => {
            return (0, traceBlock_1.traceTransaction)(provider, txid, onlyTopCall);
        }, this.txBatch);
    }
    /**
     * Get Logs / DecodedLogs for an address / addresses / contract
     */
    async getEvents({ address, provider, contract, event = '*', fromBlock = 0, toBlock, }) {
        // Must have valid number here to build correct array
        if (!toBlock) {
            toBlock = await (provider || contract?.runner).getBlockNumber();
        }
        const eventTags = [];
        for (let i = fromBlock; i < toBlock; i += this.eventRange) {
            const j = i + this.eventRange - 1 > toBlock ? toBlock : i + this.eventRange - 1;
            eventTags.push({ fromBlock: i, toBlock: j });
        }
        return (await this.createBatchRequest('Events', eventTags, async ({ fromBlock, toBlock }) => {
            if (address || !contract) {
                return await (0, events_1.multiQueryFilter)({
                    address,
                    provider,
                    contract,
                    event,
                    fromBlock,
                    toBlock,
                });
            }
            return await contract.queryFilter(event, fromBlock, toBlock);
        }, this.eventBatch)).flat();
    }
}
exports.EthersBatcher = EthersBatcher;
