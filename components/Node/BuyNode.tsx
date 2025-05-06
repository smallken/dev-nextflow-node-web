import { Button, Card, Space, Text, Group, NumberInput, Collapse, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUser } from '../../context/UserContext';
import { useWritePoolBuyNft, useReadPoolNftPrice  } from '../../wagmi/generated';
import { useWaitForTransactionReceipt } from 'wagmi';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { formatEther, parseEther } from 'viem';
import { ApproveUsdt } from './ApproveUsdt';

export function BuyNode() {
  const [opened, { toggle }] = useDisclosure(false);
  const { contractUserInfo, usdtBalance, usdtAllowanceForPool } = useUser();
  const [buyAmount, setBuyAmount] = useState<number>(1);
  
  // 控制授权弹窗
  const [approveModalOpened, setApproveModalOpened] = useState(false);
  const [requiredApproveAmount, setRequiredApproveAmount] = useState<bigint>(BigInt(0));
  
  // 获取NFT价格
  const { data: nftPrice } = useReadPoolNftPrice();
  
  // 使用Wagmi的useWritePoolBuyNft hook进行合约交互
  const {
    data: hash,
    error,
    isPending,
    isError,
    writeContractAsync: buyNft
  } = useWritePoolBuyNft();

  console.log('useWritePoolBuyNft', hash, isPending, isError, error)
  console.log('USDT allowance', usdtAllowanceForPool)

  // 检查授权并处理购买操作
  function handleBuyNode(amount: number = 1) {
    // 如果价格没有获取到，则返回
    if (!nftPrice) {
      notifications.show({
        title: '无法获取节点价格',
        message: '请稍后再试',
        color: 'red',
        icon: <IconX />,
        autoClose: 3000,
      });
      return;
    }
    
    // 计算购买所需的总额
    // nftPrice需要乘以10^18转换为wei单位
    const totalAmount = nftPrice * BigInt(10 ** 18) * BigInt(amount);
    
    // 如果余额不足，提示用户
    if (usdtBalance < totalAmount) {
      notifications.show({
        title: 'USDT余额不足',
        message: `需要${formatEther(totalAmount)}，当前余额${formatEther(usdtBalance)}`,
        color: 'red',
        icon: <IconX />,
        autoClose: 6000,
      });
      return;
    }
    
    // 如果授权额度不足，打开授权弹窗
    if (usdtAllowanceForPool < totalAmount) {
      setRequiredApproveAmount(totalAmount);
      setApproveModalOpened(true);
      return;
    }
    
    // 如果授权足够，直接购买
    submitBuyNode(amount);
  }
  
  // 授权成功后的回调
  function handleApproveSuccess() {
    // 当授权成功后，自动跳转到购买流程
    submitBuyNode(buyAmount);
  }

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
        autoClose: 6000,
      });
    }
  }, [hash, isConfirming, isConfirmed, isConfirmingError, confirmErrorData]);
  
  return (
    <>
      {/* 授权弹窗 */}
      <ApproveUsdt 
        opened={approveModalOpened} 
        onClose={() => setApproveModalOpened(false)} 
        amount={requiredApproveAmount}
        onApproveSuccess={handleApproveSuccess}
      />
      
      <Card shadow="sm" padding="lg" radius="md" withBorder>

      <Group>
      <Text fw={500}>
        已购买: {contractUserInfo ? contractUserInfo.selfNodeCount : 0}个
      </Text>
      <Text>USDT余额:{formatEther(usdtBalance) || 0}</Text>
    <Text>USDT是否授权: {usdtAllowanceForPool> BigInt(0)?'是':'否'}</Text>
      
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