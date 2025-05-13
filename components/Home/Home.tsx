import { Button, Space, NumberInput, Group, Progress, Collapse } from '@mantine/core';
import { Image, Card, Text, Center, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useChainId, useAccount } from 'wagmi';
import { useTranslation } from 'react-i18next';

import { useUser } from '../../context/UserContext';
import { HomeContent } from './HomeContent';

// Type assertion to ensure TypeScript recognizes this as an Ethereum address
const defaultBindAddress = process.env.NEXT_PUBLIC_BSC_TESTNET_DEFAULT_BIND_ADDRESS as `0x${string}`

export function Home() {
  const { t } = useTranslation();

  const [opened, { toggle }] = useDisclosure(false);

  const chainId = useChainId();
  const account = useAccount();
  // 使用全局用户上下文获取应用信息
  const { contractUserInfo, appInfo } = useUser();

  return (
    <>
      <Image
        h={200}
        src="/1.jpg"
      />
      <Space h="sm" />

      <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)">
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
          {t('progress')}
        </Text>
        <Group mt="md" justify="space-between">
          {appInfo ? (
            <>
              <Text fz="sm">{appInfo.nftCurrentTotal.toString()} /{appInfo.nftMintTargetAmount.toString()}</Text>
              <Badge size="sm">{appInfo.nftMintProgress}%</Badge>
            </>
          ) : (
            <>
              <Text fz="sm">0 / 0</Text>
              <Badge size="sm">0%</Badge>
            </>
          )}
        </Group>
        <Progress value={appInfo?.nftMintProgress || 0} mt="md" size="lg" radius="xl" />
      </Card>

      <Space h="xl" />
      
      <HomeContent 
        isConnected={account.isConnected} 
        contractUserInfo={contractUserInfo} 
      />

    </>
  );
}
