import type { Provider, Signer, Signature } from 'ethers';
import { ethers } from './ethers';
import type { ERC20 } from './typechain';

const { Signature: ethSignature, MaxUint256 } = ethers;

export async function permit(
    erc20: unknown,
    spender: string,
    value: bigint = MaxUint256,
    deadline: bigint = MaxUint256,
): Promise<Signature> {
    const token = erc20 as ERC20;
    const signer = token.runner as Signer & { address: string };

    const [name, nonce, { chainId }] = await Promise.all([
        token.name(),
        token.nonces(signer.address),
        (signer.provider as Provider).getNetwork(),
    ]);

    return ethSignature.from(
        await signer.signTypedData(
            {
                name,
                version: '1',
                chainId,
                verifyingContract: token.target as string,
            },
            {
                Permit: [
                    { name: 'owner', type: 'address' },
                    { name: 'spender', type: 'address' },
                    { name: 'value', type: 'uint256' },
                    { name: 'nonce', type: 'uint256' },
                    { name: 'deadline', type: 'uint256' },
                ],
            },
            {
                owner: signer.address,
                spender,
                value,
                nonce,
                deadline,
            },
        ),
    );
}
