import { http, createConfig } from 'wagmi';
import { bsc, hardhat, type Chain } from 'wagmi/chains';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { 
  metaMaskWallet,
  trustWallet,
  okxWallet,
  injectedWallet,
  tokenPocketWallet
} from '@rainbow-me/rainbowkit/wallets';

// We don't need a real projectId since we're not using WalletConnect
const dummyProjectId = '0';

// Configure recommended wallets: MetaMask, TokenPocket, Trust, and OKX
// For RainbowKit v2, we call the wallets with an options object
const walletList = [
  {
    groupName: 'Recommended',
    wallets: [
      // These are wallet connector factories that return a wallet connector function
      metaMaskWallet,
      tokenPocketWallet, 
      injectedWallet
    ]
  },
  {
    groupName: 'Other',
    wallets: [
      trustWallet,
      okxWallet
      // Include the generic injected wallet for any other browser wallets
     
    ]
  }
];

// Create the connectors with our wallet list
const connectors = connectorsForWallets(walletList, {
  projectId: dummyProjectId,
  appName: 'FlipFlop Never Node'
});

// Define chains with proper tuple typing for Wagmi v2
const mainnetChains = [bsc] as const satisfies readonly [Chain, ...Chain[]];
const testnetChains = [bsc, hardhat] as const satisfies readonly [Chain, ...Chain[]];

// Select appropriate chains based on environment
const chains = process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? testnetChains : mainnetChains;

// Create the Wagmi config
export const config = createConfig({
  chains,
  transports: {
    [bsc.id]: http(process.env.NEXT_PUBLIC_BSC_MAINNET_RPC || 'https://bsc-dataseed.binance.org'),
    [hardhat.id]: http('http://127.0.0.1:8545')
  },
  connectors,
  ssr: true,
});
