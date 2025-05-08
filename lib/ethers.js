"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ethers = void 0;
exports.assert = assert;
exports.assertArgument = assertArgument;
exports.isDeferred = isDeferred;
exports.getSubInfo = getSubInfo;
const ethers_1 = require("ethers");
exports.ethers = globalThis?.ethers || ethers_1.ethers;
const { isHexString } = exports.ethers;
/**
 *  Throws an EthersError with %%message%%, %%code%% and additional error
 *  %%info%% when %%check%% is falsish..
 *
 *  @see [[api:makeError]]
 */
function assert(check, message, code, info) {
    if (!check) {
        throw exports.ethers.makeError(message, code, info);
    }
}
/**
 *  A simple helper to simply ensuring provided arguments match expected
 *  constraints, throwing if not.
 *
 *  In TypeScript environments, the %%check%% has been asserted true, so
 *  any further code does not need additional compile-time checks.
 */
function assertArgument(check, message, name, value) {
    assert(check, message, 'INVALID_ARGUMENT', { argument: name, value: value });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDeferred(value) {
    return (value &&
        typeof value === 'object' &&
        'getTopicFilter' in value &&
        typeof value.getTopicFilter === 'function' &&
        value.fragment);
}
async function getSubInfo(_interface, event) {
    let topics;
    let fragment = null;
    // Convert named events to topicHash and get the fragment for
    // events which need deconstructing.
    if (Array.isArray(event)) {
        const topicHashify = function (name) {
            if (isHexString(name, 32)) {
                return name;
            }
            const fragment = _interface.getEvent(name);
            assertArgument(fragment, 'unknown fragment', 'name', name);
            return fragment.topicHash;
        };
        // Array of Topics and Names; e.g. `[ "0x1234...89ab", "Transfer(address)" ]`
        topics = event.map((e) => {
            if (e == null) {
                return null;
            }
            if (Array.isArray(e)) {
                return e.map(topicHashify);
            }
            return topicHashify(e);
        });
    }
    else if (event === '*') {
        topics = [null];
    }
    else if (typeof event === 'string') {
        if (isHexString(event, 32)) {
            // Topic Hash
            topics = [event];
        }
        else {
            // Name or Signature; e.g. `"Transfer", `"Transfer(address)"`
            fragment = _interface.getEvent(event);
            assertArgument(fragment, 'unknown fragment', 'event', event);
            topics = [fragment.topicHash];
        }
    }
    else if (isDeferred(event)) {
        // Deferred Topic Filter; e.g. `contract.filter.Transfer(from)`
        topics = await event.getTopicFilter();
    }
    else if ('fragment' in event) {
        // ContractEvent; e.g. `contract.filter.Transfer`
        fragment = event.fragment;
        topics = [fragment.topicHash];
    }
    else {
        assertArgument(false, 'unknown event name', 'event', event);
    }
    // Normalize topics and sort TopicSets
    topics = topics.map((t) => {
        if (t == null) {
            return null;
        }
        if (Array.isArray(t)) {
            const items = Array.from(new Set(t.map((t) => t.toLowerCase())).values());
            if (items.length === 1) {
                return items[0];
            }
            items.sort();
            return items;
        }
        return t.toLowerCase();
    });
    const tag = topics
        .map((t) => {
        if (t == null) {
            return 'null';
        }
        if (Array.isArray(t)) {
            return t.join('|');
        }
        return t;
    })
        .join('&');
    return { fragment, tag, topics };
}
