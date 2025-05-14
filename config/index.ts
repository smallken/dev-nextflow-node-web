
import { bscTestnet } from 'wagmi/chains'

// Export a simple map of chainId to URL string
export const scanBaseURL: Record<number, string> = {
  [bscTestnet.id]: 'https://testnet.bscscan.com'
}