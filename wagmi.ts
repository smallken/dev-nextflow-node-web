import { http, webSocket, createConfig, createStorage } from 'wagmi';
import { bsc, hardhat, bscTestnet, type Chain } from 'wagmi/chains';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  trustWallet,
  okxWallet,
  injectedWallet,
  tokenPocketWallet
} from '@rainbow-me/rainbowkit/wallets';

// 创建存储，仅在客户端使用 localStorage
const storage = typeof window !== 'undefined'
  ? createStorage({
      storage: window.localStorage,
    })
  : undefined;

// We don't need a real projectId since we're not using WalletConnect
const dummyProjectId = '0';

// Configure recommended wallets: MetaMask, TokenPocket, Trust, and OKX
// For RainbowKit v2, configure MetaMask with proper mobile support
const walletList = [
  {
    groupName: 'Recommended',
    wallets: [
      // MetaMask with mobile-friendly configuration
      () => metaMaskWallet({ projectId: dummyProjectId }),
      // TokenPocket - good mobile support
      () => tokenPocketWallet({ projectId: dummyProjectId }),
      // Trust Wallet - good mobile support
      () => trustWallet({ projectId: dummyProjectId }),
    ]
  },
  {
    groupName: 'Other',
    wallets: [
      // OKX Wallet
      () => okxWallet({ projectId: dummyProjectId }),
      // Generic injected wallet for other browser extensions (desktop only)
      // Note: injectedWallet won't work on mobile since there's no injection context
      injectedWallet,
    ]
  }
];

// Create the connectors with our wallet list
const connectors = connectorsForWallets(walletList, {
  projectId: dummyProjectId,
  appName: 'NextFlow Node'
});

// Define chains with proper tuple typing for Wagmi v2
const mainnetChains = [bsc] as const satisfies readonly [Chain, ...Chain[]];
const testnetChains = [bsc, bscTestnet, hardhat] as const satisfies readonly [Chain, ...Chain[]];

// Function to check if testnet is enabled via URL parameter
function isTestnetEnabledByUrl(): boolean {
  // Only run in browser environment
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('__test__') === '1';
  }
  return false;
}

// Select appropriate chains based on environment or URL parameter
const isTestnetEnabled = process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' || isTestnetEnabledByUrl();
const chains = isTestnetEnabled ? testnetChains : mainnetChains;

// Create the Wagmi config
export const config = createConfig({
  chains,
  transports: {
    [bsc.id]: webSocket(process.env.NEXT_PUBLIC_BSC_MAINNET_WSS || 'wss://bsc-ws-node.nariox.org'),
    [bscTestnet.id]: http(process.env.NEXT_PUBLIC_BSC_TESTNET_RPC || 'https://bsc-testnet-dataseed.bnbchain.org'),
    [hardhat.id]: http('http://127.0.0.1:8545')
  },
  connectors,
  storage,
});
