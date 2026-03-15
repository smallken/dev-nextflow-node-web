import { zeroAddress } from 'viem'
import { bsc, bscTestnet } from 'wagmi/chains'


type Address = `0x${string}`

interface ChainAddresses {
  pool: Address
  usdt: Address
  token: Address
  tokenPool: Address
}

export const addresses: Record<number, ChainAddresses> = {
  [bsc.id]: {
    "pool": "0xd0FB85E347f5894904C6592D597CBFB6222226ab" as Address,
    "usdt": "0x55d398326f99059ff775485246999027b3197955" as Address,
    "token": "0x464c9503d58b37fb673C47AD056a1a0e8e70555b" as Address,
    "tokenPool": "0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90" as Address
  },

  [bscTestnet.id]: {
    "pool": "0x59fEbf632f1E22227f8daDe303438d9A4BbE0548" as Address,
    "usdt": "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd" as Address,
    "token": "0x464c9503d58b37fb673C47AD056a1a0e8e70555b" as Address,
    "tokenPool": "0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90" as Address
  }
}