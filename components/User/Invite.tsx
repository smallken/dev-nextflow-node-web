import { Button, Card } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconShare } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

const InviteModal = dynamic(
  () => import('./InviteModal').then(m => ({ default: m.InviteModal })),
  { ssr: false }
);

interface InviteProps {
  blueColor?: string;
  blueGradient?: string;
  blueDark?: string;
  blueLight?: string;
}

export function Invite({
  blueColor = '#3B82F6',
  blueGradient = 'linear-gradient(135deg, #60A5FA 0%, #2563EB 50%, #1E40AF 100%)',
  blueDark = '#1E40AF',
  blueLight = '#60A5FA'
}: InviteProps) {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        fullWidth
        size="xl"
        radius="lg"
        onClick={open}
        leftSection={<IconShare size={20} />}
        styles={{
          root: {
            background: '#00A8FF',
            border: 'none',
            fontWeight: 600,
            height: '56px',
            fontSize: '16px',
            '&:hover': {
              background: '#0096E6',
            },
          }
        }}
      >
        {t('common.invite')}
      </Button>

      <InviteModal opened={opened} onClose={close} blueColor={blueColor} blueGradient={blueGradient} />
    </>
  );
}
