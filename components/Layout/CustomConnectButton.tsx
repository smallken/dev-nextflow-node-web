import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTranslation } from 'react-i18next';

export function CustomConnectButton() {
  const { t } = useTranslation();

  return (
    <div style={{
      // 自定义 RainbowKit 按钮颜色
      ['--rk-colors-accentColor' as any]: '#00A8FF',
      ['--rk-colors-accentColorForeground' as any]: 'white',
    }}>
      <ConnectButton
        accountStatus="address"
        chainStatus="icon"
        showBalance={false}
        label={t('connect')}
      />
    </div>
  );
}

export default CustomConnectButton;
