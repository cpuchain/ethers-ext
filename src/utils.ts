import { webcrypto } from 'crypto';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (!(BigInt.prototype as any).toJSON) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (BigInt.prototype as any).toJSON = function () {
        return this.toString();
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNode = !(process as any)?.browser && typeof (globalThis as any).window === 'undefined';

// Create range of numbers (Useful to create an arbitary blockTags)
export function range(start: number, stop: number, step = 1): number[] {
    return Array(Math.ceil((stop - start) / step) + 1)
        .fill(start)
        .map((x, y) => x + y * step);
}

// Split array to chunk of arrays
export function chunk<T>(arr: T[], size: number): T[][] {
    return [...Array(Math.ceil(arr.length / size))].map((_, i) => arr.slice(size * i, size + size * i));
}

export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * WebCrypto related
 */
export const crypto = isNode ? webcrypto : (globalThis.crypto as typeof webcrypto);

export async function digest(bytes: Uint8Array, algorithm = 'SHA-256'): Promise<Uint8Array> {
    return new Uint8Array(await crypto.subtle.digest(algorithm, bytes));
}

export async function digestHex(hexStr: string, algorithm = 'SHA-256'): Promise<string> {
    return bytesToHex(await digest(hexToBytes(hexStr), algorithm));
}

export function rBytes(length = 32): Uint8Array {
    return crypto.getRandomValues(new Uint8Array(length));
}

/**
 * Buffer and Bytes (Uint8Array)
 */
export function bufferToBytes(b: Buffer): Uint8Array {
    return new Uint8Array(b.buffer);
}

export function concatBytes(...arrays: Uint8Array[]): Uint8Array {
    const totalSize = arrays.reduce((acc, e) => acc + e.length, 0);
    const merged = new Uint8Array(totalSize);

    arrays.forEach((array, i, arrays) => {
        const offset = arrays.slice(0, i).reduce((acc, e) => acc + e.length, 0);
        merged.set(array, offset);
    });

    return merged;
}

export function hexToBytes(input: bigint | string): Uint8Array {
    let hex: string = typeof input === 'bigint' ? input.toString(16) : input;
    if (hex.startsWith('0x')) {
        hex = hex.slice(2);
    }
    if (hex.length % 2 !== 0) {
        hex = '0' + hex;
    }
    return Uint8Array.from((hex.match(/.{1,2}/g) as string[]).map((byte) => parseInt(byte, 16)));
}

export function bytesToHex(bytes: Uint8Array): string {
    return (
        '0x' +
        Array.from(bytes)
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('')
    );
}

export function toFixedHex(numberish: bigint | number | string, length = 32): string {
    return (
        '0x' +
        BigInt(numberish)
            .toString(16)
            .padStart(length * 2, '0')
    );
}

/**
 * Base64
 */
export function base64ToBytes(base64: string): Uint8Array {
    return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

export function bytesToBase64(bytes: Uint8Array): string {
    return btoa(bytes.reduce((data, byte) => data + String.fromCharCode(byte), ''));
}

export function base64ToHex(base64: string): string {
    return bytesToHex(base64ToBytes(base64));
}

export function hexToBase64(hex: string): string {
    return bytesToBase64(hexToBytes(hex));
}
