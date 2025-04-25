import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { erc20Abi } from 'viem'
import { bscTestnet } from 'wagmi/chains'

// load pool abi from abis
const poolAbi = require('./abis/pool.json')
const nodeNftAbi = require('./abis/nodeNft.json')

export default defineConfig({
  out: 'wagmi/generated.ts',
  contracts: [
    {
      name: 'usdt',
      address: {
        [bscTestnet.id]: '0x17512c164A86790c0b5a6ae9e2913208765164FB',
      },
      abi: erc20Abi,
    },
    {
      name: 'pool',
      address: {
        [bscTestnet.id]: '0x23e248Eb5417cDc60a67Aa546796559f9f05F447',
      },
      abi: poolAbi,
    },
    {
      name: 'nodeNft',
      address: {
        [bscTestnet.id]: '0x52925A66dc75fb7dA96F8468aA7476F10D80fB91',
      },
      abi: nodeNftAbi,
    },
  ],
  plugins: [react()],
})
