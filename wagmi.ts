import { bsc, hardhat } from 'wagmi/chains';
import { http, createConfig } from 'wagmi';
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


// Create the Wagmi config
export const config = createConfig({
  chains: [bsc, hardhat],
  transports: {
    [bsc.id]: http(process.env.NEXT_PUBLIC_BSC_MAINNET_RPC || 'https://bsc-dataseed.binance.org'),
    [hardhat.id]: http('http://127.0.0.1:8545')
  },
  connectors,
  ssr: true,
});


// export const config = getDefaultConfig({
//   appName: 'FF-NODE',
//   projectId: 'YOUR_PROJECT_ID',
//   chains: [
//     bsc,
//     //bscTestnet,
//     // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
//   ],
//   ssr: true,
//   transports: {
//     [bsc.id]: process.env.NEXT_PUBLIC_BSC_MAINNET_RPC ? http(process.env.NEXT_PUBLIC_BSC_MAINNET_RPC) : http(),
//     // [bscTestnet.id]: http(process.env.NEXT_PUBLIC_BSC_TESTNET_RPC),
//   },

// });
