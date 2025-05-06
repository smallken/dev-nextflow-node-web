import { ConnectButton } from '@rainbow-me/rainbowkit'
// import { MantineLogo } from '@mantinex/mantine-logo';
import { IconHome2, IconUser } from '@tabler/icons-react';

import { AppShell, Burger, Group, Skeleton, NavLink } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'


export  function Layout({ children }: { children: React.ReactNode }) {
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
            LOGO
          </Group>
          <Group>
            {/* 用自定义按钮替换原始ConnectButton，实现更灵活的UI定制 */}
            <ConnectButton /> 
            {/* <CustomConnectButton variant="outline" size="sm" /> */}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p='md'>

        <NavLink
          href="/"
          label="Home"
          leftSection={<IconHome2 size={16} stroke={1.5} />}
        />

        <NavLink
          href="/profile"
          label="Profile"
          leftSection={<IconUser size={16} stroke={1.5} />}
        />

        {/* {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt='sm' animate={false} />
          ))} */}
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}


export default Layout