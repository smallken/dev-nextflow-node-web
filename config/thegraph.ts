import { GraphQLClient } from 'graphql-request';

/**
 * TheGraph 配置
 *
 * 获取你的Subgraph部署信息：
 * 1. 登录 https://thegraph.com/studio
 * 2. 找到你的 nextflow-subgraph 部署
 * 3. 复制 API URL 到 .env.local 文件
 *
 * 环境变量配置（.env.local）：
 * NEXT_PUBLIC_THEGRAPH_DEV_API_URL - 测试网 API URL
 * NEXT_PUBLIC_THEGRAPH_PROD_API_URL - 主网 API URL
 * NEXT_PUBLIC_THEGRAPH_AUTH_TOKEN - 认证密钥（如果需要）
 * NEXT_PUBLIC_ENABLE_TESTNETS - 是否启用测试网模式
 */

const isTestnetEnabled = process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true';

// 从环境变量读取 API URL
const API_DEV = process.env.NEXT_PUBLIC_THEGRAPH_DEV_API_URL || '';
const API_PROD = process.env.NEXT_PUBLIC_THEGRAPH_PROD_API_URL || '';

// 调试：打印环境变量（帮助诊断Vercel部署问题）
if (typeof window !== 'undefined') {
  console.log('=== TheGraph Config Debug ===');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('isTestnetEnabled:', isTestnetEnabled);
  console.log('NEXT_PUBLIC_ENABLE_TESTNETS:', process.env.NEXT_PUBLIC_ENABLE_TESTNETS);
  console.log('NEXT_PUBLIC_THEGRAPH_DEV_API_URL:', process.env.NEXT_PUBLIC_THEGRAPH_DEV_API_URL);
  console.log('NEXT_PUBLIC_THEGRAPH_PROD_API_URL:', process.env.NEXT_PUBLIC_THEGRAPH_PROD_API_URL);
  console.log('API_DEV:', API_DEV);
  console.log('API_PROD:', API_PROD);
}

const API_URL = isTestnetEnabled ? API_DEV : API_PROD;

// 验证URL
if (!API_URL || API_URL === '') {
  console.error('❌ TheGraph API URL is not configured!');
  console.error('Please set NEXT_PUBLIC_THEGRAPH_PROD_API_URL environment variable in Vercel');
  console.error('Current value:', API_URL);
} else {
  console.log('✅ TheGraph API URL configured:', API_URL);
}

export const THEGRAPH_CONFIG = {
  API_URL: API_URL,
  AUTH_TOKEN: process.env.NEXT_PUBLIC_THEGRAPH_AUTH_TOKEN || '',
};

// 创建GraphQL客户端
export const graphClient = new GraphQLClient(THEGRAPH_CONFIG.API_URL, {
  headers: THEGRAPH_CONFIG.AUTH_TOKEN ? {
    Authorization: `Bearer ${THEGRAPH_CONFIG.AUTH_TOKEN}`,
  } : undefined,
});
