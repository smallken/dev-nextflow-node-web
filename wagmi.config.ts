import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { erc20Abi, zeroAddress } from 'viem'
import { bscTestnet, bsc, hardhat } from 'wagmi/chains'
import dotenv from 'dotenv';

// 优先从 .env.local 读取（本地开发），否则使用默认的 .env
dotenv.config({ path: '.env.local' });


// load pool abi from abis
const poolAbi = require('./abis/PhoneDistribution.json')
const tokenAbi = require('./abis/NextflowToken.json')
const tokenPoolAbi = require('./abis/TokenPool.json')


type Address = `0x${string}`

// 从环境变量读取合约地址
const addresses = {
  [bsc.id]: {
    "pool": process.env.NEXT_PUBLIC_PHONE_DISTRIBUTION as Address || zeroAddress,
    "usdt": process.env.NEXT_PUBLIC_USDT as Address || zeroAddress,
    "token": process.env.NEXT_PUBLIC_NEXTFLOW_TOKEN as Address || zeroAddress,
    "tokenPool": process.env.NEXT_PUBLIC_TOKEN_POOL as Address || zeroAddress,
  },
  [bscTestnet.id]: {
    "pool": process.env.NEXT_PUBLIC_PHONE_DISTRIBUTION as Address || zeroAddress,
    "usdt": process.env.NEXT_PUBLIC_USDT as Address || zeroAddress,
    "token": process.env.NEXT_PUBLIC_NEXTFLOW_TOKEN as Address || zeroAddress,
    "tokenPool": process.env.NEXT_PUBLIC_TOKEN_POOL as Address || zeroAddress,
  },
  [hardhat.id]: {
    "pool": process.env.NEXT_PUBLIC_PHONE_DISTRIBUTION as Address || zeroAddress,
    "usdt": process.env.NEXT_PUBLIC_USDT as Address || zeroAddress,
    "token": process.env.NEXT_PUBLIC_NEXTFLOW_TOKEN as Address || zeroAddress,
    "tokenPool": process.env.NEXT_PUBLIC_TOKEN_POOL as Address || zeroAddress,
  }
};

export default defineConfig({
  out: 'wagmi/generated.ts',
  contracts: [
    {
      name: 'usdt',
      address: {
        [bsc.id]: addresses[bsc.id].usdt,
        [bscTestnet.id]: addresses[bscTestnet.id].usdt,
        [hardhat.id]: addresses[hardhat.id].usdt,
      },
      abi: erc20Abi,
    },
    {
      name: 'pool',
      address: {
        [bsc.id]: addresses[bsc.id].pool,
        [bscTestnet.id]: addresses[bscTestnet.id].pool,
        [hardhat.id]: addresses[hardhat.id].pool,
      },
      abi: poolAbi,
    },
    {
      name: 'token',
      address: {
        [bsc.id]: addresses[bsc.id].token,
        [bscTestnet.id]: addresses[bscTestnet.id].token,
        [hardhat.id]: addresses[hardhat.id].token,
      },
      abi: tokenAbi,
    },
    {
      name: 'tokenPool',
      address: {
        [bsc.id]: addresses[bsc.id].tokenPool,
        [bscTestnet.id]: addresses[bscTestnet.id].tokenPool,
        [hardhat.id]: addresses[hardhat.id].tokenPool,
      },
      abi: tokenPoolAbi,
    },
  ],
  plugins: [react()],
})
