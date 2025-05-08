import type { EventEmitter } from 'stream';
import type { Eip1193Provider, JsonRpcProvider, BrowserProviderOptions, Eip6963ProviderInfo } from 'ethers';
import { ethers } from './ethers';
import { type WalletOptions, JsonRpcSigner } from './signer';

const { BrowserProvider: ethBrowserProvider } = ethers;

interface Eip6963ProviderDetail {
    info: Eip6963ProviderInfo;
    provider: Eip1193Provider & EventEmitter;
}

interface Eip6963Announcement {
    type: 'eip6963:announceProvider';
    detail: Eip6963ProviderDetail;
}

export interface AddEthereumChainParams {
    chainName?: string;
    chainSymbol?: string;
    rpcUrl?: string;
    explorerUrl?: string;
}

export async function switchChain(
    chainId: bigint,
    ethereum: Eip1193Provider & { isTrust?: boolean },
    params?: AddEthereumChainParams,
) {
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${BigInt(chainId).toString(16)}` }],
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (switchError: any) {
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
        } else {
            throw switchError;
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type browserCallBack = (...args: any[]) => void;

export interface BrowserProviderOptionsExt
    extends BrowserProviderOptions,
        AddEthereumChainParams,
        WalletOptions {
    chainChanged?: browserCallBack;
    accountsChanged?: browserCallBack;
    disconnect?: browserCallBack;
}

export class BrowserProvider extends ethBrowserProvider {
    ethereum: Eip1193Provider & EventEmitter;
    appProvider?: JsonRpcProvider;
    options?: BrowserProviderOptionsExt;

    chainChanged?: browserCallBack;
    accountsChanged?: browserCallBack;
    disconnect?: browserCallBack;

    constructor(
        ethereum: Eip1193Provider & EventEmitter,
        appProvider?: JsonRpcProvider,
        options?: BrowserProviderOptionsExt,
    ) {
        super(ethereum, appProvider?._network, options);

        this.ethereum = ethereum;
        this.appProvider = appProvider;
        this.options = options;

        this.chainChanged = options?.chainChanged;
        this.accountsChanged = options?.accountsChanged;
        this.disconnect = options?.disconnect;
    }

    async getSigner(address: string): Promise<JsonRpcSigner> {
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

        return new JsonRpcSigner(this, signerAddress);
    }

    /**
     * EIP-6963 Browser Provider discovery to support multiple wallets
     *
     * https://github.com/ethers-io/ethers.js/commit/f5469dd0e0719389d51e0106ee36d07a7ebef875
     */
    static discoverProviders(
        appProvider?: JsonRpcProvider,
        options?: BrowserProviderOptionsExt,
    ): Promise<BrowserProvider[]> {
        return new Promise((resolve) => {
            const found: Eip6963ProviderDetail[] = [];

            const listener = (event: unknown) => {
                found.push((event as Eip6963Announcement).detail);
            };

            setTimeout(() => {
                const providers: BrowserProvider[] = found.map(({ info: providerInfo, provider }) => {
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
