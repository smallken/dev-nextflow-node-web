import { Button, Card, Space, Text, Modal, Group, Stack, Center, CopyButton, ActionIcon, Tooltip } from '@mantine/core';
import { useUser } from '../../context/UserContext';
import { useDisclosure } from '@mantine/hooks';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { IconCopy, IconCheck } from '@tabler/icons-react';

export function Invite() {
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
        <Button fullWidth color="#F2AE00" onClick={open}>邀请好友</Button>
      </Card>
      
      <Modal opened={opened} onClose={close} title="邀请好友" centered size="md">
        <Stack>
          <Text ta="center" fw={500} size="lg">扫描二维码或复制链接邀请好友</Text>
          
          <Center py="md">
            <QRCodeSVG 
              value={inviteUrl} 
              size={200} 
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
              includeMargin={false}
            />
          </Center>
          
          <Group style={{ width: '100%' }}>
            <Text truncate fw={500} style={{ flex: 1 }}>{inviteUrl}</Text>
            <CopyButton value={inviteUrl} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? '已复制' : '复制链接'} withArrow position="top">
                  <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                    {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </Group>
          
          <Text c="dimmed" size="sm" ta="center">
            分享此链接给你的朋友，当他们注册成功后，你将获得奖励。
          </Text>
        </Stack>
      </Modal>
    </>
  );
}