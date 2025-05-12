import { AppShell, Box, NavLink, Skeleton, Stack, Text } from '@mantine/core';
import { IconHome2, IconUser } from '@tabler/icons-react';

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

      {/* Version and commit info at bottom */}
      <Box mt="auto" pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
        <Stack gap="xs" fz="xs" c="dimmed" ta="center">
          <Text>Version: {process.env.APP_VERSION || '1.0.0'}</Text>
          <Text hidden>Commit: {process.env.GIT_COMMIT_HASH || 'development'}</Text>
        </Stack>
      </Box>
    </AppShell.Navbar>
  );
}

export default Navbar;
