import { Button, Space, NumberInput, Group, Progress, Collapse, Stack, Alert, Paper } from '@mantine/core';
import { Image, Card, Text, Center, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './ProgressCardColored.module.css';

import { useChainId, useAccount, useConnect, useWaitForTransactionReceipt } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import React from 'react';

import { useCallback, useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { IconCheck, IconX, IconInfoCircle, IconAlertCircle } from '@tabler/icons-react';

import { useUser } from '../../context/UserContext';
import { isNonZeroAddress, isValidEthAddress, parseContractError } from '../../utils';

// test abi
import { usdtAbi, usdtAddress, useReadUsdtBalanceOf, useWritePoolRegister } from '../../wagmi/generated';

export function Register() {
  const { t } = useTranslation();
  const router = useRouter();
  const account = useAccount();
  const { connect, connectors } = useConnect();
  const { openConnectModal } = useConnectModal();
  const { contractUserInfo, refreshData } = useUser();

  // Get inviter address from URL query parameter
  const inviterAddress = React.useMemo(() => {
    const { inviter } = router.query;

    // Check if inviter exists, is a valid Ethereum address, and not zero address
    if (inviter && typeof inviter === 'string' && isValidEthAddress(inviter) && isNonZeroAddress(inviter)) {
      return inviter as `0x${string}`;
    }

    // No fallback - return undefined if no valid inviter in query
    return undefined;
  }, [router.query]);

  const {
    data: hash,
    error,
    isPending,
    writeContractAsync: register
  } = useWritePoolRegister();

  async function submitBind(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    console.log('submitBind')

    // Check if user has connected wallet
    if (!account.isConnected) {
      // If wallet is not connected, open wallet selection modal
      if (openConnectModal) {
        openConnectModal();
      }
      return;
    }

    // Make sure the address exists before sending
    if (!inviterAddress) {
      console.error('No valid inviter address in URL');
      notifications.show({
        id: 'register-tx',
        title: t('error_title'),
        message: t('error_invalid_invitation'),
        color: 'red',
        icon: <IconX />,
        autoClose: 3000,
      });
      return;
    }

    try {
      // Show loading notification when starting transaction
      notifications.show({
        id: 'register-tx',
        title: t('transaction_processing_title'),
        message: t('submitting_transaction'),
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });

      // Send the transaction
      await register({
        args: [inviterAddress],
      });

      // Transaction sent successfully - update notification
      notifications.update({
        id: 'register-tx',
        title: t('registration_submitted'),
        message: t('waiting_confirmation'),
        loading: true,
        autoClose: false,
      });
    } catch (err) {
      // Transaction failed to send
      console.error('Transaction error:', err);
      const errorMessage = parseContractError(err);
      notifications.update({
        id: 'register-tx',
        title: t('transaction_failed'),
        message: errorMessage,
        color: 'red',
        icon: <IconX />,
        autoClose: 5000,
      });
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed, isError: isConfirmingError, error: confirmErrorData } =
    useWaitForTransactionReceipt({
      hash,
      confirmations: 3, // BSC主网建议3个确认 (~9秒)
    })
  console.log('useWaitForTransactionReceipt 状态:', { hash, isConfirming, isConfirmed, isConfirmingError, confirmErrorData })


  // Effect to handle transaction confirmation
  React.useEffect(() => {
    if (!hash) return;

    if (isConfirming) {
      // Update notification when transaction is being confirmed
      notifications.update({
        id: 'register-tx',
        title: t('registration_processing'),
        message: t('waiting_confirmation'),
        loading: true,
        autoClose: false,
      });
    }

    if (isConfirmed) {
      // Transaction confirmed successfully
      notifications.update({
        id: 'register-tx',
        title: t('registration_successful'),
        message: t('registration_completed'),
        color: 'green',
        icon: <IconCheck />,
        autoClose: 3000,
      });

      // Refresh global data to update UI
      refreshData();
    }

    if (isConfirmingError) {
      // Transaction failed
      const errorMessage = parseContractError(confirmErrorData);
      notifications.update({
        id: 'register-tx',
        title: t('transaction_failed'),
        message: errorMessage,
        color: 'red',
        icon: <IconX />,
        autoClose: 5000,
      });
    }
  }, [hash, isConfirming, isConfirmed, isConfirmingError, confirmErrorData])


  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {contractUserInfo && isNonZeroAddress(contractUserInfo.parent) ? (
        <>
          <Text fw={500} size="md" mb="xs">{t('registered')}</Text>
          <Text size="sm" c="dimmed" mb="md">{t('inviter')}: {contractUserInfo.parent}</Text>
        </>
      ) : (

        <Stack gap="md">
          <Alert 
            color="blue" 
            title={t('need_inviter')} 
            icon={<IconInfoCircle size={16} />}
            variant="light"
          >
            <Text size="sm" c="dimmed">
              {t('inviter_instruction')}
            </Text>
          </Alert>
          
          {inviterAddress ? (
            <>
              <Text fw={500} size="sm">{t('inviter_address')}:</Text>
              <Paper p="xs" withBorder radius="md" bg="var(--mantine-color-gray-0)">
                <Text size="sm" tt="lowercase" c="dimmed" style={{ wordBreak: 'break-all' }}>
                  {inviterAddress}
                </Text>
              </Paper>
            
              <Button
                onClick={submitBind}
                disabled={isPending}
                fullWidth
                mt="md"
                styles={{
                  root: {
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                    }
                  }
                }}
              >
                {isPending ? t('submitting') : t('accept_invite')}
              </Button>
            </>
          ) : (
            <>
              <Paper p="md" withBorder shadow="sm" radius="md" bg="var(--mantine-color-gray-0)">
                <Center>
                  <Stack align="center" gap="xs">
                    <IconAlertCircle size={40} color="var(--mantine-color-orange-5)" />
                    <Text fw={500} c="orange">
                      {t('no_invite_detected')}
                    </Text>
                    <Text size="sm" c="dimmed" ta="center">
                      {t('use_friend_link')}
                    </Text>
                  </Stack>
                </Center>
              </Paper>
            </>
          )}
        </Stack>

      )}
    </Card>
  )


}