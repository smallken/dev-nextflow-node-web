import { Box, Paper, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
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
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setMounted(true);
    navItems.forEach((item) => {
      if (item.path) router.prefetch(item.path);
    });
  }, [router]);

  useEffect(() => {
    const onStart = () => setIsNavigating(true);
    const onComplete = () => { setIsNavigating(false); setActivePath(router.pathname); };
    const onError = () => { setIsNavigating(false); setActivePath(router.pathname); };
    router.events.on('routeChangeStart', onStart);
    router.events.on('routeChangeComplete', onComplete);
    router.events.on('routeChangeError', onError);
    return () => {
      router.events.off('routeChangeStart', onStart);
      router.events.off('routeChangeComplete', onComplete);
      router.events.off('routeChangeError', onError);
    };
  }, [router]);

  const handleNavClick = useCallback((path: string | null) => {
    if (isNavigating) return;
    if (path === null) {
      toggle();
    } else {
      if (router.pathname !== path) {
        setActivePath(path);
        router.push(path);
      }
    }
  }, [isNavigating, router, toggle]);

  const currentPath = activePath ?? router.pathname;

  return (
    <>
      {/* 顶部进度条：导航中可见，防止用户以为没反应 */}
      {isNavigating && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: '3px', zIndex: 9999, overflow: 'hidden',
          background: 'rgba(0, 168, 255, 0.2)',
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #00A8FF, #60D0FF)',
            animation: 'nav-progress 1.4s ease-in-out infinite',
            boxShadow: '0 0 8px rgba(0, 168, 255, 0.8)',
          }} />
        </div>
      )}
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
                  isNavigating={isNavigating}
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
