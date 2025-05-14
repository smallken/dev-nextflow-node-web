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
          color="#F2AE00" 
          onClick={open}
          leftSection={<IconShare size={16} />}
        >
          {t('common.invite')}
        </Button>
      </Card>
      
      <InviteModal opened={opened} onClose={close} />
    </>
  );
}