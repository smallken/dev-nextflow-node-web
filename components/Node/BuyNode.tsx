import { Button, Card, Space, Text, Group, NumberInput, Collapse, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUser } from '../../context/UserContext';

export function BuyNode() {
  const [opened, { toggle }] = useDisclosure(false);
  const { nodeInfo, setNodeInfo } = useUser();
  
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text fw={500}>
        当前节点: {nodeInfo ? nodeInfo.count : 0}个
      </Text>
      <Button 
        fullWidth 
        color="#F2AE00" 
        onClick={() => {
          if (nodeInfo) {
            // 更新全局节点信息
            setNodeInfo({
              ...nodeInfo,
              count: nodeInfo.count + 1
            });
          }
        }}
      >
        认购1个节点
      </Button>
      <Space h="sm" />
      <Button 
        fullWidth 
        color="#F2AE00"
        onClick={() => {
          if (nodeInfo) {
            // 更新全局节点信息
            setNodeInfo({
              ...nodeInfo,
              count: nodeInfo.count + 5
            });
          }
        }}
      >
        认购5个节点
      </Button>

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
  );
}