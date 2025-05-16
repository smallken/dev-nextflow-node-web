import { usdtAddress } from './wagmi/generated';
import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { erc20Abi } from 'viem'
import { bscTestnet, bsc } from 'wagmi/chains'
import { addresses } from './config/constants';

// load pool abi from abis
const poolAbi = require('./abis/pool.json')
const nodeNftAbi = require('./abis/nft.json')

export default defineConfig({
  out: 'wagmi/generated.ts',
  contracts: [
    {
      name: 'usdt',
      address: {
        [bsc.id]: addresses[bsc.id].usdt
      },
      abi: erc20Abi,
    },
    {
      name: 'pool',
      address: {
        [bsc.id]: addresses[bsc.id].pool

      },
      abi: poolAbi,
    },
    {
      name: 'nodeNft',
      address: {
        [bsc.id]: addresses[bsc.id].nft

      },
      abi: nodeNftAbi,
    },
  ],
  plugins: [react()],
})
