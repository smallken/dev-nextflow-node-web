
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
  // 使用全局用户上下文获取应用信息
  const { contractUserInfo, appInfo } = useUser();

  console.log('chainId', chainId);
  console.log('account', account);


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
        src="/ffboat.png"
      />
      <Space h="sm" />

      <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)">
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
          完成进度
        </Text>
        <Group mt="md" justify="space-between">
          {appInfo ? (
            <>
              <Text fz="sm">{appInfo.nftCurrentTotal.toString()} /{appInfo.nftMintTargetAmount.toString()}</Text>
              <Badge size="sm">{appInfo.nftMintProgress}%</Badge>
            </>
          ) : (
            <>
              <Text fz="sm">0 / 0</Text>
              <Badge size="sm">0%</Badge>
            </>
          )}
        </Group>
        <Progress value={appInfo?.nftMintProgress || 0} mt="md" size="lg" radius="xl" />
      </Card>

      <Space h="xl" />
      
      {/* 根据用户状态展示不同组件 */}
      {!account.address ? (
        <>
          {/* 用户未连接钱包，显示Register和Invite */}
          <BuyNode />
          <Space h="xl" />
          <Invite />
        </>
      ) : (
        <>
          {/* 用户已连接钱包 */}
          {contractUserInfo?.parent === '0x0000000000000000000000000000000000000000' ? (
            /* parent为0地址，展示Register */
            <Register />
          ) : (
            /* parent不为0，展示BuyNode */
            <BuyNode />
          )}
          
          <Space h="xl" />
          
          {/* 根据节点购买情况展示Invite */}
          {contractUserInfo && (contractUserInfo.nodeCount > 0) ? (
            <Invite />
          ) : (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text color="dimmed" size="sm" mb="sm" ta="center">
                至少需要购买一个节点才能邀请好友
              </Text>
              <Button fullWidth color="#F2AE00" disabled>邀请好友</Button>
            </Card>
          )}
        </>
      )}

    </>
  );
}
