import { Card, Text, Group, Container, Stack, Paper, Badge, Modal, Button, Grid, Divider, rem, Loader, ActionIcon, CopyButton, Avatar, Tooltip, Center } from '@mantine/core';
import dynamic from 'next/dynamic';
import { colors, styles, vipColors } from '../../theme';
import { IconUsers, IconCrown, IconCopy, IconCheck, IconArrowsMaximize, IconNfc, IconTree, IconInfoCircle, IconCoin, IconEye, IconWindow, IconUserPlus } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { useDisclosure } from '@mantine/hooks';
import { InviteModal } from '../User/InviteModal';
import { getUserWithFriends, getAddressFromUrl, User } from '../../services/thegraph';
import { useAccount } from 'wagmi';
import { formatEther } from 'viem';

// Type for friend details
interface FriendDetail {
  address: string;
  nodeCount: string;
  directReferrals: number;
  level: number;
  teamNodesCount: number;
  income?: string; // Added income field
}

// Helper function to format wallet address for display
function formatAddress(address: string | undefined): string {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

// Function to generate a deterministic color based on address
function generateColorFromAddress(address: string): string {
  const colors = [
    '#1C7ED6', '#FD7E14', '#FA5252', '#7950F2', 
    '#12B886', '#228BE6', '#40C057', '#BE4BDB'
  ];
  // Use the first few characters of the address as a simple hash
  const hash = parseInt(address.substring(2, 8), 16);
  return colors[hash % colors.length];
}

// Simple stat component to display a metric with label and icon
interface StatProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

function Stat({ label, value, icon }: StatProps) {
  return (
    <Stack align="center" gap={0} style={{ width: '100%' }}>
      {icon && <div>{icon}</div>}
      <Text size="lg" fw={700} style={{ fontFamily: '"Pixel", monospace' }}>{value}</Text>
      <Text size="xs" c="dimmed">{label}</Text>
    </Stack>
  );
}

// Friend card component
function FriendCard({ friend, friendData, onClick }: { friend: string; friendData: User; onClick: () => void }) {
  const { t } = useTranslation();
  
  return (
    <Paper radius="md" withBorder p="sm" mb="sm" onClick={onClick} style={{ cursor: 'pointer', position: 'relative' }}>
      <Group align="center">
        {/* Left side: Address and VIP */}
        <Group gap="xs">
          <Badge 
            size="sm"
            variant="filled"
            radius="xl"
            style={styles.vipBadge(friendData.vipLevel || 0)}
          >
            {t('friends.vip')} {friendData.vipLevel || 0}
          </Badge>
          <Text size="sm" fw={500} style={{ fontFamily: '"Pixel", monospace' }}>
            {formatAddress(friend)}
          </Text>

          {/* Node count */}
          <Group gap="xs" align="center">
            <IconNfc size={16} stroke={1.5} />
            <Text size="sm" fw={700}>{friendData.nodePurchasedTotal || '0'}</Text>
          </Group>
          
          {/* Direct referrals */}
          <Group gap="xs" align="center">
            <IconUsers size={16} stroke={1.5} />
            <Text size="sm" fw={700}>{friendData.referrals?.length || 0}</Text>
          </Group>
        </Group>
      </Group>
      
      {/* Detail icon - positioned absolutely at right edge */}
      <ActionIcon 
        variant="light"
        color="gray"
        radius="xl"
        size="sm"
        style={{ 
          position: 'absolute', 
          top: '50%', 
          right: '12px',
          transform: 'translateY(-50%)',
          zIndex: 2
        }}
        onClick={(e) => {
          e.stopPropagation(); // To prevent the card click event
          onClick();
        }}
      >
        <IconEye size={16} stroke={1.5} />
      </ActionIcon>
    </Paper>
  );
}

// Friend detail modal component
function FriendDetailModal({ opened, onClose, friend }: { opened: boolean; onClose: () => void; friend: FriendDetail | null }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  
  if (!friend) return null;
  
  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={<Text fw={700} style={{ width: '100%', textAlign: 'center' }}>{t('friends.friendDetails')}</Text>} 
      size="auto"
      radius="md"
      transitionProps={{ transition: 'slide-up' }}
      styles={{
        header: { background: '#f8f9fa', display: 'flex', justifyContent: 'center' },
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
        {/* Friend name/address with copy and expand */}
        <div style={{ width: '100%' }}>
          {expanded ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Text size="sm" fw={500} style={{ wordBreak: 'break-all', flex: 1 }}>{friend.address}</Text>
              <Group gap="xs" style={{ flexShrink: 0, marginLeft: '8px' }}>
                <ActionIcon 
                  variant="subtle" 
                  onClick={() => setExpanded(!expanded)}>
                  <IconArrowsMaximize size={18} />
                </ActionIcon>
                <CopyButton value={friend.address} timeout={2000}>
                  {({ copied, copy }) => (
                    <ActionIcon 
                      color={copied ? 'teal' : 'gray'}
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
              <Text size="lg" fw={500}>{formatAddress(friend.address)}</Text>
              <Group gap="xs">
                <ActionIcon 
                  variant="subtle" 
                  onClick={() => setExpanded(!expanded)}>
                  <IconArrowsMaximize size={18} />
                </ActionIcon>
                <CopyButton value={friend.address} timeout={2000}>
                  {({ copied, copy }) => (
                    <ActionIcon 
                      color={copied ? 'teal' : 'gray'}
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
            style={styles.vipBadge(friend.level || 0)}
          >
            {t('friends.level')} {friend.level}
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
              <Text size="xl" fw={700}>{friend.nodeCount}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack align="center" gap="xs">
              <Group align="center" gap={5}>
                <IconUsers size={16} />
                <Text size="sm" c="dimmed">{t('friends.directReferrals')}</Text>
              </Group>
              <Text size="xl" fw={700}>{friend.directReferrals}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6} mt="md">
            <Stack align="center" gap="xs">
              <Group align="center" gap={5}>
                <IconTree size={16} />
                <Text size="sm" c="dimmed">{t('friends.teamNodes')}</Text>
              </Group>
              <Text size="xl" fw={700}>{friend.teamNodesCount}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6} mt="md">
            <Stack align="center" gap="xs">
              <Group align="center" gap={5}>
                <IconCoin size={16} />
                <Text size="sm" c="dimmed">{t('friends.income')}</Text>
              </Group>
              <Text size="xl" fw={700}>${friend.income || '0'}</Text>
            </Stack>
          </Grid.Col>
        </Grid>
        
        <Button fullWidth style={{ background: '#F2AE00' }} onClick={onClose} mt="md">
          {t('common.close')}
        </Button>
      </div>
    </Modal>
  );
}

// Create a client-only version of the FriendList component to avoid hydration issues
const FriendListClient = dynamic(() => Promise.resolve(FriendListComponent), {
  ssr: false
});

// Export the client-side only version
export function FriendList() {
  return <FriendListClient />;
}

// Main implementation of the component
function FriendListComponent() {
  const { t } = useTranslation();
  // Use wagmi to get connected wallet address
  const { address: connectedAddress } = useAccount();
  
  // Get address from URL if present, otherwise use connected wallet address
  const urlAddress = getAddressFromUrl();
  const effectiveAddress = urlAddress || connectedAddress;
  
  const [bgColor] = useState('#fff'); // Match the lighter green background in the image
  
  // State for GraphQL data
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [friends, setFriends] = useState<User[]>([]);
  
  const [selectedFriend, setSelectedFriend] = useState<FriendDetail | null>(null);
  const [opened, { open: openDetailModal, close: closeDetailModal }] = useDisclosure(false);
  const [inviteModalOpened, { open: openInviteModal, close: closeInviteModal }] = useDisclosure(false);
  
  // Fetch user data from TheGraph
  useEffect(() => {
    async function fetchData() {
      if (!effectiveAddress) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const user = await getUserWithFriends(effectiveAddress);
        setUserData(user);
        setFriends(user?.referrals || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [effectiveAddress]);
  
  // Handle friend card click to show details
  const handleFriendClick = (friend: string) => {
    // Find the friend in user data
    const friendData = friends.find(f => f.id === friend);
    if (friendData) {
      // Format friend data for modal
      setSelectedFriend({
        address: friendData.id,
        nodeCount: friendData.nodePurchasedTotal?.toString() || '0',
        directReferrals: friendData.referrals?.length || 0,
        level: friendData.vipLevel || 0,
        teamNodesCount: friendData.childrenAmountIn10Levels || 0,
        income: formatEther(BigInt(friendData.income || 0)).toString() // Placeholder - replace with real income data when available
      });
      openDetailModal();
    }
  };

  // If user is not connected or data is not loaded, show a placeholder
  if (!effectiveAddress) {
    return (
      <Container size="md" py="xl">
        <Card withBorder radius="md" padding="xl">
          <Text ta="center" fw={500} size="lg">{t('profile.connectWallet')}</Text>
        </Card>
      </Container>
    );
  }
  
  // Show loading state
  if (loading) {
    return (
      <Container size="md" py="xl">
        <Card withBorder radius="md" padding="xl">
          <Stack align="center" gap="md">
            <Loader size="md" />
            <Text ta="center" mt="xl" size="lg" c="green">{t('common.loading')}</Text>
          </Stack>
        </Card>
      </Container>
    );
  }

  return (
    <div style={{ background: bgColor, minHeight: '100vh', paddingBottom: rem(20) }}>
      {/* Header */}
      <Container size="md" mt="md" mb="xl">
        {/* Header with title, count badge and invite button */}
        <Group justify="space-between" align="center" mb="md">
          <Group gap="md" align="center">
            <Text fw={700} size="xl" style={{ fontFamily: '"Pixel", monospace' }}>{t('friends.title')}</Text>
            <Badge size="lg" radius="xl" style={{ background: colors.secondary, color: 'white' }}>
              <Group gap="xs">
                <IconUsers size={16} />
                {userData?.referrals?.length || 0}
              </Group>
            </Badge>
          </Group>
          
          <ActionIcon 
            variant="light" 
            color="green" 
            size="lg" 
            radius="xl" 
            onClick={openInviteModal}
            title={t('common.invite')}
          >
            <IconUserPlus size={24} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
      {/* Friends list */}
     
      <Container size="md" style={{ fontFamily: '"Pixel", monospace' }}>
    
        {friends.length > 0 ? (
          <div>
            {friends.map((friend) => (
              <FriendCard 
                key={friend.id} 
                friend={friend.id} 
                friendData={friend}
                onClick={() => handleFriendClick(friend.id)} 
              />
            ))}
          </div>
        ) : (
          <Stack align="center" py="xl">
            <IconUsers size={48} stroke={1.5} color="#ADB5BD" />
            <Text ta="center" size="lg" fw={500}>{t('friends.noFriends')}</Text>
            <Text ta="center" c="dimmed" size="sm">{t('friends.inviteMessage')}</Text>
            
            <Button
              leftSection={<IconUserPlus size={16} />}
              variant="filled"
              color="#40c057"
              mt="md"
              onClick={openInviteModal}
            >
              {t('common.invite')}
            </Button>
          </Stack>
        )}
      </Container>
      
      {/* Friend detail modal */}
      <FriendDetailModal opened={opened} onClose={closeDetailModal} friend={selectedFriend} />
      
      {/* Invite Modal */}
      <InviteModal opened={inviteModalOpened} onClose={closeInviteModal} />
    </div>
  );
}
