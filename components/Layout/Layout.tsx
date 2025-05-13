// import { ConnectButton } from '@rainbow-me/rainbowkit'
import CustomConnectButton from './CustomConnectButton'
// import { MantineLogo } from '@mantinex/mantine-logo';
import { AppShell, Burger, Group, Space } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Navbar from './Navbar'
import LanguageSwitcher from './LanguageSwitcher'

export function Layout({ children }: { children: React.ReactNode }) {
  // const [opened, { toggle }] = useDisclosure()
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: { sm: 150, lg: 300 },
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened }
      }}
      padding='md'
    >
      <AppShell.Header>
        <Group h='100%' px='md' justify='space-between'>
          <Group>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom='sm'
              size='sm'
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom='sm'
              size='sm'
            />
            <img src="/images/flip-flops-64_64.png" style={{ width: '32px', height: '32px' }} alt="Logo" />

          </Group>
          <Group gap="xs" visibleFrom="sm">
            <CustomConnectButton />
            <LanguageSwitcher />
          </Group>
          <Group gap="xs" hiddenFrom="sm" justify="center" mt="xs">
            <CustomConnectButton />
            <LanguageSwitcher />
          </Group>
        </Group>
      </AppShell.Header>

      <Navbar />

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}


export default Layout