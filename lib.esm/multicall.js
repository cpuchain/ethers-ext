"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MULTICALL_ADDRESS = void 0;
exports.multicall = multicall;
exports.MULTICALL_ADDRESS = '0xcA11bde05977b3631167028862bE2a173976CA11';
// Minimal fork of @pancakeswap/multicall
// Use this function if you need call overrides with past blocks, etc.
async function multicall(multi, calls, overrides = {}) {
    const calldata = calls.map(({ contract, address, interface: cInterface, name, params, allowFailure }) => {
        const target = (contract?.target || address);
        const _interface = (contract?.interface || cInterface);
        return {
            target,
            callData: _interface.encodeFunctionData(name, params),
            allowFailure: allowFailure ?? false,
        };
    });
    return (await multi.aggregate3.staticCall(calldata, overrides)).map(([success, data], i) => {
        const { contract, interface: cInterface, name } = calls[i];
        const _interface = (contract?.interface || cInterface);
        const _result = success && data !== '0x' ? _interface.decodeFunctionResult(name, data) : data;
        return Array.isArray(_result) && _result.length === 1 ? _result[0] : _result;
    });
}
