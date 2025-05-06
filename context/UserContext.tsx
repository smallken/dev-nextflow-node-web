import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { createPublicClient, http } from 'viem';
import { useAccount, useChainId, useReadContract } from 'wagmi';
import { useReadPoolGetUser, useReadPoolInvitation, useReadPoolNftPrice, useReadUsdtBalanceOf, useReadUsdtAllowance, poolAddress, usdtAddress, 
useReadNodeNftTotalSupply, nodeNftAbi, nodeNftAddress

 } from '../wagmi/generated';


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
  usdtTotal: bigint;
  friendCount: number;
  teamCount: number;
  friendNodeCount: number;
  teamNodeCount: number;
  vipLevel: number;
  profitTotal: bigint;
  selfNodeCount: number;
  l1TeamNodeCount: number;
  computeL0: boolean;
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
  usdtBalance:bigint,
  usdtAllowanceForPool:bigint,
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
  
  // 使用 useReadPoolGetUser 从合约获取用户信息
  const { data: userData, isError, isLoading, refetch: refetchUserData } = useReadPoolGetUser({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });
  
  // 使用 useReadPoolInvitation 获取用户的推荐人地址
  const { data: parentAddress, refetch: refetchParentAddress } = useReadPoolInvitation({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });
  
  // 使用 useReadPoolNftPrice 获取全局节点价格
  const { data: nftPrice, refetch: refetchNftPrice } = useReadPoolNftPrice();
  
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
  const nftMintTarget = BigInt(30000);
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
    let progress = (currentMinted / targetMinted) * 100;
    
    // 限制在 0-100% 范围内
    progress = Math.max(0, Math.min(100, progress));
    
    return progress;
  };
  
  // 当前铸造进度百分比
  const nftMintProgress = calculateMintProgress();
  const nftMintTargetAmount = nftMintTarget - BigInt(nftMintStart)

  console.log('parentAddress', parentAddress)
  console.log('nftPrice', nftPrice)
  
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
        refetchPromises.push(refetchUsdtBalance());
        refetchPromises.push(refetchUsdtAllowance());
        refetchPromises.push(refetchParentAddress());
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
    // 对于地址存在的情况，我们依赖上面的useReadPoolGetUser来获取数据
    // 所以这里不需要额外的操作
  }, [address]);
  
  // 将userData和parentAddress结合更新contractUserInfo
  useEffect(() => {
    if (userData) {
      // userData 是合约返回的UserInfo结构，根据合约ABI定义包含各种属性
      setContractUserInfo({
        usdtTotal: typeof userData.usdtTotal === 'bigint' ? userData.usdtTotal : BigInt(userData.usdtTotal as any || 0),
        friendCount: Number(userData.friendCount || 0),
        teamCount: Number(userData.teamCount || 0),
        friendNodeCount: Number(userData.friendNodeCount || 0),
        teamNodeCount: Number(userData.teamNodeCount || 0),
        vipLevel: Number(userData.vipLevel || 0),
        profitTotal: typeof userData.profitTotal === 'bigint' ? userData.profitTotal : BigInt(userData.profitTotal as any || 0),
        selfNodeCount: Number(userData.selfNodeCount || 0),
        l1TeamNodeCount: Number(userData.l1TeamNodeCount || 0),
        computeL0: Boolean(userData.computeL0),
        // 从推荐人查询中获取parent地址
        parent: parentAddress as `0x${string}` || '0x0000000000000000000000000000000000000000',
        // 添加用户地址
        address: address
      });

      // We don't need to update global info here - it's handled by the main effect
    } else {
      setContractUserInfo(null);
    }
  }, [userData, parentAddress]);

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
