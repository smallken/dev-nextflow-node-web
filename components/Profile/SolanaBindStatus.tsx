"use client";

import { Button, Text, Group, CopyButton, ActionIcon, Tooltip, Stack, NavLink } from '@mantine/core';
import { useRouter } from 'next/router';
import { IconCheck, IconCopy, IconEdit, IconCirclesRelation } from '@tabler/icons-react';
import { useReadBindSolanaGetSolanaAddress } from '../../wagmi/generated';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

// Helper function to format wallet address for display
function formatAddress(address: string | undefined): string {
  if (!address) return '';
  // Show first 6 and last 4 characters
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

export function SolanaBindStatus() {
  const router = useRouter();
  const { t } = useTranslation();
  const { address } = useAccount();

  // Query user's bound Solana address
  const { data: solanaAddressFromContract } = useReadBindSolanaGetSolanaAddress({
    args: [address!],
    query: {
      enabled: !!address,
    },
  });

  // If Solana address exists and is not zero address
  if (solanaAddressFromContract && solanaAddressFromContract !== '0x0000000000000000000000000000000000000000') {
    return (
      <Stack>
        <Group justify="space-between" w="100%">
          <Text size="xs" c="dimmed" w={80}>{t('bindSolana.addressLabel')}:</Text>
          <Group wrap="nowrap" align="center" gap={4} style={{ flex: 1 }}>
            <Text size="xs" c="dimmed">{formatAddress(solanaAddressFromContract)}</Text>
            <CopyButton value={solanaAddressFromContract || ''} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? t('common.copied') : t('common.copy')} withArrow position="top">
                  <ActionIcon variant="subtle" color={copied ? 'teal' : 'gray'} onClick={copy} size="xs">
                    {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>

            <NavLink
              href="/bind-solana"
              leftSection={<IconEdit size={16} stroke={1.5} />}
              variant="subtle"
            />
          </Group>
        </Group>
      </Stack>
    );
  } else {
    // If no Solana address is bound or it's the zero address
    return (
      <Stack>
        <Button
          leftSection={<IconCirclesRelation size={16} />}
          variant="filled"
          color="#F2AE00"
          onClick={() => router.push('/bind-solana')}
        >
          {t('bindSolana.title')}
        </Button>
      </Stack>
    );
  }
}
