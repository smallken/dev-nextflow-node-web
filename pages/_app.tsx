import '@mantine/core/styles.css'
import '@rainbow-me/rainbowkit/styles.css'
import '@mantine/notifications/styles.css';
import '../styles/global.css'

// Import i18n configuration
import '../i18n/index';

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'

import { Notifications } from '@mantine/notifications';

import { theme, customLightTheme, customDarkTheme } from '../theme'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider, type Locale } from '@rainbow-me/rainbowkit'

import { config } from '../wagmi'

import { Layout } from '../components/Layout/Layout'
import { UserProvider } from '../context/UserContext'

const queryClient = new QueryClient()

export default function App ({ Component, pageProps }: AppProps) {
  const { locale } = useRouter() as { locale: Locale }
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            locale={locale}
            theme={customLightTheme}
            modalSize="compact"
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
  )
}
