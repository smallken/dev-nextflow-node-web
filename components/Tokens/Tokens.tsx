import { Card, Text, Group, Button, Container, Stack, Paper, Space, Divider, Alert, Badge } from '@mantine/core';
import { IconCoin, IconCheck, IconRefresh, IconAlertCircle } from '@tabler/icons-react';
import { useUser } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { formatEther } from 'viem';
import { useChainId, useWaitForTransactionReceipt } from 'wagmi';
import { notifications } from '@mantine/notifications';
import {
  useReadTokenPoolTotalImmediateAmount,
  useWriteTokenPoolClaim,
  useReadTokenPoolGetVestingInfo,
  useReadTokenPoolGetClaimable,
  tokenPoolAddress,
} from '../../wagmi/generated';

export function Tokens() {
  const { t } = useTranslation();
  const { address } = useUser();
  const chainId = useChainId();
  const [isClaiming, setIsClaiming] = useState(false);

  // 获取 TokenPool 合约地址
  const poolAddr = tokenPoolAddress[chainId as keyof typeof tokenPoolAddress];

  // 读取用户的锁仓信息（包含 totalVested 和 totalClaimed）
  const { data: vestingInfo, refetch: refetchVestingInfo } = useReadTokenPoolGetVestingInfo({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!poolAddr,
    }
  });

  // 读取 totalImmediateAmount（立即释放的部分）
  const { data: totalImmediate, refetch: refetchTotalImmediate } = useReadTokenPoolTotalImmediateAmount({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!poolAddr,
    }
  });

  // 读取可领取金额
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

  // 处理数值
  const totalVestedAmount = vestingInfo ? BigInt(vestingInfo[0].toString()) : BigInt(0);
  const claimedAmount = vestingInfo ? BigInt(vestingInfo[1].toString()) : BigInt(0);
  const immediateAmount = totalImmediate ? BigInt(totalImmediate.toString()) : BigInt(0);
  const claimableAmount = claimable ? BigInt(claimable.toString()) : BigInt(0);

  // 计算待释放（锁仓中），不包含立即释放的部分，这2部分是不同的，立即释放是用户购买时直接到账的，
  // 而锁仓中的是待释放，需要按时间解锁
  const pendingAmount = totalVestedAmount - claimedAmount;

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
    // 保留最多4位小数，去除尾部0
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
      refetchVestingInfo();
      refetchTotalImmediate();
      refetchClaimable();
    }
  }, [isClaimed, refetchVestingInfo, refetchTotalImmediate, refetchClaimable]);

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
  const hasVesting = totalVestedAmount > BigInt(0);

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
        {/* Main Token Stats Card */}
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
                <Text fw={600} size="lg">{t('tokens.rewardTokens')}</Text>
              </Group>
              <Badge color="blue" variant="light" size="lg">
                {formatDisplay(totalVestedAmount + immediateAmount)} {t('tokens.tokens')}
              </Badge>
            </Group>

            <Divider />

            {/* 立即释放的部分 */}
            {immediateAmount > BigInt(0) && (
              <Paper p="sm" withBorder radius="md" bg="green.0">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">{t('tokens.immediate')}</Text>
                  <Group gap="xs">
                    <IconCheck size={16} color="green" />
                    <Text fw={600} c="green">{formatDisplay(immediateAmount)} {t('tokens.tokens')}</Text>
                  </Group>
                </Group>
              </Paper>
            )}

            {/* 已领取 */}
            {claimedAmount > BigInt(0) && (
              <Paper p="sm" withBorder radius="md" bg="green.0">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">{t('tokens.claimed')}</Text>
                  <Group gap="xs">
                    <IconCheck size={16} color="green" />
                    <Text fw={600} c="green">{formatDisplay(claimedAmount)} {t('tokens.tokens')}</Text>
                  </Group>
                </Group>
              </Paper>
            )}

            {/* 待释放（锁仓中） */}
            {pendingAmount > BigInt(0) && (
              <Paper p="sm" withBorder radius="md" bg="orange.0">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">{t('tokens.pending')}</Text>
                  <Text fw={600} c="orange">{formatDisplay(pendingAmount)} {t('tokens.tokens')}</Text>
                </Group>
              </Paper>
            )}

            {/* 可领取金额 */}
            {claimableAmount > BigInt(0) && (
              <>
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
              </>
            )}

            {/* 没有锁仓记录 */}
            {!hasVesting && (
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

        <Space h="xs" />
      </Container>
    </div>
  );
}
