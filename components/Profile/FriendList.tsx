import { Card, Text, Group, Container, Stack, Paper, Badge, Modal, Button, Grid, Divider, rem, Loader, ActionIcon, CopyButton, Avatar, Tooltip, Center } from '@mantine/core';
import { ProfileBreadcrumbs } from '../Layout/ProfileBreadcrumbs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { colors, styles, vipColors } from '../../theme';
import { IconUsers,  IconEye, IconUserPlus, IconDeviceMobile } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { useDisclosure } from '@mantine/hooks';
import { InviteModal } from '../User/InviteModal';
import { getUserWithFriends, getAddressFromUrl, User } from '../../services/thegraph';
import { useAccount } from 'wagmi';
import { formatEther } from 'viem';
import { UserDetailModal, UserDetail } from '../User/UserDetailModal';

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

/**
 * 根据团队业绩计算等级
 * 与合约中的等级规则保持一致
 */
function calculateLevelByTeamSales(teamSales: number): number {
  if (teamSales >= 300) return 5;
  if (teamSales >= 100) return 4;
  if (teamSales >= 30) return 3;
  if (teamSales >= 10) return 2;
  return 1;
}

// Friend card component
function FriendCard({ friend, friendData, onClick }: { friend: string; friendData: User; onClick: () => void }) {
  const { t } = useTranslation();
  const [salesTooltipOpened, setSalesTooltipOpened] = useState(false);
  const [teamTooltipOpened, setTeamTooltipOpened] = useState(false);

  // 从nextflow-subgraph schema获取字段并计算等级
  const teamSalesCount = Number(friendData.teamSalesCount || 0);
  const level = calculateLevelByTeamSales(teamSalesCount);
  const salesCount = Number(friendData.salesCount || 0);

  // 处理销售数量提示点击（移动端）
  const handleSalesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSalesTooltipOpened(true);
    setTimeout(() => {
      setSalesTooltipOpened(false);
    }, 2000);
  };

  // 处理团队业绩提示点击（移动端）
  const handleTeamClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTeamTooltipOpened(true);
    setTimeout(() => {
      setTeamTooltipOpened(false);
    }, 2000);
  };

  return (
    <Paper radius="md" withBorder p="sm" mb="sm" onClick={onClick} style={{ cursor: 'pointer', position: 'relative' }}>
      <Group align="center">
        {/* Left side: Address and VIP */}
        <Group gap="xs">
          <Badge
            size="sm"
            variant="filled"
            radius="xl"
            style={styles.vipBadge(level)}
          >
            {t('friends.vip')} {level}
          </Badge>
          <Text size="sm" fw={500} style={{ fontFamily: '"Pixel", monospace' }}>
            {formatAddress(friend)}
          </Text>

          {/* Node count - 使用salesCount */}
          <Tooltip
            label={t('team.salesCountTooltip')}
            withArrow
            position="top"
            opened={salesTooltipOpened}
          >
            <Group
              gap="xs"
              align="center"
              onClick={handleSalesClick}
              onMouseEnter={() => setSalesTooltipOpened(true)}
              onMouseLeave={() => setSalesTooltipOpened(false)}
              style={{ cursor: 'pointer' }}
            >
              <IconDeviceMobile size={16} stroke={1.5} />
              <Text size="sm" fw={700}>{salesCount}</Text>
            </Group>
          </Tooltip>

          {/* Direct referrals */}
          <Tooltip
            label={t('team.teamSalesCountTooltip')}
            withArrow
            position="top"
            opened={teamTooltipOpened}
          >
            <Group
              gap="xs"
              align="center"
              onClick={handleTeamClick}
              onMouseEnter={() => setTeamTooltipOpened(true)}
              onMouseLeave={() => setTeamTooltipOpened(false)}
              style={{ cursor: 'pointer' }}
            >
              <IconUsers size={16} stroke={1.5} />
              <Text size="sm" fw={700}>{friendData.referrals?.length || 0}</Text>
            </Group>
          </Tooltip>
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
  const router = useRouter();
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
  
  const [selectedFriend, setSelectedFriend] = useState<UserDetail | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
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
      // 从nextflow-subgraph schema获取字段并计算等级
      const teamSalesCount = Number(friendData.teamSalesCount || 0);
      const level = calculateLevelByTeamSales(teamSalesCount);
      const salesCount = Number(friendData.salesCount || 0);
      const usdtIncome = friendData.usdtIncome || '0';

      // Open user detail modal with this friend's data
      setSelectedFriend({
        address: friendData.id,
        level: level,
        nodeCount: salesCount.toString(),
        directReferrals: friendData.referrals?.length || 0,
        teamNodesCount: teamSalesCount,
        income: formatEther(BigInt(usdtIncome)).toString()
      });
      setModalOpened(true);
    }
  };

  // If user is not connected or data is not loaded, show a placeholder
  if (!effectiveAddress) {
    return (
      <Container size="md" py="md">
        {/* Breadcrumbs navigation */}
        <ProfileBreadcrumbs currentPage="friends" />
        
        <Card withBorder radius="md" padding="xl">
          <Text ta="center" fw={500} size="lg">{t('profile.connectWallet')}</Text>
        </Card>
      </Container>
    );
  }
  
  // Show loading state
  if (loading) {
    return (
      <Container size="md" py="md">
        {/* Breadcrumbs navigation */}
        <ProfileBreadcrumbs currentPage="friends" />
        
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
      {/* Breadcrumbs navigation */}
      <Container size="md" mt="md">
        <ProfileBreadcrumbs currentPage="friends" />
      </Container>
      
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
      
      {/* User Detail Modal for friends */}
      <UserDetailModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        user={selectedFriend}
      />
      
      {/* Invite Modal */}
      <InviteModal opened={inviteModalOpened} onClose={closeInviteModal} />
    </div>
  );
}
