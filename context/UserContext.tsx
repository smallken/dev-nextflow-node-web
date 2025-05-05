import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAccount } from 'wagmi';

// 定义用户节点信息类型
type NodeInfo = {
  count: number;
  progress: number;
  // 其他节点相关信息
};

// 用户上下文类型
type UserContextType = {
  nodeInfo: NodeInfo | null;
  setNodeInfo: (info: NodeInfo) => void;
  address: `0x${string}` | undefined;
  // 可以添加其他用户相关状态
};

// 创建上下文
const UserContext = createContext<UserContextType | undefined>(undefined);

// 上下文提供者组件
export function UserProvider({ children }: { children: ReactNode }) {
  const { address } = useAccount();
  const [nodeInfo, setNodeInfo] = useState<NodeInfo | null>(null);

  // 可以在这里添加获取节点信息的逻辑，例如从API或区块链获取
  useEffect(() => {
    // 当地址变化时重新获取节点信息
    if (address) {
      // 这里可以调用API或智能合约来获取节点信息
      // 示例: fetchNodeInfo(address).then(setNodeInfo);
      
      // 临时使用模拟数据
      setNodeInfo({
        count: 3,
        progress: 60,
      });
    } else {
      setNodeInfo(null);
    }
  }, [address]);

  const value = {
    nodeInfo,
    setNodeInfo,
    address,
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
