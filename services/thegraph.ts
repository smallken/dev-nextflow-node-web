import { GraphQLClient, gql } from 'graphql-request';
import { THEGRAPH_CONFIG } from '../config/thegraph';

// Create GraphQL client with API key in Authorization header
export const graphClient = new GraphQLClient(THEGRAPH_CONFIG.API_URL, {
  headers: {
    Authorization: `Bearer ${THEGRAPH_CONFIG.AUTH_TOKEN}`,
  },
});

/**
 * User 类型定义 - 来自 TheGraph Subgraph
 * 根据你的 nextflow-subgraph schema 定义
 */
export interface User {
  id: string;
  referrer?: User | null;
  referrals: User[]; // 直接推荐人，每个User的referrals包含其直接推荐人
  referralLevel: number;
  salesCount: string; // bigint转字符串
  teamSalesCount: string; // bigint转字符串
  usdtIncome: string; // bigint转字符串
  tokenIncome: string; // bigint转字符串
  totalVested: string;
  totalClaimed: string;
  childrenAmountTotal: number;
  childrenAmountIn10Levels: number;
  teamMemberCount: number;
  registrationTime: string;
}

/**
 * 用户详情类型（用于弹窗显示）
 */
export interface UserDetail {
  address: string;
  level: number;
  nodeCount: string;
  directReferrals: number;
  teamNodesCount: number;
  income: string;
}

// Query to get user data with direct referrals (for "我的推荐" page)
export const GET_USER_WITH_REFERRALS = gql`
  query GetUserWithReferrals($userId: String!) {
    user(id: $userId) {
      id
      referrer {
        id
      }
      referrals {
        id
        referralLevel
        salesCount
        teamSalesCount
        usdtIncome
        tokenIncome
        childrenAmountIn10Levels
        registrationTime
      }
    }
  }
`;

// Query to get user with full team tree (for "团队业绩" page)
export const GET_USER_WITH_TEAM = gql`
  query GetUserWithTeam($userId: String!) {
    user(id: $userId) {
      id
      referralLevel
      salesCount
      teamSalesCount
      usdtIncome
      tokenIncome
      childrenAmountTotal
      childrenAmountIn10Levels
      teamMemberCount
      referrer {
        id
      }
      referrals {
        id
        referralLevel
        salesCount
        teamSalesCount
        usdtIncome
        tokenIncome
        childrenAmountIn10Levels
        referrer {
          id
        }
        # 包含referrals的referrals，用于判断是否有子节点
        referrals {
          id
          salesCount
          teamSalesCount
          referralLevel
        }
      }
    }
  }
`;

/**
 * 获取用户及其直接推荐人
 * 用于"我的推荐"页面
 */
export async function getUserWithReferrals(address: string): Promise<User | null> {
  try {
    const response = await graphClient.request<{
      user: User | null;
    }>(GET_USER_WITH_REFERRALS, {
      userId: address.toLowerCase(),
    });
    return response.user;
  } catch (error) {
    console.error('Error fetching user with referrals:', error);
    return null;
  }
}

/**
 * 获取用户及其完整团队数据
 * 用于"团队业绩"页面
 */
export async function getUserWithTeam(address: string): Promise<User | null> {
  try {
    const response = await graphClient.request<{
      user: User | null;
    }>(GET_USER_WITH_TEAM, {
      userId: address.toLowerCase(),
    });
    return response.user;
  } catch (error) {
    console.error('Error fetching user with team:', error);
    return null;
  }
}

/**
 * 从URL参数获取地址
 * 支持通过 ?address=xxx 查看任意用户的数据
 */
export function getAddressFromUrl(): string | null {
  if (typeof window === 'undefined') return null;

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('address');
}

/**
 * 转换用户数据为用户详情格式
 * 用于弹窗显示
 */
export function transformUserToDetail(user: User): UserDetail {
  // 根据团队业绩计算等级
  const level = calculateLevelByTeamSales(Number(user.teamSalesCount));

  return {
    address: user.id,
    level: level,
    nodeCount: user.salesCount,
    directReferrals: user.referrals?.length || 0,
    teamNodesCount: Number(user.teamSalesCount),
    income: user.usdtIncome,
  };
}

/**
 * 根据团队业绩计算等级
 * 与合约中的等级规则保持一致
 */
function calculateLevelByTeamSales(teamSales: number): number {
  if (teamSales >= 300) return 5;
  if (teamSales >= 100) return 4;
  if (teamSales >= 30) return 3;
  if (teamSales >= 10) return 2;
  return 1;
}

/**
 * 兼容旧版本的函数名
 */
export async function getUserWithFriends(address: string): Promise<User | null> {
  return getUserWithReferrals(address);
}
