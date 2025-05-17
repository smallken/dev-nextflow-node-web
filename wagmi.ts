import { bsc } from 'wagmi/chains';
import { http, createConfig } from 'wagmi';
import { injected } from 'wagmi/connectors';

// We're not using RainbowKit's connectorsForWallets since we don't need WalletConnect
// Instead, we'll use Wagmi's injected connector directly for browser wallets

// Configure injected connector for browser wallets (MetaMask, TokenPocket, Trust, OKX)
const connectors = [injected()];


// Create the Wagmi config
export const config = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http(process.env.NEXT_PUBLIC_BSC_MAINNET_RPC || 'https://bsc-dataseed.binance.org'),
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
