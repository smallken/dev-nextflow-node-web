import { Box, Paper, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { navItems } from './navConfig';
import { NavItem } from './NavItem';
import { SocialMenu } from './SocialMenu';

export function BottomNavigation() {
  const router = useRouter();
  const { t } = useTranslation();
  const [opened, { toggle, close }] = useDisclosure(false);

  useEffect(() => {
    navItems.forEach((item) => {
      if (item.path) router.prefetch(item.path);
    });
  }, [router]);

  const handleNavClick = (path: string | null) => {
    if (path === null) {
      // 点击"更多"按钮，打开社交菜单
      toggle();
    } else {
      if (router.pathname !== path) router.push(path);
    }
  };

  // 获取当前路由，用于高亮显示
  const currentPath = router.pathname;

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
              background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.95) 0%, rgba(124, 58, 237, 0.95) 100%)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
              boxShadow: '0 -4px 20px rgba(139, 92, 246, 0.3)',
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
                  isActive={currentPath === item.path}
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
