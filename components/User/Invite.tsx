import { Button, Card } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconShare } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { InviteModal } from './InviteModal';

interface InviteProps {
  blueColor?: string;
  blueGradient?: string;
  blueDark?: string;
  blueLight?: string;
}

export function Invite({
  blueColor = '#3B82F6',
  blueGradient = 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
  blueDark = '#2563EB',
  blueLight = '#60A5FA'
}: InviteProps) {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card
        withBorder
        radius="xl"
        p="xl"
        className="home-card"
        styles={{
          root: {
            background: '#FFFFFF',
            border: '1px solid rgba(59, 130, 246, 0.08)',
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
          }
        }}
      >
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
      </Card>

      <InviteModal opened={opened} onClose={close} blueColor={blueColor} blueGradient={blueGradient} />
    </>
  );
}
