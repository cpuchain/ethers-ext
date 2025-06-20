"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crypto = exports.isNode = void 0;
exports.createBlockTags = createBlockTags;
exports.range = range;
exports.chunk = chunk;
exports.sleep = sleep;
exports.digest = digest;
exports.digestHex = digestHex;
exports.rBytes = rBytes;
exports.bufferToBytes = bufferToBytes;
exports.concatBytes = concatBytes;
exports.hexToBytes = hexToBytes;
exports.bytesToHex = bytesToHex;
exports.toFixedHex = toFixedHex;
exports.base64ToBytes = base64ToBytes;
exports.bytesToBase64 = bytesToBase64;
exports.base64ToHex = base64ToHex;
exports.hexToBase64 = hexToBase64;
exports.isHex = isHex;
const crypto_1 = require("crypto");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (!BigInt.prototype.toJSON) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.isNode = !process?.browser && typeof globalThis.window === 'undefined';
// Create range for syncing blocks
function createBlockTags(fromBlock, toBlock, batchSize = 1000) {
    const batches = [];
    if (toBlock - fromBlock > batchSize) {
        for (let i = fromBlock; i < toBlock + 1; i += batchSize) {
            const j = i + batchSize - 1 > toBlock ? toBlock : i + batchSize - 1;
            batches.push({ fromBlock: i, toBlock: j });
        }
    }
    else if (toBlock - fromBlock >= 0) {
        batches.push({ fromBlock, toBlock });
    }
    else {
        throw new Error(`Invalid block range ${fromBlock}~${toBlock}`);
    }
    return batches;
}
// Create range of numbers (Useful to create an arbitary blockTags)
function range(start, stop, step = 1) {
    return Array(Math.ceil((stop - start) / step) + 1)
        .fill(start)
        .map((x, y) => x + y * step);
}
// Split array to chunk of arrays
function chunk(arr, size) {
    return [...Array(Math.ceil(arr.length / size))].map((_, i) => arr.slice(size * i, size + size * i));
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * WebCrypto related
 */
exports.crypto = exports.isNode ? crypto_1.webcrypto : globalThis.crypto;
async function digest(bytes, algorithm = 'SHA-256') {
    return new Uint8Array(await exports.crypto.subtle.digest(algorithm, bytes));
}
async function digestHex(hexStr, algorithm = 'SHA-256') {
    return bytesToHex(await digest(hexToBytes(hexStr), algorithm));
}
function rBytes(length = 32) {
    return exports.crypto.getRandomValues(new Uint8Array(length));
}
/**
 * Buffer and Bytes (Uint8Array)
 */
function bufferToBytes(b) {
    return new Uint8Array(b.buffer);
}
function concatBytes(...arrays) {
    const totalSize = arrays.reduce((acc, e) => acc + e.length, 0);
    const merged = new Uint8Array(totalSize);
    arrays.forEach((array, i, arrays) => {
        const offset = arrays.slice(0, i).reduce((acc, e) => acc + e.length, 0);
        merged.set(array, offset);
    });
    return merged;
}
function hexToBytes(input) {
    let hex = typeof input === 'bigint' ? input.toString(16) : input;
    if (hex.startsWith('0x')) {
        hex = hex.slice(2);
    }
    if (hex.length % 2 !== 0) {
        hex = '0' + hex;
    }
    return Uint8Array.from(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
}
function bytesToHex(bytes) {
    return ('0x' +
        Array.from(bytes)
            .map((b) => b.toString(16).padStart(2, '0'))
            .join(''));
}
function toFixedHex(numberish, length = 32) {
    return ('0x' +
        BigInt(numberish)
            .toString(16)
            .padStart(length * 2, '0'));
}
/**
 * Base64
 */
function base64ToBytes(base64) {
    return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}
function bytesToBase64(bytes) {
    return btoa(bytes.reduce((data, byte) => data + String.fromCharCode(byte), ''));
}
function base64ToHex(base64) {
    return bytesToHex(base64ToBytes(base64));
}
function hexToBase64(hex) {
    return bytesToBase64(hexToBytes(hex));
}
function isHex(value) {
    return /^0x[0-9a-fA-F]*$/.test(value);
}
