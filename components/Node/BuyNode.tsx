import { Button, Card, Space, Text, Group, NumberInput, Collapse, Center, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUser } from '../../context/UserContext';
import { useWritePoolBuyNode, useReadPoolGetNodePrice } from '../../wagmi/generated';
import { useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX,IconChevronsDown,IconChevronsUp  } from '@tabler/icons-react';
import React, { useState, useCallback } from 'react';
import { formatEther } from 'viem';
import { ApproveUsdt } from './ApproveUsdt';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useTranslation } from 'react-i18next';

export function BuyNode() {
  const { t } = useTranslation();

  const account = useAccount();
  const { openConnectModal } = useConnectModal();

  const [opened, { toggle }] = useDisclosure(false);
  const { contractUserInfo, usdtBalance, usdtAllowanceForPool, appInfo, refreshData } = useUser();
  const [buyAmount, setBuyAmount] = useState<number>(1);
  
  // Track which button is currently loading
  const [loadingButton, setLoadingButton] = useState<'one' | 'five' | 'custom' | null>(null);

  // Control approve modal
  const [approveModalOpened, setApproveModalOpened] = useState(false);
  const [requiredApproveAmount, setRequiredApproveAmount] = useState<bigint>(BigInt(0));

  // Get NFT price
  const { data: nftPrice } = useReadPoolGetNodePrice();

  // Use Wagmi's useWritePoolBuyNode hook for contract interaction
  const {
    data: hash,
    error,
    isPending,
    isError,
    writeContractAsync: buyNft
  } = useWritePoolBuyNode();

  console.log('useWritePoolBuyNode', hash, isPending, isError, error)
  console.log('USDT allowance', usdtAllowanceForPool)

  // Check approval and handle purchase operation
  const handleBuyNode = useCallback((amount: number, buttonType: 'one' | 'five' | 'custom') => {
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
    console.log('refresh after approve')
    refreshData()
    // Reset loading button state
    setLoadingButton(null);
    // submitBuyNode(buyAmount);
  }

  // Submit buy node request
  async function submitBuyNode(amount: number = 1, buttonType: 'one' | 'five' | 'custom' = 'one') {
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
      notifications.update({
        id: 'buy-tx',
        title: t('transaction_failed'),
        message: err instanceof Error ? err.message : t('transaction_error'),
        color: 'red',
        icon: <IconX />,
        autoClose: 3000,
      });
    }
  }

  // Use useWaitForTransactionReceipt to monitor the transaction
  const { isLoading: isConfirming, isSuccess: isConfirmed, isError: isConfirmingError, error: confirmErrorData } =
    useWaitForTransactionReceipt({
      hash,
    });

  console.log('useWaitForTransactionReceipt', hash, isConfirming, isConfirmed, isConfirmingError, confirmErrorData)

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
      notifications.update({
        id: 'buy-tx',
        title: t('transaction_failed'),
        message: confirmErrorData instanceof Error ? (confirmErrorData.message) : t('transaction_failed'),
        color: 'red',
        icon: <IconX />,
        autoClose: 6000,
      });
      // Reset loading button state on error
      setLoadingButton(null);
    }
  }, [hash, isConfirming, isConfirmed, isConfirmingError, confirmErrorData]);

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
        <LoadingOverlay visible={isPending || isConfirming} loaderProps={{ size: 'lg', color: '#F2AE00' }} />
        
        {/* Subtle user info in the top right corner */}
        <Group justify="space-between" mb="md" gap="xs">
          <Text size="sm" c="dimmed">
            <Text span fw={500} c="inherit">{t('nodes_owned')}:</Text> {contractUserInfo ? contractUserInfo.nodeCount : 0}
          </Text>
          <Text size="sm" c="dimmed">
            {parseFloat(formatEther(usdtBalance)).toFixed(2)} usdt
          </Text>
        </Group>

        <Space h="sm" />
        <Button
          fullWidth
          color="#F2AE00"
          onClick={() => handleBuyNode(1, 'one')}
          disabled={loadingButton === 'one' && (isPending || isConfirming)}
        >
          {loadingButton === 'one' && (isPending || isConfirming) ? t('processing') : t('buy_one_node')}
        </Button>
        <Space h="sm" />
        <Button
          fullWidth
          color="#F2AE00"
          onClick={() => handleBuyNode(5, 'five')}
          disabled={loadingButton === 'five' && (isPending || isConfirming)}
        >
          {loadingButton === 'five' && (isPending || isConfirming) ? t('processing') : t('buy_five_node')}
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
              value={buyAmount}
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
              color="#F2AE00"
              onClick={() => handleBuyNode(buyAmount, 'custom')}
              disabled={(loadingButton === 'custom' && (isPending || isConfirming)) || 
                (account.isConnected && nftPrice !== undefined && buyAmount > 0 && usdtBalance < ((nftPrice || BigInt(0)) * BigInt(buyAmount)))|| buyAmount===0}
            >
              {loadingButton === 'custom' && (isPending || isConfirming) ? t('processing') : t('buy')}
            </Button>
          </Card>
        </Collapse>
      </Card>
    </>
  );
}