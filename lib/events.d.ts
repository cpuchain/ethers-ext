import type { BaseContract, ContractEventName, BlockTag, Provider } from 'ethers';
/**
 * Provide historic access to event data for event in the range fromBlock (default: 0) to toBlock (default: "latest") inclusive.
 *
 * If address === '*' will scan for entire blockchain
 */
export declare function multiQueryFilter({ address, provider, contract, event, fromBlock, toBlock, }: {
    address?: string | string[];
    provider?: Provider;
    contract?: BaseContract;
    event?: ContractEventName;
    fromBlock?: BlockTag;
    toBlock?: BlockTag;
}): Promise<import("ethers").Log[]>;
