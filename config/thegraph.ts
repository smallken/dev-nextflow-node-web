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

export const THEGRAPH_CONFIG = {
  API_URL: isTestnetEnabled ? API_DEV : API_PROD,
  AUTH_TOKEN: process.env.NEXT_PUBLIC_THEGRAPH_AUTH_TOKEN || '',
};

// 创建GraphQL客户端
export const graphClient = new GraphQLClient(THEGRAPH_CONFIG.API_URL, {
  headers: THEGRAPH_CONFIG.AUTH_TOKEN ? {
    Authorization: `Bearer ${THEGRAPH_CONFIG.AUTH_TOKEN}`,
  } : undefined,
});
