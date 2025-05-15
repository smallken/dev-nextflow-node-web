
import { bscTestnet, bsc } from 'wagmi/chains'

const TEST = process.env.NEXT_PUBLIC_IS_MAINNET_TEST ? '_test': ''

// Export a simple map of chainId to URL string
export const scanBaseURL: Record<number, string> = {
  [bscTestnet.id]: 'https://testnet.bscscan.com',
  [bsc.id]:'https://bscscan.com'
}


export const myIncomeLink : Record<string, string>={
  [bsc.id]:"",
  [bsc.id +'_test']:"https://bscscan.com/advanced-filter?txntype=2&tadd="
}

export const myNodeLink : Record<string, string>={
  [bsc.id]:"",
  [bsc.id+'_test']:"https://bscscan.com/token/0x9Eb8fC2ff97AD5B608e82307394831cc54c8DD9d?a="
}

export const myTeamNodeLink: Record<string, string>={
  [bsc.id]:"",
  [bsc.id+'_test']:"https://bscscan.com/advanced-filter?tadd=0x642C659C5e0eEAb381b25Bc0AA65AdD989838b41&mtd=0x4420e486%7eRegister"
}


export function getConfigLink(chainId: number, type: string, address: string): string {
  
  // type is the name of above functions
  if (type === 'myIncomeLink' ) {
    console.log('myIncomeLink',chainId, myIncomeLink[chainId+TEST])
    return `${myIncomeLink[chainId+TEST]}${address}`;
  } else if (type === 'myNodeLink') {
    return `${myNodeLink[chainId+TEST]}${address}`;
  } else if (type === 'myTeamNodeLink') {
    return `${myTeamNodeLink[chainId+TEST]}&fadd=${address}`;
  }

  return `${scanBaseURL[chainId] || 'https://bscscan.com'}/address/${address}`;
  
}