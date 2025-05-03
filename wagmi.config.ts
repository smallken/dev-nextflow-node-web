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
        [bscTestnet.id]: '0x17512c164A86790c0b5a6ae9e2913208765164FB',
      },
      abi: erc20Abi,
    },
    {
      name: 'pool',
      address: {
        [bscTestnet.id]: '0x3A7dd71d898beC321A51961CAbB483E28B10e0E6',
      },
      abi: poolAbi,
    },
    {
      name: 'nodeNft',
      address: {
        [bscTestnet.id]: '0x76304F2547aA59954F2d5d479936B073aBCcDB8d',
      },
      abi: nodeNftAbi,
    },
  ],
  plugins: [react()],
})
