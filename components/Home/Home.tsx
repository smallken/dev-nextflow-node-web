import { Group, Progress, Stack, Paper, Container, Text, SimpleGrid } from '@mantine/core';
import { Image, Card, Badge } from '@mantine/core';

import { useAccount } from 'wagmi';
import { useTranslation } from 'react-i18next';

import { useUser } from '../../context/UserContext';
import { HomeContent } from './HomeContent';

export function Home() {
  const { t } = useTranslation();
  const account = useAccount();
  const { contractUserInfo, appInfo } = useUser();

  // 蓝色主题色 (参考 5.jpg)
  const blueColor = '#3B82F6';
  const blueDark = '#2563EB';
  const blueLight = '#60A5FA';
  const blueGradient = 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)';

  return (
    <>
      {/* 全局样式 */}
      <style jsx global>{`
        body {
          background: linear-gradient(135deg, #E8F4FF 0%, #F0F9FF 100%) !important;
          min-height: 100vh;
        }
        .home-progress-bar .mantine-Progress-bar {
          background: linear-gradient(90deg, #3B82F6, #60A5FA, #3B82F6) !important;
          background-size: 200% 100%;
          animation: progressGradient 3s ease infinite;
        }
        @keyframes progressGradient {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        .nai-logo-hero {
          transform: rotate(-20deg);
          transition: all 0.3s ease;
          filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.15));
        }
        .nai-logo-hero:hover {
          transform: rotate(-20deg) scale(1.05);
          filter: drop-shadow(0 6px 20px rgba(59, 130, 246, 0.25));
        }

        @media (max-width: 48em) {
          .home-hero {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
          .home-hero-left {
            width: 100%;
            justify-content: center;
          }
          .home-hero-title {
            width: 100%;
            align-items: center;
          }
          .home-hero-title-text {
            text-align: center;
          }
          .home-title-row {
            flex-wrap: wrap;
            align-items: flex-end;
            gap: 6px;
          }
          .home-slogan {
            white-space: normal;
            text-align: right;
            flex: 1;
            min-width: 140px;
          }
        }
      `}</style>

      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E8F4FF 0%, #F0F9FF 100%)',
        padding: '0'
      }}>
        <Container size="lg" px="md">
          {/* 主要Hero Section - 根据参考图片优化，无卡片背景 */}
          <div style={{ 
            padding: '16px 0',
            marginBottom: '12px',
            position: 'relative'
          }}>
            <Group className="home-hero" align="flex-start" justify="space-between" wrap="nowrap" gap="lg">
              {/* 左侧：NAI Logo + 介绍文字 */}
              <Group className="home-hero-left" align="center" gap="xs" wrap="nowrap" style={{ flex: '0 0 auto' }}>
                <Image
                  src="/nai.png"
                  h={{ base: 130, sm: 200, md: 240 }}
                  w="auto"
                  fit="contain"
                  alt="NAI Logo"
                  className="nai-logo-hero"
                  style={{ flexShrink: 0 }}
                />
                <div
                  style={{
                    position: 'relative',
                    background: 'rgba(255, 255, 255, 0.65)',
                    border: '1px solid rgba(59, 130, 246, 0.12)',
                    borderRadius: 16,
                    padding: '10px 12px',
                    boxShadow: '0 6px 18px rgba(59, 130, 246, 0.08)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    maxWidth: 210,
                    marginLeft: -4,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: -13,
                      top: 26,
                      width: 0,
                      height: 0,
                      borderTop: '10px solid transparent',
                      borderBottom: '10px solid transparent',
                      borderRight: '13px solid rgba(59, 130, 246, 0.12)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: -12,
                      top: 26,
                      width: 0,
                      height: 0,
                      borderTop: '10px solid transparent',
                      borderBottom: '10px solid transparent',
                      borderRight: '13px solid rgba(255, 255, 255, 0.65)',
                    }}
                  />
                  <Stack gap={2}>
                    <Text size="lg" fw={600} c="#334155" style={{ lineHeight: 1.25 }}>
                      {t('home_hero_greeting')}
                    </Text>
                    <Text size="md" c="#94a3b8" style={{ lineHeight: 1.25 }}>
                      {t('home_hero_subtitle')}
                    </Text>
                  </Stack>
                </div>
              </Group>

              {/* 右侧：大标题 - 往右对齐 */}
              <Stack
                className="home-hero-title"
                gap={6}
                align="flex-end"
                style={{
                  flex: '1 1 auto',
                  minWidth: 0,
                  paddingRight: 12,
                  marginTop: 10,
                }}
              >
                <Text 
                  className="home-hero-title-text"
                  size="48px"
                  fw={600} 
                  c="#1e293b"
                  ta="right"
                  style={{ 
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    fontFamily: '"Arial Rounded MT Bold", "Arial Rounded MT", Arial, sans-serif',
                    fontSize: 'clamp(28px, 5.5vw, 52px)',
                    width: '100%'
                  }}
                >
                  {t('home_hero_title_line1')} {t('home_hero_title_line2')}
                </Text>
              </Stack>
            </Group>

          </div>

          {/* 标题区域 - 在淡蓝色背景上，加大字体 */}
          <Group className="home-title-row" justify="space-between" align="center" mb="sm" wrap="wrap">
            <Text 
              size="28px"
              fw={700} 
              c="#1e293b"
              style={{
                fontFamily: '"FZLanTingHei-R-GBK", "FZLanTingHeiS-R-GB", "方正兰亭黑", sans-serif',
                fontSize: 'clamp(20px, 3.5vw, 32px)',
              }}
            >
              {t('home_purchase_title')}
            </Text>
            <Text 
              className="home-slogan"
              size="24px"
              c="#3B9FE8" 
              fw={400}
              style={{ 
                letterSpacing: '0.06em',
                fontFamily: '"Long Cang", "KaiTi", "STKaiti", cursive',
                fontStyle: 'normal',
                textShadow: '0 1px 0 rgba(255, 255, 255, 0.65)',
                fontSize: 'clamp(16px, 2.8vw, 26px)',
              }}
            >
              {t('home_slogan')}
            </Text>
          </Group>

          {/* 进度卡片 - 按照参考图片设计 */}
          <Paper
            radius="lg"
            p="md"
            mb="sm"
            styles={{
              root: {
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
              }
            }}
          >
            <Stack gap="sm">
              {/* 进度数字 - 显示剩余数量 */}
              <Text size="xl" fw={700} c="#1e293b">
                {appInfo?.batchRemainingStock ?? 0}/{appInfo?.batchTotalStock ?? 0}
              </Text>

              {/* 进度条和阶段badge */}
              <Group align="center" gap="md" wrap="nowrap">
                <Progress
                  value={appInfo ? (appInfo.batchTotalStock > 0 ? (appInfo.batchSoldCount / appInfo.batchTotalStock * 100) : 0) : 0}
                  size="lg"
                  radius="xl"
                  className="home-progress-bar"
                  style={{ flex: 1 }}
                  styles={{
                    root: {
                      backgroundColor: '#E5E7EB',
                    }
                  }}
                />
                {appInfo && (
                  <Badge
                    size="sm"
                    variant="filled"
                    radius="md"
                    style={{
                      background: '#FF9500',
                      fontWeight: 600,
                      padding: '4px 12px',
                      flexShrink: 0,
                    }}
                  >
                    {t('phase', { number: appInfo.activeBatchIndex + 1 })}
                  </Badge>
                )}
              </Group>
            </Stack>
          </Paper>

          {/* 购买和邀请区域 */}
          <HomeContent
            isConnected={account.isConnected}
            contractUserInfo={contractUserInfo}
            blueColor={blueColor}
            blueGradient={blueGradient}
            blueDark={blueDark}
            blueLight={blueLight}
          />
        </Container>
      </div>
    </>
  );
}
