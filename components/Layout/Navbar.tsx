import { AppShell, Box, NavLink, Skeleton, Stack, Text, Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconHome2, IconUser, IconCirclesRelation, IconNetwork, IconBrandTwitter, IconBrandTelegram, IconWorld, IconCoin } from '@tabler/icons-react';
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
    <AppShell.Navbar p='md' style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e2e8f0'
    }}>
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
          style={{
            color: '#64748b',
            borderRadius: '8px',
            marginBottom: '4px',
            transition: 'all 0.2s ease'
          }}
          styles={{
            root: {
              '&[data-active]': {
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
                color: '#8b5cf6',
                fontWeight: 600
              },
              '&:hover:not([data-active])': {
                background: '#f8fafc'
              }
            }
          }}
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
          style={{
            color: '#64748b',
            borderRadius: '8px',
            marginBottom: '4px',
            transition: 'all 0.2s ease'
          }}
          styles={{
            root: {
              '&[data-active]': {
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
                color: '#8b5cf6',
                fontWeight: 600
              },
              '&:hover:not([data-active])': {
                background: '#f8fafc'
              }
            }
          }}
        />

        <NavLink
          onClick={() => {
            router.push('/tokens');
            // Close mobile navbar after navigation
            if (toggleMobile) toggleMobile();
          }}
          label={t('nav_tokens')}
          leftSection={<IconCoin size={16} stroke={1.5} />}
          active={router.pathname === '/tokens'}
          variant="subtle"
          style={{
            color: '#64748b',
            borderRadius: '8px',
            marginBottom: '4px',
            transition: 'all 0.2s ease'
          }}
          styles={{
            root: {
              '&[data-active]': {
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
                color: '#8b5cf6',
                fontWeight: 600
              },
              '&:hover:not([data-active])': {
                background: '#f8fafc'
              }
            }
          }}
        />

      </div>

      {/* Social media links */}
      <Box mt="auto" pt="md" style={{ borderTop: '1px solid #e2e8f0' }}>
        <Stack gap="xs" py="md">
          <NavLink
            label="Twitter"
            leftSection={
              <IconBrandTwitter size={18} stroke={1.5} />
            }
            component="a"
            href="https://x.com/flipfloplaunch"
            target="_blank"
            style={{
              color: '#64748b',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
            styles={{
              root: {
                '&:hover': {
                  background: '#f8fafc',
                  color: '#8b5cf6'
                }
              }
            }}
          />

          <NavLink
            label="Telegram"
            leftSection={
              <IconBrandTelegram size={18} stroke={1.5} />
            }
            component="a"
            href={currentLanguage === 'zh' ? "https://t.me/flipflopChi" : "https://t.me/flipflopEng"}
            target="_blank"
            style={{
              color: '#64748b',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
            styles={{
              root: {
                '&:hover': {
                  background: '#f8fafc',
                  color: '#8b5cf6'
                }
              }
            }}
          />

          <NavLink
            label="Website"
            leftSection={
              <IconWorld size={18} stroke={1.5} />
            }
            component="a"
            href="https://www.nextflowai.io/"
            target="_blank"
            style={{
              color: '#64748b',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
            styles={{
              root: {
                '&:hover': {
                  background: '#f8fafc',
                  color: '#8b5cf6'
                }
              }
            }}
          />
        </Stack>

        {/* Version info */}
        <Stack gap="xs" fz="xs" c="dimmed" ta="center" style={{ color: '#94a3b8' }}>
          <Text>v{process.env.APP_VERSION || '1.0.0'}</Text>
          <Text hidden>Commit: {process.env.GIT_COMMIT_HASH || 'development'}</Text>
        </Stack>
      </Box>
    </AppShell.Navbar>
  );
}

export default Navbar;
