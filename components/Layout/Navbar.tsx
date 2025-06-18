import { AppShell, Box, NavLink, Skeleton, Stack, Text, Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconHome2, IconUser, IconCirclesRelation, IconNetwork, IconBrandTwitter, IconBrandTelegram, IconBrandGithub, IconBrandMedium } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useEnv } from '../../hooks/useEnv';

interface NavbarProps {
  toggleMobile?: () => void;
}

export function Navbar({ toggleMobile }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { isTestnet: isTestnetEnabled } = useEnv();

  const currentLanguage = i18n.language;
  return (
    <AppShell.Navbar p='md' style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <NavLink
          onClick={() => {
            router.push('/');
            // Close mobile navbar after navigation
            if (toggleMobile) toggleMobile();
          }}
          label={t('home')}
          leftSection={<IconHome2 size={16} stroke={1.5} />}
          active={router.pathname === '/'}
          variant="subtle"
        />

        <NavLink
          onClick={() => {
            router.push('/profile');
            // Close mobile navbar after navigation
            if (toggleMobile) toggleMobile();
          }}
          label={t('nav_profile')}
          leftSection={<IconUser size={16} stroke={1.5} />}
          active={router.pathname === '/profile'}
          variant="subtle"
        />

        <NavLink
          onClick={() => {
            router.push('/bind-solana');
            // Close mobile navbar after navigation
            if (toggleMobile) toggleMobile();
          }}
          label={t('nav_bind_solana')}
          leftSection={<IconCirclesRelation size={16} stroke={1.5} />}
          active={router.pathname === '/bind-solana'}
          variant="subtle"
        />

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
            href="https://x.com/flipfloplaunch"
            target="_blank"
          />

          <NavLink
            label="Telegram"
            leftSection={
              <IconBrandTelegram size={18} stroke={1.5} />
            }
            component="a"
            href={currentLanguage === 'zh' ? "https://t.me/flipflopChi" : "https://t.me/flipflopEng"}
            target="_blank"
          />

          <NavLink
            label="GitHub"
            leftSection={
              <IconBrandGithub size={18} stroke={1.5} />
            }
            component="a"
            href="https://github.com/flipflop-fun"
            target="_blank"
          />

          <NavLink
            label="Medium"
            leftSection={
              <IconBrandMedium size={18} stroke={1.5} />
            }
            component="a"
            href="https://medium.com/@flipfloplaunch"
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
