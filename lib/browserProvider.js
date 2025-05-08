"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserProvider = void 0;
exports.switchChain = switchChain;
const ethers_1 = require("./ethers");
const signer_1 = require("./signer");
const { BrowserProvider: ethBrowserProvider } = ethers_1.ethers;
async function switchChain(chainId, ethereum, params) {
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${BigInt(chainId).toString(16)}` }],
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (switchError) {
        // Trust wallet error is localized string so can't catch them
        if (switchError.code === 4902 || ethereum.isTrust) {
            await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: `0x${BigInt(chainId).toString(16)}`,
                        chainName: params?.chainName || 'Ethereum',
                        nativeCurrency: {
                            name: params?.chainName || 'Ethereum',
                            symbol: params?.chainSymbol || 'ETH',
                            decimals: 18,
                        },
                        rpcUrls: params?.rpcUrl ? [params.rpcUrl] : [],
                        blockExplorerUrls: [params?.explorerUrl || 'https://etherscan.io'],
                    },
                ],
            });
        }
        else {
            throw switchError;
        }
    }
}
class BrowserProvider extends ethBrowserProvider {
    ethereum;
    appProvider;
    options;
    chainChanged;
    accountsChanged;
    disconnect;
    constructor(ethereum, appProvider, options) {
        super(ethereum, appProvider?._network, options);
        this.ethereum = ethereum;
        this.appProvider = appProvider;
        this.options = options;
        this.chainChanged = options?.chainChanged;
        this.accountsChanged = options?.accountsChanged;
        this.disconnect = options?.disconnect;
    }
    async getSigner(address) {
        const [{ address: signerAddress }, signerChainId] = await Promise.all([
            super.getSigner(address),
            super.send('eth_chainId', []).then((c) => BigInt(c)),
        ]);
        const appChainId = this.appProvider?._network.chainId;
        if (appChainId && signerChainId !== appChainId) {
            await switchChain(appChainId, this.ethereum, this.options);
        }
        if (this.chainChanged) {
            this.ethereum.on('chainChanged', this.chainChanged);
        }
        if (this.accountsChanged) {
            this.ethereum.on('accountsChanged', this.accountsChanged);
        }
        if (this.disconnect) {
            this.ethereum.on('disconnect', this.disconnect);
        }
        return new signer_1.JsonRpcSigner(this, signerAddress);
    }
    /**
     * EIP-6963 Browser Provider discovery to support multiple wallets
     *
     * https://github.com/ethers-io/ethers.js/commit/f5469dd0e0719389d51e0106ee36d07a7ebef875
     */
    static discoverProviders(appProvider, options) {
        return new Promise((resolve) => {
            const found = [];
            const listener = (event) => {
                found.push(event.detail);
            };
            setTimeout(() => {
                const providers = found.map(({ info: providerInfo, provider }) => {
                    return new BrowserProvider(provider, appProvider, {
                        ...options,
                        providerInfo,
                    });
                });
                window?.removeEventListener('eip6963:announceProvider', listener);
                resolve(providers);
                // Default to 300ms
            }, 300);
            window?.addEventListener('eip6963:announceProvider', listener);
            window?.dispatchEvent(new Event('eip6963:requestProvider'));
        });
    }
}
exports.BrowserProvider = BrowserProvider;
