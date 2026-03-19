import { Modal, Stack, Text, Group, UnstyledButton, Paper } from '@mantine/core';
import { IconBrandTwitter, IconBrandTelegram, IconWorld, IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

export interface SocialMenuProps {
  opened: boolean;
  onClose: () => void;
}

export function SocialMenu({ opened, onClose }: SocialMenuProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const currentLanguage = router.locale || 'en';

  const socialItems = [
    {
      id: 'twitter',
      icon: IconBrandTwitter,
      label: 'social_twitter',
      url: 'https://x.com/flipfloplaunch',
      color: '#1DA1F2',
    },
    {
      id: 'telegram',
      icon: IconBrandTelegram,
      label: 'social_telegram',
      url: currentLanguage === 'zh' ? 'https://t.me/flipflopChi' : 'https://t.me/flipflopEng',
      color: '#0088cc',
    },
    {
      id: 'website',
      icon: IconWorld,
      label: 'social_website',
      url: 'https://www.nextflowai.io/',
      color: '#8b5cf6',
    },
  ];

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank');
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size="auto"
      padding={0}
      lockScroll={false}
      trapFocus={false}
      styles={{
        body: {
          padding: 0,
        },
        content: {
          margin: 0,
          padding: 0,
        },
        inner: {
          paddingBottom: 'calc(70px + env(safe-area-inset-bottom, 0px))',
        },
      }}
      centered
      transitionProps={{
        transition: 'slide-up',
        duration: 300,
      }}
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 3,
      }}
    >
      <Paper
        shadow="xl"
        p="md"
        radius="xl"
        style={{
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          margin: '16px',
        }}
      >
        <Stack gap="xs">
          <Group justify="space-between">
            <Text fw={600} size="lg">{t('social_title')}</Text>
            <UnstyledButton onClick={onClose}>
              <IconX size={20} />
            </UnstyledButton>
          </Group>

          <Stack gap="xs" mt="md">
            {socialItems.map((item) => {
              const Icon = item.icon;
              return (
                <UnstyledButton
                  key={item.id}
                  onClick={() => handleSocialClick(item.url)}
                  styles={{
                    root: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: '12px',
                      background: 'transparent',
                      transition: 'background 0.2s ease',
                      '&:hover': {
                        background: 'rgba(139, 92, 246, 0.1)',
                      },
                    },
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: item.color + '20',
                    }}
                  >
                    <Icon size={24} style={{ color: item.color }} />
                  </div>
                  <Text fw={500} size="md">
                    {t(item.label)}
                  </Text>
                </UnstyledButton>
              );
            })}
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  );
}
