
import { bscTestnet, bsc } from 'wagmi/chains'
import dotenv from 'dotenv'

dotenv.config();

// BSCScan 基础 URL
export const scanBaseURL: Record<number, string> = {
  [bsc.id]: 'https://bscscan.com',
  [bscTestnet.id]: 'https://testnet.bscscan.com'
}

// 从环境变量读取合约地址
const addresses = {
  [bsc.id]: {
    usdt: process.env.NEXT_PUBLIC_USDT,
  },
  [bscTestnet.id]: {
    usdt: process.env.NEXT_PUBLIC_USDT,
  }
};

/**
 * USDT 收益详情链接
 * 使用BSCScan的ERC20转账筛选功能
 * 直接显示用户收到某代币的所有转账记录
 */
export const myIncomeLink: Record<number, string> = {
  // BSC 主网 - 显示用户收到的USDT转账
  [bsc.id]: `https://bscscan.com/token/${addresses[bsc.id].usdt}?a=`,
  // BSC 测试网
  [bscTestnet.id]: `https://testnet.bscscan.com/token/${addresses[bscTestnet.id].usdt}?a=`,
}

/**
 * 我的手机节点详情链接
 * 暂未实现，显示普通地址页面
 */
export const myNodeLink: Record<number, string> = {
  [bsc.id]: `${scanBaseURL[bsc.id]}/address/`,
  [bscTestnet.id]: `${scanBaseURL[bscTestnet.id]}/address/`,
}

/**
 * 获取配置链接
 * @param chainId 链ID
 * @param type 链接类型 ('myIncomeLink' | 'myNodeLink')
 * @param address 用户地址
 * @returns 完整的BSCScan URL
 */
export function getConfigLink(chainId: number, type: string, address: string): string {
  if (type === 'myIncomeLink') {
    console.log('myIncomeLink', chainId, myIncomeLink[chainId])
    // 返回 token 页面 + 用户地址，会显示该代币的转账记录
    return `${myIncomeLink[chainId]}${address}`;
  } else if (type === 'myNodeLink') {
    return `${myNodeLink[chainId]}${address}`;
  }

  return `${scanBaseURL[chainId] || 'https://bscscan.com'}/address/${address}`;
}
