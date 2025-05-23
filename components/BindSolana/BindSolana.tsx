import { useState, useEffect } from 'react';
import { TextInput, Button, Paper, Text, Alert, rem, Loader, Tooltip, CopyButton, Box, Group } from '@mantine/core';
import { useField } from '@mantine/form';
import { useAccount, useChainId, useWaitForTransactionReceipt } from 'wagmi';
import {
  useSimulateBindSolanaBindSolana, useWriteBindSolanaBindSolana, useReadBindSolanaGetSolanaAddress,
  useReadNodeNftBalanceOf
} from '../../wagmi/generated';
import { IconCheck, IconX, IconCopy, IconCheck as IconCheckmark } from '@tabler/icons-react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@mantine/hooks';
import { NODE_NFT_TOKEN_ID } from '../../config/constants'

export function BindSolana() {
  const account = useAccount();
  const { address, isConnected } = account;
  const { openConnectModal } = useConnectModal();
  const { t } = useTranslation();
  const chainId = useChainId();
  const [currentSolanaAddress, setCurrentSolanaAddress] = useState<string>('');
  const isMobile = useMediaQuery('(max-width: 576px)');
  const [wasConnected, setWasConnected] = useState(false);
  const [hasNFT, setHasNFT] = useState<boolean | null>(null);
  const [checkingNFT, setCheckingNFT] = useState<boolean>(false);

  // Function to truncate address for mobile display
  const formatAddress = (address: string) => {
    if (!address) return '';
    if (isMobile) {
      return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }
    return address;
  };


  async function validateAsync(value: string) {
    // resolve(value === 'mantine' ? null : 'Value must be "mantine"');
    let val = null
    if (!value) {
      return t('bindSolana.addressRequired')
    } else if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value)) {
      return t('bindSolana.addressInvalid')
    } else {

      const isUserRegistered = await checkRegistrationStatus(value);
      if (!isUserRegistered) {
        return t('bindSolana.registrationRequired');
      }
    }
    return null
  }

  // Check if the user is registered in the flipflop system based on their Solana address
  async function checkRegistrationStatus(solanaAddress: string) {
    if (!solanaAddress) {
      return false;
    }
    try {
      const response = await fetch(`/api/flipflop?solanaAddress=${solanaAddress}`);
      const data = await response.json();
      const isUserRegistered = !!data.registered;
      return isUserRegistered;
    } catch (error) {
      console.error('Error checking registration status:', error);
      return false;
    }
  };

  const field = useField({
    initialValue: '',
    validateOnBlur: true,
    validate: validateAsync
  });

  // Monitor wallet connection status changes and update wasConnected when the status changes
  useEffect(() => {
    if (wasConnected && !isConnected) {
      setCurrentSolanaAddress('');
      field.reset();
    }

    setWasConnected(isConnected);
  }, [isConnected, wasConnected, field]);

  // 查询用户当前绑定的Solana地址
  const { data: solanaAddressFromContract, refetch } = useReadBindSolanaGetSolanaAddress({
    args: [address!],
    query: {
      enabled: !!address,
    },
  });


  // 查询当前用户拥有的NodeNFT数量
  const { data: nodeNftBalance, isLoading: isLoadingNFT, refetch: refetchNftBalance } = useReadNodeNftBalanceOf({
    args: [address!, NODE_NFT_TOKEN_ID], // ERC1155需要传递account和id参数
    query: {
      enabled: !!address,
    },
  });

  // 更新NFT持有状态
  useEffect(() => {
    console.log('NFT Balance Effect:', { nodeNftBalance, isLoadingNFT });

    if (nodeNftBalance !== undefined) {
      // 如果有数据，更新状态
      console.log('Setting hasNFT:', nodeNftBalance > BigInt(0));
      setHasNFT(nodeNftBalance > BigInt(0));
      setCheckingNFT(false);
    } else if (isLoadingNFT) {
      // 正在加载
      console.log('Setting checkingNFT: true (loading)');
      setCheckingNFT(true);
    } else {
      // 加载完成但没有数据，可能是请求失败
      console.log('Setting checkingNFT: false (not loading but no data)');
      setCheckingNFT(false);
      // 默认设置为没有NFT
      setHasNFT(false);
    }
  }, [nodeNftBalance, isLoadingNFT]);

  const {
    data: hash,
    writeContractAsync: bind,
    isPending: isWritePending,
    isError: isWriteError,
    error: writeErrorData } = useWriteBindSolanaBindSolana();

  // console.log('useWriteBindSolanaBindSolana', hash, isWritePending, isWriteError, writeErrorData)


  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isConfirmingError,
    error: confirmErrorData } =
    useWaitForTransactionReceipt({
      hash,
    });

  // console.log('useWaitForTransactionReceipt', hash, isConfirming, isConfirmed, isConfirmingError, confirmErrorData)

  async function submitBindSolana() {
    if (openConnectModal) {
      openConnectModal();
      return
    }

    await field.validate()

    if (field.error || !field.getValue()) {
      return
    }

    // 验证用户是否拥有足够的NodeNFT
    if (hasNFT === false) {
      notifications.show({
        id: 'nft-requirement',
        title: t('error_title'),
        message: t('bindSolana.nodeNftRequired'),
        color: 'red',
        icon: <IconX />,
        autoClose: 5000,
      });
      return;
    }

    // 如果还在检查NFT余额，提示用户等待
    if (checkingNFT) {
      notifications.show({
        id: 'checking-nft',
        title: t('transaction_processing_title'),
        message: t('bindSolana.checkingNftBalance'),
        loading: true,
        autoClose: false,
      });
      return;
    }

    try {
      notifications.show({
        id: 'bind-solana-tx',
        title: t('transaction_processing_title'),
        message: t('submitting_transaction'),
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });

      await bind({
        args: [field.getValue(), []],
      })

      notifications.update({
        id: 'bind-solana-tx',
        title: t('transaction_submitted'),
        message: t('waiting_confirmation'),
        loading: true,
        autoClose: false,
      });
    } catch (error: any) {
      console.log('error', error)

      notifications.update({
        id: 'bind-solana-tx',
        title: t('error'),
        message: t('something_went_wrong'), //error?.shortMessagegs
        color: 'red',
        icon: <IconX />,
        autoClose: 3000,
      });
    }

  }

  useEffect(() => {
    if (!hash) return;

    if (isConfirming) {
      // Update notification, show transaction confirmation in progress
      notifications.update({
        id: 'bind-solana-tx',
        title: t('transaction_processing'),
        message: t('waiting_confirmation'),
        loading: true,
        autoClose: false,
      });
    }
    if (isConfirmed) {

      notifications.update({
        id: 'bind-solana-tx',
        title: t('bindSolana.bindingSuccessful'),
        message: t('bindSolana.bindingConfirmed'),
        color: 'green',
        icon: <IconCheck />,
        autoClose: 3000,
      });

      // TODO
      // refresh UI
      refetch()
      field.reset()
    }

    if (isConfirmingError) {

      notifications.update({
        id: 'bind-solana-tx',
        title: t('transaction_failed'),
        message: confirmErrorData instanceof Error ? (confirmErrorData.message) : t('transaction_failed'),
        color: 'red',
        icon: <IconX />,
        autoClose: 6000,
      });
    }

  }, [hash, isConfirming, isConfirmed, isConfirmingError, confirmErrorData])

  useEffect(() => {
    if (solanaAddressFromContract && solanaAddressFromContract !== '') {
      setCurrentSolanaAddress(solanaAddressFromContract);
    }
  }, [solanaAddressFromContract]);

  return (
    <Paper p="xl" radius="md" withBorder>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Text size="xl" fw={700}>{t('bindSolana.title')}</Text>

        {
          currentSolanaAddress &&
          <Alert icon={<IconCheck />} title={t('bindSolana.currentAddress')} color="green" variant="light">
            <Group align="center" gap="xs">
              <Text style={{ wordBreak: "break-all", flex: 1 }}>
                {formatAddress(currentSolanaAddress)}
              </Text>
              <CopyButton value={currentSolanaAddress} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? t('common.copied') : t('common.copy')} withArrow position="right">
                    <Button
                      color={copied ? 'teal' : 'gray'}
                      size="xs"
                      style={{ minWidth: '36px', height: '36px', padding: 0 }}
                      onClick={copy}
                      variant="light"
                    >
                      {copied ? (
                        <IconCheckmark style={{ width: rem(16), height: rem(16) }} />
                      ) : (
                        <IconCopy style={{ width: rem(16), height: rem(16) }} />
                      )}
                    </Button>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          </Alert>
        }

        {/* NFT余额状态提示 */}
        {address && (
          <>
            {checkingNFT ? (
              <Alert icon={<Loader size="sm" />} color="blue" variant="light">
                {t('bindSolana.checkingNftBalance')}
              </Alert>
            ) : hasNFT === false && (
              <Alert icon={<IconX />} title={t('error_title')} color="red" variant="light">
                {t('bindSolana.nodeNftRequired')}
              </Alert>
            )}
          </>
        )}

        <TextInput {...field.getInputProps()}
          label={t('bindSolana.addressLabel')}
          rightSection={field.isValidating ? <Loader size={18} /> : null}
          placeholder={t('bindSolana.addressPlaceholder')}
          description={t('bindSolana.addressDescription')}
          mb="md"
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
        <Button
          onClick={submitBindSolana}
          disabled={field.error || !field.getValue()}
          loading={field.isValidating || isWritePending || isConfirming}
          fullWidth={isMobile}
        >
          {currentSolanaAddress ? t('bindSolana.updateBinding') : t('bindSolana.bindAddress')}
        </Button>

      </div>

    </Paper>
  );
}