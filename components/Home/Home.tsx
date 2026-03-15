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
        src="/cover-1.jpg"
      />
      <Space h="sm" />

      <Card
        withBorder
        radius="lg"
        padding="xl"
        bg="var(--mantine-color-body)"
        className="progress-card"
        styles={(theme) => ({
          root: {
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(139, 92, 246, 0.12)',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(139, 92, 246, 0.18)',
              borderColor: 'rgba(139, 92, 246, 0.35)'
            }
          },
        })}
      >
        <style jsx global>{`
          .progress-card .mantine-Progress-root .mantine-Progress-bar {
            background: linear-gradient(90deg, #8b5cf6, #a78bfa, #8b5cf6);
            background-size: 200% 100%;
            animation: progressGradient 3s ease infinite;
            transition: width 1s ease-in-out;
          }
          @keyframes progressGradient {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
        `}</style>
        <Text fz="md" fw={700} c="#8b5cf6" mb="xs">
          {t('progress')}
        </Text>
        <Group mt="lg" justify="space-between">
          {appInfo ? (
            <>
              <Text fz="lg" fw={600}>
                <span style={{ fontSize: '1.2em', color: '#8b5cf6' }}>{appInfo.batchRemainingStock}</span>
                <span style={{ opacity: 0.7 }}> / {appInfo.batchTotalStock}</span>
              </Text>
              <Badge size="xl" radius="md" variant="filled" style={{ fontSize: '1em', background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)' }}>
                {t('phase', { number: appInfo.activeBatchIndex + 1 })}
              </Badge>
            </>
          ) : (
            <>
              <Text fz="lg" fw={600}><span style={{ fontSize: '1.2em', color: '#8b5cf6' }}>0</span> <span style={{ opacity: 0.7 }}>/ 0</span></Text>
              <Badge size="xl" radius="md" variant="filled" style={{ fontSize: '1em', background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)' }}>{t('common.loading')}</Badge>
            </>
          )}
        </Group>
        <Progress
          value={appInfo ? (appInfo.batchTotalStock > 0 ? ((appInfo.batchTotalStock - appInfo.batchRemainingStock) / appInfo.batchTotalStock * 100) : 0) : 0}
          mt="md"
          size="xl"
          radius="xl"
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
