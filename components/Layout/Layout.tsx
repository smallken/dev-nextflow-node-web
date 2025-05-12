import { ConnectButton } from '@rainbow-me/rainbowkit'
// import { MantineLogo } from '@mantinex/mantine-logo';
import { IconHome2, IconUser } from '@tabler/icons-react';

import { AppShell, Burger, Group, Skeleton, NavLink, Text, Box, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'




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
            LOGO
          </Group>
          <Group>
            <ConnectButton /> 
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p='md' style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
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
        </div>

        {/* Version and commit info at bottom */}
        <Box mt="auto" pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
          <Stack gap="xs" fz="xs" c="dimmed" ta="center">
            <Text>Version: {process.env.APP_VERSION || '1.0.0'}</Text>
            <Text>Commit: {process.env.GIT_COMMIT_HASH || 'development'}</Text>
          </Stack>
        </Box>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}


export default Layout