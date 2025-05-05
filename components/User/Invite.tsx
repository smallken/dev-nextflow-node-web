import { Button, Card, Space, Text } from '@mantine/core';
import { useUser } from '../../context/UserContext';

export function Invite() {
  const { contractUserInfo } = useUser();
  
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Button fullWidth color="#F2AE00">邀请好友</Button>
    </Card>
  );
}