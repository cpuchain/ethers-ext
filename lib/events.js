"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiQueryFilter = multiQueryFilter;
const ethers_1 = require("./ethers");
const { EventLog, UndecodedEventLog, Log } = ethers_1.ethers;
/**
 * Provide historic access to event data for event in the range fromBlock (default: 0) to toBlock (default: "latest") inclusive.
 *
 * If address === '*' will scan for entire blockchain
 */
async function multiQueryFilter({ address, provider, contract, event, fromBlock, toBlock, }) {
    if (!address && contract) {
        address = contract.target;
    }
    else if (address === '*') {
        address = undefined;
    }
    if (!provider && contract) {
        provider = contract.runner;
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
    let fragment = null, topics = [null];
    if (contract) {
        ({ fragment, topics } = await (0, ethers_1.getSubInfo)(contract.interface, event));
    }
    const filter = {
        address,
        topics,
        fromBlock,
        toBlock,
    };
    (0, ethers_1.assert)(provider, 'contract runner does not have a provider', 'UNSUPPORTED_OPERATION', {
        operation: 'queryFilter',
    });
    return (await provider.getLogs(filter)).map((log) => {
        let foundFragment = fragment;
        if (foundFragment == null && contract) {
            try {
                foundFragment = contract.interface.getEvent(log.topics[0]);
                // eslint-disable-next-line no-empty
            }
            catch { }
        }
        if (foundFragment && contract) {
            try {
                return new EventLog(log, contract.interface, foundFragment);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            catch (error) {
                return new UndecodedEventLog(log, error);
            }
        }
        return new Log(log, provider);
    });
}
