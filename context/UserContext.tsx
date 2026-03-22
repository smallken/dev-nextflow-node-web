import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { formatEther } from 'viem';
import {
  useReadPoolGetUserInfo, useReadPoolUsdtPrice,
  useReadUsdtBalanceOf, useReadUsdtAllowance, poolAddress,
  useReadPoolGetActiveBatch, useReadPoolGetBatch,
} from '../wagmi/generated';

/**
 * 根据个人销售数量计算用户等级
 * @param salesCount 个人销售数量（手机数量）
 * @returns 等级 0-7
 * Tier 0: 0 sales → 0%
 * Tier 1: 1-5 sales → 10%
 * Tier 2: 6-20 sales → 12%
 * Tier 3: 21-50 sales → 14%
 * Tier 4: 51-100 sales → 16%
 * Tier 5: 101-150 sales → 18%
 * Tier 6: 151-200 sales → 20%
 * Tier 7: 201+ sales → 22%
 */
function calculateLevelBySales(salesCount: number): number {
  if (salesCount >= 201) return 7;
  if (salesCount >= 151) return 6;
  if (salesCount >= 101) return 5;
  if (salesCount >= 51) return 4;
  if (salesCount >= 21) return 3;
  if (salesCount >= 6) return 2;
  if (salesCount >= 1) return 1;
  return 0;
}

/**
 * 根据团队业绩计算用户等级（旧版兼容）
 * @param teamSales 团队业绩（手机数量）
 * @returns 等级 0-7
 */
function calculateLevelByTeamSales(teamSales: number): number {
  if (teamSales >= 201) return 7;
  if (teamSales >= 151) return 6;
  if (teamSales >= 101) return 5;
  if (teamSales >= 51) return 4;
  if (teamSales >= 21) return 3;
  if (teamSales >= 6) return 2;
  if (teamSales >= 1) return 1;
  return 0;
}

/**
 * 根据 USDT 佣金费率映射到等级
 * @param commissionRate USDT 佣金费率（百分比，如 12 表示 12%）
 * @returns 等级 0-7
 * 0% → Tier 0
 * 10% → Tier 1
 * 12% → Tier 2
 * 14% → Tier 3
 * 16% → Tier 4
 * 18% → Tier 5
 * 20% → Tier 6
 * 22% → Tier 7
 */
function calculateLevelByCommissionRate(commissionRate: number): number {
  if (commissionRate >= 22) return 7;
  if (commissionRate >= 20) return 6;
  if (commissionRate >= 18) return 5;
  if (commissionRate >= 16) return 4;
  if (commissionRate >= 14) return 3;
  if (commissionRate >= 12) return 2;
  if (commissionRate >= 10) return 1;
  return 0;
}


// 定义全局应用信息类型
type AppInfo = {
  price: bigint; // 手机价格（以 USDT 为单位，从合约 usdtPrice() 获取）

  // 批次信息
  activeBatchIndex: number; // 当前活跃批次索引
  batchTotalStock: number; // 批次总库存
  batchRemainingStock: number; // 批次剩余库存
  batchSoldCount: number; // 批次已售数量

  isNftMintComplete: boolean; // NFT铸造是否完成（用于禁用购买按钮）
};

// 定义合约用户信息类型（简化版，只包含 getUserInfo 返回的必要字段）
type ContractUserInfo = {
  salesCount: number,       // 已购买手机数
  teamSalesCount: number,   // 我的团队
  usdtIncome: bigint,       // 收益
  downlineCount: number,    // 我的推荐
  level: number,            // 用户等级（基于 usdtCommissionRate）
  upline: string,           // 推荐人（从 getUserInfo 获取）
};

// 用户上下文类型
type UserContextType = {
  appInfo: AppInfo | null;
  setAppInfo: (info: AppInfo) => void;
  address: `0x${string}` | undefined;
  contractUserInfo: ContractUserInfo | null;
  // 可以添加其他用户相关状态
  usdtBalance: bigint,
  usdtAllowanceForPool: bigint,
  // Method to refresh data after transactions
  refreshData: () => void,
  // Loading and error states for blockchain data
  isLoadingBlockchainData: boolean,
  hasBlockchainError: boolean,
};

// 创建上下文
const UserContext = createContext<UserContextType | undefined>(undefined);

// 上下文提供者组件
export function UserProvider({ children }: { children: ReactNode }) {
  const { address } = useAccount();
  const chainId = useChainId();
  const isDev = process.env.NODE_ENV !== 'production';

  // 初始化应用全局数据状态
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [contractUserInfo, setContractUserInfo] = useState<ContractUserInfo | null>(null);

  // 使用 useReadPoolGetUserInfo 从合约获取用户信息
  const { data: userData, isError, isLoading, refetch: refetchUserData } = useReadPoolGetUserInfo({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

  // 使用 useReadPoolUsdtPrice 获取手机价格（以 USDT 为单位）
  const { data: phonePrice, refetch: refetchPhonePrice, isError: isPriceError, isLoading: isPriceLoading } = useReadPoolUsdtPrice();

  // 获取活跃批次信息
  const { data: activeBatchData, refetch: refetchActiveBatch, isError: isActiveBatchError, isLoading: isActiveBatchLoading } = useReadPoolGetActiveBatch();

  // 当 getActiveBatch 失败时（售罄情况），回退到批次 0
  const fallbackBatchIndex = isActiveBatchError && !isActiveBatchLoading ? BigInt(0) : undefined;
  const batchIndexToQuery = activeBatchData ? activeBatchData[0] : fallbackBatchIndex;

  // 获取批次详情（获取 totalStock）
  const { data: batchDetails, refetch: refetchBatchDetails } = useReadPoolGetBatch({
    args: batchIndexToQuery !== undefined ? [batchIndexToQuery] : undefined,
    query: {
      enabled: batchIndexToQuery !== undefined,
    }
  });

  // 使用 useReadUsdtBalanceOf 获取用户的USDT余额
  const { data: usdtBalanceData, refetch: refetchUsdtBalance } = useReadUsdtBalanceOf({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

  // 默认余额为0
  const usdtBalance = usdtBalanceData || BigInt(0);

  // 获取用户授权给pool合约的USDT额度
  const { data: usdtAllowanceData, refetch: refetchUsdtAllowance } = useReadUsdtAllowance({
    args: address && poolAddress[chainId as keyof typeof poolAddress] ?
      [address, poolAddress[chainId as keyof typeof poolAddress] as `0x${string}`] :
      undefined,
    query: {
      enabled: !!address && !!poolAddress[chainId as keyof typeof poolAddress],
    }
  });

  // 默认授权额度为0
  const usdtAllowanceForPool = usdtAllowanceData || BigInt(0);

  // NFT铸造完成状态（目前固定为 false，未来可根据实际需求从合约读取）
  const isNftMintComplete = false;

  // Calculate global loading state for blockchain data
  const isLoadingBlockchainData = isPriceLoading || isActiveBatchLoading || (!!address && isLoading);

  // Calculate global error state for blockchain data
  const hasBlockchainError = isPriceError || isActiveBatchError;

  // Function to refresh data after transactions by refetching from the blockchain
  const refreshData = async () => {
    try {
      // Force a small delay to allow blockchain state to update
      // This is important because the RPC needs time to reflect the new state
      await new Promise(resolve => setTimeout(resolve, 500));

      // Execute all refetch operations in parallel for efficiency
      const refetchPromises = [];

      // Only refetch data that's relevant to the current user state
      if (address) {
        // User-specific data only if user is connected
        refetchPromises.push(refetchUserData());
        refetchPromises.push(refetchUsdtBalance());
        refetchPromises.push(refetchUsdtAllowance());
      }

      // Global data (always refetch)
      refetchPromises.push(refetchPhonePrice());
      refetchPromises.push(refetchActiveBatch());
      if (activeBatchData) {
        refetchPromises.push(refetchBatchDetails());
      }

      // Wait for all refetch operations to complete
      await Promise.all(refetchPromises);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  // NOTE: We already have a calculateMintProgress function defined above
  // The duplicate definition has been removed to fix the compilation error

  // Initialize application global information only when key values change
  useEffect(() => {
    // Debug: Log all dependencies
    if (isDev) {
      console.log('=== appInfo useEffect 检查 ===');
      console.log('phonePrice:', phonePrice);
      console.log('activeBatchData:', activeBatchData);
      console.log('batchDetails:', batchDetails);
      console.log('所有条件满足?', !!phonePrice && !!batchDetails);
    }

    // Only initialize or update global info when critical values are available
    if (phonePrice && batchDetails) {
      // 如果 getActiveBatch 成功，使用其返回值；否则使用批次 0 的数据（售罄情况）
      const activeBatchIndex = activeBatchData ? Number(activeBatchData[0]) : 0;
      const batchRemainingStock = activeBatchData ? Number(activeBatchData[1]) : 0;
      // getBatch 返回: endCount, purchaseReward, referralReward, totalStock, soldCount, isActive
      const batchTotalStock = Number(batchDetails[3]);
      const batchSoldCount = Number(batchDetails[4]);

      // Check if any critical value has changed
      const hasChanged =
        !appInfo ||
        appInfo.price !== phonePrice ||
        appInfo.activeBatchIndex !== activeBatchIndex ||
        appInfo.batchTotalStock !== batchTotalStock ||
        appInfo.batchRemainingStock !== batchRemainingStock ||
        appInfo.batchSoldCount !== batchSoldCount;

      if (hasChanged) {
        setAppInfo({
          price: phonePrice,
          activeBatchIndex,
          batchTotalStock,
          batchRemainingStock,
          batchSoldCount,
          isNftMintComplete,
        });
      }
    }
  }, [phonePrice, activeBatchData, batchDetails]);

  // 当地址变化时重置用户相关信息
  useEffect(() => {
    if (!address) {
      setContractUserInfo(null);
    } else {
      // 地址变化时，先重置旧数据，等待新的数据加载
      setContractUserInfo(null);
    }
  }, [address]);

  // 将userData更新contractUserInfo
  useEffect(() => {
    if (userData && address) {
      // 从数组解构各个属性
      // getUserInfo 返回: salesCount, teamSalesCount, usdtIncome, tokenIncome, upline, downlineCount, usdtCommissionRate, tokenCommissionRate
      const [
        salesCountRes,
        teamSalesCountRes,
        usdtIncomeRes,
        tokenIncomeRes,
        uplineRes,
        downlineCountRes,
        usdtCommissionRateRes,
        tokenCommissionRateRes
      ] = userData;

      const transformedData: ContractUserInfo = {
        salesCount: Number(salesCountRes), // 已购买手机数
        teamSalesCount: Number(teamSalesCountRes), // 我的团队
        usdtIncome: usdtIncomeRes, // 收益
        downlineCount: Number(downlineCountRes), // 我的推荐
        level: calculateLevelByCommissionRate(Number(usdtCommissionRateRes)), // 用户等级（0-7）
        upline: uplineRes, // 推荐人（直接从 getUserInfo 获取）
      };

      // 更新状态
      setContractUserInfo(transformedData);
    }
  }, [userData, address]);


  useEffect(() => {
    if (address) {
      refreshData();
    }
  }, [chainId, address]); 

  return (
    <UserContext.Provider
      value={{
        appInfo,
        setAppInfo,
        address,
        contractUserInfo,
        usdtBalance,
        usdtAllowanceForPool,
        refreshData,
        isLoadingBlockchainData,
        hasBlockchainError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// 创建自定义Hook以便在组件中使用
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
