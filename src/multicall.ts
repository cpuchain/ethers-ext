import type { BaseContract, Interface, Overrides } from 'ethers';
import type { Overrides as typeOverrides } from './typechain/common';
import type { Multicall } from './typechain';

export const MULTICALL_ADDRESS = '0xcA11bde05977b3631167028862bE2a173976CA11';

export interface CallV3 {
    contract?: BaseContract;
    address?: string;
    interface?: Interface;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: any[];
    allowFailure?: boolean;
}

// Minimal fork of @pancakeswap/multicall
// Use this function if you need call overrides with past blocks, etc.
export async function multicall(multi: Multicall, calls: CallV3[], overrides: Overrides = {}) {
    const calldata = calls.map(({ contract, address, interface: cInterface, name, params, allowFailure }) => {
        const target = (contract?.target || address) as string;
        const _interface = (contract?.interface || cInterface) as Interface;

        return {
            target,
            callData: _interface.encodeFunctionData(name, params),
            allowFailure: allowFailure ?? false,
        };
    });

    return (await multi.aggregate3.staticCall(calldata, overrides as typeOverrides<'view'>)).map(
        ([success, data], i) => {
            const { contract, interface: cInterface, name } = calls[i];

            const _interface = (contract?.interface || cInterface) as Interface;
            const _result = success && data !== '0x' ? _interface.decodeFunctionResult(name, data) : data;
            return Array.isArray(_result) && _result.length === 1 ? _result[0] : _result;
        },
    );
}
