import { Button, Space, NumberInput, Group, Progress, Collapse } from '@mantine/core';
import { Image, Card, Text, Center, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useChainId, useAccount } from 'wagmi';
import { useTranslation } from 'react-i18next';

import { useUser } from '../../context/UserContext';
import { HomeContent } from './HomeContent';

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

      <Card 
        withBorder 
        radius="md" 
        padding="xl" 
        bg="var(--mantine-color-body)"
        className="progress-card"
        styles={(theme) => ({
          root: {
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease',
            border: '2px solid rgba(34, 213, 119, 0.3)',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)'
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-2px',
              left: '-2px',
              right: '-2px',
              bottom: '-2px',
              background: 'linear-gradient(45deg, #22d577, #4ae792, #22d577)',
              backgroundSize: '400% 400%',
              zIndex: -1,
              animation: 'glowingBorder 3s ease infinite',
              borderRadius: 'md',
            }
          },
        })}
      >
        <style jsx global>{`
          @keyframes glowingBorder {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
          .progress-card .mantine-Progress-root .mantine-Progress-bar {
            background: linear-gradient(90deg, #22d577, #4ae792);
            transition: width 1.5s ease-in-out;
          }
        `}</style>
        <Text fz="md" tt="uppercase" fw={700} c="#22d577" mb="xs">
          {t('progress')}
        </Text>
        <Group mt="lg" justify="space-between">
          {appInfo ? (
            <>
              <Text fz="lg" fw={600}>
                <span style={{ fontSize: '1.2em', color: '#22d577' }}>{appInfo.nftCurrentStageMinted.toString()}</span>
                <span style={{ opacity: 0.7 }}> / {appInfo.nftMintTargetAmount.toString()}</span>
              </Text>
              <Badge size="xl" radius="md" color="green" variant="filled" style={{ fontSize: '1em' }}>
                {appInfo.nftMintProgress}%
              </Badge>
            </>
          ) : (
            <>
              <Text fz="lg" fw={600}><span style={{ fontSize: '1.2em', color: '#22d577' }}>0</span> <span style={{ opacity: 0.7 }}>/ 0</span></Text>
              <Badge size="xl" radius="md" color="green" variant="filled" style={{ fontSize: '1em' }}>0%</Badge>
            </>
          )}
        </Group>
        <Progress 
          value={appInfo?.nftMintProgress || 0} 
          mt="md" 
          size="xl" 
          radius="xl"
          color="#22d577"
          animated
          striped
        />
      </Card>

      <Space h="xl" />
      
      <HomeContent 
        isConnected={account.isConnected} 
        contractUserInfo={contractUserInfo} 
      />

    </>
  );
}
