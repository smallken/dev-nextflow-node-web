import { Container, Text, Card, Stack, Loader, Group, Badge, ActionIcon, Tooltip, Box, Center } from '@mantine/core';
import { ProfileBreadcrumbs } from '../Layout/ProfileBreadcrumbs';
import { Tree, TreeNodeData, useTree } from '@mantine/core';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { colors, styles, vipColors } from '../../theme';
import { IconUsers, IconTree, IconRefresh, IconNfc, IconCloudOff, IconInfoCircle, IconEye, 
  IconChevronRight, IconChevronDown, IconSquarePlus, IconSquareMinus, IconUser } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { formatEther } from 'viem';
import { graphClient, GET_USER_WITH_FRIENDS, User, getAddressFromUrl } from '../../services/thegraph';
import { UserDetailModal, UserDetail } from '../User/UserDetailModal';

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
function TreeNodeLabel({ node, isExpanded }: { node: TeamNodeData, isExpanded?: boolean }) {
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  // isExpanded is passed from the parent

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
      ? <IconSquareMinus size={18} color="#228be6" />
      : <IconSquarePlus size={18} color="#228be6" />
    : <IconUser size={18} color="#868e96" />;

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
export function TeamTree() {
  return <TeamTree2Client />;
}

// Main implementation of the component
function TeamTree2Component() {
  const { t } = useTranslation();
  const router = useRouter();
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
  const mapUserToTreeNode = (user: User, expandedState?: Record<string, boolean>): ExtendedTreeNodeData => {
    const hasChildren = (user.referrals?.length || 0) > 0;
    
    return {
      value: user.id,
      label: <TreeNodeLabel 
        node={{ ...user, hasChildren }} 
        isExpanded={expandedState ? expandedState[user.id] : false} 
      />,
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
        // Call GraphQL API to fetch user data
        const { user } = await graphClient.request<{ user: User }>(GET_USER_WITH_FRIENDS, { 
          userId: effectiveAddress.toLowerCase() 
        });
        setRootUser(user);
        
        // Get initial tree data from the root user
        if (user) {
          // If root has referrals, set them as children in the tree
          const treeItems = user.referrals?.map((user: User) => mapUserToTreeNode(user)) || [];
          setTreeData(treeItems);
        }
      } catch (error) {
        console.error('Error fetching root user data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRootUser();
  }, [effectiveAddress]);

  // Function to update a specific node's children - defined outside of other functions for reuse
  const updateNodeChildren = (nodes: ExtendedTreeNodeData[], nodeId: string, children: ExtendedTreeNodeData[], expandedState?: Record<string, boolean>): ExtendedTreeNodeData[] => {
    return nodes.map(node => {
      if (node.value === nodeId) {
        // Update the node's children
        return { 
          ...node, 
          children: children,
          // Update the node label with new expanded state
          label: <TreeNodeLabel 
            node={node.userData!} 
            isExpanded={expandedState ? expandedState[node.value] : false}
          />
        };
      } else if (node.children?.length) {
        // Recursively update children
        return { 
          ...node, 
          children: updateNodeChildren(node.children, nodeId, children, expandedState),
          // Update this node's label with expanded state
          label: <TreeNodeLabel 
            node={node.userData!} 
            isExpanded={expandedState ? expandedState[node.value] : false}
          />
        };
      }
      // Just update the label for this node
      return { 
        ...node,
        label: <TreeNodeLabel 
          node={node.userData!}
          isExpanded={expandedState ? expandedState[node.value] : false} 
        />
      };
    });
  };

  // Cache the expanded state to avoid infinite loop
  const [prevExpandedState, setPrevExpandedState] = useState<Record<string, boolean>>({});
  
  // Effect to update node labels only when tree.expandedState changes significantly
  useEffect(() => {
    // Check if the expanded state has changed in a way that matters
    const hasExpandedStateChanged = Object.keys(tree.expandedState).some(
      id => tree.expandedState[id] !== prevExpandedState[id]
    );
    
    if (hasExpandedStateChanged) {
      // Save the new expanded state
      setPrevExpandedState(tree.expandedState);
      
      // Only update the tree data when expanded state changes meaningfully
      setTreeData(prevData => {
        // For performance reasons, only update the tree with enough info to rerender
        // without changing the structure that would cause more updates
        return updateNodeChildren(prevData, 'root', prevData, tree.expandedState);
      });
    }
  }, [tree.expandedState, prevExpandedState]);

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
      // Get user data from GraphQL
      const { user } = await graphClient.request<{ user: User }>(GET_USER_WITH_FRIENDS, { 
        userId: nodeValue.toLowerCase() 
      });
      
      if (user && user.referrals) {
        // Create children nodes
        const childNodes = user.referrals.map((user: User) => mapUserToTreeNode(user, tree.expandedState));
        
        // Update tree data with new children
        
        setTreeData(current => updateNodeChildren(current, nodeValue, childNodes, tree.expandedState));
        
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
      <Container size="md" py="md">
        {/* Breadcrumbs navigation */}
        <ProfileBreadcrumbs currentPage="team" />
        
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
        <ProfileBreadcrumbs currentPage="team" />
        
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
      <Container size="md" py="md">
        {/* Breadcrumbs navigation */}
        <ProfileBreadcrumbs currentPage="team" />
        
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
      {/* Breadcrumbs navigation */}
      <ProfileBreadcrumbs currentPage="team" />
      
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
                  maxWidth: '100%', // Ensure tree doesn't overflow container
                  overflow: 'auto'  // Add scrolling when needed
                },
                node: {
                  marginBottom: '4px',
                  borderRadius: '4px',
                  padding: '2px 0',
                  backgroundColor: 'transparent',
                  whiteSpace: 'normal' // Allow text to wrap
                },
                label: {
                  width: '100%',
                  overflow: 'visible', // Ensure content doesn't get cut off
                  wordBreak: 'break-word' // Allow long texts to wrap
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
