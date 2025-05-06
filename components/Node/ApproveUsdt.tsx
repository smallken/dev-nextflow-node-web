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
  amount: bigint; // 需要授权的金额
  onApproveSuccess: () => void; // 授权成功后的回调
}

export function ApproveUsdt({ opened, onClose, amount, onApproveSuccess }: ApproveUsdtProps) {
  const { usdtBalance, usdtAllowanceForPool } = useUser();
  const chainId = useChainId();
  
  // 使用Wagmi的useWriteUsdtApprove hook进行授权
  const {
    data: hash,
    error,
    isPending,
    isError,
    writeContractAsync: approveUsdt
  } = useWriteUsdtApprove();

  // 使用useWaitForTransactionReceipt对交易进行监听
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

  // 提交授权请求
  async function submitApprove() {
    try {
      // 显示加载中的通知
      notifications.show({
        id: 'approve-loading',
        title: '处理中',
        message: '正在提交授权交易...',
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });

      // 发送授权交易
      // 授权一个足够大的金额，避免频繁授权
      // 如果只想授权特定金额，可以使用 amount 参数
      const approveAmount = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
      
      await approveUsdt({
        args: [
          poolAddress[chainId as keyof typeof poolAddress] as `0x${string}`,
          approveAmount
        ],
      });

      // 交易发送成功 - 更新通知
      notifications.update({
        id: 'approve-loading',
        title: '授权已提交',
        message: '正在等待区块链确认...',
        loading: true,
        autoClose: false,
      });
      
    } catch (err) {
      // 交易发送失败
      console.error('Approve error:', err);
      notifications.update({
        id: 'approve-loading',
        title: '授权失败',
        message: err instanceof Error ? err.message : '提交授权时出错',
        color: 'red',
        icon: <IconX />,
        autoClose: 6000,
      });
    }
  }
  
  // 处理交易确认
  React.useEffect(() => {
    if (!hash) return;

    if (isConfirming) {
      // 更新通知，显示交易确认中
      notifications.update({
        id: 'approve-loading',
        title: '授权处理中',
        message: '正在等待区块链确认...',
        loading: true,
        autoClose: false,
      });
    }
  }, [hash, isConfirming]);
  
  // 处理交易成功
  React.useEffect(() => {
    // 使用引用变量防止多次调用
    const success = isConfirmed && hash;
    if (success) {
      // 交易成功确认
      notifications.update({
        id: 'approve-loading',
        title: '授权成功',
        message: 'USDT授权已完成',
        color: 'green',
        icon: <IconCheck />,
        autoClose: 3000,
      });
      
      // 使用setTimeout避免在渲染周期中直接调用状态变更
      setTimeout(() => {
        // 授权成功，调用回调
        onApproveSuccess();
        // 关闭弹窗
        onClose();
      }, 0);
    }
  }, [hash, isConfirmed, onApproveSuccess, onClose]);
  
  // 处理交易失败
  React.useEffect(() => {
    if (isConfirmingError && hash) {
      // 交易失败  
      notifications.update({
        id: 'approve-loading',
        title: '授权失败',
        message: confirmErrorData instanceof Error ? (confirmErrorData.message) : '授权失败',
        color: 'red',
        icon: <IconX />,
        autoClose: 6000,
      });
    }
  }, [hash, isConfirmingError, confirmErrorData]);
  
  return (
    <Modal opened={opened} onClose={onClose} title="授权USDT" centered>
      <Text size="sm">
        购买节点需要先授权USDT，请点击下方按钮进行授权。
      </Text>
      
      <Space h="md" />
      
      <Group>
        <Text size="sm">当前USDT余额: </Text>
        <Text size="sm" fw={500}>{formatEther(usdtBalance || BigInt(0))}</Text>
      </Group>
      
      <Group>
        <Text size="sm">当前授权额度: </Text>
        <Text size="sm" fw={500}>{formatEther(usdtAllowanceForPool || BigInt(0))}</Text>
      </Group>
      
      <Group>
        <Text size="sm">需要授权额度: </Text>
        <Text size="sm" fw={500}>{formatEther(amount || BigInt(0))}</Text>
      </Group>
      
      <Space h="xl" />
      
      <Group justify="center">
        <Button 
          color="#F2AE00" 
          onClick={submitApprove}
          disabled={isPending || isConfirming}
          loading={isPending || isConfirming}
        >
          {isPending || isConfirming ? '授权中...' : '授权USDT'}
        </Button>
      </Group>
    </Modal>
  );
}