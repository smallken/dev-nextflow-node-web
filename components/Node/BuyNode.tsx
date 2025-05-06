import { Button, Card, Space, Text, Group, NumberInput, Collapse, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUser } from '../../context/UserContext';
import { useWritePoolBuyNft,  } from '../../wagmi/generated';
import { useWaitForTransactionReceipt } from 'wagmi';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { formatEther } from 'viem'

export function BuyNode() {
  const [opened, { toggle }] = useDisclosure(false);
  const { nodeInfo, setNodeInfo, contractUserInfo, usdtBalance, usdtAllowanceForPool } = useUser();
  const [buyAmount, setBuyAmount] = useState<number>(1);
  
  // 使用Wagmi的useWritePoolBuyNft hook进行合约交互
  const {
    data: hash,
    error,
    isPending,
    isError,
    writeContractAsync: buyNft
  } = useWritePoolBuyNft();

  console.log('useWritePoolBuyNft',hash, isPending ,isError, error)

  // 提交购买节点请求
  async function submitBuyNode(amount: number = 1) {
    console.log('submitBuyNode', amount);
    
    try {
      // 显示加载中的通知
      notifications.show({
        id: 'tx-loading',
        title: '处理中',
        message: '正在提交交易...',
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });

      // 发送交易 - 转换为bigint类型
      await buyNft({
        args: [BigInt(amount)],
      });

      // 交易发送成功 - 更新通知
      notifications.update({
        id: 'tx-loading',
        title: '交易已提交',
        message: '正在等待区块链确认...',
        loading: true,
        autoClose: false,
      });
      
    } catch (err) {
      // 交易发送失败
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
  
  // 使用useWaitForTransactionReceipt对交易进行监听
  const { isLoading: isConfirming, isSuccess: isConfirmed, isError:isConfirmingError, error:confirmErrorData } =
    useWaitForTransactionReceipt({
      hash,
    });

  console.log('useWaitForTransactionReceipt', hash, isConfirming, isConfirmed, isConfirmingError, confirmErrorData)  
    
  // 处理交易确认
  React.useEffect(() => {
    if (!hash) return;

    if (isConfirming) {
      // 更新通知，显示交易确认中
      notifications.update({
        id: 'tx-loading',
        title: '交易处理中',
        message: '正在等待区块链确认...',
        loading: true,
        autoClose: false,
      });
    }
    
    if (isConfirmed) {
      // 交易成功确认
      notifications.update({
        id: 'tx-loading',
        title: '交易成功',
        message: '节点购买已完成',
        color: 'green',
        icon: <IconCheck />,
        autoClose: 3000,
      });
    }
    
    if (isConfirmingError) {
      // 交易失败  
      notifications.update({
        id: 'tx-loading',
        title: '交易失败',
        message: confirmErrorData instanceof Error ? (confirmErrorData.message): '交易失败',
        color: 'red',
        icon: <IconX />,
        autoClose: 3000,
      });
    }
  }, [hash, isConfirming, isConfirmed, isConfirmingError, confirmErrorData]);
  
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>

      <Group>
      <Text fw={500}>
        已购买: {contractUserInfo ? contractUserInfo.selfNodeCount : 0}个
      </Text>
      <Text>USDT余额:{formatEther(usdtBalance) || 0}</Text>
    <Text>USDT授权: {usdtAllowanceForPool}</Text>
      
      </Group>
      
      <Space h="sm" />
      <Button 
        fullWidth 
        color="#F2AE00" 
        onClick={() => submitBuyNode(1)}
        disabled={isPending || isConfirming}
      >
        {isPending || isConfirming ? '处理中...' : '购买1个节点'}
      </Button>
      <Space h="sm" />
      <Button 
        fullWidth 
        color="#F2AE00"
        onClick={() => submitBuyNode(5)}
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
              onClick={() => submitBuyNode(buyAmount)}
              disabled={isPending || isConfirming}
            >
              购买
            </Button>
          </Group>
        </Center>
      </Collapse>
    </Card>
  );
}