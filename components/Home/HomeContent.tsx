import { Button, Space, NumberInput, Group, Progress, Collapse } from '@mantine/core';
import { Image, Card, Text, Center, Badge } from '@mantine/core';
import { Register } from '../User/Register'
import { Invite } from '../User/Invite'
import { BuyNode } from '../Node/BuyNode'
import { useTranslation } from 'react-i18next';


// HomeContent component to handle rendering different views based on user state
interface HomeContentProps {
  isConnected: boolean;
  contractUserInfo: {
    nodeCount: number;
    level: number;
    teamNodeCount: number;
    income: bigint;
    parent?: string;
    address?: `0x${string}`;
  } | null;
}

export function HomeContent({ isConnected, contractUserInfo }: HomeContentProps) {
  const { t } = useTranslation();
  
  // Case 1: User is not connected to wallet
  if (!isConnected) {
    return (
      <>
        <BuyNode />
        <Space h="xl" />
        {/* <Invite /> */}
      </>
    );
  }
  
  // Case 2: User is connected but needs to register (parent address is zero or undefined)
  if (!contractUserInfo?.parent || contractUserInfo.parent === '0x0000000000000000000000000000000000000000') {
    return <Register />;
  }
  
  // Case 3: User is connected and registered
  return (
    <>
      <BuyNode />
      <Space h="xl" />
      {contractUserInfo && contractUserInfo.nodeCount > 0 ? (
        // Case 3a: User has purchased at least one node
        <Invite />
      ) : (
        // Case 3b: User hasn't purchased any nodes
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text color="dimmed" size="sm" mb="sm" ta="center">
            {t('need_one_node_to_invite', '至少需要购买一个节点才能邀请好友')}
          </Text>
          <Button fullWidth color="#F2AE00" disabled>{t('invite')}</Button>
        </Card>
      )}
    </>
  );
}