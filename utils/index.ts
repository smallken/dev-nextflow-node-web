/**
 * Check if an Ethereum address is not the zero address
 * @param address Ethereum address in hex format
 * @returns true if address is not the zero address
 */
export const isNonZeroAddress = (address?: `0x${string}` | string | null): boolean => {
  if (!address) return false;
  
  // Normalize to ensure proper comparison
  const normalizedAddress = address.toLowerCase();
  
  // Check if address is not the zero address
  return normalizedAddress !== '0x0000000000000000000000000000000000000000';
};


// Function to validate Ethereum address format
export const isValidEthAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};