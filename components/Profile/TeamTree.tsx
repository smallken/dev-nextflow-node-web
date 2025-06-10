import { Container, Text, Card, Stack, Loader, Group, Badge, ActionIcon, Tooltip, Collapse, Button, Box, Grid } from '@mantine/core';
import { IconUsers, IconTree, IconRefresh, IconNfc, IconCloudOff, IconChevronDown, IconChevronRight, IconInfoCircle } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { getAddressFromUrl, User } from '../../services/thegraph';
import { graphClient } from '../../services/thegraph';
import { gql } from 'graphql-request';
import { UserDetailModal, UserDetail } from '../../components/User/UserDetailModal';

// Query to get a user's direct referrals
const GET_USER_REFERRALS = gql`
  query GetUserReferrals($userId: String!) {
    user(id: $userId) {
      id
      referrals {
        id
        vipLevel
        nodePurchasedTotal
        childrenAmountIn10Levels
        referrals {
          id
        }
      }
    }
  }
`;

// Helper function to format wallet address for display
function formatAddress(address: string | undefined): string {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

// Interface for team member data
interface TeamMember {
  id: string;
  vipLevel: number;
  nodePurchasedTotal: string;
  childrenAmountIn10Levels: number;
  hasChildren: boolean;
}

// Component for showing a team member with lazy-loaded children
function TeamNode({ member, level = 0, maxLevel = 3 }: { member: User; level: number; maxLevel?: number }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  
  const hasChildren = (member.referrals?.length || 0) > 0;
  
  // Function to load children when expanded
  const loadChildren = async () => {
    if (children.length > 0 || !hasChildren) return;
    
    setLoading(true);
    try {
      const { user } = await graphClient.request<{ user: User }>(GET_USER_REFERRALS, {
        userId: member.id.toLowerCase(),
      });
      
      if (user && user.referrals) {
        setChildren(user.referrals);
      }
    } catch (error) {
      console.error(`Error loading children for ${member.id}:`, error);
    } finally {
      setLoading(false);
    }
  };
  
  const toggleExpand = () => {
    if (!expanded && hasChildren) {
      loadChildren();
    }
    setExpanded(!expanded);
  };

  const openUserDetail = () => {
    setSelectedUser({
      address: member.id,
      level: member.vipLevel,
      nodeCount: member.nodePurchasedTotal,
      directReferrals: member.referrals?.length || 0,
      teamNodesCount: member.childrenAmountIn10Levels,
      income: '0' // 这里可能需要从API获取
    });
    setModalOpened(true);
  };
  
  // 计算缩进的容器宽度，避免过度缩进
  const containerStyles = {
    width: '100%',
    marginLeft: level > 0 ? `${Math.min(level, maxLevel) * 16}px` : '0',
    paddingRight: level > 0 ? '16px' : '0',
    boxSizing: 'border-box' as const
  };
  
  return (
    <Box style={containerStyles} mb={4}>
      {/* 简化为单行的节点显示 */}
      <Card 
        withBorder 
        shadow="sm" 
        padding={4} 
        style={{ overflow: 'visible', cursor: 'pointer' }} 
        onClick={openUserDetail} // 卡片整体可点击以打开详情
      >
        <Group justify="space-between" align="center" wrap="nowrap" style={{ minHeight: '32px' }}>
          <Group gap="xs" wrap="nowrap" style={{ flex: 1, overflow: 'hidden' }}>
            {hasChildren && (
              <ActionIcon 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation(); // 防止触发卡片的点击事件
                  toggleExpand();
                }} 
                variant="subtle"
              >
                {expanded ? <IconChevronDown size={14} /> : <IconChevronRight size={14} />}
              </ActionIcon>
            )}
            <Text size="xs" fw={500} lineClamp={1}>{formatAddress(member.id)}</Text>
            <Badge size="xs" variant="filled" color="blue" style={{ whiteSpace: 'nowrap' }}>VIP {member.vipLevel || 0}</Badge>
          </Group>
          
          <Group gap={6} wrap="nowrap">
            <Group gap={4} wrap="nowrap">
              <IconNfc size={12} />
              <Text size="xs">{member.nodePurchasedTotal || '0'}</Text>
            </Group>
          </Group>
        </Group>
      </Card>
      
      {/* 显示子节点 */}
      <Collapse in={expanded}>
        {loading ? (
          <div style={{ padding: '4px 0', textAlign: 'center' }}>
            <Loader size="xs" />
          </div>
        ) : children.length > 0 ? (
          <div>
            {children.map((child) => (
              <TeamNode key={child.id} member={child} level={level + 1} maxLevel={maxLevel} />
            ))}
          </div>
        ) : expanded && hasChildren ? (
          <Text size="xs" c="dimmed" ta="center" py="xs">
            {t('team.loadingError', 'Error loading members')}
          </Text>
        ) : null}
      </Collapse>

      {/* 用户详情模态框 */}
      <UserDetailModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        user={selectedUser}
      />
    </Box>
  );
}

export function TeamTree() {
  const { t } = useTranslation();
  const { address: connectedAddress } = useAccount();
  
  // Get address from URL if present, otherwise use connected wallet address
  const urlAddress = getAddressFromUrl();
  const effectiveAddress = urlAddress || connectedAddress;
  
  const [loading, setLoading] = useState(true);
  const [rootUser, setRootUser] = useState<User | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  
  // Fetch root user data on component mount
  useEffect(() => {
    async function fetchRootUser() {
      if (!effectiveAddress) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const { user } = await graphClient.request<{ user: User }>(GET_USER_REFERRALS, {
          userId: effectiveAddress.toLowerCase(),
        });
        
        setRootUser(user);
        
        // Set the direct referrals as the initial members
        if (user && user.referrals) {
          setMembers(user.referrals);
        }
      } catch (error) {
        console.error('Error fetching root user data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRootUser();
  }, [effectiveAddress]);


  
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
            <Text ta="center" fw={500} size="lg">{t('team.loading')}</Text>
          </Stack>
        </Card>
      </Container>
    );
  }
  
  // If no user data found
  if (!rootUser) {
    return (
      <Container size="md" py="xl">
        <Card withBorder radius="md" padding="xl">
          <Stack align="center" gap="md">
            <Text ta="center" fw={500} size="lg" c="red">{t('team.error')}</Text>
            <Text ta="center" size="sm" c="dimmed">{t('team.userNotFound')}</Text>
          </Stack>
        </Card>
      </Container>
    );
  }
  
  return (
    <Container size="md" py="md">
      {/* Header with title */}
      <Group justify="space-between" align="center" mb="md">
        <Group gap="md" align="center">
          <Text fw={700} size="xl" style={{ fontFamily: '"Pixel", monospace' }}>
            {t('team.title')}
          </Text>
          <Badge size="lg" radius="xl" style={{ background: '#40c057', color: 'white' }}>
            <Group gap="xs">
              <IconTree size={16} />
              {rootUser?.childrenAmountIn10Levels || 0}
            </Group>
          </Badge>
        </Group>
        
        <Tooltip label={t('team.refresh')} withArrow position="left">
          <ActionIcon 
            variant="light" 
            color="green" 
            size="lg" 
            radius="xl" 
            onClick={() => window.location.reload()}
          >
            <IconRefresh size={24} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Group>
      
      {/* Team header with root user info */}
      <Card shadow="sm" withBorder mb="md">
        <Group justify="space-between" align="center">
          <Stack gap="xs">
            <Text size="lg" fw={700}>{t('team.title', 'My Team')}</Text>
            <Group align="center" gap="xs">
              <Text size="sm">{rootUser ? formatAddress(rootUser.id) : ''}</Text>
              {rootUser ? (
                <Badge size="sm" variant="filled" color="blue">VIP {rootUser.vipLevel || 0}</Badge>
              ) : null}
            </Group>
          </Stack>

          <Group gap="sm">
            <ActionIcon 
              variant="light" 
              color="blue" 
              title={t('common.refresh', 'Refresh')} 
              onClick={() => window.location.reload()}
            >
              <IconRefresh size={18} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </Card>
      
      {/* Team tree with fixed width container */}
      {members.length > 0 ? (
        <Card withBorder radius="md" padding="md">
          <Box style={{ maxWidth: '100%', overflow: 'auto' }}>
            {members.map((member) => (
              <TeamNode key={member.id} member={member} level={0} />
            ))}
          </Box>
        </Card>
      ) : (
        <Card withBorder radius="md" padding="xl">
          <Stack align="center" py="md">
            <IconCloudOff size={48} stroke={1.5} color="#ADB5BD" />
            <Text ta="center" size="lg" fw={500}>{t('team.noMembers', 'No team members found')}</Text>
            <Text ta="center" c="dimmed" size="sm">{t('team.emptyTeam', 'This user has no team members yet')}</Text>
          </Stack>
        </Card>
      )}
    </Container>
  );
}
