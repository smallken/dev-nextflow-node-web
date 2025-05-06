import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { useReadPoolGetUser, useReadPoolInvitation, useReadPoolNftPrice, useReadUsdtBalanceOf, useReadUsdtAllowance, poolAddress, usdtAddress,
useReadNodeNftTotalSupply

 } from '../wagmi/generated';


// 定义全局节点信息类型
type NodeInfo = {
  count: number; // 所有用户总数 // todo remove
  progress: number; // 整体进度 // todo remove
  price: bigint; // 节点价格（usdt计算）
  // 其他节点相关信息
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
  nodeInfo: NodeInfo | null;
  setNodeInfo: (info: NodeInfo) => void;
  address: `0x${string}` | undefined;
  contractUserInfo: ContractUserInfo | null;
  // 可以添加其他用户相关状态
  usdtBalance:bigint,
  usdtAllowanceForPool:bigint,

  //nft info
  nftCurrentTotal: bigint, // total mint of different term
  nftMintTarget: bigint, // target for the end of this loop
  nftMintStart: number, // number start for a term
  nftMintProgress: number // 当前铸造进度百分比
  nftMintTargetAmount:bigint
};

// 创建上下文
const UserContext = createContext<UserContextType | undefined>(undefined);

// 上下文提供者组件
export function UserProvider({ children }: { children: ReactNode }) {
  const { address } = useAccount();
  const chainId = useChainId();
  const [nodeInfo, setNodeInfo] = useState<NodeInfo | null>(null);
  const [contractUserInfo, setContractUserInfo] = useState<ContractUserInfo | null>(null);
  
  // 使用 useReadPoolGetUser 从合约获取用户信息
  const { data: userData, isError, isLoading } = useReadPoolGetUser({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });
  
  // 使用 useReadPoolInvitation 获取用户的推荐人地址
  const { data: parentAddress } = useReadPoolInvitation({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });
  
  // 使用 useReadPoolNftPrice 获取全局节点价格
  const { data: nftPrice } = useReadPoolNftPrice();
  
  // 使用 useReadUsdtBalanceOf 获取用户的USDT余额
  const { data: usdtBalanceData } = useReadUsdtBalanceOf({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });
  
  // 默认余额为0
  const usdtBalance = usdtBalanceData || BigInt(0);
  
  // 获取用户授权给pool合约的USDT额度
  const { data: usdtAllowanceData } = useReadUsdtAllowance({
    args: address && poolAddress[chainId as keyof typeof poolAddress] ? 
      [address, poolAddress[chainId as keyof typeof poolAddress] as `0x${string}`] : 
      undefined,
    query: {
      enabled: !!address && !!poolAddress[chainId as keyof typeof poolAddress],
    }
  });
  
  // 默认授权额度为0
  const usdtAllowanceForPool = usdtAllowanceData || BigInt(0);
  
  // 获取 NFT 总供应量
  const { data: nftTotalSupplyData } = useReadNodeNftTotalSupply({
    args:[BigInt(1)],
    query: {
      enabled: true,
    }
  });
  
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

  // 初始化全局节点价格信息
  useEffect(() => {
    if (nftPrice) {
      setNodeInfo(prevState => ({
        ...prevState || { count: 0, progress: 0, price: BigInt(0) },
        price: nftPrice
      }));
    }
  }, [nftPrice]);
  
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

      // 仅更新进度信息，保留价格信息
      // nftCurrentTotal,
      setNodeInfo(prevState => ({
        ...prevState || { count: 0, progress: 0, price: BigInt(0) },
        count: Number(nftCurrentTotal || 0), 
        progress: Number(userData.vipLevel || 0) * 20, // 假设每个vip等级对应进度20%
      }));
    } else {
      setContractUserInfo(null);
    }
  }, [userData, parentAddress]);

  const value = {
    nodeInfo,
    setNodeInfo,
    address,
    contractUserInfo,
    usdtBalance,
    usdtAllowanceForPool,
    // nft
    nftCurrentTotal, // nft mint total
    nftMintTarget, // nftMintTarget
    nftMintTargetAmount,
    nftMintStart,
    nftMintProgress,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// 创建自定义Hook以便在组件中使用
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
