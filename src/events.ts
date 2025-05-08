import type { BaseContract, ContractEventName, BlockTag, Provider, TopicFilter, EventFragment } from 'ethers';
import { ethers, assert, getSubInfo } from './ethers';

const { EventLog, UndecodedEventLog, Log } = ethers;

/**
 * Provide historic access to event data for event in the range fromBlock (default: 0) to toBlock (default: "latest") inclusive.
 *
 * If address === '*' will scan for entire blockchain
 */
export async function multiQueryFilter({
    address,
    provider,
    contract,
    event,
    fromBlock,
    toBlock,
}: {
    address?: string | string[];
    provider?: Provider;
    contract?: BaseContract;
    event?: ContractEventName;
    fromBlock?: BlockTag;
    toBlock?: BlockTag;
}) {
    if (!address && contract) {
        address = contract.target as string;
    } else if (address === '*') {
        address = undefined;
    }
    if (!provider && contract) {
        provider = contract.runner as Provider;
    }
    if (!event) {
        event = '*';
    }
    if (!fromBlock && fromBlock !== 0) {
        fromBlock = 0;
    }
    if (!toBlock && toBlock !== 0) {
        toBlock = 'latest';
    }

    let fragment: EventFragment | null = null,
        topics: TopicFilter | null[] = [null];

    if (contract) {
        ({ fragment, topics } = await getSubInfo(contract.interface, event));
    }

    const filter = {
        address,
        topics,
        fromBlock,
        toBlock,
    };

    assert(provider, 'contract runner does not have a provider', 'UNSUPPORTED_OPERATION', {
        operation: 'queryFilter',
    });

    return (await provider.getLogs(filter)).map((log) => {
        let foundFragment = fragment;
        if (foundFragment == null && contract) {
            try {
                foundFragment = contract.interface.getEvent(log.topics[0]);
                // eslint-disable-next-line no-empty
            } catch {}
        }

        if (foundFragment && contract) {
            try {
                return new EventLog(log, contract.interface, foundFragment);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                return new UndecodedEventLog(log, error);
            }
        }

        return new Log(log, provider);
    });
}
