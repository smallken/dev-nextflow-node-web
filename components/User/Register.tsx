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
import { IconCheck, IconX, IconInfoCircle, IconAlertCircle } from '@tabler/icons-react';

import { useUser } from '../../context/UserContext';
import { isNonZeroAddress, isValidEthAddress } from '../../utils';

// test abi
import { usdtAbi, usdtAddress, useReadUsdtBalanceOf, useWritePoolRegister } from '../../wagmi/generated';

export function Register() {
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
        id: 'bind-error',
        title: 'Error',
        message: 'Please use a valid invitation link with a non-zero address',
        color: 'red',
        icon: <IconX />,
        autoClose: 3000,
      });
      return;
    }

    try {
      // Show loading notification when starting transaction
      notifications.show({
        id: 'tx-loading',
        title: '处理中',
        message: '正在提交交易...',
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
        id: 'tx-loading',
        title: '交易已提交',
        message: '正在等待区块链确认...',
        loading: true,
        autoClose: false,
      });
    } catch (err) {
      // Transaction failed to send
      console.error('Transaction error:', err);
      notifications.update({
        id: 'tx-loading',
        title: '交易失败',
        message: err instanceof Error ? err.message : '提交交易时出错',
        color: 'red',
        icon: <IconX />,
        autoClose: 3000,
      });
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed,isError: isConfirmingError, error: confirmErrorData  } =
    useWaitForTransactionReceipt({
      hash,
    })
  console.log('useWaitForTransactionReceipt', hash, isConfirming, isConfirmed, isConfirmingError, confirmErrorData)


  // Effect to handle transaction confirmation
  React.useEffect(() => {
    if (!hash) return;

    if (isConfirming) {
      // Update notification when transaction is being confirmed
      notifications.update({
        id: 'tx-loading',
        title: '交易处理中',
        message: '正在等待区块链确认...',
        loading: true,
        autoClose: false,
      });
    }

    if (isConfirmed) {
      // Transaction confirmed successfully
      notifications.update({
        id: 'tx-loading',
        title: '交易成功',
        message: '邀请注册已完成',
        color: 'green',
        icon: <IconCheck />,
        autoClose: 3000,
      });

      // Refresh global data to update UI
      refreshData();
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
  }, [hash, isConfirming, isConfirmed, , isConfirmingError, confirmErrorData])


  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {contractUserInfo && isNonZeroAddress(contractUserInfo.parent) ? (
        <>
          <Text fw={500} size="md" mb="xs">已注册</Text>
          <Text size="sm" c="dimmed" mb="md">邀请人: {contractUserInfo.parent}</Text>
        </>
      ) : (

        <Stack gap="md">
          <Alert 
            color="blue" 
            title="需要邀请人" 
            icon={<IconInfoCircle size={16} />}
            variant="light"
          >
            <Text size="sm" c="dimmed">
              您需要通过邀请链接访问本站才能完成注册。请向朋友索要邀请链接或扫描邀请二维码。
            </Text>
          </Alert>
          
          {inviterAddress ? (
            <>
              <Text fw={500} size="sm">邀请人地址:</Text>
              <Paper p="xs" withBorder radius="md" bg="var(--mantine-color-gray-0)">
                <Text size="sm" tt="lowercase" c="dimmed" style={{ wordBreak: 'break-all' }}>
                  {inviterAddress}
                </Text>
              </Paper>
            
              <Button
                onClick={submitBind}
                disabled={isPending}
                fullWidth
                color="#F2AE00"
                mt="md"
              >
                {isPending ? '提交中...' : '接受邀请并注册'}
              </Button>
            </>
          ) : (
            <>
              <Paper p="md" withBorder shadow="sm" radius="md" bg="var(--mantine-color-gray-0)">
                <Center>
                  <Stack align="center" gap="xs">
                    <IconAlertCircle size={40} color="var(--mantine-color-orange-5)" />
                    <Text fw={500} c="orange">
                      未检测到邀请链接
                    </Text>
                    <Text size="sm" c="dimmed" ta="center">
                      请通过好友分享的邀请链接进入网站
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