
import { Button, Space, NumberInput, Group, Progress, Collapse } from '@mantine/core';
import { Image, Card, Text, Center, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './ProgressCardColored.module.css';

import { useChainId, useAccount, useWaitForTransactionReceipt } from 'wagmi';

import { useCallback } from 'react';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

import  {Register } from '../User/Register'


// test abi
import { usdtAbi, usdtAddress, useReadUsdtBalanceOf, useWritePoolRegister } from '../../wagmi/generated';

// Type assertion to ensure TypeScript recognizes this as an Ethereum address
const defaultBindAddress = process.env.NEXT_PUBLIC_BSC_TESTNET_DEFAULT_BIND_ADDRESS as `0x${string}`


export function Home() {
  const [opened, { toggle }] = useDisclosure(false);

  const chainId = useChainId();
  const account = useAccount();

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
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
      />
      <Space h="sm" />

      <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)">
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
          完成进度
        </Text>
        <Group mt="md" justify="space-between">
          <Text fz="sm">6000 / 10000</Text>
          <Badge size="sm">60%</Badge>
        </Group>
        <Progress value={60} mt="md" size="lg" radius="xl" />
      </Card>

      {/* <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Space h="xl" />
        <Progress color="green" radius="xl" size="xl" value={60} />
        <Group mt="md" justify="end">
          <Text fz="sm">6000 / 10000</Text>
          <Badge size="sm">60%</Badge>
        </Group>
      </Card> */}

      <Space h="xl" />
      
      <Register />
      {/* <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text fw={500}>
          hash: {hash}
        </Text>
        <Text>
        isPending: {isPending}
        </Text>
        <Text>
        isConfirming: {isConfirming}
        </Text>
        <Text>
        isConfirmed: {isConfirmed}
        </Text>
        <Button onClick={submitBind} disabled={isPending} fullWidth color="#F2AE00">
        {isPending ? '提交中...' : '接受邀请'}
        {isConfirming && <div>Waiting for confirmation...</div>}
       {isConfirmed && <div>Transaction confirmed.</div>}
        </Button>
      </Card> */}

      <Space h="xl" />
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text fw={500}>

        </Text>
        <Button fullWidth color="#F2AE00">认购1个节点</Button>
        <Space h="sm" />
        <Button fullWidth color="#F2AE00">认购5个节点</Button>

        <Space h="sm" />
        <Group justify="center" mb={5}>
          <Button variant="subtle" color="#F2AE00" onClick={toggle}>More</Button>
        </Group>

        <Collapse in={opened}>
          <Center>
            <Group>
              <NumberInput
                size="md"
                allowNegative={false}
                allowDecimal={false}
                defaultValue={0}
                placeholder="Input number"
              />
              <Button color="#F2AE00"> 认购</Button>
            </Group>
          </Center>
        </Collapse>

      </Card>

      <Space h="xl" />
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Button fullWidth color="#F2AE00">邀请好友</Button>
      </Card>

      <Button
      onClick={() =>
        notifications.show({
          id: 'notification-loading',
          title: 'Default notification',
          message: 'Do not forget to star Mantine on GitHub! 🌟',
          position: 'top-center',
          loading: true,
        })
      }
    >
      Show loading
    </Button>
    <Button
      onClick={() =>{
        notifications.hide('notification-loading')
        notifications.show({
          id: 'notification-success',
          title: 'Default notification',
          message: 'Do not forget to star Mantine on GitHub! 🌟',
          position: 'top-center',
          icon: <IconCheck size={18} />
        })
      }}
    >
      Show success
    </Button>
    <Button
      onClick={() =>{
        notifications.hide('notification-success')
        notifications.show({
          id: 'notification-error',
          title: 'Default notification',
          message: 'Do not forget to star Mantine on GitHub! 🌟',
          position: 'top-center',
          icon: <IconX size={18} />,
          color: 'red',
        })
      }}
    >
      Show error
    </Button>
    </>
  );
}
