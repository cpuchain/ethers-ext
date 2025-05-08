import type { TransactionRequest } from 'ethers';
import { ethers } from './ethers';
import { OpGasPriceOracle } from './typechain';

const { Transaction, parseUnits, parseEther, ZeroAddress } = ethers;

export const GAS_PRICE_ORACLE_ADDRESS = '0x420000000000000000000000000000000000000F';

// Calculate L1 submission fee for op-stack chains
export async function getL1Fee(oracle: OpGasPriceOracle, tx?: TransactionRequest): Promise<bigint> {
    const { unsignedSerialized } = Transaction.from({
        chainId: tx?.chainId || 10000n,
        data: tx?.data || '0x',
        gasLimit: tx?.gasLimit || 10_000_000,
        gasPrice: tx?.gasPrice || parseUnits('10000', 'gwei'),
        nonce: tx?.nonce || 100_000,
        to: tx?.to instanceof Promise ? ((await tx?.to) as string) : (tx?.to as string) || ZeroAddress,
        type: tx?.type || 0,
        value: tx?.value || parseEther('10000'),
    });

    return ((await oracle.getL1Fee(unsignedSerialized)) * 13n) / 10n;
}
