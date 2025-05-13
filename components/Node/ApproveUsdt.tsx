import { Button, Modal, Text, Group, Space } from '@mantine/core';
import { useUser } from '../../context/UserContext';
import { useWriteUsdtApprove } from '../../wagmi/generated';
import { useWaitForTransactionReceipt } from 'wagmi';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import React from 'react';
import { poolAddress } from '../../wagmi/generated';
import { useChainId } from 'wagmi';
import { formatEther } from 'viem';

interface ApproveUsdtProps {
  opened: boolean;
  onClose: () => void;
  amount: bigint; // Amount to be approved
  onApproveSuccess: () => void; // Callback after successful approval
}

export function ApproveUsdt({ opened, onClose, amount, onApproveSuccess }: ApproveUsdtProps) {
  const { usdtBalance, usdtAllowanceForPool } = useUser();
  const chainId = useChainId();
  
  // Use Wagmi's useWriteUsdtApprove hook to perform authorization
  const {
    data: hash,
    error,
    isPending,
    isError,
    writeContractAsync: approveUsdt
  } = useWriteUsdtApprove();

  // Use useWaitForTransactionReceipt to monitor the transaction
  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed, 
    isError: isConfirmingError, 
    error: confirmErrorData 
  } = useWaitForTransactionReceipt({
    hash,
  });

  console.log('useWriteUsdtApprove', hash, isPending, isError, error);
  console.log('useWaitForTransactionReceipt', hash, isConfirming, isConfirmed, isConfirmingError, confirmErrorData);

  // Submit approval request
  async function submitApprove() {
    try {
      // Show loading notification
      notifications.show({
        id: 'approve-loading',
        title: 'Processing',
        message: 'Submitting approval transaction...',
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });

      // Send approval transaction
      // Approve a sufficiently large amount to avoid frequent approvals
      // If you only want to approve a specific amount, you can use the amount parameter
      const approveAmount = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
      
      await approveUsdt({
        args: [
          poolAddress[chainId as keyof typeof poolAddress] as `0x${string}`,
          approveAmount
        ],
      });

      // Transaction sent successfully - update notification
      notifications.update({
        id: 'approve-loading',
        title: 'Approval Submitted',
        message: 'Waiting for blockchain confirmation...',
        loading: true,
        autoClose: false,
      });
      
    } catch (err) {
      // Transaction sending failed
      console.error('Approve error:', err);
      notifications.update({
        id: 'approve-loading',
        title: 'Approval Failed',
        message: err instanceof Error ? err.message : 'Error submitting approval',
        color: 'red',
        icon: <IconX />,
        autoClose: 6000,
      });
    }
  }
  
  // Handle transaction confirmation
  React.useEffect(() => {
    if (!hash) return;

    if (isConfirming) {
      // Update notification, show transaction confirmation in progress
      notifications.update({
        id: 'approve-loading',
        title: 'Approval Processing',
        message: 'Waiting for blockchain confirmation...',
        loading: true,
        autoClose: false,
      });

      setTimeout(() => {
        // After successful approval, call the callback
        onApproveSuccess();
        // Close the modal
        onClose();
      }, 0);  
    }

    if (isConfirmed) {
      notifications.update({
        id: 'approve-loading',
        title: 'Approval Successful',
        message: 'USDT approval completed',
        color: 'green',
        icon: <IconCheck />,
        autoClose: 3000,
      });

    }

    if (isConfirmingError) {
      // Transaction failed  
      notifications.update({
        id: 'tx-loading',
        title: '交易失败',
        message: confirmErrorData instanceof Error ? (confirmErrorData.message) : 'Transaction failed',
        color: 'red',
        icon: <IconX />,
        autoClose: 3000,
      });
    }
  }, [hash, isConfirming, isConfirmed, isConfirmingError,onApproveSuccess, onClose]);
  
  
  return (
    <Modal opened={opened} onClose={onClose} title="Approve USDT" centered>
      {/* <Text size="sm">
        USDT approval required to continue
      </Text> */}
      
      <Space h="md" />
      
      <Group>
        <Text fw={700} size="lg">USDT approval required to continue</Text>
        <Text size="sm" c="dimmed">You need to approve the smart contract to spend your USDT before continuing with the purchase</Text>
      </Group>
      
      {/* <Group>
        <Text>Current USDT Balance: {formatEther(usdtBalance || BigInt(0))}</Text>
        <Text>Current Approval Allowance: {formatEther(usdtAllowanceForPool || BigInt(0))}</Text>
        <Text>Required Approval Amount: {formatEther(amount)}</Text>
      </Group> */}
      
      <Space h="xl" />
      
      <Group justify="center">
        <Button 
          color="#F2AE00" 
          onClick={submitApprove}
          disabled={isPending || isConfirming}
          loading={isPending || isConfirming}
        >
          {isPending || isConfirming ? 'Processing...' : 'Approve USDT'}
        </Button>
      </Group>
    </Modal>
  );
}