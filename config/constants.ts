import { bsc } from 'wagmi/chains'

type Address = `0x${string}`

interface ChainAddresses {
  pool: Address
  nft: Address
  priceOracle: Address
  usdt: Address
}

export const addresses: Record<number, ChainAddresses> = {
  [bsc.id]: {
    "pool": "0xd0FB85E347f5894904C6592D597CBFB6222226ab" as Address,
    "nft": "0x05c0d03ca1831964f1674499F05856157d762E6C" as Address,
    "priceOracle": "0x0f143cD7b7C219b271F03a35E3BB8BC80f144Fb5" as Address,
    "usdt": "0x55d398326f99059ff775485246999027b3197955" as Address
  }
}