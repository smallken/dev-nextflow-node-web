import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function CustomConnectButton() {
  const { t } = useTranslation();

  useEffect(() => {
    // 调试：检查移动端环境
    if (typeof window !== 'undefined') {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      console.log('=== CustomConnectButton Debug ===');
      console.log('Is Mobile:', isMobile);
      console.log('User Agent:', navigator.userAgent);
      console.log('Has ethereum:', !!window.ethereum);
      console.log('MetaMask installed:', !!(window.ethereum as any)?.isMetaMask);

      // 检查是否在MetaMask内置浏览器中
      if ((window.ethereum as any)?.isMetaMask) {
        console.log('Running in MetaMask browser');
      }
    }
  }, []);

  return (
    <ConnectButton
      accountStatus="address"
      chainStatus="icon"
      showBalance={false}
      label={t('connect')}
    />
  );
}

export default CustomConnectButton;
