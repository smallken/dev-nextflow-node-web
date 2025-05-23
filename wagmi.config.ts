import { usdtAddress } from './wagmi/generated';
import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { erc20Abi, zeroAddress } from 'viem'
import { bscTestnet, bsc, hardhat } from 'wagmi/chains'
import { addresses } from './config/constants';
import dotenv from 'dotenv';

dotenv.config();


// load pool abi from abis
const poolAbi = require('./abis/pool.json')
const nodeNftAbi = require('./abis/nft.json')
const bindSolanaAbi = require('./abis/SolanaRegistry.json')



type Address = `0x${string}`
const localAddresses= {
  [hardhat.id]: {
    "pool": process.env.NEXT_PUBLIC_POOL as Address || zeroAddress,
    "nft": process.env.NEXT_PUBLIC_NFT as Address || zeroAddress,
    "priceOracle": process.env.NEXT_PUBLIC_PRICE_ORACLE as Address || zeroAddress,
    "usdt": process.env.NEXT_PUBLIC_USDT as Address || zeroAddress,
    'bindSolana': process.env.NEXT_PUBLIC_BIND_SOLANA as Address || zeroAddress,
  }
}

// console.log('localAddresses', localAddresses)

export default defineConfig({
  out: 'wagmi/generated.ts',
  contracts: [
    {
      name: 'usdt',
      address: {
        [bsc.id]: addresses[bsc.id].usdt,
        [bscTestnet.id]: addresses[bscTestnet.id].usdt,
        [hardhat.id]:localAddresses[hardhat.id].usdt,
      },
      abi: erc20Abi,
    },
    {
      name: 'pool',
      address: {
        [bsc.id]: addresses[bsc.id].pool,
        [bscTestnet.id]: addresses[bscTestnet.id].pool,
        [hardhat.id]:localAddresses[hardhat.id].pool,

      },
      abi: poolAbi,
    },
    {
      name: 'nodeNft',
      address: {
        [bsc.id]: addresses[bsc.id].nft,
        [bscTestnet.id]: addresses[bscTestnet.id].nft,
        [hardhat.id]:localAddresses[hardhat.id].nft,


      },
      abi: nodeNftAbi,
    },
    {
      name: 'bindSolana',
      address: {
        [bsc.id]: addresses[bsc.id].bindSolana,
        [bscTestnet.id]: addresses[bscTestnet.id].bindSolana,
        [hardhat.id]:localAddresses[hardhat.id].bindSolana
      },
      abi: bindSolanaAbi,
    },
  ],
  plugins: [react()],
})
