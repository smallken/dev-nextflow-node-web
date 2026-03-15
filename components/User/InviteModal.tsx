import { Modal, Stack, Text, Paper, Center, Box, Group, CopyButton, ActionIcon, Tooltip, Alert, Button } from '@mantine/core';
import { useRouter } from 'next/router';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { IconCopy, IconCheck, IconAlertCircle, IconInfoCircle } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/UserContext';

type InviteModalProps = {
  opened: boolean;
  onClose: () => void;
};

export function InviteModal({ opened, onClose }: InviteModalProps) {
  const { t, i18n } = useTranslation();
  const { address, contractUserInfo } = useUser();
  const [inviteUrl, setInviteUrl] = useState('');
  const router = useRouter();

  // Generate the invitation URL with the user's address and current language
  useEffect(() => {
    if (address) {
      // Get the base URL (without query parameters)
      const baseUrl = typeof window !== 'undefined'
        ? window.location.origin
        : '';

      // Get current language
      const currentLang = i18n.language || 'en';

      // Create the full invitation URL with language parameter
      setInviteUrl(`${baseUrl}/?lng=${currentLang}&inviter=${address}`);
    }
  }, [address, i18n.language]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t('invite_friends')}
      centered
      size="md"
      styles={{
        title: { fontSize: '1.2rem', fontWeight: 600 }
      }}
    >
      <Stack gap="lg">
        {/* Case 1: User is not registered (parent address is zero) */}
        {(!contractUserInfo?.parent || contractUserInfo?.parent === '0x0000000000000000000000000000000000000000') ? (
          <Alert
            variant="#e5fff1"
            color="yellow"
            title={t('registration_required')}
            icon={<IconAlertCircle />}
          >
            <Text mb="md">{t('please_register_before_invite')}</Text>
            <Button
              fullWidth
              onClick={() => {
                onClose();
                router.push('/');
              }}
              styles={{
                root: {
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                  }
                }
              }}
            >
              {t('go_to_register')}
            </Button>
          </Alert>
        ) : contractUserInfo && contractUserInfo.nodeCount <= 0 ? (
          // Case 2: User is registered but hasn't purchased any nodes
          <Alert
            variant="filled"
            color="#e5fff1"
            title={t('node_purchase_required')}
            icon={<IconInfoCircle />}
          >
            <Text mb="md">{t('please_purchase_node_before_invite')}</Text>
            <Button
              fullWidth
              onClick={() => {
                onClose();
                router.push('/');
              }}
              styles={{
                root: {
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                  }
                }
              }}
            >
              {t('go_to_purchase')}
            </Button>
          </Alert>
        ) : (
          // Case 3: User is registered and has purchased nodes
          <>
            <Text ta="center" fw={500} size="lg" c="#8b5cf6">{t('scan_or_copy')}</Text>

            <Paper shadow="xs" withBorder radius="md" p="md" style={{ background: '#FAFAFA' }}>
              <Center py="md">
                <Box style={{ padding: '10px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  <QRCodeSVG
                    value={inviteUrl}
                    size={200}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                  />
                </Box>
              </Center>
            </Paper>

            <Paper p="xs" withBorder radius="md" bg="var(--mantine-color-gray-0)">
              <Group style={{ width: '100%' }} wrap="nowrap">
                <Box style={{ flex: 1, overflow: 'hidden' }}>
                  <Group gap={4} wrap="nowrap">
                    {/* Complete URL for easy selection/copying */}
                    <Text fw={500} style={{ fontSize: '0.9rem', wordBreak: 'break-all' }}>
                      {inviteUrl}
                    </Text>
                  </Group>
                </Box>

                <CopyButton value={inviteUrl} timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? t('copied') : t('copy_link')} withArrow position="top">
                      <ActionIcon color={copied ? 'teal' : '#8b5cf6'} variant={copied ? 'filled' : 'light'} onClick={copy}>
                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </Group>
            </Paper>

            <Text c="dimmed" size="sm" ta="center" px="md">
              {t('invite_reward_desc')}
            </Text>
          </>
        )}
      </Stack>
    </Modal>
  );
}
