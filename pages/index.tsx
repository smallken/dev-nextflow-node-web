import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle'
import { Welcome } from '../components/Welcome/Welcome'
import { ConnectButton } from '@rainbow-me/rainbowkit'
// import { MantineLogo } from '@mantinex/mantine-logo';

import { AppShell, Burger, Group, Skeleton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export default function HomePage () {
  // const [opened, { toggle }] = useDisclosure()
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
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

      <AppShell.Navbar p='md'>
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt='sm' animate={false} />
          ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Welcome />
      </AppShell.Main>
    </AppShell>
  )

  // return (
  //   <>
  //     <div
  //       style={{
  //         display: 'flex',
  //         justifyContent: 'flex-end',
  //         padding: 12
  //       }}
  //     >
  //       <ConnectButton />
  //     </div>
  //     <Welcome />
  //     {/* <ColorSchemeToggle /> */}
  //   </>
  // )
}
