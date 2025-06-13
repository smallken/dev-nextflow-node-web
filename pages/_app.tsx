import '@mantine/core/styles.css'
import '@rainbow-me/rainbowkit/styles.css'
import '@mantine/notifications/styles.css';
import '../styles/global.css'

// Import i18n configuration
// Import only on client-side to prevent SSR issues
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import { isBrowser, isServer } from '../utils/environment'

import { Notifications } from '@mantine/notifications';

import { theme, customLightTheme, customDarkTheme } from '../theme'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount, useConnect } from 'wagmi'
import { RainbowKitProvider, type Locale, lightTheme } from '@rainbow-me/rainbowkit'
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

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Determine language for server-side and client-side consistently
  // Use router locale for SSR (matches URL) and i18n.language for client
  const language = isServer ? (router.locale || 'en') : undefined;
  
  // Use server instance in SSR, client instance on client-side
  const i18n = isServer ? initI18Next(language) : i18nInstance;
  
  // When rendering on the server, the server determines the language
  const { t } = useTranslation(undefined, { i18n });
  
  // Get current language for RainbowKit
  const currentLocale = i18n?.language === 'en' ? 'en' : 'zh-CN';

  return (
    <I18nextProvider i18n={i18n}>
      <MantineProvider theme={theme}>
        <Notifications />
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
                <title>FlipFlop Never Node</title>
                <meta
                  name='viewport'
                  content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
                />
                <link rel='shortcut icon' href='/favicon.ico' />
                <link rel="apple-touch-icon" href="/logo192.png" />

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

// Prevent the _app component from being run during SSR
export default dynamic(() => Promise.resolve(App), {
  ssr: false
})
