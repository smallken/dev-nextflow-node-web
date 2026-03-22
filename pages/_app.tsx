import '@mantine/core/styles.css'
import '@rainbow-me/rainbowkit/styles.css'
import '@mantine/notifications/styles.css';
import '../styles/global.css'

// Import i18n configuration
// Import only on client-side to prevent SSR issues
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import { isBrowser, isServer } from '../utils/environment'

import { Notifications } from '@mantine/notifications';

import { theme, customLightTheme } from '../theme'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { useTranslation, I18nextProvider } from 'react-i18next';
import initI18Next from '../i18n/i18n-server';

// Import i18n instance only on client-side
let i18nInstance: any;
if (isBrowser) {
  i18nInstance = require('../i18n/index').default;
}

import { config } from '../wagmi'

import { Layout } from '../components/Layout/Layout'
import { UserProvider } from '../context/UserContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 保持数据常新，不自动视为过期；仅手动 refreshData 时刷新
      staleTime: Infinity,
      // 缓存保留 30 分钟，页面切换时不丢失
      gcTime: 30 * 60 * 1000,
      // 禁用自动重新获取
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      // 失败时不重试
      retry: false,
    },
  },
})

function App({ Component, pageProps }: AppProps) {
  // Use server instance in SSR, client instance on client-side
  const i18n = isServer ? initI18Next('en') : i18nInstance;

  // When rendering on the server, the server determines the language
  const { t } = useTranslation(undefined, { i18n });

  // Get current language for RainbowKit
  const currentLocale = i18n?.language === 'en' ? 'en' : 'zh-CN';

  return (
    <I18nextProvider i18n={i18n}>
      <MantineProvider theme={theme}>
        <Notifications position="top-center" zIndex={4000} />
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
              locale={currentLocale}
              theme={customLightTheme}
              modalSize="compact"
              showRecentTransactions={true}
            >
            <UserProvider>
              <Head>
                <title>NextFlow — 全球领先的AI+Web4终端生态</title>
                <meta name='description' content='成为全球领先的AI+Web4 终端生态服务商，推动AI+Web4 技术从行业小众应用走向大众普及' />
                <meta
                  name='viewport'
                  content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
                />
                <meta name="theme-color" content="#8b5cf6" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="NextFlow" />
                <link rel='shortcut icon' href='/logo-black.png' />
                <link rel="apple-touch-icon" href="/logo-black.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/logo-black.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/logo-black.png" />
              </Head>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </UserProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </MantineProvider>
    </I18nextProvider>
  )
}

export default App
