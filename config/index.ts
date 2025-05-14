
import { bscTestnet, bsc } from 'wagmi/chains'

// Export a simple map of chainId to URL string
export const scanBaseURL: Record<number, string> = {
  [bscTestnet.id]: 'https://testnet.bscscan.com',
  [bsc.id]:'https://bscscan.com'
}