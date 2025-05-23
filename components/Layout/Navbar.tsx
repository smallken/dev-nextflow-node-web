import { AppShell, Box, NavLink, Skeleton, Stack, Text, Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconHome2, IconUser, IconBrandTwitter, IconBrandTelegram, IconBrandGithub, IconBrandMedium } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [isTestnetEnabled, setIsTestnetEnabled] = useState(false);

  // Check if testnet is enabled via environment variable or URL parameter
  useEffect(() => {
    const isTestnetEnabledByEnv = process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true';
    
    // Check URL parameter
    const isTestnetEnabledByUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('__test__') === '1';
    };
    
    setIsTestnetEnabled(isTestnetEnabledByEnv || isTestnetEnabledByUrl());
  }, [router.query]);
  
  const currentLanguage = i18n.language;
  return (
    <AppShell.Navbar p='md' style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <NavLink
          href="/"
          label={t('home')}
          leftSection={<IconHome2 size={16} stroke={1.5} />}
          active={router.pathname === '/'}
          variant="subtle"
        />

        <NavLink
          href="/profile"
          label={t('nav_profile')}
          leftSection={<IconUser size={16} stroke={1.5} />}
          active={router.pathname === '/profile'}
          variant="subtle"
        />

        {isTestnetEnabled && (
          <NavLink
            href="/bind-solana"
            label={t('nav_bind_solana')}
            leftSection={<IconUser size={16} stroke={1.5} />}
            active={router.pathname === '/bind-solana'}
            variant="subtle"
          />
        )}
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
