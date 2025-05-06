import { Card, Text, Group, Badge, Progress, Space } from '@mantine/core';
import { useUser } from '../context/UserContext';

export default function Profile() {
  // 使用自定义 hook 获取全局用户数据
  const { nodeInfo, address, contractUserInfo, usdtBalance, usdtAllowanceForPool } = useUser();

  return (
    <div>
      <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)">
        <Text fz="lg" fw={700}>
          用户个人资料
        </Text>
        <Space h="md" />
        
        <Text fz="sm">
          钱包地址: {address || '未连接钱包'}
        </Text>

        <Text fz="sm">
          邀请者: { contractUserInfo?.parent || '无'}
        </Text>

        <Text fz="sm">
          USDT余额: { usdtBalance || '0'}
        </Text>
        <Text fz="sm">
          USDT授权额度: { usdtAllowanceForPool.toString() || '0' }
        </Text>

        

        {contractUserInfo && (
          <>
            <Space h="md" />
            <Group>
              <Badge variant="light" color="green">
                USDT够买总量: {contractUserInfo.usdtTotal.toString()}
              </Badge>
              <Badge variant="light" color="blue">
                好友数量: {contractUserInfo.friendCount.toString()}
              </Badge>
              <Badge variant="light" color="yellow">
                团队数量: {contractUserInfo.teamCount.toString()}
              </Badge>
            </Group>
            <Space h="md" />
            <Progress
              value={contractUserInfo.vipLevel}
              max={10}
              size="xl"
              radius="xl"
              color="blue"
              label={`${contractUserInfo.vipLevel}级`}
            />
          </>
        )}
      
      </Card>
    </div>
  );
}