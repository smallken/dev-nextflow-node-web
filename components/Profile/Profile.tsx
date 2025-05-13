import { Card, Text, Group, Button, Container, Stack, rem, Box, Paper, Grid, Space, Progress } from '@mantine/core';
import { formatEther } from 'viem';
import { IconCrown, IconChevronRight } from '@tabler/icons-react';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';


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

export function Profile() {
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
      
      {/* User profile card with level and info */}
      <Container size="md" mb="md">
        <Card withBorder radius="md" shadow="sm" p="md">
          <Group justify="space-between" mb="sm">
            <Text fw={700} size="lg">用户信息</Text>
            <Box 
              style={{ 
                background: 'linear-gradient(135deg, #F2AE00, #FFD700)',
                borderRadius: '20px',
                padding: '4px 12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <Group gap={6}>
                <IconCrown size={20} color="white" stroke={1.5} />
                <Text fw={700} c="white" size="sm">Level {contractUserInfo.level}</Text>
              </Group>
            </Box>
          </Group>
          
          <Stack gap="sm">
            {/* Level progress */}
            <Box>
              <Group justify="space-between" mb={4}>
                <Text size="sm" c="dimmed">等级进度</Text>
                <Text size="sm" fw={500}>{contractUserInfo.level}/5</Text>
              </Group>
              <Progress
                value={contractUserInfo.level * 20} /* Each level represents 20% */
                size="md"
                radius="xl"
                color="#F2AE00"
              />
            </Box>

            {/* User info */}
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
          </Stack>
        </Card>
      </Container>

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

        {/* Add some bottom padding */}
        <Space h="xl" />
      </Container>
    </div>
  );
}