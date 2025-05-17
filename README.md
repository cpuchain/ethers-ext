# ethers-ext

Common functions used with ethers.js / idb / webcrypto

### Features

- Various functions and classes extending utility of ethers.js

- Inherited classes ( Provider, Signer ) to address multiple known issues of ethers.js

- Provider (JsonRpcProvider) returns FeeData from node as-is without multiplication for various usage

- FeeData optimized for BNB Chain & Polygon network, it fixes buggy behavior of what ethers.js provider does by default

- Static network by default with network validation without any additional functions, just use the class provision as-is

- [Multicall provider](https://github.com/ethers-io/ext-provider-multicall) inherited and enabled by default.

- Contract calls are aggregated to multicall if they don't specify any additional override params ( like blocktags, only the latest block call will be aggregated )

- Helpful batching class to fetch historic data ( like logs ) at the maximum speed

### TO-DO

- [] Test cases

- [] Test EIP-7702

- [] Example blockchain indexer

- [] ENS support for alternative chains? ( Like BNB Chain / Base for example )

- [] Port for Viem

- [] Network that checks if common contracts (Multicall, OpGasPriceOracle) exists

### Quick Start

```ts
import { Provider, VoidSigner } from 'ethers-ext';

async function main() {
    const provider = new Provider('https://rpc.mevblocker.io', undefined, {
        chainId: 1,
    });

    // VoidSigner can't sign but useful to populate transaction objects btw
    const signer = new VoidSigner((await provider.resolveName('vitalik.eth') as string), provider);

    console.log(await signer.populateTransaction({ to: signer.address, value: 0n }));
}
main();
```

### Examples

- [Web Wallet](https://github.com/cpuchain/cpuchain-wallet) - Open source browser side web wallet
