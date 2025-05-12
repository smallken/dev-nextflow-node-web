import { Card, Text, Group, Button, Container, Stack, rem, Box, Paper, Grid, Space, Progress } from '@mantine/core';
import { useUser } from '../context/UserContext';
import { formatEther } from 'viem';
import { IconCrown, IconChevronRight } from '@tabler/icons-react';
import { useState } from 'react';

// StatCard component for the four info boxes
function StatCard({ title, value, buttonText, onClick }: { title: string; value: string | number; buttonText: string; onClick?: () => void }) {
  return (
    <Paper radius="md" withBorder p="md" style={{ height: '100%' }}>
      <Stack gap="xs" align="center">
        <Text c="dimmed" size="sm" ta="center">
          {title}
        </Text>
        <Text fw={700} size="xl" ta="center">
          {value}
        </Text>
        <Button 
          variant="filled" 
          color="#F2AE00" 
          onClick={onClick}
          rightSection={<IconChevronRight size={16} />}
          size="xs"
        >
          {buttonText}
        </Button>
      </Stack>
    </Paper>
  );
}

export default function Profile() {
  // 使用自定义 hook 获取全局用户数据
  const { address, contractUserInfo, usdtBalance, usdtAllowanceForPool } = useUser();
  const [bgColor] = useState('#E3FBE3'); // Default light green background

  // If user is not connected or data is not loaded, show a placeholder
  if (!address || !contractUserInfo) {
    return (
      <Container size="md" py="xl">
        <Card withBorder radius="md" padding="xl">
          <Text ta="center" fw={500} size="lg">请连接钱包查看个人信息</Text>
        </Card>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100vh', paddingBottom: rem(80) }}>
      {/* Header with title */}
      <Group px="md" py="lg" justify="space-between">
        <Text size="lg" fw={700}>个人中心</Text>
      </Group>
      
      {/* User level section with crown */}
      <Box ta="center" mb="md">
        <Box pos="relative" style={{ display: 'inline-block' }}>
          <IconCrown 
            size={100} 
            color="#FFD700" 
            stroke={1}
            style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.2))' }}
          />
          <Text 
            fw={700} 
            size="2rem" 
            c="white" 
            pos="absolute" 
            top="50%" 
            left="50%" 
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            {contractUserInfo.level}
          </Text>
        </Box>
        <Card radius="md" mt="-20px" mx="auto" maw={130} shadow="sm">
          <Text ta="center" fw={500}>我的身份</Text>
        </Card>
      </Box>

      
      {/* Stats grid */}
      <Container size="md">
        <Card shadow="sm" radius="lg" withBorder>
          <Grid gutter={16}>
            <Grid.Col span={6}>
              <StatCard 
                title="我的节点数量" 
                value={contractUserInfo.nodeCount} 
                buttonText="详情" 
                onClick={() => console.log('Node details')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <StatCard 
                title="我的收益(USDT)" 
                value={formatEther(contractUserInfo.income).substring(0, 8)} 
                buttonText="详情" 
                onClick={() => console.log('Earnings details')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <StatCard 
                title="我的好友" 
                value={contractUserInfo.teamNodeCount || 0} 
                buttonText="邀请" 
                onClick={() => console.log('Invite friends')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <StatCard 
                title="好友节点数量" 
                value={contractUserInfo.teamNodeCount || 0} 
                buttonText="详情" 
                onClick={() => console.log('Friend nodes details')}
              />
            </Grid.Col>
          </Grid>
        </Card>

        {/* Additional user info (optional) */}
        <Card withBorder radius="md" padding="md" mt="xl" shadow="sm">
          <Text fw={500} mb="xs">用户信息</Text>
          <Space h="xs" />
          
          <Group>
            <Text size="sm" c="dimmed">邀请者:</Text>
            <Text size="sm" truncate style={{ maxWidth: '70%' }}>
              {contractUserInfo.parent || '无'}
            </Text>
          </Group>
          
          <Group>
            <Text size="sm" c="dimmed">钱包地址:</Text>
            <Text size="sm" truncate style={{ maxWidth: '70%' }}>{address}</Text>
          </Group>
          
          <Space h="md" />
          <Text fw={500} size="sm">用户等级: Level {contractUserInfo.level}</Text>
          <Progress
            value={(contractUserInfo.level / 10) * 100}
            size="md"
            radius="md"
            color="#F2AE00"
            mt="xs"
          />
        </Card>
      </Container>
    </div>
  );
}