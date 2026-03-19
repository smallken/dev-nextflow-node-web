import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useWatchBlockNumber } from 'wagmi';

/**
 * Hook to watch for new blocks and trigger data refresh
 * This replaces 8 concurrent 15s polling with a single block watcher + 60s fallback
 */
export function useContractEvents() {
  const queryClient = useQueryClient();

  // Watch for new blocks on BSC (average ~3s per block)
  useWatchBlockNumber({
    onBlockNumber: (blockNumber) => {
      // Only refresh every 5 blocks (~15s) to avoid too frequent updates
      if (Number(blockNumber) % 5 === 0) {
        // Invalidate all user-related queries to trigger refresh
        queryClient.invalidateQueries({ queryKey: ['readPoolGetUserInfo'] });
        queryClient.invalidateQueries({ queryKey: ['readPoolUpline'] });
        queryClient.invalidateQueries({ queryKey: ['readPoolGetUserDownlines'] });
        queryClient.invalidateQueries({ queryKey: ['readUsdtBalanceOf'] });
        queryClient.invalidateQueries({ queryKey: ['readUsdtAllowance'] });
        queryClient.invalidateQueries({ queryKey: ['readPoolSalesCount'] });
        
        // Invalidate batch-related queries
        queryClient.invalidateQueries({ queryKey: ['readPoolGetActiveBatch'] });
        queryClient.invalidateQueries({ queryKey: ['readPoolGetBatch'] });
      }
    },
    // Enable only when component is mounted
    enabled: true,
  });

  return null;
}
