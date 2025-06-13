
import { bscTestnet, bsc } from 'wagmi/chains'
import { addresses } from './constants'

// const TEST = process.env.NEXT_PUBLIC_IS_MAINNET_TEST ? '_test': ''

// Export a simple map of chainId to URL string
export const scanBaseURL: Record<number, string> = {
  [bsc.id]: 'https://bscscan.com'
}

export const myIncomeLink: Record<string, string> = {
  // for mainnet
  [bsc.id]: "https://bscscan.com/advanced-filtered?tkn=0x55d398326f99059ff775485246999027b3197955&txntype=2&fadd=0xd0FB85E347f5894904C6592D597CBFB6222226ab&tadd=",
}

export const myNodeLink: Record<string, string> = {
  // for mainnet
  [bsc.id]: `https://bscscan.com/advanced-filter?tkn=0x05c0d03ca1831964f1674499F05856157d762E6C&txntype=4&fadd=0x0000e39736ebcF3cba0f22E54C2bAc4CaC61f520%2c0x0000000000000000000000000000000000000000&qt=1&tadd=`,
}

export function getConfigLink(chainId: number, type: string, address: string): string {

  // type is the name of above functions
  if (type === 'myIncomeLink') {
    console.log('myIncomeLink', chainId, myIncomeLink[chainId])
    return `${myIncomeLink[chainId]}${address}`;
  } else if (type === 'myNodeLink') {
    return `${myNodeLink[chainId]}${address}`;
  } 

  return `${scanBaseURL[chainId] || 'https://bscscan.com'}/address/${address}`;

}