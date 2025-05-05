import '@mantine/core/styles.css'
import '@rainbow-me/rainbowkit/styles.css'

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'

import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';

import { theme } from '../theme'

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
          <RainbowKitProvider locale={locale} coolMode>
            <UserProvider>
              <Head>
                <title>FF Node</title>
                <meta
                  name='viewport'
                  content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
                />
                <link rel='shortcut icon' href='/favicon.svg' />
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
