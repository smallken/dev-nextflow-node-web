import { Card, Text, Group, Button, Container, Stack, rem, Box, Paper, Grid, Space, Progress, CopyButton, ActionIcon, Tooltip, Divider } from '@mantine/core';
import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';
import { useChainId } from 'wagmi';
import { colors, styles, vipColors } from '../../theme';
import { formatEther } from 'viem';
import { IconCrown, IconChevronRight, IconCopy, IconCheck, IconUserPlus, IconDeviceMobile, IconUsers, IconWallet } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { InviteModal } from '../User/InviteModal';
import { getConfigLink } from '../../config';




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
  iconTooltip
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
          background: '#FFFFFF',
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
        <Text fw={700} size="xl" ta="center">
          {value}
        </Text>

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
  // 使用自定义 hook 获取全局用户数据
  const { address, contractUserInfo, loadUserData } = useUser();
  const [bgColor] = useState('#FFF'); // Default light green background
  const [inviteModalOpened, { open: openInviteModal, close: closeInviteModal }] = useDisclosure(false);
  
  // Trigger user data loading when component mounts
  useEffect(() => {
    loadUserData();
  }, []);


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
    <div style={{ 
      background: 'linear-gradient(135deg, #E8F4FF 0%, #F0F9FF 100%)', 
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
              background: '#FFFFFF',
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
                <Text size="sm" fw={500}>VIP {contractUserInfo?.level} / VIP 7</Text>
              </Group>
              <Progress
                value={(contractUserInfo?.level || 0) * (100 / 7)} /* Each level represents 100/7 % */
                size="md"
                radius="xl"
                color={colors.primary}
              />
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
              background: '#FFFFFF',
              border: '1px solid rgba(59, 130, 246, 0.08)',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
            }
          }}
        >
          <Grid gutter={16}>
            <Grid.Col span={6}>
              <StatCard
                title={t('profile.myEarnings')}
                value={formatEther(contractUserInfo?.usdtIncome || BigInt(0)).substring(0, 8)}
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
              background: '#FFFFFF',
              border: '1px solid rgba(59, 130, 246, 0.08)',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
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