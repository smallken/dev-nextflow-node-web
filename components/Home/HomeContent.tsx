import { Space } from '@mantine/core';
import { Card, Text } from '@mantine/core';
import { Register } from '../User/Register'
import { Invite } from '../User/Invite'
import { BuyNode } from '../Node/BuyNode'
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

// HomeContent component to handle rendering different views based on user state
interface HomeContentProps {
  isConnected: boolean;
  contractUserInfo: {
    salesCount: number;       // 已购买手机数
    teamSalesCount: number;   // 我的团队
    usdtIncome: bigint;       // 收益
    downlineCount: number;    // 我的推荐
    level: number;            // 用户等级
    upline: string;           // 推荐人
  } | null;
  blueColor?: string;
  blueGradient?: string;
  blueDark?: string;
  blueLight?: string;
}

export function HomeContent({
  isConnected,
  contractUserInfo,
  blueColor = '#3B82F6',
  blueGradient = 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
  blueDark = '#2563EB',
  blueLight = '#60A5FA'
}: HomeContentProps) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration error by not rendering wallet-dependent content until mounted
  if (!mounted) {
    return (
      <>
        <BuyNode
          blueColor={blueColor}
          blueGradient={blueGradient}
          blueDark={blueDark}
          blueLight={blueLight}
        />
        <Space h="lg" />
      </>
    );
  }

  // Case 1: User is not connected to wallet
  if (!isConnected) {
    return (
      <>
        <BuyNode
          blueColor={blueColor}
          blueGradient={blueGradient}
          blueDark={blueDark}
          blueLight={blueLight}
        />
        <Space h="lg" />
      </>
    );
  }

  // Case 2: User is connected but needs to register (upline address is zero or undefined)
  if (!contractUserInfo?.upline || contractUserInfo.upline === '0x0000000000000000000000000000000000000000') {
    return <Register
      blueColor={blueColor}
      blueGradient={blueGradient}
      blueDark={blueDark}
      blueLight={blueLight}
    />;
  }

  // Case 3: User is connected and registered
  return (
    <>
      <BuyNode
        blueColor={blueColor}
        blueGradient={blueGradient}
        blueDark={blueDark}
        blueLight={blueLight}
      />
      <Space h="lg" />
      {contractUserInfo && contractUserInfo.salesCount > 0 ? (
        // Case 3a: User has purchased at least one phone
        <Invite
          blueColor={blueColor}
          blueGradient={blueGradient}
          blueDark={blueDark}
          blueLight={blueLight}
        />
      ) : (
        // Case 3b: User hasn't purchased any phones
        <Card
          withBorder
          radius="xl"
          p="xl"
          styles={{
            root: {
              background: 'linear-gradient(145deg, rgba(59, 130, 246, 0.03) 0%, rgba(96, 165, 250, 0.05) 100%)',
              borderColor: 'rgba(59, 130, 246, 0.15)',
            }
          }}
        >
          <Text c="dimmed" size="sm" mb="sm" ta="center">
            {t('need_one_node_to_invite')}
          </Text>
          <Text
            ta="center"
            size="lg"
            fw={600}
            c={blueDark}
            style={{
              opacity: 0.5,
            }}
          >
            {t('common.invite')}
          </Text>
        </Card>
      )}
    </>
  );
}
