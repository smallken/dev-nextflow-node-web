import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAccount, useChainId } from 'wagmi';
import { formatEther } from 'viem';
import {
  useReadPoolGetUserInfo, useReadPoolUpline, useReadPoolUsdtPrice,
  useReadUsdtBalanceOf, useReadUsdtAllowance, poolAddress, useReadPoolGetUserDownlines,
  useReadPoolSalesCount, useReadPoolGetActiveBatch, useReadPoolGetBatch,
} from '../wagmi/generated';

import MINT_STAGE from '../config/min.stage';
import { useContractEvents } from '../hooks/useContractEvents';

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


// 定义全局应用信息类型
type AppInfo = {
  price: bigint; // 节点价格（usdt计算）

  // 批次信息
  activeBatchIndex: number; // 当前活跃批次索引
  batchTotalStock: number; // 批次总库存
  batchRemainingStock: number; // 批次剩余库存
  batchSoldCount: number; // 批次已售数量

  // NFT全局信息
  nftCurrentTotal: bigint; // total mint of different stage
  nftCurrentStageMinted: bigint; // total mint of this stage
  nftMintTarget: bigint; // target for the end of this loop
  nftMintStart: bigint; // number start for a stage
  nftMintProgress: number; // 当前铸造进度百分比
  nftMintTargetAmount: bigint;
  isNftMintComplete: boolean;
  // 其他全局信息
};

// 定义合约用户信息类型
type ContractUserInfo = {
  nodeCount: number,
  level: number,
  teamNodeCount: number,
  income: bigint,
  friends: string[],
  salesCount: number, // 用户购买手机数量

  // 新增字段
  usdtIncome: bigint, // USDT 收益
  downlineCount: number, // 直接推荐人数
  teamSalesCount: number, // 团队业绩
  usdtCommissionRate: number, // USDT 佣金费率（等级进度）

  // 扩展信息 - 我们计算的属性
  parent?: string; // 需要从其他地方获取
  address?: `0x${string}`; // 用户地址
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
};

// 创建上下文
const UserContext = createContext<UserContextType | undefined>(undefined);

// 上下文提供者组件
export function UserProvider({ children }: { children: ReactNode }) {
  const { address } = useAccount();
  const chainId = useChainId();
  const router = useRouter();
  const isDev = process.env.NODE_ENV !== 'production';
  if (isDev) console.log('chainId', chainId);
  
  // 路由切换时暂停轮询，减少移动端卡顿
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  
  useEffect(() => {
    let routeChangeTimeout: NodeJS.Timeout | null = null;

    const handleRouteChangeStart = () => {
      // 立即暂停轮询
      if (routeChangeTimeout) clearTimeout(routeChangeTimeout);
      setIsRouteChanging(true);
    };

    const handleRouteChangeComplete = () => {
      // 延迟 300ms 恢复轮询，让页面先完成渲染
      routeChangeTimeout = setTimeout(() => {
        setIsRouteChanging(false);
      }, 300);
    };

    const handleRouteChangeError = () => {
      if (routeChangeTimeout) clearTimeout(routeChangeTimeout);
      setIsRouteChanging(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      if (routeChangeTimeout) clearTimeout(routeChangeTimeout);
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);
  
  // 使用事件驱动刷新替代高频轮询
  useContractEvents();
  
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

  // 调试：打印用户数据状态
  if (isDev) {
    console.log('=== 用户数据状态调试 ===');
    console.log('address:', address);
    console.log('userData:', userData);
    console.log('isError:', isError);
    console.log('isLoading:', isLoading);
  }

  // 使用 useReadPoolUpline 获取用户的推荐人地址
  const { data: parentAddress, refetch: refetchParentAddress } = useReadPoolUpline({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

  // 使用 useReadPoolGetUserDownlines 获取用户的好友列表
  const { data: friendsList, refetch: refetchFriendsList } = useReadPoolGetUserDownlines({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

  // 使用 useReadPoolUsdtPrice 获取全局节点价格
  const { data: nftPrice, refetch: refetchNftPrice, isError: isPriceError, isLoading: isPriceLoading } = useReadPoolUsdtPrice();

  // 调试：打印价格获取状态
  if (isDev) {
    console.log('=== getPrice 调试 ===');
    console.log('isPriceLoading:', isPriceLoading);
    console.log('isPriceError:', isPriceError);
    console.log('nftPrice:', nftPrice);
  }

  // 获取活跃批次信息
  const { data: activeBatchData, refetch: refetchActiveBatch, isError: isActiveBatchError, isLoading: isActiveBatchLoading } = useReadPoolGetActiveBatch({
    query: {}
  });

  // 调试：打印批次获取状态
  if (isDev) {
    console.log('=== getActiveBatch 调试 ===');
    console.log('chainId:', chainId);
    console.log('isActiveBatchLoading:', isActiveBatchLoading);
    console.log('isActiveBatchError:', isActiveBatchError);
    console.log('activeBatchData:', activeBatchData);
  }

  // 获取批次详情（如果有活跃批次）
  const { data: batchDetails, refetch: refetchBatchDetails } = useReadPoolGetBatch({
    args: activeBatchData ? [activeBatchData[0]] : undefined,
    query: {
      enabled: !!activeBatchData,
    }
  });

  // 调试：打印批次数据
  if (isDev) {
    console.log('=== 批次数据调试 ===');
    console.log('activeBatchData:', activeBatchData);
    console.log('activeBatchData[0]:', activeBatchData ? activeBatchData[0] : 'undefined');
    console.log('batchDetails:', batchDetails);
    console.log('batchDetails 长度:', batchDetails ? batchDetails.length : 'undefined');
  }

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

  // 获取用户购买手机数量 (salesCount)
  const { data: salesCountData, refetch: refetchSalesCount } = useReadPoolSalesCount({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

  // 固定当前数量为 0，不从区块链读取
  const nftCurrentTotal = BigInt(0);

  // NFT铸造目标和起始值
  const nftMintTarget = MINT_STAGE.nftMintTarget;
  const nftMintStart = MINT_STAGE.nftMintStart;

  // 计算NFT铸造进度
  const calculateMintProgress = () => {
    // 当前铸造数量和目标铸造数量
    const currentMinted = nftCurrentTotal === BigInt(0) ? BigInt(0) : nftCurrentTotal - nftMintStart + BigInt(1);
    const targetMinted = nftMintTarget - nftMintStart + BigInt(1);
    
    // 计算进度值
    let progress = 0;
    
    if (nftCurrentTotal === BigInt(0)) {
      progress = 0;
    } else if (nftMintTarget <= BigInt(nftCurrentTotal)) {
      progress = 100;
    } else {
      // 计算百分比 - Convert BigInt to number before calculation
      const currentMintedNum = Number(currentMinted);
      const targetMintedNum = Number(targetMinted);
      progress = Math.round(((currentMintedNum / targetMintedNum) * 100) * 100) / 100; // Round to 2 decimal places
      // 限制在 0-100% 范围内
      progress = Math.max(0, Math.min(100, progress));
    }

    return { progress, currentMinted, targetMinted };
  };

  // 当前铸造进度百分比
  const mintProgressResult = calculateMintProgress();
  const nftMintProgress = mintProgressResult.progress;
  const nftMintTargetAmount = mintProgressResult.targetMinted;
  const nftCurrentStageMinted = mintProgressResult.currentMinted;
  const isNftMintComplete = nftMintTarget == nftCurrentTotal

  // Function to refresh data after transactions by refetching from the blockchain
  const refreshData = async () => {
    try {
      if (isDev) console.log('Refreshing blockchain data after transaction...');

      // Force a small delay to allow blockchain state to update
      // This is important because the RPC needs time to reflect the new state
      await new Promise(resolve => setTimeout(resolve, 500));

      // After immediate UI feedback, now refetch actual blockchain data
      if (isDev) console.log('Refetching data from blockchain...');

      // Execute all refetch operations in parallel for efficiency
      const refetchPromises = [];

      // Only refetch data that's relevant to the current user state
      if (address) {
        // User-specific data only if user is connected
        refetchPromises.push(refetchUserData());
        refetchPromises.push(refetchParentAddress());
        refetchPromises.push(refetchFriendsList());
        refetchPromises.push(refetchUsdtBalance());
        refetchPromises.push(refetchUsdtAllowance());
        refetchPromises.push(refetchSalesCount());
      }

      // Global data (always refetch)
      refetchPromises.push(refetchNftPrice());
      refetchPromises.push(refetchActiveBatch());
      refetchPromises.push(refetchBatchDetails());

      // Wait for all refetch operations to complete
      await Promise.all(refetchPromises);

      if (isDev) console.log('Blockchain data refresh complete')
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
      console.log('nftPrice:', nftPrice);
      console.log('activeBatchData:', activeBatchData);
      console.log('batchDetails:', batchDetails);
      console.log('所有条件满足?', !!nftPrice && !!activeBatchData && !!batchDetails);
    }

    // Only initialize or update global info when critical values are available
    if (nftPrice && activeBatchData && batchDetails) {
      // getBatch 返回: endCount, purchaseReward, referralReward, totalStock, soldCount, isActive
      const batchTotalStock = Number(batchDetails[3]);
      const batchSoldCount = Number(batchDetails[4]);
      const batchRemainingStock = Number(activeBatchData[1]);
      const activeBatchIndex = Number(activeBatchData[0]);

      // Check if any critical value has changed
      const hasChanged =
        !appInfo ||
        appInfo.price !== nftPrice ||
        appInfo.activeBatchIndex !== activeBatchIndex ||
        appInfo.batchTotalStock !== batchTotalStock ||
        appInfo.batchRemainingStock !== batchRemainingStock ||
        appInfo.batchSoldCount !== batchSoldCount;

      if (hasChanged) {
        if (isDev) console.log('✅ 更新 appInfo - 批次信息:', {
          batchTotalStock,
          batchRemainingStock,
          batchSoldCount,
          activeBatchIndex
        });

        setAppInfo({
          price: nftPrice,
          activeBatchIndex,
          batchTotalStock,
          batchRemainingStock,
          batchSoldCount,
          nftCurrentTotal,
          nftCurrentStageMinted,
          nftMintTarget,
          nftMintStart,
          nftMintProgress,
          nftMintTargetAmount,
          isNftMintComplete,
        });
      } else {
        if (isDev) console.log('⏭️ appInfo 无需更新，值未变化');
      }
    } else {
      if (isDev) {
        console.log('❌ 缺少必要数据，无法设置 appInfo');
        if (!nftPrice) console.log('  - nftPrice 为空');
        if (!activeBatchData) console.log('  - activeBatchData 为空');
        if (!batchDetails) console.log('  - batchDetails 为空');
      }
    }
  }, [nftPrice, activeBatchData, batchDetails]);

  // 当地址变化时重置用户相关信息
  useEffect(() => {
    if (!address) {
      setContractUserInfo(null);
    } else {
      // 地址变化时，先重置旧数据，等待新的数据加载
      setContractUserInfo(null);
    }
  }, [address]);

  // 将userData和parentAddress结合更新contractUserInfo
  useEffect(() => {
    if (userData && address) {
      // 调试：打印用户数据
      if (isDev) {
        console.log('=== 用户数据调试 ===');
        console.log('userData:', userData);
        console.log('address:', address);
      }

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

      if (isDev) {
        console.log('=== 合约 getUserInfo 返回值详细打印 ===');
        console.log('原始返回数组 userData:', userData);
        console.log('1. salesCount (个人购买数量):', salesCountRes, '→', Number(salesCountRes));
        console.log('2. teamSalesCount (团队业绩):', teamSalesCountRes, '→', Number(teamSalesCountRes));
        console.log('3. usdtIncome (USDT收益):', usdtIncomeRes, '→', formatEther(usdtIncomeRes));
        console.log('4. tokenIncome (代币收益):', tokenIncomeRes);
        console.log('5. upline (推荐人):', uplineRes);
        console.log('6. downlineCount (直推人数):', downlineCountRes, '→', Number(downlineCountRes));
        console.log('7. usdtCommissionRate (USDT佣金费率):', usdtCommissionRateRes, '→', Number(usdtCommissionRateRes));
        console.log('8. tokenCommissionRate (代币佣金费率):', tokenCommissionRateRes, '→', Number(tokenCommissionRateRes));
      }

      const transformedData: ContractUserInfo = {
        nodeCount: Number(salesCountRes), // 个人购买数量
        income: usdtIncomeRes, // USDT 收益
        // 根据团队业绩计算等级
        level: calculateLevelByTeamSales(Number(teamSalesCountRes)),
        teamNodeCount: Number(teamSalesCountRes), // 团队业绩
        salesCount: Number(salesCountRes), // 用户购买手机数量
        usdtIncome: usdtIncomeRes, // USDT 收益
        downlineCount: Number(downlineCountRes), // 直接推荐人数
        teamSalesCount: Number(teamSalesCountRes), // 团队业绩
        usdtCommissionRate: Number(usdtCommissionRateRes), // USDT 佣金费率（实际百分比，如5表示5%）
        parent: parentAddress || undefined, // 添加父级推荐人地址
        address, // 添加用户自己的地址
        friends: friendsList ? [...friendsList] : [], // 添加好友列表 - 转换为可变数组
      };

      if (isDev) console.log('转换后的用户数据:', transformedData);

      // 更新状态
      setContractUserInfo(transformedData);
    }
  }, [userData, address, parentAddress, friendsList]);


  useEffect(() => {
    if (address) {
      if (isDev) console.log('Chain ID changed, refreshing data...');
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
