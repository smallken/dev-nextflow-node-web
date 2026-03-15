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
    salesCount: number;
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
      {contractUserInfo && contractUserInfo.salesCount > 0 ? (
        // Case 3a: User has purchased at least one phone
        <Invite />
      ) : (
        // Case 3b: User hasn't purchased any phones
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text color="dimmed" size="sm" mb="sm" ta="center">
            {t('need_one_node_to_invite')}
          </Text>
          <Button
            fullWidth
            disabled
            styles={{
              root: {
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
              }
            }}
          >
            {t('common.invite')}
          </Button>
        </Card>
      )}
    </>
  );
}