import { Button, Modal, Text, Group, Space } from '@mantine/core';
import { useUser } from '../../context/UserContext';
import { useWriteUsdtApprove } from '../../wagmi/generated';
import { useWaitForTransactionReceipt } from 'wagmi';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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

  // console.log('useWriteUsdtApprove', hash, isPending, isError, error);
  // console.log('useWaitForTransactionReceipt', hash, isConfirming, isConfirmed, isConfirmingError, confirmErrorData);

  // Submit approval request
  async function submitApprove() {
    try {
      // Show loading notification
      notifications.show({
        id: 'approve-tx',
        title: t('approval_processing'),
        message: t('waiting_confirmation'),
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
        id: 'approve-tx',
        title: t('approval_submitted'),
        message: t('waiting_confirmation'),
        loading: true,
        autoClose: false,
      });

    } catch (err) {
      // Transaction sending failed
      console.error('Approve error:', err);
      notifications.update({
        id: 'approve-tx',
        title: t('approval_failed'),
        message: err instanceof Error ? err.message : t('approval_error'),
        color: 'red',
        icon: <IconX />,
        autoClose: 3000,
      });
    }
  }

  // Handle transaction confirmation
  React.useEffect(() => {
    if (!hash) return;

    if (isConfirming) {
      // Update notification, show transaction confirmation in progress
      notifications.update({
        id: 'approve-tx',
        title: t('approval_processing'),
        message: t('waiting_confirmation'),
        loading: true,
        autoClose: false,
      });
    }

    if (isConfirmed) {
      notifications.update({
        id: 'approve-tx',
        title: t('approval_successful'),
        message: t('approval_completed'),
        color: 'green',
        icon: <IconCheck />,
        autoClose: 3000,
      });

      //setTimeout(() => {
      // After successful approval, call the callback
      onApproveSuccess();
      // Close the modal
      onClose();
      //}, 0);

    }

    if (isConfirmingError) {
      // Transaction failed  
      notifications.update({
        id: 'approve-tx',
        title: t('transaction_failed'),
        message: confirmErrorData instanceof Error ? (confirmErrorData.message) : t('transaction_failed'),
        color: 'red',
        icon: <IconX />,
        autoClose: 3000,
      });
    }
  }, [hash, isConfirming, isConfirmed, isConfirmingError, onApproveSuccess, onClose]);


  return (
    <Modal opened={opened} onClose={onClose} title={t('approve_usdt')} centered>

      <Space h="md" />

      <Group>
        <Text fw={700} size="lg">{t('approval_required')}</Text>
        <Text size="sm" c="dimmed">{t('approval_description')}</Text>
      </Group>

      <Space h="xl" />

      <Group justify="center">
        <Button
          color="#F2AE00"
          onClick={submitApprove}
          disabled={isPending || isConfirming}
          loading={isPending || isConfirming}
        >
          {isPending || isConfirming ? t('processing') : t('approve_button')}
        </Button>
      </Group>
    </Modal>
  );
}