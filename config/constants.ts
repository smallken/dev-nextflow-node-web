import { zeroAddress } from 'viem'
import { bsc, bscTestnet } from 'wagmi/chains'


type Address = `0x${string}`

interface ChainAddresses {
  pool: Address
  nft: Address
  priceOracle: Address
  usdt: Address
  bindSolana: Address
}

export const addresses: Record<number, ChainAddresses> = {
  [bsc.id]: {
    "pool": "0xd0FB85E347f5894904C6592D597CBFB6222226ab" as Address,
    "nft": "0x05c0d03ca1831964f1674499F05856157d762E6C" as Address,
    "priceOracle": "0x0f143cD7b7C219b271F03a35E3BB8BC80f144Fb5" as Address,
    "usdt": "0x55d398326f99059ff775485246999027b3197955" as Address,
    'bindSolana': zeroAddress // TODO update after deployment
  },

  [bscTestnet.id]: {
    "pool": "0xAf0ba19C15eb9D220960491d0c5768D5939e7D80" as Address,
    "nft": "0x446407c09B4daaDd2e69b1F6BCc88aC434abcD34" as Address,
    "priceOracle": "0x55B525b5af22a031b7ac857ea26053099C07DdeE" as Address,
    "usdt": "0x7C6F0E991D28a7355dEe193B4e5923CC7Dd78CA2" as Address,
    'bindSolana': '0x715d0c928FF80256Aa92af14D34312BD79cA0209' as Address 
  }
}


export const NODE_NFT_TOKEN_ID = BigInt(1)