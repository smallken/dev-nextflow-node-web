import { Card, Text, Group, Badge, Progress, Space } from '@mantine/core';
import { useUser } from '../context/UserContext';

export default function Profile() {
  // 使用自定义 hook 获取全局用户数据
  const { nodeInfo, address } = useUser();

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
        
        {nodeInfo ? (
          <>
            <Space h="md" />
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              节点信息
            </Text>
            <Group mt="md" justify="space-between">
              <Text fz="sm">节点数量: {nodeInfo.count}</Text>
            </Group>
            
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed" mt="md">
              完成进度
            </Text>
            <Group mt="md" justify="space-between">
              <Text fz="sm">{nodeInfo.progress}0 / 10000</Text>
              <Badge size="sm">{nodeInfo.progress}%</Badge>
            </Group>
            <Progress value={nodeInfo.progress} mt="md" size="lg" radius="xl" />
          </>
        ) : (
          <Text c="dimmed" mt="md">请连接钱包查看节点信息</Text>
        )}
      </Card>
    </div>
  );
}