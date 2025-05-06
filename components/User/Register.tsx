import { Button, Space, NumberInput, Group, Progress, Collapse } from '@mantine/core';
import { Image, Card, Text, Center, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './ProgressCardColored.module.css';

import { useChainId, useAccount, useConnect, useWaitForTransactionReceipt } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import React from 'react';

import { useCallback, useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

import { useUser } from '../../context/UserContext';



// test abi
import { usdtAbi, usdtAddress, useReadUsdtBalanceOf, useWritePoolRegister } from '../../wagmi/generated';

// Type assertion to ensure TypeScript recognizes this as an Ethereum address
const defaultBindAddress = process.env.NEXT_PUBLIC_BSC_TESTNET_DEFAULT_BIND_ADDRESS as `0x${string}`


export function Register() {

  const account = useAccount();
  const { connect, connectors } = useConnect();
  const { openConnectModal } = useConnectModal();
  const {contractUserInfo}= useUser()

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
    if (!defaultBindAddress) {
      console.error('Bind address not configured in environment variables');
      notifications.show({
        id: 'bind-error',
        title: '错误',
        message: '邀请人地址不能为空',
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
        args: [defaultBindAddress],
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

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })
    
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
    }
    
    if (error) {
      // Transaction failed  
      notifications.update({
        id: 'tx-loading',
        title: '交易失败',
        message: error instanceof Error ? error.message : '交易失败',
        color: 'red',
        icon: <IconX />,
        autoClose: 3000,
      });
    }
  }, [hash, isConfirming, isConfirmed, error])


  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {contractUserInfo && contractUserInfo.parent ? (
        <>
          <Text fw={500} size="md" mb="xs">邀请人</Text>
          <Text size="sm" c="dimmed" mb="md">{contractUserInfo.parent}</Text>
        </>
      ) : (
        <Button 
          onClick={submitBind}
          disabled={isPending} 
          fullWidth 
          color="#F2AE00"
        >
          {isPending ? '提交中...' : '接受邀请'}
        </Button>
      )}
    </Card>
  )


}