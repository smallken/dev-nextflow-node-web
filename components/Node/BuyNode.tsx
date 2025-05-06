import { Button, Card, Space, Text, Group, NumberInput, Collapse, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUser } from '../../context/UserContext';
import { useWritePoolBuyNft, useReadPoolNftPrice } from '../../wagmi/generated';
import { useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { formatEther, parseEther } from 'viem';
import { ApproveUsdt } from './ApproveUsdt';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export function BuyNode() {
  const account = useAccount();
  const { openConnectModal } = useConnectModal();

  const [opened, { toggle }] = useDisclosure(false);
  const { contractUserInfo, usdtBalance, usdtAllowanceForPool, appInfo, refreshData } = useUser();
  const [buyAmount, setBuyAmount] = useState<number>(1);

  // Control approve modal
  const [approveModalOpened, setApproveModalOpened] = useState(false);
  const [requiredApproveAmount, setRequiredApproveAmount] = useState<bigint>(BigInt(0));

  // Get NFT price
  const { data: nftPrice } = useReadPoolNftPrice();

  // Use Wagmi's useWritePoolBuyNft hook for contract interaction
  const {
    data: hash,
    error,
    isPending,
    isError,
    writeContractAsync: buyNft
  } = useWritePoolBuyNft();

  console.log('useWritePoolBuyNft', hash, isPending, isError, error)
  console.log('USDT allowance', usdtAllowanceForPool)

  // Check approval and handle purchase operation
  function handleBuyNode(amount: number = 1) {

    // Check if user has connected wallet
    if (!account.isConnected) {
      // If wallet is not connected, open wallet selection modal
      if (openConnectModal) {
        openConnectModal();
      }
      return;
    }


    // Return if price is not available
    if (!nftPrice) {
      notifications.show({
        title: 'Unable to get node price',
        message: 'Please try again later',
        color: 'red',
        icon: <IconX />,
        autoClose: 3000,
      });
      return;
    }

    // Calculate total amount needed for purchase
    // nftPrice needs to be multiplied by 10^18 to convert to wei units
    const totalAmount = nftPrice * BigInt(10 ** 18) * BigInt(amount);

    // If balance is insufficient, notify user
    if (usdtBalance < totalAmount) {
      notifications.show({
        title: 'Insufficient USDT balance',
        message: `Required: ${formatEther(totalAmount)}, Current balance: ${formatEther(usdtBalance)}`,
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
    submitBuyNode(amount);
  }

  // Callback after successful approval
  function handleApproveSuccess() {
    // After successful approval, automatically proceed to purchase process
    submitBuyNode(buyAmount);
  }

  // Submit buy node request
  async function submitBuyNode(amount: number = 1) {
    console.log('submitBuyNode', amount);

    try {
      // Show loading notification
      notifications.show({
        id: 'tx-loading',
        title: 'Processing',
        message: 'Submitting transaction...',
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
        id: 'tx-loading',
        title: 'Transaction Submitted',
        message: 'Waiting for blockchain confirmation...',
        loading: true,
        autoClose: false,
      });

    } catch (err) {
      // Transaction sending failed
      console.error('Transaction error:', err);
      notifications.update({
        id: 'tx-loading',
        title: 'Transaction Failed',
        message: err instanceof Error ? err.message : 'Error submitting transaction',
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
        id: 'tx-loading',
        title: 'Transaction Processing',
        message: 'Waiting for blockchain confirmation...',
        loading: true,
        autoClose: false,
      });
    }

    if (isConfirmed) {
      // Transaction successfully confirmed
      notifications.update({
        id: 'tx-loading',
        title: 'Purchase Successful',
        message: 'Your node purchase has been confirmed!',
        color: 'green',
        icon: <IconCheck />,
        autoClose: 3000,
      });

      // Refresh global data to update UI
      refreshData();
      console.log('Refreshed global data after successful purchase');
    }

    if (isConfirmingError) {
      // Transaction failed  
      notifications.update({
        id: 'tx-loading',
        title: 'Transaction Failed',
        message: confirmErrorData instanceof Error ? (confirmErrorData.message) : 'Transaction failed',
        color: 'red',
        icon: <IconX />,
        autoClose: 6000,
      });
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

      <Card shadow="sm" padding="lg" radius="md" withBorder>

        <Group>
          <Text fw={500}>
            Purchased: {contractUserInfo ? contractUserInfo.selfNodeCount : 0}
          </Text>
          <Text>USDT Balance: {formatEther(usdtBalance) || 0}</Text>
          <Text>USDT Approved: {usdtAllowanceForPool > BigInt(0) ? 'Yes' : 'No'}</Text>

        </Group>

        <Space h="sm" />
        <Button
          fullWidth
          color="#F2AE00"
          onClick={() => handleBuyNode(1)}
          disabled={isPending || isConfirming}
        >
          {isPending || isConfirming ? '处理中...' : '购买1个节点'}
        </Button>
        <Space h="sm" />
        <Button
          fullWidth
          color="#F2AE00"
          onClick={() => handleBuyNode(5)}
          disabled={isPending || isConfirming}
        >
          {isPending || isConfirming ? '处理中...' : '购买5个节点'}
        </Button>

        <Space h="sm" />
        <Group justify="center" mb={5}>
          <Button variant="subtle" color="#F2AE00" onClick={toggle}>自定义数量</Button>
        </Group>

        <Collapse in={opened}>
          <Center>
            <Group>
              <NumberInput
                size="md"
                allowNegative={false}
                allowDecimal={false}
                defaultValue={1}
                min={1}
                value={buyAmount}
                onChange={(val) => setBuyAmount(Number(val) || 1)}
                placeholder="输入购买数量"
              />
              <Button
                color="#F2AE00"
                onClick={() => handleBuyNode(buyAmount)}
                disabled={isPending || isConfirming}
              >
                购买
              </Button>
            </Group>
          </Center>
        </Collapse>
      </Card>
    </>
  );
}