"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockReceipts = getBlockReceipts;
async function getBlockReceipts(provider, blockTag, network) {
    const _network = network || (await provider.getNetwork());
    const parsedBlock = provider._getBlockTag(blockTag);
    const blockReceipts = (await provider.send('eth_getBlockReceipts', [parsedBlock]));
    if (!blockReceipts) {
        throw new Error(`No block receipts for ${blockTag}`);
    }
    return blockReceipts.map((r) => provider._wrapTransactionReceipt(r, _network));
}
