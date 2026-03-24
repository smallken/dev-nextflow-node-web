import { Button, Modal, Text, Group } from '@mantine/core';
import { useWriteUsdtApprove } from '../../wagmi/generated';
import { useWaitForTransactionReceipt, useChainId } from 'wagmi';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { poolAddress } from '../../wagmi/generated';

interface ApproveUsdtProps {
  opened: boolean;
  onClose: () => void;
  amount: bigint;
  onApproveSuccess: () => void;
  blueColor?: string;
  blueGradient?: string;
  blueDark?: string;
  blueLight?: string;
}

export function ApproveUsdt({
  opened,
  onClose,
  amount,
  onApproveSuccess,
  blueColor = '#3B82F6',
  blueGradient = 'linear-gradient(135deg, #60A5FA 0%, #2563EB 50%, #1E40AF 100%)',
  blueDark = '#1E40AF',
  blueLight = '#60A5FA'
}: ApproveUsdtProps) {
  const { t } = useTranslation();
  const chainId = useChainId();

  // Use Wagmi's useWriteUsdtApprove hook to perform authorization
  const {
    data: hash,
    isPending,
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
    confirmations: 3,
  });

  // Submit approval request
  async function submitApprove() {
    try {
      notifications.show({
        id: 'approve-tx',
        title: t('approval_processing'),
        message: t('waiting_confirmation'),
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });

      // Approve exact amount for security - user needs to approve each time
      const approveAmount = amount;

      await approveUsdt({
        args: [
          poolAddress[chainId as keyof typeof poolAddress] as `0x${string}`,
          approveAmount
        ],
      });

      notifications.update({
        id: 'approve-tx',
        title: t('approval_submitted'),
        message: t('waiting_confirmation'),
        loading: true,
        autoClose: false,
      });

    } catch (err) {
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

      onApproveSuccess();
      onClose();
    }

    if (isConfirmingError) {
      notifications.update({
        id: 'approve-tx',
        title: t('transaction_failed'),
        message: confirmErrorData instanceof Error ? confirmErrorData.message : t('transaction_failed'),
        color: 'red',
        icon: <IconX />,
        autoClose: 3000,
      });
    }
  }, [hash, isConfirming, isConfirmed, isConfirmingError, onApproveSuccess, onClose]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t('approve_usdt')}
      centered
      styles={{
        title: {
          fontSize: '1.2rem',
          fontWeight: 600,
          color: blueColor,
        }
      }}
    >
      <Group mb="md">
        <Text fw={700} size="lg">{t('approval_required')}</Text>
      </Group>

      <Text size="sm" c="dimmed" mb="xl">
        {t('approval_description')}
      </Text>

      <Button
        fullWidth
        size="lg"
        radius="xl"
        onClick={submitApprove}
        disabled={isPending || isConfirming}
        loading={isPending || isConfirming}
        styles={{
          root: {
            background: blueGradient,
            fontWeight: 600,
            boxShadow: '0 4px 20px rgba(37, 99, 235, 0.25)',
            '&:hover:not(:disabled)': {
              background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 50%, #1E3A8A 100%)',
            },
          }
        }}
      >
        {isPending || isConfirming ? t('processing') : t('approve_button')}
      </Button>
    </Modal>
  );
}
