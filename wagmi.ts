import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  bsc,
  bscTestnet,
} from 'wagmi/chains';
import { http } from 'wagmi'

console.log('env', process.env.NEXT_PUBLIC_BSC_TESTNET_RPC)


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
    [bsc.id]: http(),
    [bscTestnet.id]: http(process.env.NEXT_PUBLIC_BSC_TESTNET_RPC),
  },
});
