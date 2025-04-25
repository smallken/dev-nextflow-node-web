
import { Button, Space, NumberInput, Group, Progress, Collapse } from '@mantine/core';
import { Image, Card, Text, Center, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './ProgressCardColored.module.css';

import { useChainId, useAccount } from 'wagmi';

// test abi
import { usdtAbi, usdtAddress, useReadUsdtBalanceOf } from '../../wagmi/generated';


export function Home() {
  const [opened, { toggle }] = useDisclosure(false);

  const chainId = useChainId();
  const account = useAccount();

  console.log('chainId', chainId);
  console.log('account', account);

  const { data: balance } = useReadUsdtBalanceOf(
    {
        args: [account.address!],
        query: {
          enabled: !!account.address,
        }
    }
  )

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
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text fw={500}>

        </Text>
        <Button fullWidth color="#F2AE00">接受邀请</Button>
      </Card>

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
    </>
  );
}
