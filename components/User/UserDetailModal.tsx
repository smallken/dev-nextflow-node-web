import { Modal, Text, Group, ActionIcon, CopyButton, Badge, Divider, Grid, Stack, Button, rem } from '@mantine/core';
import { IconArrowsMaximize, IconCheck, IconCoin, IconCopy, IconCrown, IconNfc, IconTree, IconUsers } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { colors, styles, vipColors } from '../../theme';

// Helper function to format wallet address for display
function formatAddress(address: string | undefined): string {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

// Interface for user details to display in modal
export interface UserDetail {
  address: string;
  level?: number;
  nodeCount?: string | number;
  directReferrals?: number;
  teamNodesCount?: number;
  income?: string;
}

// User detail modal component
export function UserDetailModal({ 
  opened, 
  onClose, 
  user 
}: { 
  opened: boolean; 
  onClose: () => void; 
  user: UserDetail | null 
}) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  
  if (!user) return null;
  
  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={<Text fw={700} style={{ width: '100%', textAlign: 'center' }}>{t('userDetails', 'User Details')}</Text>} 
      size="auto"
      radius="md"
      transitionProps={{ transition: 'slide-up' }}
      styles={{
        header: { background: colors.background, display: 'flex', justifyContent: 'center' },
        title: { width: '100%', textAlign: 'center' },
        body: { padding: '0 !important' },
        content: { 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          maxHeight: '70vh', 
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
        overlay: { opacity: 0.35 }
      }}
      centered
    >
      <div style={{ padding: rem(20) }}>
        {/* User name/address with copy and expand */}
        <div style={{ width: '100%' }}>
          {expanded ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Text size="sm" fw={500} style={{ wordBreak: 'break-all', flex: 1 }}>{user.address}</Text>
              <Group gap="xs" style={{ flexShrink: 0, marginLeft: '8px' }}>
                <ActionIcon 
                  variant="subtle" 
                  onClick={() => setExpanded(!expanded)}>
                  <IconArrowsMaximize size={18} />
                </ActionIcon>
                <CopyButton value={user.address} timeout={2000}>
                  {({ copied, copy }) => (
                    <ActionIcon 
                      color={copied ? colors.success : colors.textSecondary}
                      variant="subtle"
                      onClick={copy}
                    >
                      {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                    </ActionIcon>
                  )}
                </CopyButton>
              </Group>
            </div>
          ) : (
            <Group justify="center" align="center" style={{ width: '100%' }}>
              <Text size="lg" fw={500}>{formatAddress(user.address)}</Text>
              <Group gap="xs">
                <ActionIcon 
                  variant="subtle" 
                  onClick={() => setExpanded(!expanded)}>
                  <IconArrowsMaximize size={18} />
                </ActionIcon>
                <CopyButton value={user.address} timeout={2000}>
                  {({ copied, copy }) => (
                    <ActionIcon 
                      color={copied ? colors.success : colors.textSecondary}
                      variant="subtle"
                      onClick={copy}
                    >
                      {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                    </ActionIcon>
                  )}
                </CopyButton>
              </Group>
            </Group>
          )}
        </div>
        
        <Group justify="center" mb="md" mt="md">
          <Badge 
            leftSection={<IconCrown size={14} />}
            size="lg"
            style={styles.vipBadge(user.level || 0)}
          >
            {t('friends.vip')} {user.level || 0}
          </Badge>
        </Group>

        <Divider my="sm" />
        
        {/* Stats grid with 4 metrics */}
        <Grid>
          <Grid.Col span={6}>
            <Stack align="center" gap="xs">
              <Group align="center" gap={5}>
                <IconNfc size={16} />
                <Text size="sm" c="dimmed">{t('friends.nodeCount')}</Text>
              </Group>
              <Text size="xl" fw={700}>{user.nodeCount || '0'}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack align="center" gap="xs">
              <Group align="center" gap={5}>
                <IconUsers size={16} />
                <Text size="sm" c="dimmed">{t('friends.directReferrals')}</Text>
              </Group>
              <Text size="xl" fw={700}>{user.directReferrals || '0'}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6} mt="md">
            <Stack align="center" gap="xs">
              <Group align="center" gap={5}>
                <IconTree size={16} />
                <Text size="sm" c="dimmed">{t('friends.teamNodes')}</Text>
              </Group>
              <Text size="xl" fw={700}>{user.teamNodesCount || '0'}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6} mt="md">
            <Stack align="center" gap="xs">
              <Group align="center" gap={5}>
                <IconCoin size={16} />
                <Text size="sm" c="dimmed">{t('friends.income')}</Text>
              </Group>
              <Text size="xl" fw={700}>${user.income || '0'}</Text>
            </Stack>
          </Grid.Col>
        </Grid>
        
        <Button fullWidth style={styles.primaryButton} onClick={onClose} mt="md">
          {t('common.close')}
        </Button>
      </div>
    </Modal>
  );
}
