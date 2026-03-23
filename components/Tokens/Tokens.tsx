import { Card, Text, Group, Button, Container, Stack, Paper, Space, Divider, Alert, Badge } from '@mantine/core';
import { IconCoin, IconCheck, IconRefresh, IconAlertCircle } from '@tabler/icons-react';
import { useUser } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { formatEther } from 'viem';
import { useChainId, useWaitForTransactionReceipt } from 'wagmi';
import { notifications } from '@mantine/notifications';
import {
  useWriteTokenPoolClaim,
  useReadTokenPoolGetVestingInfoByType,
  useReadTokenPoolGetClaimable,
  tokenPoolAddress,
} from '../../wagmi/generated';

export function Tokens() {
  const { t } = useTranslation();
  const { address, loadUserData } = useUser();
  const chainId = useChainId();
  const [isClaiming, setIsClaiming] = useState(false);
  
  // Trigger user data loading when component mounts
  useEffect(() => {
    loadUserData();
  }, []);

  // 获取 TokenPool 合约地址
  const poolAddr = tokenPoolAddress[chainId as keyof typeof tokenPoolAddress];

  // 读取分类锁仓信息（购机和推广分开）
  const { data: vestingByType, refetch: refetchVestingByType } = useReadTokenPoolGetVestingInfoByType({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!poolAddr,
    }
  });

  // 读取可领取金额（总可领取，不区分来源）
  const { data: claimable, refetch: refetchClaimable } = useReadTokenPoolGetClaimable({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!poolAddr,
    }
  });

  // 写入合约 - 领取代币
  const { data: claimHash, writeContractAsync: claimTokens } = useWriteTokenPoolClaim();
  const { isLoading: isConfirming, isSuccess: isClaimed } = useWaitForTransactionReceipt({
    hash: claimHash,
    confirmations: 1,
  });

  // 处理数值 - 从 getVestingInfoByType 获取
  const purchaseVested = vestingByType ? BigInt(vestingByType[0].toString()) : BigInt(0);
  const referralVested = vestingByType ? BigInt(vestingByType[1].toString()) : BigInt(0);
  const purchaseClaimable = vestingByType ? BigInt(vestingByType[2].toString()) : BigInt(0);
  const referralClaimable = vestingByType ? BigInt(vestingByType[3].toString()) : BigInt(0);
  const claimableAmount = claimable ? BigInt(claimable.toString()) : BigInt(0);

  // 计算总奖励和立即释放部分
  // 购机: 总奖励 = purchaseVested / 0.95, 首次获得 = 总奖励 * 0.05
  const purchaseTotal = (purchaseVested * BigInt(100)) / BigInt(95);
  const purchaseImmediate = (purchaseTotal * BigInt(5)) / BigInt(100);
  
  // 推广: 总奖励 = referralVested / 0.95, 已奖励 = 总奖励 * 0.05
  const referralTotal = (referralVested * BigInt(100)) / BigInt(95);
  const referralImmediate = (referralTotal * BigInt(5)) / BigInt(100);

  // 格式化显示
  const formatToken = (val: bigint) => {
    try {
      return formatEther(val);
    } catch {
      return '0';
    }
  };

  const formatDisplay = (val: bigint) => {
    const str = formatToken(val);
    const num = parseFloat(str);
    if (num === 0) return '0';
    return num.toFixed(Math.min(4, str.split('.')[1]?.length || 0));
  };

  // 处理领取
  const handleClaim = async () => {
    if (!claimTokens || !poolAddr) {
      notifications.show({
        title: t('error_title'),
        message: '合约未就绪',
        color: 'red',
      });
      return;
    }

    setIsClaiming(true);
    try {
      await claimTokens({});
    } catch (error) {
      console.error('Claim error:', error);
      setIsClaiming(false);
    }
  };

  // 监听交易确认
  useEffect(() => {
    if (isClaimed) {
      notifications.show({
        title: t('tokens.claimSuccess'),
        message: t('tokens.claimSuccessMessage'),
        color: 'green',
      });
      setIsClaiming(false);
      
      // 刷新所有代币数据
      refetchVestingByType();
      refetchClaimable();
    }
  }, [isClaimed, refetchVestingByType, refetchClaimable]);

  // 检查是否连接钱包
  if (!address) {
    return (
      <Container size="md" py="xl">
        <Card withBorder radius="md" padding="xl">
          <Text ta="center" fw={500} size="lg">{t('tokens.connectWallet')}</Text>
        </Card>
      </Container>
    );
  }

  // 检查是否有锁仓记录
  const hasVesting = purchaseVested > BigInt(0) || referralVested > BigInt(0);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #E8F4FF 0%, #F0F9FF 100%)',
      minHeight: '100vh', 
      paddingBottom: '80px' 
    }}>
      {/* Header with title */}
      <Group px="md" py="lg" justify="space-between">
        <Text size="lg" fw={700} c="#1e293b">{t('tokens.title')}</Text>
        <Button
          variant="light"
          size="xs"
          leftSection={<IconRefresh size={16} />}
          onClick={handleRefresh}
          styles={{
            root: {
              background: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.9)',
              }
            }
          }}
        >
          {t('tokens.refresh')}
        </Button>
      </Group>

      <Container size="md">
        {/* 购机代币释放卡片 */}
        <Card 
          radius="lg" 
          mb="md"
          styles={{
            root: {
              background: '#FFFFFF',
              border: '1px solid rgba(59, 130, 246, 0.08)',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
            }
          }}
        >
          <Stack gap="md">
            <Group justify="space-between" align="center">
              <Group gap="xs">
                <IconCoin size={24} color="#2563eb" />
                <Text fw={600} size="lg">{t('tokens.purchaseReward')}</Text>
              </Group>
              <Badge color="blue" variant="light" size="lg">
                {formatDisplay(purchaseTotal)} {t('tokens.tokens')}
              </Badge>
            </Group>

            <Divider />

            {/* 首次获得（5%） */}
            {purchaseImmediate > BigInt(0) && (
              <Paper p="sm" withBorder radius="md" bg="green.0">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">{t('tokens.firstReceived')}</Text>
                  <Group gap="xs">
                    <IconCheck size={16} color="green" />
                    <Text fw={600} c="green">{formatDisplay(purchaseImmediate)} {t('tokens.tokens')}</Text>
                  </Group>
                </Group>
              </Paper>
            )}

            {/* 待释放（36个月） */}
            {purchaseClaimable > BigInt(0) && (
              <Paper p="sm" withBorder radius="md" bg="orange.0">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">{t('tokens.pending36')}</Text>
                  <Text fw={600} c="orange">{formatDisplay(purchaseClaimable)} {t('tokens.tokens')}</Text>
                </Group>
              </Paper>
            )}

            {/* 无购机奖励 */}
            {purchaseTotal === BigInt(0) && (
              <Alert
                color="blue"
                icon={<IconAlertCircle size={16} />}
                variant="light"
              >
                <Text size="sm">{t('tokens.noPendingTokens')}</Text>
              </Alert>
            )}
          </Stack>
        </Card>

        {/* 推广奖励代币释放卡片 */}
        <Card 
          radius="lg" 
          mb="md"
          styles={{
            root: {
              background: '#FFFFFF',
              border: '1px solid rgba(59, 130, 246, 0.08)',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
            }
          }}
        >
          <Stack gap="md">
            <Group justify="space-between" align="center">
              <Group gap="xs">
                <IconCoin size={24} color="#2563eb" />
                <Text fw={600} size="lg">{t('tokens.referralReward')}</Text>
              </Group>
              <Badge color="blue" variant="light" size="lg">
                {formatDisplay(referralTotal)} {t('tokens.tokens')}
              </Badge>
            </Group>

            <Divider />

            {/* 已奖励（5%） */}
            {referralImmediate > BigInt(0) && (
              <Paper p="sm" withBorder radius="md" bg="green.0">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">{t('tokens.rewarded5')}</Text>
                  <Group gap="xs">
                    <IconCheck size={16} color="green" />
                    <Text fw={600} c="green">{formatDisplay(referralImmediate)} {t('tokens.tokens')}</Text>
                  </Group>
                </Group>
              </Paper>
            )}

            {/* 待释放（36个月） */}
            {referralClaimable > BigInt(0) && (
              <Paper p="sm" withBorder radius="md" bg="orange.0">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">{t('tokens.pending36')}</Text>
                  <Text fw={600} c="orange">{formatDisplay(referralClaimable)} {t('tokens.tokens')}</Text>
                </Group>
              </Paper>
            )}

            {/* 无推广奖励 */}
            {referralTotal === BigInt(0) && (
              <Alert
                color="blue"
                icon={<IconAlertCircle size={16} />}
                variant="light"
              >
                <Text size="sm">{t('tokens.noPendingTokens')}</Text>
              </Alert>
            )}
          </Stack>
        </Card>

        {/* 可领取代币 */}
        {claimableAmount > BigInt(0) && (
          <Card 
            radius="lg" 
            mb="md"
            styles={{
              root: {
                background: '#FFFFFF',
                border: '1px solid rgba(59, 130, 246, 0.08)',
                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
              }
            }}
          >
            <Stack gap="md">
              <Paper p="sm" withBorder radius="md" bg="blue.0">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">{t('tokens.claimable')}</Text>
                  <Text fw={600} c="blue">{formatDisplay(claimableAmount)} {t('tokens.tokens')}</Text>
                </Group>
              </Paper>

              <Button
                fullWidth
                size="lg"
                radius="lg"
                leftSection={<IconCoin size={20} />}
                onClick={handleClaim}
                loading={isClaiming || isConfirming}
                styles={{
                  root: {
                    background: '#00A8FF',
                    border: 'none',
                    fontWeight: 600,
                    height: '48px',
                    fontSize: '16px',
                    '&:hover:not(:disabled)': {
                      background: '#0096E6',
                    },
                    '&:disabled': {
                      background: '#94C9E8',
                      opacity: 0.6,
                    },
                  }
                }}
              >
                {isConfirming ? t('tokens.claiming') : t('tokens.claim')}
              </Button>
            </Stack>
          </Card>
        )}

        <Space h="xs" />
      </Container>
    </div>
  );
}
