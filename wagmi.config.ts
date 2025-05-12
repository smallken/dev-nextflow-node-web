import { usdtAddress } from './wagmi/generated';
import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { erc20Abi } from 'viem'
import { bscTestnet } from 'wagmi/chains'

// load pool abi from abis
const poolAbi = require('./abis/pool.json')
const nodeNftAbi = require('./abis/nft.json')

export default defineConfig({
  out: 'wagmi/generated.ts',
  contracts: [
    {
      name: 'usdt',
      address: {
        [bscTestnet.id]: '0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0',
      },
      abi: erc20Abi,
    },
    {
      name: 'pool',
      address: {
        [bscTestnet.id]: '0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9',
      },
      abi: poolAbi,
    },
    {
      name: 'nodeNft',
      address: {
        [bscTestnet.id]: '0xA2c14F04A79535600F68d1E682C0215b027E56d9',
      },
      abi: nodeNftAbi,
    },
  ],
  plugins: [react()],
})
