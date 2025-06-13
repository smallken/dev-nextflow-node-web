import { Container, Text, Card, Stack, Loader, Group, Badge, ActionIcon, Tooltip, Box, Center } from '@mantine/core';
import { Tree, TreeNodeData, useTree } from '@mantine/core';
import dynamic from 'next/dynamic';
import { colors, styles, vipColors } from '../../theme';
import { IconUsers, IconTree, IconRefresh, IconNfc, IconCloudOff, IconInfoCircle, IconEye, 
  IconChevronRight, IconChevronDown, IconFile, IconFolder, IconFolderOpen } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { getAddressFromUrl, User } from '../../services/thegraph';
import { graphClient } from '../../services/thegraph';
import { gql } from 'graphql-request';
import { UserDetailModal, UserDetail } from '../../components/User/UserDetailModal';
import { formatEther } from 'viem';

// Query to get a user's direct referrals
const GET_USER_REFERRALS = gql`
  query GetUserReferrals($userId: String!) {
    user(id: $userId) {
      id
      vipLevel
      nodePurchasedTotal
      childrenAmountIn10Levels
      income
      referrals {
        id
        vipLevel
        nodePurchasedTotal
        childrenAmountIn10Levels
        income
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

// Interface for team node data
interface TeamNodeData extends User {
  hasChildren: boolean;
  isLoading?: boolean;
}

// Interface for tree node with user data
interface ExtendedTreeNodeData extends TreeNodeData {
  userData?: TeamNodeData;
}

// Custom component for tree node with icons based on node type and state
function TreeNodeLabel({ node, expandedState }: { node: TeamNodeData, expandedState: Record<string, boolean> }) {
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const isExpanded = expandedState[node.id];

  const openUserDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedUser({
      address: node.id,
      level: node.vipLevel,
      nodeCount: node.nodePurchasedTotal,
      directReferrals: node.referrals?.length || 0,
      teamNodesCount: node.childrenAmountIn10Levels,
      income: formatEther(BigInt(node.income || 0)).toString() 
    });
    setModalOpened(true);
  };
  
  // Determine which icon to show based on node type and expand state
  const nodeIcon = node.hasChildren
    ? isExpanded
      ? <IconFolderOpen size={18} color="#228be6" />
      : <IconFolder size={18} color="#228be6" />
    : <IconFile size={18} color="#868e96" />;

  // Determine expand/collapse arrow icon
  const expandIcon = node.hasChildren
    ? isExpanded
      ? <IconChevronDown size={14} />
      : <IconChevronRight size={14} />
    : null;

  return (
    <>
      <Group justify="space-between" align="center" wrap="nowrap" style={{ minHeight: '28px', width: '100%', padding: '0 4px' }}>
        <Group gap="xs" wrap="nowrap" style={{ flex: 1, overflow: 'hidden'}}>
          {nodeIcon}
          <Text size="xs" fw={500} lineClamp={1}>{formatAddress(node.id)}</Text>
          <Badge size="xs" variant="filled" style={{ ...styles.vipBadge(node.vipLevel || 0), whiteSpace: 'nowrap' }}>{t('team.vipPrefix')} {node.vipLevel || 0}</Badge>
        </Group>
        
        <Group gap={8} wrap="nowrap">
          <Group gap={4} wrap="nowrap">
            <IconUsers size={12} />
            <Text size="xs">{node.childrenAmountIn10Levels || 0}</Text>
          </Group>
          
          <ActionIcon 
            variant="subtle"
            color="gray"
            radius="xl"
            size="xs"
            onClick={openUserDetail}
          >
            <IconEye size={12} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Group>

      <UserDetailModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        user={selectedUser}
      />
    </>
  );
}

// Create a client-only version of the TeamTree2 component to avoid hydration issues
const TeamTree2Client = dynamic(() => Promise.resolve(TeamTree2Component), {
  ssr: false
});

// Export the client-side only version
export function TeamTree2() {
  return <TeamTree2Client />;
}

// Main implementation of the component
function TeamTree2Component() {
  const { t } = useTranslation();
  const { address: connectedAddress } = useAccount();
  
  // Get address from URL if present, otherwise use connected wallet address
  const urlAddress = getAddressFromUrl();
  const effectiveAddress = urlAddress || connectedAddress;
  
  const [loading, setLoading] = useState(true);
  const [rootUser, setRootUser] = useState<User | null>(null);
  const [treeData, setTreeData] = useState<ExtendedTreeNodeData[]>([]);
  const [loadingNodes, setLoadingNodes] = useState<Record<string, boolean>>({});
  const [loadedNodes, setLoadedNodes] = useState<Record<string, boolean>>({});
  
  // Initialize tree with useTree hook for expanded state control
  const tree = useTree({
    onNodeExpand: handleNodeExpand
  });
  
  // Function to convert user data to tree nodes
  const mapUserToTreeNode = (user: User): ExtendedTreeNodeData => {
    const hasChildren = (user.referrals?.length || 0) > 0;
    
    return {
      value: user.id,
      label: <TreeNodeLabel node={{ ...user, hasChildren }} expandedState={tree.expandedState} />,
      userData: { ...user, hasChildren },
      // If there are children but not loaded yet, set empty array to allow lazy loading
      children: hasChildren ? [] : undefined
    };
  };
  
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
        
        // Set the direct referrals as the initial nodes
        if (user && user.referrals) {
          const initialNodes = user.referrals.map(mapUserToTreeNode);
          setTreeData(initialNodes);
        }
      } catch (error) {
        console.error('Error fetching root user data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRootUser();
  }, [effectiveAddress]);

  // Effect to update nodes when tree.expandedState changes
  useEffect(() => {
    // When tree state is updated, remap the nodes to refresh their labels with new expanded state
    setTreeData(prevData => {
      // Deep clone and update all node labels
      const updateNodeLabels = (nodes: ExtendedTreeNodeData[]): ExtendedTreeNodeData[] => {
        return nodes.map(node => {
          const userData = node.userData;
          return {
            ...node,
            label: <TreeNodeLabel node={userData!} expandedState={tree.expandedState} />,
            // Recursively update child nodes if they exist
            children: node.children ? updateNodeLabels(node.children) : undefined
          };
        });
      };
      
      return updateNodeLabels(prevData);
    });
  }, [tree.expandedState]);

  // Handle node expansion for lazy loading
  async function handleNodeExpand(nodeValue: string) {
    // Skip if already loaded or loading
    if (loadedNodes[nodeValue] || loadingNodes[nodeValue]) return;
    
    // Find the node in treeData
    const findNodeInTree = (nodes: ExtendedTreeNodeData[], value: string): ExtendedTreeNodeData | null => {
      for (const node of nodes) {
        if (node.value === value) return node;
        if (node.children?.length) {
          const found = findNodeInTree(node.children, value);
          if (found) return found;
        }
      }
      return null;
    };

    const node = findNodeInTree(treeData, nodeValue);
    if (!node || !node.userData?.hasChildren) return;

    // Mark as loading
    setLoadingNodes(prev => ({ ...prev, [nodeValue]: true }));
    
    try {
      // Fetch children data
      const { user } = await graphClient.request<{ user: User }>(GET_USER_REFERRALS, {
        userId: nodeValue.toLowerCase(),
      });
      
      if (user && user.referrals) {
        // Create children nodes
        const childNodes = user.referrals.map(mapUserToTreeNode);
        
        // Update tree data with new children
        setTreeData(current => {
          const updateNodeChildren = (nodes: ExtendedTreeNodeData[]): ExtendedTreeNodeData[] => {
            return nodes.map(n => {
              if (n.value === nodeValue) {
                return { ...n, children: childNodes };
              } else if (n.children?.length) {
                return { ...n, children: updateNodeChildren(n.children) };
              }
              return n;
            });
          };
          
          return updateNodeChildren(current);
        });
        
        // Mark as loaded
        setLoadedNodes(prev => ({ ...prev, [nodeValue]: true }));
      }
    } catch (error) {
      console.error(`Error loading children for ${nodeValue}:`, error);
    } finally {
      // Remove loading state
      setLoadingNodes(prev => {
        const newState = { ...prev };
        delete newState[nodeValue];
        return newState;
      });
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
          <Badge size="lg" radius="xl" style={{ background: colors.secondary, color: 'white' }}>
            <Group gap="xs">
              <IconTree size={16} />
              {rootUser?.childrenAmountIn10Levels || 0}
            </Group>
          </Badge>
        </Group>
        
        <Tooltip label={t('team.refresh')} withArrow position="left">
          <ActionIcon 
            variant="light" 
            style={{ color: colors.secondary }} 
            size="lg" 
            radius="xl" 
            onClick={() => window.location.reload()}
          >
            <IconRefresh size={24} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Group>
      
      {/* Team tree with Mantine Tree component */}
      {treeData.length > 0 ? (
        <Card withBorder radius="md" padding="md">
          <Box style={{ maxWidth: '100%', overflow: 'auto' }}>
            <Tree
              data={treeData}
              tree={tree}
              styles={(theme) => ({
                root: {
                  '--mantine-tree-item-padding-left': '16px'
                },
                node: {
                  marginBottom: '4px',
                  borderRadius: '4px',
                  padding: '2px 0',
                  backgroundColor: 'transparent'
                },
                label: {
                  width: '100%',
                  paddingLeft: '8px' // Add padding to align the icon and text better
                }
              })}
            />
            {Object.keys(loadingNodes).length > 0 && (
              <Box style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <Loader size="xs" />
              </Box>
            )}
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
