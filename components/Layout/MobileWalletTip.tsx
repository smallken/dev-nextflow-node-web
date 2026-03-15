import { Text, Group, Stack, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { isMobileDevice, openMetaMaskApp } from '../../utils/metamaskMobile';

export function MobileWalletTip() {
  // 只在移动端显示
  if (!isMobileDevice()) {
    return null;
  }

  return (
    <Alert
      variant="light"
      color="blue"
      radius="md"
      withCloseButton={false}
      icon={<IconAlertCircle size={20} />}
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: 'md'
      }}
    >
      <Stack gap="xs">
        <Text size="sm" fw={600}>
          移动端连接提示
        </Text>
        <Text size="xs" c="dimmed">
          如果点击钱包没有反应，请尝试：
        </Text>
        <Group>
          <Text
            size="xs"
            style={{
              color: '#8b5cf6',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            onClick={openMetaMaskApp}
          >
            1. 直接打开MetaMask App
          </Text>
        </Group>
        <Text size="xs" c="dimmed">
          2. 在MetaMask App内置浏览器中打开此页面
        </Text>
      </Stack>
    </Alert>
  );
}

export default MobileWalletTip;
