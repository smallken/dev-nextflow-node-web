import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { createPublicClient, http } from 'viem';
import { useAccount, useChainId, useReadContract } from 'wagmi';
import {
  useReadPoolGetUserInfo, useReadPoolUpline, useReadPoolGetNodePrice,
  useReadUsdtBalanceOf, useReadUsdtAllowance, poolAddress, usdtAddress, useReadPoolGetUserDownlines,
  useReadNodeNftTotalSupply, nodeNftAbi, nodeNftAddress,
  useReadNodeNftBalanceOf,

} from '../wagmi/generated';

import MINT_STAGE from '../config/min.stage.ts';


// 定义全局应用信息类型
type AppInfo = {
  price: bigint; // 节点价格（usdt计算）

  // NFT全局信息
  nftCurrentTotal: bigint; // total mint of different term
  nftMintTarget: bigint; // target for the end of this loop
  nftMintStart: number; // number start for a term
  nftMintProgress: number; // 当前铸造进度百分比
  nftMintTargetAmount: bigint;
  // 其他全局信息
};

// 定义合约用户信息类型
type ContractUserInfo = {
  nodeCount: number,
  level: number,
  teamNodeCount: number,
  income: bigint,
  friends: string[],
  nftCount:number,

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

  // 使用 useReadPoolGetNodePrice 获取全局节点价格
  const { data: nftPrice, refetch: refetchNftPrice } = useReadPoolGetNodePrice();

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

 
  const tokenId = BigInt(1); // Node NFT 的 tokenId
  const { data: nftBalanceData, refetch: refetchNftBalance } = useReadNodeNftBalanceOf({
    args: address ? [address as `0x${string}`, tokenId] : undefined,
    query: {
      enabled: !!address,
    }
  });

  // 默认 NFT 数量为 0
  const nftBalance = nftBalanceData ? Number(nftBalanceData) : 0;

  // 使用 useReadContract 直接读取 NFT 总供应量，不依赖用户登录状态
  const { data: nftTotalSupplyData, refetch: refetchNftTotalSupply } = useReadContract({
    address: nodeNftAddress[chainId as keyof typeof nodeNftAddress] as `0x${string}`,
    abi: nodeNftAbi,
    functionName: 'totalSupply',
    args: [BigInt(1)],
    query: {
      enabled: true,
      retry: 3,
    }
  });

  console.log('nftTotalSupplyData', nftTotalSupplyData);

  // 默认总供应量为0
  const nftCurrentTotal = nftTotalSupplyData || BigInt(0);

  // NFT铸造目标和起始值
  const nftMintTarget = MINT_STAGE.nftMintTarget;
  const nftMintStart = 0;

  // 计算NFT铸造进度
  const calculateMintProgress = () => {
    if (nftCurrentTotal === BigInt(0)) return 0;
    if (nftMintTarget <= BigInt(nftMintStart)) return 100;

    // 当前铸造数量
    const currentMinted = Number(nftCurrentTotal) - nftMintStart;
    // 目标铸造数量
    const targetMinted = Number(nftMintTarget) - nftMintStart;

    // 计算百分比
    let progress = Math.round(((currentMinted / targetMinted) * 100) * 100) / 100; // Round to 2 decimal places

    // 限制在 0-100% 范围内
    progress = Math.max(0, Math.min(100, progress));

    return progress;
  };

  // 当前铸造进度百分比
  const nftMintProgress = calculateMintProgress();
  const nftMintTargetAmount = nftMintTarget - BigInt(nftMintStart)

  // Function to refresh data after transactions by refetching from the blockchain
  const refreshData = async () => {
    try {
      console.log('Refreshing blockchain data after transaction...');

      // Force a small delay to allow blockchain state to update
      // This is important because the RPC needs time to reflect the new state
      await new Promise(resolve => setTimeout(resolve, 500));

      // After immediate UI feedback, now refetch actual blockchain data
      console.log('Refetching data from blockchain...');

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
        refetchPromises.push(refetchNftBalance());
      }

      // Global data (always refetch)
      refetchPromises.push(refetchNftPrice());
      refetchPromises.push(refetchNftTotalSupply());

      // Wait for all refetch operations to complete
      await Promise.all(refetchPromises);

      console.log('Blockchain data refresh complete')
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  // NOTE: We already have a calculateMintProgress function defined above
  // The duplicate definition has been removed to fix the compilation error

  // Initialize application global information only when key values change
  useEffect(() => {
    // Only initialize or update global info when critical values are available
    if (nftPrice) {
      const shouldUpdate =
        !appInfo ||
        appInfo.price !== nftPrice ||
        appInfo.nftCurrentTotal !== nftCurrentTotal;

      if (shouldUpdate) {
        setAppInfo({
          price: nftPrice,
          nftCurrentTotal,
          nftMintTarget,
          nftMintStart,
          nftMintProgress,
          nftMintTargetAmount,
        });
      }
    }
  }, [nftPrice, nftCurrentTotal, nftTotalSupplyData]);

  // 当地址变化时重置用户相关信息
  useEffect(() => {
    if (!address) {
      setContractUserInfo(null);
    }
    // 对于地址存在的情况，我们依赖上面的useReadPoolGetUserInfo来获取数据
    // 所以这里不需要额外的操作
  }, [address]);

  // 将userData和parentAddress结合更新contractUserInfo
  useEffect(() => {
    if (userData && address) {
      // 从数组解构各个属性
      const [nodeCount, income, level, teamNodeCount] = userData;

      const transformedData: ContractUserInfo = {
        nodeCount: Number(nodeCount),
        income,
        level: Number(level),
        teamNodeCount: Number(teamNodeCount),
        nftCount: nftBalance, // 添加用户持有的 NFT 数量
        parent: parentAddress || undefined, // 添加父级推荐人地址
        address, // 添加用户自己的地址
        friends: friendsList ? [...friendsList] : [], // 添加好友列表 - 转换为可变数组
      };

      // 更新状态
      setContractUserInfo(transformedData);
    }
  }, [userData, address, parentAddress, friendsList, nftBalance]);

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
