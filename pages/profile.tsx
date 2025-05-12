import { Card, Text, Group, Badge, Progress, Space } from '@mantine/core';
import { useUser } from '../context/UserContext';
import { formatEther } from 'viem'


export default function Profile() {
  // 使用自定义 hook 获取全局用户数据
  const { address, contractUserInfo, usdtBalance, usdtAllowanceForPool } = useUser();

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
          USDT余额: { formatEther(usdtBalance || BigInt(0))}
        </Text>
        <Text fz="sm">
          USDT授权额度: { formatEther(usdtAllowanceForPool|| BigInt(0)) }
        </Text>

        

        {contractUserInfo && (
          <>
            <Space h="md" />
            <Group>
              <Badge variant="light" color="green">
                USDT收益: {contractUserInfo.income.toString()}
              </Badge>
              {/* <Badge variant="light" color="blue">
                好友数量: {contractUserInfo.friendCount.toString()}
              </Badge> */}
              <Badge variant="light" color="yellow">
                团队数量: {contractUserInfo.teamNodeCount.toString()}
              </Badge>
            </Group>
            <Space h="md" />
            {/* Mantine v6+ Progress组件不支持max和label属性 */}
            <Text fz="sm" ta="center" mb="xs">用户等级: {contractUserInfo.level}级</Text>
            <Progress
              value={(contractUserInfo.level / 10) * 100}
              size="md"
              radius="md"
              color="blue"
            />
          </>
        )}
      
      </Card>
    </div>
  );
}