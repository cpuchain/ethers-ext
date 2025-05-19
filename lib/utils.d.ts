import { webcrypto } from 'crypto';
export declare const isNode: boolean;
export declare function createBlockTags(fromBlock: number, toBlock: number, batchSize?: number): {
    fromBlock: number;
    toBlock: number;
}[];
export declare function range(start: number, stop: number, step?: number): number[];
export declare function chunk<T>(arr: T[], size: number): T[][];
export declare function sleep(ms: number): Promise<void>;
/**
 * WebCrypto related
 */
export declare const crypto: webcrypto.Crypto;
export declare function digest(bytes: Uint8Array, algorithm?: string): Promise<Uint8Array>;
export declare function digestHex(hexStr: string, algorithm?: string): Promise<string>;
export declare function rBytes(length?: number): Uint8Array;
/**
 * Buffer and Bytes (Uint8Array)
 */
export declare function bufferToBytes(b: Buffer): Uint8Array;
export declare function concatBytes(...arrays: Uint8Array[]): Uint8Array;
export declare function hexToBytes(input: bigint | string): Uint8Array;
export declare function bytesToHex(bytes: Uint8Array): string;
export declare function toFixedHex(numberish: bigint | number | string, length?: number): string;
/**
 * Base64
 */
export declare function base64ToBytes(base64: string): Uint8Array;
export declare function bytesToBase64(bytes: Uint8Array): string;
export declare function base64ToHex(base64: string): string;
export declare function hexToBase64(hex: string): string;
