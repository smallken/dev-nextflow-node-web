import { Button, Card, Space, Text, Group, NumberInput, Collapse, LoadingOverlay, Alert } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUser } from '../../context/UserContext';
import { useWritePoolBuyPhone, useReadPoolUsdtPrice } from '../../wagmi/generated';
import { useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX, IconChevronsDown, IconChevronsUp, IconAlertCircle } from '@tabler/icons-react';
import React, { useState, useCallback, useMemo } from 'react';
import { formatEther } from 'viem';
import { ApproveUsdt } from './ApproveUsdt';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { isValidEthAddress, isNonZeroAddress, parseContractError } from '../../utils';

export function BuyNode() {
  const { t } = useTranslation();
  const router = useRouter();
  const account = useAccount();
  const { openConnectModal } = useConnectModal();

  const [opened, { toggle }] = useDisclosure(false);
  const { contractUserInfo, usdtBalance, usdtAllowanceForPool, appInfo, refreshData } = useUser();
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

    // Check if ref exists, is a valid Ethereum address, and not zero address
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

  const isNftMintComplete = appInfo?.isNftMintComplete;

  // Check if user has already registered (has a parent)
  const isRegistered = contractUserInfo?.parent && contractUserInfo.parent !== '0x0000000000000000000000000000000000000000';

  console.log('useWritePoolBuyPhone', hash, isPending, isError, error);
  console.log('USDT allowance', usdtAllowanceForPool);

  // Check approval and handle purchase operation
  const handleBuyNode = useCallback((amount: number, buttonType: 'one' | 'custom') => {
    try {
      console.log('Buying node:', amount);
      console.log('NFT Price:', nftPrice);

      // Set loading button type
      setLoadingButton(buttonType);

      // Check wallet connection
      if (!account.isConnected) {
        if (openConnectModal) {
          openConnectModal();
        }
        return;
      }

      // Return if price is not available
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

      // Calculate total amount needed for purchase
      const totalAmount = nftPrice * BigInt(amount);

      // If balance is insufficient, notify user
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

      // If approval allowance is insufficient, open approval modal
      if (usdtAllowanceForPool < totalAmount) {
        // Save purchase parameters to continue after approval
        setPendingPurchase({ amount, buttonType });
        setRequiredApproveAmount(totalAmount);
        setApproveModalOpened(true);
        return;
      }

      // If approval is sufficient, proceed with purchase
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
    // After successful approval, automatically proceed to purchase process
    console.log('refresh after approve');
    refreshData();

    // Continue with pending purchase if exists
    if (pendingPurchase) {
      const { amount, buttonType } = pendingPurchase;
      console.log('Continuing purchase after approval:', amount);
      // Clear pending purchase
      setPendingPurchase(null);
      // Continue with purchase
      submitBuyNode(amount, buttonType);
    }
  }

  // Submit buy node request
  async function submitBuyNode(amount: number = 1, buttonType: 'one' | 'custom' = 'one') {
    console.log('submitBuyNode', amount);
    setLoadingButton(buttonType);

    try {
      // Show loading notification
      notifications.show({
        id: 'buy-tx',
        title: t('transaction_processing_title'),
        message: t('submitting_transaction'),
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });

      // Send transaction - convert to bigint type
      await buyNft({
        args: [BigInt(amount)],
      });

      // Transaction sent successfully - update notification
      notifications.update({
        id: 'buy-tx',
        title: t('transaction_submitted'),
        message: t('waiting_confirmation'),
        loading: true,
        autoClose: false,
      });

    } catch (err) {
      // Transaction sending failed
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
      confirmations: 3, // BSC主网建议3个确认 (~9秒)
    });

  console.log('useWaitForTransactionReceipt 购买状态:', { hash, isConfirming, isConfirmed, isConfirmingError, confirmErrorData });

  // Handle transaction confirmation
  React.useEffect(() => {
    if (!hash) return;

    if (isConfirming) {
      // Update notification, show transaction confirmation in progress
      notifications.update({
        id: 'buy-tx',
        title: t('transaction_processing'),
        message: t('waiting_confirmation'),
        loading: true,
        autoClose: false,
      });
    }

    if (isConfirmed) {
      // Transaction successfully confirmed
      notifications.update({
        id: 'buy-tx',
        title: t('purchase_successful'),
        message: t('purchase_confirmed'),
        color: 'green',
        icon: <IconCheck />,
        autoClose: 3000,
      });

      // Refresh global data to update UI
      refreshData();
      // Reset loading button state
      setLoadingButton(null);
      console.log('Refreshed global data after successful purchase');
    }

    if (isConfirmingError) {
      // Transaction failed
      const errorMessage = parseContractError(confirmErrorData);
      notifications.update({
        id: 'buy-tx',
        title: t('transaction_failed'),
        message: errorMessage,
        color: 'red',
        icon: <IconX />,
        autoClose: 6000,
      });
      // Reset loading button state on error
      setLoadingButton(null);
    }
  }, [hash, isConfirming, isConfirmed, isConfirmingError, confirmErrorData]);

  // If wallet is not connected, show connect wallet prompt
  if (!account.isConnected) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Alert
          color="blue"
          title={t('connect_wallet_title')}
          icon={<IconAlertCircle size={16} />}
          variant="light"
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
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Alert
          color="orange"
          title={t('no_referrer_title')}
          icon={<IconAlertCircle size={16} />}
          variant="light"
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

      <Card shadow="sm" padding="lg" radius="md" withBorder pos="relative">
        <LoadingOverlay visible={isPending || isConfirming} loaderProps={{ size: 'lg', color: '#8b5cf6' }} />

        {/* Subtle user info in the top right corner */}
        <Group justify="space-between" mb="md" gap="xs">
          <Text size="sm" c="dimmed">
            <Text span fw={500} c="inherit">{t('phones_purchased')}:</Text> {contractUserInfo ? contractUserInfo.salesCount : 0}
          </Text>
          <Text size="sm" c="dimmed">
            {parseFloat(formatEther(usdtBalance)).toFixed(2)} USDT
          </Text>
        </Group>

        <Space h="sm" />
        <Button
          fullWidth
          styles={{
            root: {
              background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
              border: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
              }
            }
          }}
          onClick={() => handleBuyNode(1, 'one')}
          disabled={(loadingButton === 'one' && (isPending || isConfirming)) || isNftMintComplete}
        >
          {loadingButton === 'one' && (isPending || isConfirming) ? t('processing') : (isRegistered ? t('buy_one_phone') : t('buy_one_node'))+' ('+ formatEther(BigInt(1) * (nftPrice || BigInt(0)))+' USDT)'}
        </Button>

        <Space h="sm" />
        <Group justify="center" mb={5} onClick={toggle}>
          {opened ? <IconChevronsUp size={16} /> : <IconChevronsDown size={16} />}
        </Group>

        <Collapse in={opened}>
          <Card p="md" withBorder shadow="sm" radius="md" mt="xs">
            <Text size="sm" fw={500} mb="xs">{t('custom_quantity')}</Text>

            <NumberInput
              size="md"
              placeholder="1-100"
              clampBehavior="strict"
              allowNegative={false}
              allowDecimal={false}
              stepHoldDelay={500}
              stepHoldInterval={100}
              defaultValue={1}
              min={1}
              max={100}
              value={buyAmount || ''}
              onChange={(val) => setBuyAmount(Number(val))}
              mb="sm"
            />

            <Text size="sm" c="dimmed" mb="md">
              {t('total_cost')}: <Text span fw={700} c="blue">{formatEther(BigInt(buyAmount) * (nftPrice || BigInt(0)))} USDT</Text>
            </Text>

            {/* Show warning when balance is insufficient */}
            {account.isConnected && nftPrice !== undefined && buyAmount > 0 && usdtBalance < (nftPrice * BigInt(buyAmount)) && (
              <Text size="sm" c="red" mb="md">
                {t('insufficient_usdt')}: {t('required_balance', {
                  required: formatEther(nftPrice * BigInt(buyAmount)),
                  current: formatEther(usdtBalance)
                })}
              </Text>
            )}

            <Button
              fullWidth
              styles={{
                root: {
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                  border: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                  }
                }
              }}
              onClick={() => handleBuyNode(buyAmount, 'custom')}
              disabled={(loadingButton === 'custom' && (isPending || isConfirming)) ||
                (account.isConnected && nftPrice !== undefined && buyAmount > 0 && usdtBalance < ((nftPrice || BigInt(0)) * BigInt(buyAmount)))|| buyAmount===0 || isNftMintComplete}
            >
              {loadingButton === 'custom' && (isPending || isConfirming) ? t('processing') : (isRegistered ? t('buy_phone') : t('buy_node'))}
            </Button>
          </Card>
        </Collapse>
      </Card>
    </>
  );
}
