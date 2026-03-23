import { Box, Paper, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { navItems } from './navConfig';
import { NavItem } from './NavItem';
import { SocialMenu } from './SocialMenu';

export function BottomNavigation() {
  const router = useRouter();
  const { t } = useTranslation();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [mounted, setMounted] = useState(false);
  const [activePath, setActivePath] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    navItems.forEach((item) => {
      if (item.path) router.prefetch(item.path);
    });
  }, [router]);

  useEffect(() => {
    const onComplete = () => setActivePath(router.pathname);
    const onError = () => setActivePath(router.pathname);
    router.events.on('routeChangeComplete', onComplete);
    router.events.on('routeChangeError', onError);
    return () => {
      router.events.off('routeChangeComplete', onComplete);
      router.events.off('routeChangeError', onError);
    };
  }, [router]);

  const handleNavClick = (path: string | null) => {
    if (path === null) {
      toggle();
    } else {
      if (router.pathname !== path) {
        setActivePath(path);
        router.push(path);
      }
    }
  };

  const currentPath = activePath ?? router.pathname;

  return (
    <>
      <Box
        className="bottom-navigation"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <Paper
          shadow="xl"
          radius={0}
          className="bottom-nav-paper"
          styles={{
            root: {
              background: 'linear-gradient(180deg, #00A8FF 0%, #0096E6 100%)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
              boxShadow: '0 -4px 20px rgba(0, 168, 255, 0.3)',
            },
          }}
        >
          <Group gap={0} style={{ width: '100%' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavItem
                  key={item.id}
                  icon={Icon}
                  label={t(item.label)}
                  isActive={mounted && currentPath === item.path}
                  onClick={() => handleNavClick(item.path)}
                />
              );
            })}
          </Group>
        </Paper>
      </Box>

      <SocialMenu opened={opened} onClose={close} />
    </>
  );
}
