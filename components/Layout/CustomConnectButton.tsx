import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTranslation } from 'react-i18next';

export function CustomConnectButton() {
  const { t } = useTranslation();

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
