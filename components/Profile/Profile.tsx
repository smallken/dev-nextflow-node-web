import { Card, Text, Group, Button, Container, Stack, rem, Box, Paper, Grid, Space, Progress, CopyButton, ActionIcon, Tooltip, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { formatEther } from 'viem';
import { IconCrown, IconChevronRight, IconCopy, IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { InviteModal } from '../User/InviteModal';
import {scanBaseURL, getConfigLink} from '../../config'
import { useChainId } from 'wagmi';



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

// Helper function to format wallet address for display
function formatAddress(address: string | undefined): string {
  if (!address) return '';
  // Show first 4 and last 4 characters
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

export function Profile() {
  const { t } = useTranslation();
  const chainId = useChainId();
  // 使用自定义 hook 获取全局用户数据
  const { address, contractUserInfo, usdtBalance, usdtAllowanceForPool } = useUser();
  const [bgColor] = useState('#E3FBE3'); // Default light green background
  const [inviteModalOpened, { open: openInviteModal, close: closeInviteModal }] = useDisclosure(false);

  // If user is not connected or data is not loaded, show a placeholder
  if (!address) {
    return (
      <Container size="md" py="xl">
        <Card withBorder radius="md" padding="xl">
          <Text ta="center" fw={500} size="lg">{t('profile.connectWallet')}</Text>
        </Card>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100vh', paddingBottom: rem(80) }}>
      {/* Header with title */}
      <Group px="md" py="lg" justify="space-between">
        <Text size="lg" fw={700}>{t('profile.title')}</Text>
      </Group>
      
      {/* User profile card with level and info */}
      <Container size="md" mb="md">
        <Card withBorder radius="md" shadow="sm" p="md">
          <Group justify="space-between" mb="sm">
            <Text fw={700} size="lg">{t('profile.userInfo')}</Text>
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
                <Text fw={700} c="white" size="sm">Level {contractUserInfo?.level}</Text>
              </Group>
            </Box>
          </Group>
          
          <Stack gap="sm">
            {/* Level progress */}
            <Box>
              <Group justify="space-between" mb={4}>
                <Text size="sm" c="dimmed">{t('profile.levelProgress')}</Text>
                <Text size="sm" fw={500}>{contractUserInfo?.level}/5</Text>
              </Group>
              <Progress
                value={(contractUserInfo?.level ||0) * 20} /* Each level represents 20% */
                size="md"
                radius="xl"
                color="#F2AE00"
              />
            </Box>

            {/* User info */}
            <Divider my="xs" variant="dashed" />
          
            
            {/* Inviter address row */}
            <Group justify="space-between" w="100%">
              <Text size="xs" c="dimmed" w={80}>{t('profile.inviter')}:</Text>
              {contractUserInfo?.parent && contractUserInfo?.parent !== '0x0000000000000000000000000000000000000000' ? (
                <Group wrap="nowrap" align="center" gap={4} style={{ flex: 1 }}>
                  <Text size="xs" c="dimmed">{formatAddress(contractUserInfo.parent)}</Text>
                  <CopyButton value={contractUserInfo.parent || ''} timeout={2000}>
                    {({ copied, copy }) => (
                      <Tooltip label={copied ? t('common.copied') : t('common.copy')} withArrow position="top">
                        <ActionIcon variant="subtle" color={copied ? 'teal' : 'gray'} onClick={copy} size="xs">
                          {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </Group>
              ) : (
                <Group wrap="nowrap" align="center" gap={4} style={{ flex: 1 }}>
                  <Text size="xs" c="dimmed">{t('common.none')}</Text>
                </Group>
              )}
            </Group>
            
            {/* Wallet address row */}
            <Group justify="space-between" w="100%">
              <Text size="xs" c="dimmed" w={80}>{t('profile.myWallet')}:</Text>
              <Group wrap="nowrap" align="center" gap={4} style={{ flex: 1 }}>
                <Text size="xs" c="dimmed">{formatAddress(address)}</Text>
                <CopyButton value={address || ''} timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? t('common.copied') : t('common.copy')} withArrow position="top">
                      <ActionIcon variant="subtle" color={copied ? 'teal' : 'gray'} onClick={copy} size="xs">
                        {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </Group>
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
                title={t('profile.myNodes')} 
                value={contractUserInfo?.nftCount || '0'} 
                buttonText={t('common.details')} 
                onClick={() => window.open(getConfigLink(chainId,"myNodeLink",address), '_blank')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <StatCard 
                title={t('profile.myEarnings')} 
                value={formatEther(contractUserInfo?.income || BigInt(0)).substring(0, 8)} 
                buttonText={t('common.details')} 
                onClick={() => window.open(getConfigLink(chainId,"myIncomeLink",address), '_blank')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <StatCard 
                title={t('profile.myFriends')} 
                value={contractUserInfo?.friends?.length  || 0} 
                buttonText={t('common.invite')} 
                onClick={openInviteModal}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <StatCard 
                title={t('profile.teamNodes')} 
                value={contractUserInfo?.teamNodeCount || 0} 
                buttonText={t('common.details')} 
                onClick={() => window.open(getConfigLink(chainId,"myTeamNodeLink",address), '_blank')}
              />
            </Grid.Col>
          </Grid>
        </Card>

        {/* Add some bottom padding */}
        <Space h="xl" />
      </Container>

      {/* Invite Modal */}
      <InviteModal opened={inviteModalOpened} onClose={closeInviteModal} />
    </div>
  );
}