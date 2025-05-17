import type {
    JsonRpcProvider,
    BlockTag,
    Network,
    TransactionReceipt,
    TransactionReceiptParams,
} from 'ethers';

export async function getBlockReceipts(
    provider: JsonRpcProvider,
    blockTag: BlockTag,
    network?: Network,
): Promise<TransactionReceipt[]> {
    const _network = network || (await provider.getNetwork());

    const parsedBlock = provider._getBlockTag(blockTag);

    const blockReceipts = (await provider.send('eth_getBlockReceipts', [parsedBlock])) as
        | TransactionReceiptParams[]
        | null;

    if (!blockReceipts) {
        throw new Error(`No block receipts for ${blockTag}`);
    }

    return blockReceipts.map((r) => provider._wrapTransactionReceipt(r, _network));
}
