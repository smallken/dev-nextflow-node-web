import { Button, Card, Space, Text, Modal, Group, Stack, Center, CopyButton, ActionIcon, Tooltip, Paper, Divider, Box } from '@mantine/core';
import { useUser } from '../../context/UserContext';
import { useDisclosure } from '@mantine/hooks';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { IconCopy, IconCheck, IconShare, IconBrandFacebook, IconBrandTwitter, IconBrandTelegram } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

export function Invite() {
  const { t } = useTranslation();

  const { contractUserInfo, address } = useUser();
  const [opened, { open, close }] = useDisclosure(false);
  const [inviteUrl, setInviteUrl] = useState('');
  
  // Generate the invitation URL with the user's address
  useEffect(() => {
    if (address) {
      // Get the base URL (without query parameters)
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : '';
      
      // Create the full invitation URL
      setInviteUrl(`${baseUrl}?inviter=${address}`);
    }
  }, [address]);
  
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Button 
          fullWidth 
          color="#F2AE00" 
          onClick={open}
          leftSection={<IconShare size={16} />}
        >
          {t('invite')}
        </Button>
      </Card>
      
      <Modal 
        opened={opened} 
        onClose={close} 
        title={t('invite_friends')} 
        centered 
        size="md"
        styles={{
          title: { fontSize: '1.2rem', fontWeight: 600 }
        }}
      >
        <Stack gap="lg">
          <Text ta="center" fw={500} size="lg" c="#F2AE00">{t('scan_or_copy')}</Text>
          
          <Paper shadow="xs" withBorder radius="md" p="md" style={{ background: '#FAFAFA' }}>
            <Center py="md">
              <Box style={{ padding: '10px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <QRCodeSVG 
                  value={inviteUrl} 
                  size={200} 
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  includeMargin={false}
                />
              </Box>
            </Center>
          </Paper>
          
          <Paper p="xs" withBorder radius="md" bg="var(--mantine-color-gray-0)">
            <Group style={{ width: '100%' }} wrap="nowrap">
              <Box style={{ flex: 1, overflow: 'hidden' }}>
                <Group gap={4} wrap="nowrap">
                  {/* Beginning of URL */}
                  <Text fw={500} style={{ fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                    {inviteUrl.length > 30 ? inviteUrl.substring(0, 20) : inviteUrl}
                  </Text>
                  
                  {/* Middle ellipsis if URL is long */}
                  {inviteUrl.length > 30 && (
                    <Text c="dimmed">...</Text>
                  )}
                  
                  {/* End of URL */}
                  {inviteUrl.length > 30 && (
                    <Text fw={500} style={{ fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                      {inviteUrl.substring(inviteUrl.length - 10)}
                    </Text>
                  )}
                </Group>
              </Box>
              
              <CopyButton value={inviteUrl} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? t('copied') : t('copy_link')} withArrow position="top">
                    <ActionIcon color={copied ? 'teal' : '#F2AE00'} variant={copied ? 'filled' : 'light'} onClick={copy}>
                      {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          </Paper>
          
          {/* <Divider label={t('share_invitation')} labelPosition="center" /> */}
          {/* <Group position="center" spacing="md">
            <ActionIcon size="lg" variant="light" color="blue">
              <IconBrandFacebook size={18} />
            </ActionIcon>
            <ActionIcon size="lg" variant="light" color="cyan">
              <IconBrandTwitter size={18} />
            </ActionIcon>
            <ActionIcon size="lg" variant="light" color="blue">
              <IconBrandTelegram size={18} /> 
            </ActionIcon>
          </Group> */}
          
          <Text c="dimmed" size="sm" ta="center" px="md">
            {t('invite_reward_desc')}
          </Text>
        </Stack>
      </Modal>
    </>
  );
}