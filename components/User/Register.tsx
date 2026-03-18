import { Button, Stack, Alert, Paper, Card, Text, Center } from '@mantine/core';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import React from 'react';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { IconCheck, IconX, IconInfoCircle, IconAlertCircle } from '@tabler/icons-react';
import { getAddress } from 'viem';
import { useWritePoolRegister } from '../../wagmi/generated';
import { useUser } from '../../context/UserContext';
import { isNonZeroAddress, isValidEthAddress, parseContractError } from '../../utils';

interface RegisterProps {
  blueColor?: string;
  blueGradient?: string;
  blueDark?: string;
  blueLight?: string;
}

export function Register({
  blueColor = '#3B82F6',
  blueGradient = 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
  blueDark = '#2563EB',
  blueLight = '#60A5FA'
}: RegisterProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const account = useAccount();
  const { openConnectModal } = useConnectModal();
  const { contractUserInfo, refreshData } = useUser();

  const [txHash, setTxHash] = React.useState<`0x${string}` | undefined>(undefined);

  React.useEffect(() => {
    if (contractUserInfo && isNonZeroAddress(contractUserInfo.parent)) {
      notifications.hide('register-tx');
      setTxHash(undefined);
    }
  }, [contractUserInfo]);

  // Get inviter address from URL query parameter
  const inviterAddress = React.useMemo(() => {
    const { inviter } = router.query;

    if (inviter && typeof inviter === 'string' && isValidEthAddress(inviter) && isNonZeroAddress(inviter)) {
      try {
        return getAddress(inviter as `0x${string}`);
      } catch (error) {
        console.error('Invalid address checksum:', error);
        return undefined;
      }
    }

    return undefined;
  }, [router.query]);

  const {
    data: hash,
    isPending,
    writeContractAsync: register
  } = useWritePoolRegister();

  async function submitBind(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!account.isConnected) {
      if (openConnectModal) {
        openConnectModal();
      }
      return;
    }

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
      notifications.show({
        id: 'register-tx',
        title: t('transaction_processing_title'),
        message: t('submitting_transaction'),
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });

      const submittedHash = await register({
        args: [inviterAddress],
      });

      setTxHash(submittedHash);

      notifications.update({
        id: 'register-tx',
        title: t('registration_submitted'),
        message: t('waiting_confirmation'),
        loading: true,
        autoClose: false,
      });
    } catch (err) {
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
      hash: txHash,
      confirmations: 1,
    });

  // Effect to handle transaction confirmation
  React.useEffect(() => {
    if (!txHash) return;

    if (isConfirming) {
      notifications.update({
        id: 'register-tx',
        title: t('registration_processing'),
        message: t('waiting_confirmation'),
        loading: true,
        autoClose: false,
      });
    }

    if (isConfirmed) {
      notifications.update({
        id: 'register-tx',
        title: t('registration_successful'),
        message: t('registration_completed'),
        color: 'green',
        icon: <IconCheck />,
        autoClose: 3000,
      });

      refreshData();

      // Clear tx hash so we don't keep re-triggering this effect
      setTxHash(undefined);
    }

    if (isConfirmingError) {
      const errorMessage = parseContractError(confirmErrorData);
      notifications.update({
        id: 'register-tx',
        title: t('transaction_failed'),
        message: errorMessage,
        color: 'red',
        icon: <IconX />,
        autoClose: 5000,
      });

      setTxHash(undefined);
    }
  }, [txHash, isConfirming, isConfirmed, isConfirmingError, confirmErrorData, refreshData, t]);

  return (
    <Card
      withBorder
      radius="xl"
      p="xl"
      styles={{
        root: {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.9)',
          boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
        }
      }}
    >
      {contractUserInfo && isNonZeroAddress(contractUserInfo.parent) ? (
        <>
          <Text fw={600} size="lg" mb="xs" c={blueColor}>{t('registered')}</Text>
          <Text size="sm" c="dimmed" mb="md">{t('inviter')}: {contractUserInfo.parent}</Text>
        </>
      ) : (
        <Stack gap="md">
          <Alert
            color="blue"
            title={t('need_inviter')}
            icon={<IconInfoCircle size={20} />}
            variant="light"
            radius="lg"
          >
            <Text size="sm" c="dimmed">
              {t('inviter_instruction')}
            </Text>
          </Alert>

          {inviterAddress ? (
            <>
              <Text fw={600} size="sm" c={blueColor}>{t('inviter_address')}:</Text>
              <Paper
                p="sm"
                withBorder
                radius="lg"
                styles={{
                  root: {
                    background: 'rgba(37, 99, 235, 0.03)',
                    borderColor: 'rgba(37, 99, 235, 0.15)',
                  }
                }}
              >
                <Text size="sm" tt="lowercase" c="dimmed" style={{ wordBreak: 'break-all', fontFamily: 'monospace' }}>
                  {inviterAddress}
                </Text>
              </Paper>

              <Button
                onClick={submitBind}
                disabled={isPending}
                fullWidth
                size="lg"
                radius="lg"
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
                {isPending ? t('submitting') : t('accept_invite')}
              </Button>
            </>
          ) : (
            <>
              <Paper
                p="lg"
                withBorder
                radius="xl"
                styles={{
                  root: {
                    background: 'linear-gradient(145deg, rgba(37, 99, 235, 0.02) 0%, rgba(59, 130, 246, 0.04) 100%)',
                    borderColor: 'rgba(37, 99, 235, 0.15)',
                  }
                }}
              >
                <Center>
                  <Stack align="center" gap="sm">
                    <IconAlertCircle size={48} color={blueColor} />
                    <Text fw={600} size="lg" c={blueColor}>
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
  );
}
