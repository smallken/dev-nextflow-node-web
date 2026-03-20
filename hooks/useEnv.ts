import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/**
 * Custom hook to check if the application is running in test environment
 * Checks both environment variable and URL parameter
 * @returns Object with isTestnet flag
 */
export const useEnv = () => {
  const [isTestnet, setIsTestnet] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check environment variable
    const isTestnetByEnv = process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true';
    
    // Check URL parameter
    const isTestnetByUrl = () => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('__test__') === '1';
      }
      return false;
    };
    
    // Update state based on either condition
    setIsTestnet(isTestnetByEnv || isTestnetByUrl());
  }, [router.query]); // Re-run when URL parameters change

  return { isTestnet };
};
