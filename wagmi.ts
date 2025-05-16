import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  bsc,
  bscTestnet,
} from 'wagmi/chains';
import { http } from 'wagmi'

export const config = getDefaultConfig({
  appName: 'FF-NODE',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    bsc,
    //bscTestnet,
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
  transports: {
    [bsc.id]: process.env.NEXT_PUBLIC_BSC_MAINNET_RPC ? http(process.env.NEXT_PUBLIC_BSC_MAINNET_RPC) : http(),
    // [bscTestnet.id]: http(process.env.NEXT_PUBLIC_BSC_TESTNET_RPC),
  },
});
