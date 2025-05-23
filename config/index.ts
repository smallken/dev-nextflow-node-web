
import { bscTestnet, bsc } from 'wagmi/chains'
import { addresses } from './constants'

// const TEST = process.env.NEXT_PUBLIC_IS_MAINNET_TEST ? '_test': ''

// Export a simple map of chainId to URL string
export const scanBaseURL: Record<number, string> = {
  [bsc.id]: 'https://bscscan.com'
}

export const myIncomeLink: Record<string, string> = {
  [bsc.id]: "https://bscscan.com/advanced-filter?tadd=",
}

export const myNodeLink: Record<string, string> = {
  [bsc.id]: `https://bscscan.com/token/${addresses[bsc.id].nft}?a=`,
}

export const myTeamNodeLink: Record<string, string> = {
  [bsc.id]: `https://bscscan.com/advanced-filter?tadd=${addresses[bsc.id].pool}&mtd=0x4420e486%7eRegister`,
}


export function getConfigLink(chainId: number, type: string, address: string): string {

  // type is the name of above functions
  if (type === 'myIncomeLink') {
    console.log('myIncomeLink', chainId, myIncomeLink[chainId])
    return `${myIncomeLink[chainId]}${address}`;
  } else if (type === 'myNodeLink') {
    return `${myNodeLink[chainId]}${address}`;
  } else if (type === 'myTeamNodeLink') {
    return `${myTeamNodeLink[chainId]}&fadd=${address}`;
  }

  return `${scanBaseURL[chainId] || 'https://bscscan.com'}/address/${address}`;

}