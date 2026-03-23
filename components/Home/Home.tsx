import { Group, Progress, Stack, Paper, Container, Text, SimpleGrid } from '@mantine/core';
import { Image, Card, Badge } from '@mantine/core';
import { useState, useEffect } from 'react';

import { useAccount } from 'wagmi';
import { useTranslation } from 'react-i18next';

import { useUser } from '../../context/UserContext';
import { HomeContent } from './HomeContent';

export function Home() {
  const { t } = useTranslation();
  const account = useAccount();
  const { contractUserInfo, appInfo } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
            gap: 8px;
          }
          .home-hero-left {
            width: 100%;
            justify-content: flex-start;
            flex-direction: row;
            gap: 4px;
          }
          .home-hero-title {
            width: 100%;
            align-items: center;
          }
          .home-hero-title-text {
            text-align: center;
          }
          .home-title-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .home-slogan {
            white-space: normal;
            text-align: left;
            width: 100%;
          }
          .nai-logo-hero {
            transform: rotate(-10deg);
          }
          .mobile-bubble {
            margin-left: 0 !important;
            margin-right: -4px;
          }
          .home-hero-left {
            align-items: flex-start !important;
            margin-top: -8px;
          }
          .mobile-stats-row {
            width: 100%;
            justify-content: space-between;
            margin-bottom: 12px;
            display: flex !important;
          }
          .mobile-only-slogan {
            display: block !important;
            text-align: left;
            width: 100%;
            margin-bottom: 8px;
          }
          .desktop-hero-title {
            display: none !important;
          }
          .desktop-card-stats {
            display: none !important;
          }
          .mobile-progress-only {
            display: flex !important;
          }
        }
        @media (min-width: 48.01em) {
          .mobile-stats-row {
            display: none !important;
          }
          .mobile-only-slogan {
            display: none !important;
          }
          .mobile-progress-only {
            display: none !important;
          }
          .home-title-row {
            align-items: flex-start !important;
          }
          .home-slogan {
            text-align: left !important;
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
                {/* 手机端：Smart Tech Link Future在小奈头上 */}
                <div style={{ display: 'none' }} className="mobile-only-slogan">
                  <Text 
                    size="24px"
                    fw={700} 
                    c="#1e293b"
                    ta="left"
                    style={{ 
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                      fontFamily: '"Arial Rounded MT Bold", "Arial Rounded MT", Arial, sans-serif',
                    }}
                  >
                    SmartTech<br />LinkFuture
                  </Text>
                </div>
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
                  className="desktop-bubble mobile-bubble"
                  style={{
                    position: 'relative',
                    background: 'rgba(255, 255, 255, 0.65)',
                    border: '1px solid rgba(59, 130, 246, 0.12)',
                    borderRadius: 16,
                    padding: '10px 12px',
                    boxShadow: '0 6px 18px rgba(59, 130, 246, 0.08)',
                    maxWidth: 210,
                    marginLeft: -4,
                  }}
                >
                  <div
                    className="bubble-arrow-left"
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
                    className="bubble-arrow-left"
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

              {/* 右侧：大标题 - 往右对齐（桌面端显示） */}
              <Stack
                className="home-hero-title desktop-hero-title"
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
          <Stack className="home-title-row" gap="xs" mb="sm">
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
          </Stack>

          {/* 手机端：数量和期数放到卡片外面 */}
          <Group className="mobile-stats-row" justify="space-between" align="center" mb="sm" style={{ display: 'none' }}>
            <Text size="xl" fw={700} c="#1e293b">
              {appInfo?.batchSoldCount ?? 0}/{appInfo?.batchTotalStock ?? 0}
            </Text>
            {appInfo && (
              appInfo.batchRemainingStock === 0 ? (
                <Text size="sm" c="dimmed" ta="center">
                  {t('first_phase_sold_out')}
                </Text>
              ) : (
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
              )
            )}
          </Group>

          {/* 进度卡片 - 按照参考图片设计 */}
          <Paper
            radius="lg"
            p="md"
            mb="sm"
            styles={{
              root: {
                background: '#FFFFFF',
                border: '1px solid rgba(59, 130, 246, 0.08)',
                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
              }
            }}
          >
            <Stack gap="sm" className="desktop-card-stats">
              {/* 进度数字 - 显示已售数量/总库存 */}
              <Text size="xl" fw={700} c="#1e293b">
                {appInfo?.batchSoldCount ?? 0}/{appInfo?.batchTotalStock ?? 0}
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
                  appInfo.batchRemainingStock === 0 ? (
                    <Text size="sm" c="dimmed" ta="center">
                      {t('first_phase_sold_out')}
                    </Text>
                  ) : (
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
                  )
                )}
              </Group>
            </Stack>
            {/* 手机端只显示进度条 */}
            <Group align="center" gap="md" wrap="nowrap" style={{ display: 'none' }} className="mobile-progress-only">
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
            </Group>
          </Paper>

          {/* 购买和邀请区域 */}
          <HomeContent
            isConnected={mounted ? account.isConnected : false}
            contractUserInfo={mounted ? contractUserInfo : null}
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
