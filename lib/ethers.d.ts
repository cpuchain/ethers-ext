import { ethers as ethers_ } from 'ethers';
import type { ErrorCode, CodedEthersError, ContractEventName, DeferredTopicFilter, TopicFilter, Interface, EventFragment } from 'ethers';
export declare const ethers: typeof ethers_;
/**
 *  An error may contain additional properties, but those must not
 *  conflict with any implicit properties.
 */
export type ErrorInfo<T> = Omit<T, 'code' | 'name' | 'message' | 'shortMessage'> & {
    shortMessage?: string;
};
/**
 *  Throws an EthersError with %%message%%, %%code%% and additional error
 *  %%info%% when %%check%% is falsish..
 *
 *  @see [[api:makeError]]
 */
export declare function assert<K extends ErrorCode, T extends CodedEthersError<K>>(check: unknown, message: string, code: K, info?: ErrorInfo<T>): asserts check;
/**
 *  A simple helper to simply ensuring provided arguments match expected
 *  constraints, throwing if not.
 *
 *  In TypeScript environments, the %%check%% has been asserted true, so
 *  any further code does not need additional compile-time checks.
 */
export declare function assertArgument(check: unknown, message: string, name: string, value: unknown): asserts check;
export declare function isDeferred(value: any): value is DeferredTopicFilter;
export declare function getSubInfo(_interface: Interface, event: ContractEventName): Promise<{
    fragment: null | EventFragment;
    tag: string;
    topics: TopicFilter;
}>;
