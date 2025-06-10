import { Card, Text, Group, Container, Stack, Paper, Avatar, Badge, Modal, Button, Grid, Divider, rem } from '@mantine/core';
import { IconUsers, IconCrown, IconChevronRight } from '@tabler/icons-react';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { useDisclosure } from '@mantine/hooks';

// Type for friend details
interface FriendDetail {
  address: string;
  nodeCount: number;
  directReferrals: number;
  level: number;
}

// Helper function to format wallet address for display
function formatAddress(address: string | undefined): string {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

// Friend card component
function FriendCard({ friend, onClick }: { friend: string; onClick: () => void }) {
  return (
    <Paper radius="md" withBorder p="md" mb="md" onClick={onClick} style={{ cursor: 'pointer' }}>
      <Group justify="apart">
        <Group>
          <Avatar color="blue" radius="xl">
            {friend.substring(2, 4)}
          </Avatar>
          <div>
            <Text size="sm" fw={500}>{formatAddress(friend)}</Text>
            <Text size="xs" c="dimmed">Friend</Text>
          </div>
        </Group>
        <IconChevronRight size={20} stroke={1.5} />
      </Group>
    </Paper>
  );
}

// Friend detail modal component
function FriendDetailModal({ opened, onClose, friend }: { opened: boolean; onClose: () => void; friend: FriendDetail | null }) {
  const { t } = useTranslation();
  
  if (!friend) return null;
  
  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={<Text fw={700}>{t('friends.friendDetails')}</Text>} 
      size="auto"
      radius="md"
      transitionProps={{ transition: 'slide-up' }}
      styles={{
        header: { background: '#f8f9fa' },
        body: { padding: '0 !important' },
        content: { 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          maxHeight: '70vh', 
          borderTopLeftRadius: '16px', 
          borderTopRightRadius: '16px',
          margin: 0,
          width: '100%'
        },
        overlay: { opacity: 0.35 }
      }}
      withinPortal
    >
      <Stack p="md">
        <Group justify="center" mb="md">
          <Avatar size="xl" radius="xl" color="blue">
            {friend.address.substring(2, 4)}
          </Avatar>
        </Group>
        
        <Text ta="center" fw={700}>{formatAddress(friend.address)}</Text>
        
        <Group justify="center" mb="md">
          <Badge 
            leftSection={<IconCrown size={14} />}
            size="lg"
            style={{ 
              background: 'linear-gradient(135deg, #F2AE00, #FFD700)',
              color: 'white'
            }}
          >
            Level {friend.level}
          </Badge>
        </Group>

        <Divider my="sm" />
        
        <Grid>
          <Grid.Col span={6}>
            <Stack align="center" gap="xs">
              <Text size="sm" c="dimmed">{t('friends.nodeCount')}</Text>
              <Text size="xl" fw={700}>{friend.nodeCount}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack align="center" gap="xs">
              <Text size="sm" c="dimmed">{t('friends.directReferrals')}</Text>
              <Text size="xl" fw={700}>{friend.directReferrals}</Text>
            </Stack>
          </Grid.Col>
        </Grid>
        
        <Button fullWidth color="#F2AE00" onClick={onClose} mt="md">
          {t('common.close')}
        </Button>
      </Stack>
    </Modal>
  );
}

export function FriendList() {
  const { t } = useTranslation();
  // Use user context to get the friends list
  const { address, contractUserInfo } = useUser();
  const [bgColor] = useState('#E3FBE3'); // Default light green background
  
  // State for friend detail modal
  const [selectedFriend, setSelectedFriend] = useState<FriendDetail | null>(null);
  const [detailModalOpened, { open: openDetailModal, close: closeDetailModal }] = useDisclosure(false);
  
  // Mock function to get friend details - this would be replaced with actual API calls or contract interactions
  const getFriendDetails = (friendAddress: string): FriendDetail => {
    // In a real implementation, you would fetch these details from your contracts or API
    return {
      address: friendAddress,
      nodeCount: Math.floor(Math.random() * 10), // Mock data
      directReferrals: Math.floor(Math.random() * 5), // Mock data
      level: Math.floor(Math.random() * 5) + 1, // Mock data
    };
  };
  
  // Open friend detail modal
  const handleFriendClick = (friendAddress: string) => {
    const details = getFriendDetails(friendAddress);
    setSelectedFriend(details);
    openDetailModal();
  };
  
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
        <Text size="lg" fw={700}>{t('friends.title', 'My Friends')}</Text>
        <Badge leftSection={<IconUsers size={14} />} size="lg">
          {contractUserInfo?.friends?.length || 0} Friends
        </Badge>
      </Group>
      
      {/* Friends list */}
      <Container size="md">
        {contractUserInfo?.friends && contractUserInfo.friends.length > 0 ? (
          contractUserInfo.friends.map((friend: string) => (
            <FriendCard 
              key={friend} 
              friend={friend} 
              onClick={() => handleFriendClick(friend)}
            />
          ))
        ) : (
          <Card withBorder radius="md" padding="xl" mb="md">
            <Stack align="center" gap="md">
              <Text ta="center" fw={500} size="lg">{t('friends.noFriends', 'No friends yet')}</Text>
              <Text ta="center" c="dimmed" size="sm">{t('friends.inviteMessage', 'Invite your friends to join and they will appear here')}</Text>
            </Stack>
          </Card>
        )}
      </Container>
      
      {/* Friend detail modal */}
      <FriendDetailModal 
        opened={detailModalOpened} 
        onClose={closeDetailModal}
        friend={selectedFriend}
      />
    </div>
  );
}
