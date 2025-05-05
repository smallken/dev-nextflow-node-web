
import { Button, Space, NumberInput, Group, Progress, Collapse } from '@mantine/core';
import { Image, Card, Text, Center, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './ProgressCardColored.module.css';

import { useChainId, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useUser } from '../../context/UserContext';

import { useCallback } from 'react';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

import { Register } from '../User/Register'
import { Invite } from '../User/Invite'

import { BuyNode } from '../Node/BuyNode'

// test abi
import { usdtAbi, usdtAddress, useReadUsdtBalanceOf, useWritePoolRegister } from '../../wagmi/generated';

// Type assertion to ensure TypeScript recognizes this as an Ethereum address
const defaultBindAddress = process.env.NEXT_PUBLIC_BSC_TESTNET_DEFAULT_BIND_ADDRESS as `0x${string}`


export function Home() {
  const [opened, { toggle }] = useDisclosure(false);

  const chainId = useChainId();
  const account = useAccount();
  // 使用全局用户上下文获取节点信息
  const { nodeInfo, setNodeInfo,contractUserInfo } = useUser();

  console.log('chainId', chainId);
  console.log('account', account);
  console.log('共享的节点信息', nodeInfo);


  console.log('defaultBindAddress', defaultBindAddress)
  

  const { data: balance } = useReadUsdtBalanceOf(
    {
      args: [account.address!],
      query: {
        enabled: !!account.address,
      }
    }
  )

  const {
    data: hash,
    error,
    isPending,
    writeContractAsync: register 
  } = useWritePoolRegister();

  async function submitBind(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    console.log('submitBind')
    // Make sure the address exists before sending
    if (!defaultBindAddress) {
      console.error('Bind address not configured in environment variables');
      return;
    }
    
    await register({
      args: [defaultBindAddress],
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  console.log('balance', balance);

  return (
    <>
      <Image
        h={200}
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
      />
      <Space h="sm" />

      <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)">
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
          完成进度
        </Text>
        <Group mt="md" justify="space-between">
          {nodeInfo ? (
            <>
              <Text fz="sm">{nodeInfo.progress}0 / 10000</Text>
              <Badge size="sm">{nodeInfo.progress}%</Badge>
            </>
          ) : (
            <>
              <Text fz="sm">0 / 10000</Text>
              <Badge size="sm">0%</Badge>
            </>
          )}
        </Group>
        <Progress value={nodeInfo ? nodeInfo.progress : 0} mt="md" size="lg" radius="xl" />
      </Card>

      <Space h="xl" />
      
      <Register />

      <Space h="xl" />
      <BuyNode />

      <Space h="xl" />

      <Invite />

    </>
  );
}
