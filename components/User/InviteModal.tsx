import { Modal, Stack, Text, Paper, Center, Box, Group, ActionIcon, Tooltip, Alert, Button } from '@mantine/core';
import { useRouter } from 'next/router';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { IconCopy, IconCheck, IconAlertCircle, IconInfoCircle } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/UserContext';

// 兼容移动端的复制函数
async function copyToClipboard(text: string): Promise<boolean> {
  // 优先使用现代 API
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('navigator.clipboard.writeText failed:', err);
    }
  }

  // Fallback: 使用 execCommand (兼容微信、钱包内置浏览器)
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    // 防止页面滚动
    textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    // iOS 需要设置选中范围
    textArea.setSelectionRange(0, text.length);
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  } catch (err) {
    console.error('execCommand copy failed:', err);
    return false;
  }
}

type InviteModalProps = {
  opened: boolean;
  onClose: () => void;
  blueColor?: string;
  blueGradient?: string;
  blueDark?: string;
  blueLight?: string;
};

export function InviteModal({
  opened,
  onClose,
  blueColor = '#3B82F6',
  blueGradient = 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
  blueDark = '#2563EB',
  blueLight = '#60A5FA'
}: InviteModalProps) {
  const { t, i18n } = useTranslation();
  const { address, contractUserInfo } = useUser();
  const [inviteUrl, setInviteUrl] = useState('');
  const router = useRouter();

  // Generate the invitation URL with the user's address and current language
  useEffect(() => {
    if (address) {
      const baseUrl = typeof window !== 'undefined'
        ? window.location.origin
        : '';

      const currentLang = i18n.language || 'en';

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
        title: { fontSize: '1.2rem', fontWeight: 600, color: blueColor }
      }}
    >
      <Stack gap="lg">
        {/* Case 1: User is not registered (upline address is zero) */}
        {(!contractUserInfo?.upline || contractUserInfo?.upline === '0x0000000000000000000000000000000000000000') ? (
          <Alert
            variant="light"
            color="orange"
            title={t('registration_required')}
            icon={<IconAlertCircle size={20} />}
            radius="lg"
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
                  background: blueGradient,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                  }
                }
              }}
            >
              {t('go_to_register')}
            </Button>
          </Alert>
        ) : contractUserInfo && contractUserInfo.salesCount <= 0 ? (
          // Case 2: User is registered but hasn't purchased any nodes
          <Alert
            variant="light"
            color="blue"
            title={t('node_purchase_required')}
            icon={<IconInfoCircle size={20} />}
            radius="lg"
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
                  background: blueGradient,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
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
            <Text ta="center" fw={600} size="lg" c={blueColor}>{t('scan_or_copy')}</Text>

            <Paper shadow="sm" withBorder radius="lg" p="md" styles={{
              root: {
                background: '#FAFAFA',
                borderColor: 'rgba(37, 99, 235, 0.1)',
              }
            }}>
              <Center py="md">
                <Box style={{ padding: '12px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  <QRCodeSVG
                    value={inviteUrl}
                    size={200}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="L"
                  />
                </Box>
              </Center>
            </Paper>

            <Paper p="sm" withBorder radius="lg" styles={{
              root: {
                background: 'rgba(37, 99, 235, 0.03)',
                borderColor: 'rgba(37, 99, 235, 0.15)',
              }
            }}>
              <Group gap="sm" wrap="nowrap">
                <Box style={{ flex: 1, overflow: 'hidden' }}>
                  <Text fw={500} size="sm" style={{ wordBreak: 'break-all' }}>
                    {inviteUrl}
                  </Text>
                </Box>

                <CopyButtonComponent url={inviteUrl} />
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

// 自定义复制按钮组件（兼容移动端）
function CopyButtonComponent({ url }: { url: string }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Tooltip label={copied ? t('copied') : t('copy_link')} withArrow position="top">
      <ActionIcon
        color={copied ? 'teal' : '#3B82F6'}
        variant={copied ? 'filled' : 'light'}
        onClick={handleCopy}
        radius="lg"
        size="lg"
      >
        {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
      </ActionIcon>
    </Tooltip>
  );
}
