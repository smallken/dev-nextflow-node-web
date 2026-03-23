import { IconHome2, IconUser, IconCoin, IconMenu2, IconBrandTwitter, IconBrandTelegram, IconWorld } from '@tabler/icons-react';

export interface NavItemConfig {
  id: string;
  icon: React.ComponentType<{ size: number }>;
  label: string;
  path: string | null;
}

export const navItems: NavItemConfig[] = [
  {
    id: 'home',
    icon: IconHome2,
    label: 'nav_home',
    path: '/',
  },
  {
    id: 'profile',
    icon: IconUser,
    label: 'nav_profile',
    path: '/profile',
  },
  {
    id: 'tokens',
    icon: IconCoin,
    label: 'nav_tokens',
    path: '/tokens',
  },
  {
    id: 'more',
    icon: IconMenu2,
    label: 'nav_more',
    path: null, // 触发社交菜单
  },
];

export interface SocialItemConfig {
  id: string;
  icon: typeof IconBrandTwitter;
  label: string;
  url: string;
  color: string;
}

export const socialItems: SocialItemConfig[] = [
  {
    id: 'twitter',
    icon: IconBrandTwitter,
    label: 'Twitter',
    url: '',
    color: '#1DA1F2',
  },
  {
    id: 'telegram',
    icon: IconBrandTelegram,
    label: 'Telegram',
    url: '',
    color: '#0088cc',
  },
  {
    id: 'website',
    icon: IconWorld,
    label: 'Website',
    url: 'https://www.nextflowai.io/',
    color: '#8b5cf6',
  },
];
