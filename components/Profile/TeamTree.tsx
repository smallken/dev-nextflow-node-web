import { Container, Text, Card, Stack, Loader, Group, Badge, ActionIcon, Tooltip, Collapse, Button } from '@mantine/core';
import { IconUsers, IconTree, IconRefresh, IconNfc, IconCloudOff, IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { getAddressFromUrl, User } from '../../services/thegraph';
import { graphClient } from '../../services/thegraph';
import { gql } from 'graphql-request';

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
function TeamNode({ member, level = 0 }: { member: User; level: number }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  
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
  
  return (
    <div style={{ paddingLeft: level > 0 ? `${level * 20}px` : '0' }}>
      <Card withBorder shadow="sm" padding="xs" mb="xs">
        <Group justify="space-between" align="center">
          <Group>
            {hasChildren && (
              <ActionIcon 
                size="sm" 
                onClick={toggleExpand} 
                variant="subtle"
              >
                {expanded ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
              </ActionIcon>
            )}
            <Text size="sm" fw={500}>{formatAddress(member.id)}</Text>
            <Badge size="sm" variant="filled" color="blue">VIP {member.vipLevel || 0}</Badge>
          </Group>
          
          <Group>
            <Group gap={4}>
              <IconNfc size={14} />
              <Text size="xs">{member.nodePurchasedTotal || '0'}</Text>
            </Group>
            <Group gap={4}>
              <IconTree size={14} />
              <Text size="xs">{member.childrenAmountIn10Levels || 0}</Text>
            </Group>
          </Group>
        </Group>
      </Card>
      
      <Collapse in={expanded}>
        {loading ? (
          <div style={{ padding: '10px 0', textAlign: 'center' }}>
            <Loader size="sm" />
          </div>
        ) : children.length > 0 ? (
          <div>
            {children.map((child) => (
              <TeamNode key={child.id} member={child} level={level + 1} />
            ))}
          </div>
        ) : expanded && hasChildren ? (
          <Text size="sm" c="dimmed" ta="center" py="xs">
            {t('team.loadingError', 'Error loading members')}
          </Text>
        ) : null}
      </Collapse>
    </div>
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
      
      {/* Team details */}
      <Card withBorder radius="md" padding="md" mb="md">
        <Group>
          <Text fw={600}>{t('team.viewing')}:</Text>
          <Text>{formatAddress(effectiveAddress)}</Text>
          <Badge>{t('team.totalNodes')}: {rootUser?.childrenAmountIn10Levels || 0}</Badge>
        </Group>
      </Card>
      
      {/* Tree view */}
      {members.length > 0 ? (
        <Card withBorder radius="md" padding="md">
          {members.map((member) => (
            <TeamNode key={member.id} member={member} level={0} />
          ))}
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
