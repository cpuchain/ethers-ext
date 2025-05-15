"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFeeHistory = formatFeeHistory;
function formatFeeHistory(result, historicalBlocks, includePending) {
    let blockNum = Number(result.oldestBlock ?? 0);
    let index = 0;
    const blocks = [];
    while (blockNum < Number(result.oldestBlock ?? 0) + historicalBlocks) {
        blocks.push({
            number: blockNum,
            gasUsedRatio: Number(result.gasUsedRatio?.[index] ?? 0),
            baseFeePerGas: BigInt(result.baseFeePerGas?.[index] ?? 0),
            priorityFeePerGas: result.reward?.[index]?.map((x) => BigInt(x)) || [],
        });
        blockNum++;
        index++;
    }
    if (includePending) {
        blocks.push({
            number: 'pending',
            gasUsedRatio: NaN,
            baseFeePerGas: BigInt(result.baseFeePerGas?.[historicalBlocks] ?? 0),
            priorityFeePerGas: [],
        });
    }
    const { baseFeePerGasAvg, priorityFeePerGasAvg } = blocks.reduce((acc, curr, index) => {
        acc.baseFeePerGasAvg += curr.baseFeePerGas;
        curr.priorityFeePerGas.forEach((gas, i) => {
            if (!acc.priorityFeePerGasAvg[i]) {
                acc.priorityFeePerGasAvg[i] = 0n;
            }
            if (gas) {
                acc.priorityFeePerGasAvg[i] += gas;
            }
        });
        if ((blocks.length = index + 1)) {
            acc.baseFeePerGasAvg = acc.baseFeePerGasAvg / BigInt(blocks.length);
            acc.priorityFeePerGasAvg = acc.priorityFeePerGasAvg.map((gas) => {
                return gas ? gas / BigInt(blocks.length) : 0n;
            });
        }
        return acc;
    }, {
        baseFeePerGasAvg: 0n,
        priorityFeePerGasAvg: [],
    });
    return {
        blocks,
        baseFeePerGasAvg,
        priorityFeePerGasAvg,
    };
}
