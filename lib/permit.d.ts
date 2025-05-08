import type { Signature } from 'ethers';
export declare function permit(erc20: unknown, spender: string, value?: bigint, deadline?: bigint): Promise<Signature>;
