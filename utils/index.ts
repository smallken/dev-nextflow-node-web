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

// Contract error codes and their meanings
const CONTRACT_ERRORS: Record<string, { message: string; isCommon: boolean }> = {
  // Registration errors
  '0904e033': { message: '推荐人未注册，请使用有效的邀请码', isCommon: true }, // ReferrerNotRegistered
  '09c6c435': { message: '用户已注册', isCommon: true }, // AlreadyRegistered
  '0baaaec9': { message: '无效的推荐人地址', isCommon: false }, // InvalidReferrer
  '4a4c2e4d': { message: '不能自己推荐自己', isCommon: true }, // CannotSelfRefer

  // Purchase errors
  '07c0b0b0': { message: '库存不足', isCommon: true }, // InsufficientStock
  '086da47a': { message: '批次未激活', isCommon: true }, // BatchNotActive
  '5d5b2c5a': { message: '购买数量超出限制', isCommon: false }, // ExceedsMaxPurchase

  // Token errors
  'f3b10628': { message: 'USDT授权额度不足', isCommon: true }, // InsufficientAllowance
  'd4d5c3d2': { message: 'USDT余额不足', isCommon: true }, // InsufficientBalance

  // General errors
  '08213c8e': { message: '合约已暂停', isCommon: false }, // Paused
  'a217fddf': { message: '地址已被使用', isCommon: false }, // AddressAlreadyInUse
  '13f6d4b4': { message: '不在白名单中', isCommon: false }, // NotWhitelisted
};

/**
 * Parse contract error message and return human-readable text
 * @param error Error from contract call
 * @returns Human-readable error message
 */
export const parseContractError = (error: unknown): string => {
  // Handle Error objects
  if (error instanceof Error) {
    const errorMessage = error.message;

    // Try to extract error code from message
    // Common patterns: "execution reverted: 0x...", "Error: 0x..."
    const errorCodeMatch = errorMessage.match(/0x[0-9a-fA-F]{8}/);
    if (errorCodeMatch) {
      const errorCode = errorCodeMatch[0].slice(2).toLowerCase(); // Remove '0x' prefix

      // Check if we have a known error
      if (CONTRACT_ERRORS[errorCode]) {
        return CONTRACT_ERRORS[errorCode].message;
      }

      // Try to decode unknown error
      return `交易失败 (错误码: 0x${errorCode})`;
    }

    // Return original message if no error code found
    return errorMessage;
  }

  // Handle string errors
  if (typeof error === 'string') {
    const errorCodeMatch = error.match(/0x[0-9a-fA-F]{8}/);
    if (errorCodeMatch) {
      const errorCode = errorCodeMatch[0].slice(2).toLowerCase();
      if (CONTRACT_ERRORS[errorCode]) {
        return CONTRACT_ERRORS[errorCode].message;
      }
    }
    return error;
  }

  // Handle other unknown errors
  return '发生未知错误，请重试';
};