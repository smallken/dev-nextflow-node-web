import { Button, Card, Space, Text, Group, NumberInput, Collapse, LoadingOverlay, Alert, Stack, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUser } from '../../context/UserContext';
import { useWritePoolBuyPhone, useReadPoolUsdtPrice } from '../../wagmi/generated';
import { useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX, IconChevronsDown, IconChevronsUp, IconAlertCircle, IconWallet, IconShoppingBag } from '@tabler/icons-react';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { formatEther } from 'viem';
import { ApproveUsdt } from './ApproveUsdt';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { isValidEthAddress, isNonZeroAddress, parseContractError } from '../../utils';

interface BuyNodeProps {
  blueColor?: string;
  blueGradient?: string;
  blueDark?: string;
  blueLight?: string;
}

export function BuyNode({
  blueColor = '#3B82F6',
  blueGradient = 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
  blueDark = '#2563EB',
  blueLight = '#60A5FA'
}: BuyNodeProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const account = useAccount();
  const { openConnectModal } = useConnectModal();

  const [opened, { toggle }] = useDisclosure(false);
  const { contractUserInfo, usdtBalance, usdtAllowanceForPool, appInfo, refreshData, loadUserData } = useUser();
  
  // Trigger user data loading when component mounts
  useEffect(() => {
    loadUserData();
  }, []);
  const [buyAmount, setBuyAmount] = useState<number>(1);

  // Track which button is currently loading
  const [loadingButton, setLoadingButton] = useState<'one' | 'custom' | null>(null);

  // Control approve modal
  const [approveModalOpened, setApproveModalOpened] = useState(false);
  const [requiredApproveAmount, setRequiredApproveAmount] = useState<bigint>(BigInt(0));

  // Save purchase parameters to continue after approval
  const [pendingPurchase, setPendingPurchase] = useState<{ amount: number; buttonType: 'one' | 'custom' } | null>(null);

  // Get referrer address from URL query parameter
  const referrerAddress = useMemo(() => {
    const { ref } = router.query;

    if (ref && typeof ref === 'string' && isValidEthAddress(ref) && isNonZeroAddress(ref)) {
      return ref as `0x${string}`;
    }

    return undefined;
  }, [router.query]);

  // Get NFT price
  const { data: nftPrice } = useReadPoolUsdtPrice();

  // Use Wagmi's useWritePoolBuyPhone hook for contract interaction
  const {
    data: hash,
    error,
    isPending,
    isError,
    writeContractAsync: buyNft
  } = useWritePoolBuyPhone();

  // Check if user has already registered (has an upline)
  const isRegistered = contractUserInfo?.upline && contractUserInfo.upline !== '0x0000000000000000000000000000000000000000';

  // 计算最大可购买数量
  const maxBuyAmount = Math.min(50, appInfo?.batchRemainingStock || 0);

  // 售罄标志
  const isNftMintComplete = appInfo?.batchRemainingStock === 0;

  // Check approval and handle purchase operation
  const handleBuyNode = useCallback((amount: number, buttonType: 'one' | 'custom') => {
    try {
      setLoadingButton(buttonType);

      if (!account.isConnected) {
        if (openConnectModal) {
          openConnectModal();
        }
        return;
      }

      if (!nftPrice) {
        notifications.show({
          title: t('unable_get_price'),
          message: t('try_again_later'),
          color: 'red',
          icon: <IconX />,
          autoClose: 3000,
        });
        return;
      }

      const totalAmount = nftPrice * BigInt(amount);

      if (usdtBalance < totalAmount) {
        notifications.show({
          title: t('insufficient_usdt'),
          message: t('required_balance', { required: formatEther(totalAmount), current: formatEther(usdtBalance) }),
          color: 'red',
          icon: <IconX />,
          autoClose: 6000,
        });
        return;
      }

      if (usdtAllowanceForPool < totalAmount) {
        setPendingPurchase({ amount, buttonType });
        setRequiredApproveAmount(totalAmount);
        setApproveModalOpened(true);
        return;
      }

      submitBuyNode(amount, buttonType);
    } catch (error) {
      console.error('Error in handleBuyNode:', error);
      notifications.show({
        title: t('error'),
        message: t('something_went_wrong'),
        color: 'red',
        icon: <IconX />,
        autoClose: 3000,
      });
      setLoadingButton(null);
    }
  }, [account, nftPrice, usdtBalance, usdtAllowanceForPool, t, openConnectModal]);

  // Callback after successful approval
  function handleApproveSuccess() {
    console.log('refresh after approve');
    refreshData();

    if (pendingPurchase) {
      const { amount, buttonType } = pendingPurchase;
      console.log('Continuing purchase after approval:', amount);
      setPendingPurchase(null);
      submitBuyNode(amount, buttonType);
    }
  }

  // Submit buy node request
  async function submitBuyNode(amount: number = 1, buttonType: 'one' | 'custom' = 'one') {
    console.log('submitBuyNode', amount);
    setLoadingButton(buttonType);

    try {
      notifications.hide('register-tx');
      notifications.show({
        id: 'buy-tx',
        title: t('transaction_processing_title'),
        message: t('submitting_transaction'),
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });

      await buyNft({
        args: [BigInt(amount)],
      });

      notifications.update({
        id: 'buy-tx',
        title: t('transaction_submitted'),
        message: t('waiting_confirmation'),
        loading: true,
        autoClose: false,
      });

    } catch (err) {
      console.error('Transaction error:', err);
      const errorMessage = parseContractError(err);
      notifications.update({
        id: 'buy-tx',
        title: t('transaction_failed'),
        message: errorMessage,
        color: 'red',
        icon: <IconX />,
        autoClose: 5000,
      });
    }
  }

  // Use useWaitForTransactionReceipt to monitor the transaction
  const { isLoading: isConfirming, isSuccess: isConfirmed, isError: isConfirmingError, error: confirmErrorData } =
    useWaitForTransactionReceipt({
      hash,
      confirmations: 3,
    });

  // Handle transaction confirmation
  React.useEffect(() => {
    if (!hash) return;

    if (isConfirming) {
      notifications.update({
        id: 'buy-tx',
        title: t('transaction_processing'),
        message: t('waiting_confirmation'),
        loading: true,
        autoClose: false,
      });
    }

    if (isConfirmed) {
      notifications.update({
        id: 'buy-tx',
        title: t('purchase_successful'),
        message: t('purchase_confirmed'),
        color: 'green',
        icon: <IconCheck />,
        autoClose: 3000,
      });

      refreshData();
      setLoadingButton(null);
    }

    if (isConfirmingError) {
      const errorMessage = parseContractError(confirmErrorData);
      notifications.update({
        id: 'buy-tx',
        title: t('transaction_failed'),
        message: errorMessage,
        color: 'red',
        icon: <IconX />,
        autoClose: 6000,
      });
      setLoadingButton(null);
    }
  }, [hash, isConfirming, isConfirmed, isConfirmingError, confirmErrorData]);

  // If wallet is not connected, show connect wallet prompt
  if (!account.isConnected) {
    return (
      <Card withBorder radius="xl" p="xl">
        <Alert
          color="blue"
          title={t('connect_wallet_title')}
          icon={<IconAlertCircle size={20} />}
          variant="light"
          radius="lg"
        >
          <Text size="sm" c="dimmed">
            {t('connect_wallet_message')}
          </Text>
        </Alert>
      </Card>
    );
  }

  // If user is not registered and no valid referrer, show error
  if (!isRegistered && !referrerAddress) {
    return (
      <Card withBorder radius="xl" p="xl">
        <Alert
          color="orange"
          title={t('no_referrer_title')}
          icon={<IconAlertCircle size={20} />}
          variant="light"
          radius="lg"
        >
          <Text size="sm" c="dimmed">
            {t('no_referrer_message')}
          </Text>
        </Alert>
      </Card>
    );
  }

  return (
    <>
      {/* Approval Modal */}
      <ApproveUsdt
        opened={approveModalOpened}
        onClose={() => setApproveModalOpened(false)}
        amount={requiredApproveAmount}
        onApproveSuccess={handleApproveSuccess}
      />

      {/* 购买卡片 */}
      <Card
        withBorder
        radius="xl"
        p={{ base: 'lg', sm: 'xl', md: 'xl' }}
        pos="relative"
        className="home-card"
        styles={{
          root: {
            background: '#FFFFFF',
            border: '1px solid rgba(59, 130, 246, 0.08)',
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
          }
        }}
      >
        <LoadingOverlay visible={isPending || isConfirming} loaderProps={{ size: 'lg', color: blueColor }} />

        {/* 用户信息栏 */}
        <Group justify="space-between" wrap="nowrap" mb="md">
          <Text size="sm" fw={600} c={blueColor}>
            {t('you_purchased')}：{contractUserInfo ? contractUserInfo.salesCount : 0}{t('nai_units')}
          </Text>
          <Text size="sm" fw={600} c={blueColor}>
            {Math.floor(parseFloat(formatEther(usdtBalance)))} USDT
          </Text>
        </Group>

        {/* 主购买按钮 - 按照8.jpg样式 */}
        <Button
          fullWidth
          size="xl"
          radius="lg"
          onClick={() => handleBuyNode(1, 'one')}
          disabled={(loadingButton === 'one' && (isPending || isConfirming)) || isNftMintComplete}
          style={{ cursor: isNftMintComplete ? 'not-allowed' : 'pointer' }}
          styles={{
            root: {
              background: '#00A8FF',
              border: 'none',
              fontWeight: 600,
              height: '56px',
              fontSize: '16px',
              '&:hover:not(:disabled)': {
                background: '#0096E6',
              },
              '&:disabled': {
                background: '#94C9E8',
                opacity: 0.6,
              },
            }
          }}
        >
          {isNftMintComplete
            ? t('sold_out')
            : (loadingButton === 'one' && (isPending || isConfirming)
              ? t('processing')
              : t('buy_one_nai_phone', { price: formatEther(BigInt(1) * (nftPrice || BigInt(0))) }))
          }
        </Button>

        <Space h="xs" />

        {/* 展开/收起按钮 */}
        <Group justify="center" onClick={toggle} style={{ cursor: isNftMintComplete ? 'not-allowed' : 'pointer' }}>
          {opened ? (
            <Group gap={4}>
              <Text size="sm" c="dimmed">{t('collapse')}</Text>
              <IconChevronsUp size={16} color={blueColor} />
            </Group>
          ) : (
            <Group gap={4}>
              <Text size="sm" c="dimmed">{t('expand')}</Text>
              <IconChevronsDown size={16} color={blueColor} />
            </Group>
          )}
        </Group>

        {/* 自定义数量区域 */}
        <Collapse in={opened}>
          <Card
            p="md"
            withBorder
            radius="lg"
            mt="sm"
            styles={{
              root: {
                background: 'linear-gradient(145deg, rgba(37, 99, 235, 0.02) 0%, rgba(59, 130, 246, 0.04) 100%)',
                borderColor: 'rgba(37, 99, 235, 0.15)',
              }
            }}
          >
            <Stack gap="md">
              <Text size="sm" fw={600} c={blueColor}>{t('custom_quantity')}</Text>

              <NumberInput
                size="md"
                placeholder={`1-${maxBuyAmount}`}
                clampBehavior="strict"
                allowNegative={false}
                allowDecimal={false}
                stepHoldDelay={500}
                stepHoldInterval={100}
                defaultValue={1}
                min={1}
                max={maxBuyAmount}
                value={buyAmount || ''}
                onChange={(val) => setBuyAmount(Number(val))}
                disabled={isNftMintComplete}
                description={isNftMintComplete ? t('sold_out') : (maxBuyAmount < 50 ? t('remaining_phones', { count: maxBuyAmount }) : t('max_50_phones_hint'))}
                styles={{
                  input: {
                    borderColor: 'rgba(37, 99, 235, 0.2)',
                    '&:focus': {
                      borderColor: blueColor,
                    },
                  },
                }}
              />

              <Text size="sm" c="dimmed">
                {t('total_cost')}: <Text span fw={700} c={blueColor}>{formatEther(BigInt(buyAmount) * (nftPrice || BigInt(0)))} USDT</Text>
              </Text>

              {/* 余额不足警告 */}
              {account.isConnected && nftPrice !== undefined && buyAmount > 0 && usdtBalance < (nftPrice * BigInt(buyAmount)) && (
                <Alert color="red" variant="light" radius="md">
                  <Text size="sm">
                    {t('insufficient_usdt')}: {t('required_balance', {
                      required: formatEther(nftPrice * BigInt(buyAmount)),
                      current: formatEther(usdtBalance)
                    })}
                  </Text>
                </Alert>
              )}

              <Button
                fullWidth
                size="lg"
                radius="lg"
                onClick={() => handleBuyNode(buyAmount, 'custom')}
                disabled={(loadingButton === 'custom' && (isPending || isConfirming)) ||
                  (account.isConnected && nftPrice !== undefined && buyAmount > 0 && usdtBalance < ((nftPrice || BigInt(0)) * BigInt(buyAmount))) || buyAmount === 0 || isNftMintComplete}
                styles={{
                  root: {
                    background: '#00A8FF',
                    border: 'none',
                    fontWeight: 600,
                    height: '48px',
                    fontSize: '16px',
                    '&:hover:not(:disabled)': {
                      background: '#0096E6',
                    },
                    '&:disabled': {
                      background: '#94C9E8',
                      opacity: 0.6,
                    },
                  }
                }}
              >
                {isNftMintComplete
                  ? t('sold_out')
                  : (loadingButton === 'custom' && (isPending || isConfirming) ? t('processing') : (isRegistered ? t('buy_phone') : t('buy_node')))}
              </Button>
            </Stack>
          </Card>
        </Collapse>
      </Card>
    </>
  );
}
