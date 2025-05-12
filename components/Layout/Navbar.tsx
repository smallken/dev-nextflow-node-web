import { AppShell, Box, NavLink, Skeleton, Stack, Text, Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconHome2, IconUser, IconBrandTwitter, IconBrandTelegram, IconBrandGithub, IconBrandMedium } from '@tabler/icons-react';

export function Navbar() {
  return (
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

      {/* Social media links */}
      <Box mt="auto" pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
        <Stack gap="xs" py="md">
          <NavLink
            label="Twitter"
            leftSection={
              <IconBrandTwitter size={18} stroke={1.5} />
            }
            component="a"
            href="https://twitter.com/flipflop"
            target="_blank"
          />
          
          <NavLink
            label="Telegram"
            leftSection={
              <IconBrandTelegram size={18} stroke={1.5} />
            }
            component="a"
            href="https://t.me/flipflop"
            target="_blank"
          />
          
          <NavLink
            label="GitHub"
            leftSection={
              <IconBrandGithub size={18} stroke={1.5} />
            }
            component="a"
            href="https://github.com/flipflop"
            target="_blank"
          />
          
          <NavLink
            label="Medium"
            leftSection={
              <IconBrandMedium size={18} stroke={1.5} />
            }
            component="a"
            href="https://medium.com/flipflop"
            target="_blank"
          />
        </Stack>
        
        {/* Version info */}
        <Stack gap="xs" fz="xs" c="dimmed" ta="center">
          <Text>v{process.env.APP_VERSION || '1.0.0'}</Text>
          <Text hidden>Commit: {process.env.GIT_COMMIT_HASH || 'development'}</Text>
        </Stack>
      </Box>
    </AppShell.Navbar>
  );
}

export default Navbar;
