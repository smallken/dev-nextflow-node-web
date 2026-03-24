import { Card, Text, Group, Button, Container, Stack, rem, Box, Paper, Grid, Space, Progress, CopyButton, ActionIcon, Tooltip, Divider, Skeleton } from '@mantine/core';
import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';
import { useChainId } from 'wagmi';
import { colors, styles, vipColors } from '../../theme';
import { formatEther } from 'viem';
import { IconCrown, IconChevronRight, IconCopy, IconCheck, IconUserPlus, IconDeviceMobile, IconUsers, IconWallet } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useUser } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import { getConfigLink } from '../../config';

const InviteModal = dynamic(
  () => import('../User/InviteModal').then(m => ({ default: m.InviteModal })),
  { ssr: false }
);




// StatCard component for the four info boxes
function StatCard({
  title,
  value,
  buttonText,
  onClick,
  secondaryAction,
  onSecondaryAction,
  showButton = true,
  icon,
  iconTooltip,
  loading = false
}: {
  title: string;
  value: string | number;
  buttonText: string;
  onClick?: () => void;
  secondaryAction?: boolean;
  onSecondaryAction?: () => void;
  showButton?: boolean;
  icon?: React.ReactNode;
  iconTooltip?: string;
  loading?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <Paper 
      radius="lg" 
      p="md" 
      styles={{
        root: {
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          background: 'transparent',
          border: '1px solid rgba(59, 130, 246, 0.08)',
          boxShadow: '0 2px 10px rgba(59, 130, 246, 0.08)',
        }
      }}
    >
      {/* Top-right corner action button */}
      {secondaryAction && onSecondaryAction && (
        <ActionIcon
          variant="light"
          size="md"
          radius="xl"
          onClick={onSecondaryAction}
          title={t('common.invite')}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            zIndex: 2,
            color: colors.secondary
          }}
        >
          <IconUserPlus size={18} stroke={1.5} />
        </ActionIcon>
      )}

      <Stack gap="xs" align="center" style={{ flex: 1, justifyContent: 'center' }}>
        {/* Icon with tooltip */}
        {icon && iconTooltip && (
          <Tooltip label={iconTooltip} withArrow position="top" openDelay={500}>
            <div style={{ cursor: 'help' }}>
              {icon}
            </div>
          </Tooltip>
        )}

        <Text c="dimmed" size="sm" ta="center">
          {title}
        </Text>
        {loading
          ? <Skeleton height={28} width={80} radius="sm" />
          : <Text fw={700} size="xl" ta="center">{value}</Text>
        }

        {/* Main action button - only show if showButton is true */}
        {showButton && (
          <Button
            variant="filled"
            onClick={onClick}
            rightSection={<IconChevronRight size={16} />}
            size="xs"
            fullWidth
            radius="lg"
            styles={{
              root: {
                background: '#00A8FF',
                border: 'none',
                fontWeight: 600,
                '&:hover': {
                  background: '#0096E6',
                }
              }
            }}
          >
            {buttonText}
          </Button>
        )}
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
  const router = useRouter();
  const { t } = useTranslation();
  const chainId = useChainId();
  const { status: walletStatus } = useAccount();
  // 使用自定义 hook 获取全局用户数据
  const { address, contractUserInfo, loadUserData, isLoadingBlockchainData } = useUser();
  const [bgColor] = useState('#FFF'); // Default light green background
  const [inviteModalOpened, { open: openInviteModal, close: closeInviteModal }] = useDisclosure(false);
  
  // 移除空的useEffect依赖 - loadUserData已在address变化时由UserContext处理
  // 仅保留日志
  useEffect(() => {
    console.log(`[Profile] mounted t=${performance.now().toFixed(0)}ms`);
  }, []);

  // 无address且钱包正在重连中（MetaMask内置浏览器需要几秒恢复连接），显示骨架屏
  if (!address && (walletStatus === 'connecting' || walletStatus === 'reconnecting')) {
    return (
      <div style={{ background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 50%, #93C5FD 100%)', minHeight: '100vh', paddingBottom: rem(80) }}>
        <Group px="md" py="lg">
          <Skeleton height={28} width={120} radius="sm" />
        </Group>
        <Container size="md" mb="md">
          <Skeleton height={160} radius="lg" />
        </Container>
        <Container size="md">
          <Skeleton height={200} radius="lg" />
        </Container>
      </div>
    );
  }

  // 真正断开连接时才显示提示
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
    <div style={{ 
      background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 50%, #93C5FD 100%)', 
      minHeight: '100vh', 
      paddingBottom: rem(80) 
    }}>
      {/* Header with title */}
      <Group px="md" py="lg" justify="space-between">
        <Text size="lg" fw={700} c="#1e293b">{t('profile.title')}</Text>
      </Group>

      {/* User profile card with level and info */}
      <Container size="md" mb="md">
        <Card 
          radius="lg" 
          p="md"
          styles={{
            root: {
              background: 'transparent',
              border: '1px solid rgba(59, 130, 246, 0.08)',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
            }
          }}
        >
          <Group justify="space-between" mb="sm">
            <Text fw={700} size="lg">{t('profile.userInfo')}</Text>
            <Box
              style={{
                background: vipColors[(contractUserInfo?.level || 0) as keyof typeof vipColors] || vipColors[0],
                borderRadius: '4px',
                padding: '4px 12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <Group gap={6}>
                <IconCrown size={20} color="white" stroke={1.5} />
                <Text fw={700} c="white" size="sm">VIP {contractUserInfo?.level}</Text>
              </Group>
            </Box>
          </Group>

          <Stack gap="sm">
            {/* Level progress */}
            <Box>
              <Group justify="space-between" mb={4}>
                <Text size="sm" c="dimmed">{t('profile.levelProgress')}</Text>
                {isLoadingBlockchainData && !contractUserInfo
                ? <Skeleton height={16} width={80} radius="sm" />
                : <Text size="sm" fw={500}>VIP {contractUserInfo?.level} / VIP 7</Text>
              }
              </Group>
              {isLoadingBlockchainData && !contractUserInfo
              ? <Skeleton height={8} radius="xl" />
              : <Progress
              value={(contractUserInfo?.level || 0) * (100 / 7)} /* Each level represents 100/7 % */
                size="md"
                radius="xl"
                color={colors.primary}
            />
            }
            </Box>

            {/* User info */}
            <Divider my="xs" variant="dashed" />


            {/* Inviter address row */}
            <Group justify="space-between" w="100%">
              <Text size="xs" c="dimmed" w={80}>{t('profile.inviter')}:</Text>
              {contractUserInfo?.upline && contractUserInfo?.upline !== '0x0000000000000000000000000000000000000000' ? (
                <Group wrap="nowrap" align="center" gap={4} style={{ flex: 1 }}>
                  <Text size="xs" c="dimmed">{formatAddress(contractUserInfo.upline)}</Text>
                  {/* <CopyButton value={contractUserInfo.upline || ''} timeout={2000}>
                    {({ copied, copy }) => (
                      <Tooltip label={copied ? t('common.copied') : t('common.copy')} withArrow position="top">
                        <ActionIcon variant="subtle" color={copied ? 'teal' : 'gray'} onClick={copy} size="xs">
                          {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton> */}
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

          <Space h="xs" />

        </Card>
      </Container>

      {/* Stats grid */}
      <Container size="md">
        <Card 
          radius="lg"
          styles={{
            root: {
              background: 'transparent',
            }
          }}
        >
          <Grid gutter={16}>
            <Grid.Col span={6}>
              <StatCard
                title={t('profile.myEarnings')}
                value={formatEther(contractUserInfo?.usdtIncome || BigInt(0)).substring(0, 8)}
                loading={isLoadingBlockchainData && !contractUserInfo}
                buttonText={t('common.details')}
                onClick={() => window.open(getConfigLink(chainId, "myIncomeLink", address), '_blank')}
                icon={<IconWallet size={32} color={colors.secondary} />}
                iconTooltip={t('profile.myEarningsTooltip')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <StatCard
                title={t('profile.myFriends')}
                value={contractUserInfo?.downlineCount || 0}
                loading={isLoadingBlockchainData && !contractUserInfo}
                buttonText={t('common.details')}
                onClick={() => router.push('/friend-list')}
                icon={<IconUsers size={32} color={colors.secondary} />}
                iconTooltip={t('profile.friendsTooltip')}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <StatCard
                title={t('profile.teamNodes')}
                value={contractUserInfo?.teamSalesCount || 0}
                loading={isLoadingBlockchainData && !contractUserInfo}
                buttonText={t('common.details')}
                onClick={() => router.push(`/team?address=${address}`)}
                icon={<IconDeviceMobile size={32} color={colors.secondary} />}
                iconTooltip={t('profile.teamNodesTooltip')}
              />
            </Grid.Col>
          </Grid>
        </Card>

        {/* Add some bottom padding */}
        <Space h="xs" />
      </Container>

      <Container size="md">
        <Card 
          radius="lg"
          styles={{
            root: {
              background: 'transparent',
            }
          }}
        >
          <Button
            fullWidth
            size="lg"
            radius="lg"
            leftSection={<IconUserPlus size={16} />}
            styles={{
              root: {
                background: '#00A8FF',
                border: 'none',
                fontWeight: 600,
                height: '48px',
                fontSize: '16px',
                '&:hover': {
                  background: '#0096E6',
                }
              }
            }}
            onClick={openInviteModal}
          >
            {t('common.invite')}
          </Button>
        </Card>

      </Container>

      {/* Invite Modal */}
      <InviteModal opened={inviteModalOpened} onClose={closeInviteModal} />
    </div>
  );
}