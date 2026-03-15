import { Button, Card } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconShare } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { InviteModal } from './InviteModal';

export function Invite() {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Button
          fullWidth
          onClick={open}
          leftSection={<IconShare size={16} />}
          styles={{
            root: {
              background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
              }
            }
          }}
        >
          {t('common.invite')}
        </Button>
      </Card>
      
      <InviteModal opened={opened} onClose={close} />
    </>
  );
}