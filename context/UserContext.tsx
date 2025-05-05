import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useReadPoolGetUser, useReadPoolInvitation } from '../wagmi/generated';


// 定义用户节点信息类型
type NodeInfo = {
  count: number;
  progress: number;
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
};

// 用户上下文类型
type UserContextType = {
  nodeInfo: NodeInfo | null;
  setNodeInfo: (info: NodeInfo) => void;
  address: `0x${string}` | undefined;
  contractUserInfo: ContractUserInfo | null;
  // 可以添加其他用户相关状态
};

// 创建上下文
const UserContext = createContext<UserContextType | undefined>(undefined);

// 上下文提供者组件
export function UserProvider({ children }: { children: ReactNode }) {
  const { address } = useAccount();
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

  console.log('parentAddress',parentAddress)

  // 当地址变化时重置节点信息
  useEffect(() => {
    if (!address) {
      setNodeInfo(null);
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
        parent: parentAddress as `0x${string}` || '0x0000000000000000000000000000000000000000'
      });

      // 根据获取到的信息更新nodeInfo
      setNodeInfo({
        count: Number(userData.selfNodeCount || 0),
        progress: Number(userData.vipLevel || 0) * 20, // 假设每个vip等级对应进度20%
      });
    } else {
      setContractUserInfo(null);
    }
  }, [userData, parentAddress]);

  const value = {
    nodeInfo,
    setNodeInfo,
    address,
    contractUserInfo,
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
