"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCallTrace = formatCallTrace;
exports.traceBlock = traceBlock;
exports.traceTransaction = traceTransaction;
const ethers_1 = require("./ethers");
const { getAddress } = ethers_1.ethers;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatCallTrace(params, txHash, blockParams) {
    return {
        from: params.from ? getAddress(params.from) : '',
        gas: Number(params.gas || 0),
        gasUsed: Number(params.gasUsed || 0),
        to: params.to ? getAddress(params.to) : '',
        input: params.input,
        output: params.output,
        calls: params.calls,
        value: BigInt(params.value || 0),
        type: params.type,
        blockNumber: blockParams.number,
        blockHash: blockParams.hash || undefined,
        txHash,
    };
}
async function traceBlock(provider, blockTag, onlyTopCall = false) {
    const parsedBlock = provider._getBlockTag(blockTag);
    const method = parsedBlock.length === 66 ? 'debug_traceBlockByHash' : 'debug_traceBlockByNumber';
    const [block, resp] = await Promise.all([
        typeof blockTag === 'number' ? { number: blockTag, hash: undefined } : provider.getBlock(blockTag),
        provider.send(method, [
            parsedBlock,
            {
                tracer: 'callTracer',
                traceConfig: {
                    onlyTopCall,
                },
            },
        ]),
    ]);
    if (!block) {
        throw new Error(`Invalid block for ${blockTag}`);
    }
    if (!resp) {
        throw new Error(`No trace results for block ${blockTag}`);
    }
    return resp.map(({ txHash, result }) => formatCallTrace(result, txHash, block));
}
async function traceTransaction(provider, hash, onlyTopCall = false, txResp) {
    const [tx, resp] = await Promise.all([
        txResp || provider.getTransaction(hash),
        provider.send('debug_traceTransaction', [
            hash,
            {
                tracer: 'callTracer',
                traceConfig: {
                    onlyTopCall,
                },
            },
        ]),
    ]);
    if (!tx) {
        throw new Error(`Invalid tx for ${tx}`);
    }
    if (!resp) {
        throw new Error(`No trace results for tx ${hash}`);
    }
    return formatCallTrace(resp, hash, {
        number: tx.blockNumber,
        hash: tx.blockHash,
    });
}
