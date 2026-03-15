import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// pool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const poolAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  { type: 'error', inputs: [], name: 'AlreadyRegistered' },
  { type: 'error', inputs: [], name: 'AmountMustBePositive' },
  {
    type: 'error',
    inputs: [{ name: 'batchIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'BatchAlreadyActive',
  },
  {
    type: 'error',
    inputs: [{ name: 'batchIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'BatchAlreadyInactive',
  },
  {
    type: 'error',
    inputs: [
      { name: 'newEndCount', internalType: 'uint256', type: 'uint256' },
      { name: 'previousEndCount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'BatchEndCountNotIncreasing',
  },
  {
    type: 'error',
    inputs: [{ name: 'batchIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'BatchNotActive',
  },
  { type: 'error', inputs: [], name: 'ContractPaused' },
  {
    type: 'error',
    inputs: [{ name: 'depth', internalType: 'uint8', type: 'uint8' }],
    name: 'DepthExceedsMaximum',
  },
  { type: 'error', inputs: [], name: 'DepthMustBePositive' },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  {
    type: 'error',
    inputs: [
      { name: 'newTotal', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ExceedsMaxCumulativePurchase',
  },
  {
    type: 'error',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ExceedsMaxSinglePurchase',
  },
  { type: 'error', inputs: [], name: 'FailedCall' },
  {
    type: 'error',
    inputs: [
      { name: 'requested', internalType: 'uint256', type: 'uint256' },
      { name: 'available', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InsufficientStock',
  },
  { type: 'error', inputs: [], name: 'InvalidAddress' },
  {
    type: 'error',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'InvalidBatchIndex',
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'InvalidPrice' },
  { type: 'error', inputs: [], name: 'InvalidThreshold' },
  {
    type: 'error',
    inputs: [{ name: 'index', internalType: 'uint8', type: 'uint8' }],
    name: 'InvalidTierIndex',
  },
  { type: 'error', inputs: [], name: 'MaxSinglePurchaseMustBePositive' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'NotRegistered' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'rate', internalType: 'uint8', type: 'uint8' }],
    name: 'RateTooHigh',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'error',
    inputs: [{ name: 'referrer', internalType: 'address', type: 'address' }],
    name: 'ReferrerHasNoSales',
  },
  {
    type: 'error',
    inputs: [{ name: 'referrer', internalType: 'address', type: 'address' }],
    name: 'ReferrerNotRegistered',
  },
  {
    type: 'error',
    inputs: [
      { name: 'reward', internalType: 'uint256', type: 'uint256' },
      { name: 'maxReward', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'RewardTooHigh',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  { type: 'error', inputs: [], name: 'TokenPoolNotSet' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'BatchActivated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'endCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'purchaseReward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'referralReward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalStock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'BatchDeactivated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'batchIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'endCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'purchaseReward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'referralReward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalStock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tierIndex',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'threshold',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'rate', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'CommissionTierSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'maxCommissionDepth',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'MaxCommissionDepthSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'maxCumulativePurchase',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MaxCumulativePurchaseSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'maxReferralDepth',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'MaxReferralDepthSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'maxSinglePurchase',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MaxSinglePurchaseSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'paused', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'PausedStateChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalUsdtCost',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'usdtCommission',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'referralTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'purchaseTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PhonePurchased',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'phoneNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PurchaseTokenRewarded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'referrer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ReferralRegistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'fromRate',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
      { name: 'toRate', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'TokenCommissionRecorded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenPool',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TokenPoolSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokenWithdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'treasury',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TreasurySet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'usdtAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'fromRate',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
      { name: 'toRate', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'UsdtCommissionPaid',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'price',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'UsdtPriceSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'status', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'WhitelistUpdated',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'batchIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'activateBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'endCount', internalType: 'uint256', type: 'uint256' },
      { name: 'purchaseReward', internalType: 'uint256', type: 'uint256' },
      { name: 'referralReward', internalType: 'uint256', type: 'uint256' },
      { name: 'totalStock', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'buyPhone',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'commissionRates',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'batchIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'deactivateBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'downlines',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getActiveBatch',
    outputs: [
      { name: 'batchIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'remainingStock', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'getBatch',
    outputs: [
      { name: 'endCount', internalType: 'uint256', type: 'uint256' },
      { name: 'purchaseReward', internalType: 'uint256', type: 'uint256' },
      { name: 'referralReward', internalType: 'uint256', type: 'uint256' },
      { name: 'totalStock', internalType: 'uint256', type: 'uint256' },
      { name: 'soldCount', internalType: 'uint256', type: 'uint256' },
      { name: 'isActive', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBatchCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'phoneNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBatchRewards',
    outputs: [
      { name: 'purchaseReward', internalType: 'uint256', type: 'uint256' },
      { name: 'referralReward', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getDownlineCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'offset', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getDownlinesPaginated',
    outputs: [
      { name: 'result', internalType: 'address[]', type: 'address[]' },
      { name: 'total', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getNextBatch',
    outputs: [
      { name: 'batchIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'totalStock', internalType: 'uint256', type: 'uint256' },
      { name: 'exists', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getTokenCommissionRate',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUsdtCommissionRate',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserDownlines',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserInfo',
    outputs: [
      { name: '_salesCount', internalType: 'uint256', type: 'uint256' },
      { name: '_teamSalesCount', internalType: 'uint256', type: 'uint256' },
      { name: '_usdtIncome', internalType: 'uint256', type: 'uint256' },
      { name: '_tokenIncome', internalType: 'uint256', type: 'uint256' },
      { name: '_upline', internalType: 'address', type: 'address' },
      { name: '_downlineCount', internalType: 'uint256', type: 'uint256' },
      { name: '_usdtCommissionRate', internalType: 'uint8', type: 'uint8' },
      { name: '_tokenCommissionRate', internalType: 'uint8', type: 'uint8' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'globalSalesCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_usdt', internalType: 'address', type: 'address' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_treasury', internalType: 'address', type: 'address' },
      { name: '_referrer0', internalType: 'address', type: 'address' },
      { name: '_usdtPrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isRegistered',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isWhitelisted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxCommissionDepth',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxCumulativePurchase',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxRate',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxReferralDepth',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxSinglePurchase',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'purchaseTokens',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'referrer0',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'referrer', internalType: 'address', type: 'address' }],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'salesCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tierIndex', internalType: 'uint8', type: 'uint8' },
      { name: 'threshold', internalType: 'uint256', type: 'uint256' },
      { name: 'rate', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'setCommissionTier',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_depth', internalType: 'uint8', type: 'uint8' }],
    name: 'setMaxCommissionDepth',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_max', internalType: 'uint256', type: 'uint256' }],
    name: 'setMaxCumulativePurchase',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_depth', internalType: 'uint8', type: 'uint8' }],
    name: 'setMaxReferralDepth',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_max', internalType: 'uint256', type: 'uint256' }],
    name: 'setMaxSinglePurchase',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_paused', internalType: 'bool', type: 'bool' }],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenPool', internalType: 'address', type: 'address' }],
    name: 'setTokenPool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_treasury', internalType: 'address', type: 'address' }],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_usdtPrice', internalType: 'uint256', type: 'uint256' }],
    name: 'setUsdtPrice',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'status', internalType: 'bool', type: 'bool' },
    ],
    name: 'setWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'teamSalesCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tierThresholds',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'tokenIncome',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tokenPool',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalProjectUsdtIncome',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'treasury',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'batchIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'endCount', internalType: 'uint256', type: 'uint256' },
      { name: 'purchaseReward', internalType: 'uint256', type: 'uint256' },
      { name: 'referralReward', internalType: 'uint256', type: 'uint256' },
      { name: 'totalStock', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'upline',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'usdt',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'usdtIncome',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'usdtPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const poolAddress = {
  56: '0xd0FB85E347f5894904C6592D597CBFB6222226ab',
  97: '0x59fEbf632f1E22227f8daDe303438d9A4BbE0548',
  31337: '0x0000000000000000000000000000000000000000',
} as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const poolConfig = { address: poolAddress, abi: poolAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const tokenAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'initialSupply', internalType: 'uint256', type: 'uint256' },
      { name: 'treasury', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'BatchLengthExceeded' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  { type: 'error', inputs: [], name: 'InvalidAddress' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'TradingEnabled' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'status', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'WhitelistUpdated',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_BATCH_LENGTH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_SUPPLY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'status', internalType: 'bool', type: 'bool' },
    ],
    name: 'batchSetWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipients', internalType: 'address[]', type: 'address[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'batchTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'enableTrading',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isWhitelisted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'status', internalType: 'bool', type: 'bool' },
    ],
    name: 'setWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tradingEnabled',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const tokenAddress = {
  56: '0x464c9503d58b37fb673C47AD056a1a0e8e70555b',
  97: '0x464c9503d58b37fb673C47AD056a1a0e8e70555b',
  31337: '0x0000000000000000000000000000000000000000',
} as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const tokenConfig = { address: tokenAddress, abi: tokenAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// tokenPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const tokenPoolAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  { type: 'error', inputs: [], name: 'Blacklisted' },
  { type: 'error', inputs: [], name: 'ClaimAmountTooSmall' },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'FailedCall' },
  { type: 'error', inputs: [], name: 'InsufficientTokenBalance' },
  { type: 'error', inputs: [], name: 'InvalidAddress' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'InvalidPercent' },
  { type: 'error', inputs: [], name: 'InvalidVestingDuration' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'NothingToClaim' },
  { type: 'error', inputs: [], name: 'OnlyDistribution' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'status', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'BlacklistUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'distribution',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'DistributionUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'available',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'required',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'InsufficientBalance',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'minClaimAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MinClaimAmountSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokenWithdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokensClaimed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'treasury',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TreasuryUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'immediatePercent',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'vestingPercent',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'vestingDuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'VestingConfigUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'totalAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'immediateAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'vestingAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'treasuryAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'VestingCreated',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'totalAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addVesting',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'distribution',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getClaimable',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getSchedule',
    outputs: [
      { name: 'totalAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'claimed', internalType: 'uint256', type: 'uint256' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'vested', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getScheduleCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getVestingInfo',
    outputs: [
      { name: '_totalVested', internalType: 'uint256', type: 'uint256' },
      { name: '_totalClaimed', internalType: 'uint256', type: 'uint256' },
      { name: '_claimable', internalType: 'uint256', type: 'uint256' },
      { name: '_scheduleCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'globalTotalClaimed',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'globalTotalVested',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'immediatePercent',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_distribution', internalType: 'address', type: 'address' },
      { name: '_treasury', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isBlacklisted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minClaimAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'status', internalType: 'bool', type: 'bool' },
    ],
    name: 'setBlacklist',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_distribution', internalType: 'address', type: 'address' },
    ],
    name: 'setDistribution',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_minClaimAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setMinClaimAmount',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_treasury', internalType: 'address', type: 'address' }],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_immediatePercent', internalType: 'uint8', type: 'uint8' },
      { name: '_vestingPercent', internalType: 'uint8', type: 'uint8' },
      { name: '_vestingDuration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setVestingConfig',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'totalClaimedAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'totalImmediateAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'totalVestedAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'treasury',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'vestingDuration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'vestingPercent',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const tokenPoolAddress = {
  56: '0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90',
  97: '0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90',
  31337: '0x0000000000000000000000000000000000000000',
} as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const tokenPoolConfig = {
  address: tokenPoolAddress,
  abi: tokenPoolAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// usdt
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const usdtAbi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const usdtAddress = {
  56: '0x55d398326f99059fF775485246999027B3197955',
  97: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
  31337: '0x0000000000000000000000000000000000000000',
} as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const usdtConfig = { address: usdtAddress, abi: usdtAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPool = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"commissionRates"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolCommissionRates = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'commissionRates',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"downlines"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolDownlines = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'downlines',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getActiveBatch"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolGetActiveBatch = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'getActiveBatch',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getBatch"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolGetBatch = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'getBatch',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getBatchCount"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolGetBatchCount = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'getBatchCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getBatchRewards"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolGetBatchRewards = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'getBatchRewards',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getDownlineCount"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolGetDownlineCount = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'getDownlineCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getDownlinesPaginated"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolGetDownlinesPaginated =
  /*#__PURE__*/ createUseReadContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'getDownlinesPaginated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getNextBatch"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolGetNextBatch = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'getNextBatch',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getTokenCommissionRate"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolGetTokenCommissionRate =
  /*#__PURE__*/ createUseReadContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'getTokenCommissionRate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getUsdtCommissionRate"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolGetUsdtCommissionRate =
  /*#__PURE__*/ createUseReadContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'getUsdtCommissionRate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getUserDownlines"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolGetUserDownlines = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'getUserDownlines',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getUserInfo"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolGetUserInfo = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'getUserInfo',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"globalSalesCount"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolGlobalSalesCount = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'globalSalesCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"isRegistered"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolIsRegistered = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'isRegistered',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"isWhitelisted"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolIsWhitelisted = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'isWhitelisted',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"maxCommissionDepth"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolMaxCommissionDepth =
  /*#__PURE__*/ createUseReadContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'maxCommissionDepth',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"maxCumulativePurchase"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolMaxCumulativePurchase =
  /*#__PURE__*/ createUseReadContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'maxCumulativePurchase',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"maxRate"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolMaxRate = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'maxRate',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"maxReferralDepth"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolMaxReferralDepth = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'maxReferralDepth',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"maxSinglePurchase"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolMaxSinglePurchase = /*#__PURE__*/ createUseReadContract(
  { abi: poolAbi, address: poolAddress, functionName: 'maxSinglePurchase' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolOwner = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolPaused = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"pendingOwner"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolPendingOwner = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'pendingOwner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'proxiableUUID',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"purchaseTokens"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolPurchaseTokens = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'purchaseTokens',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"referrer0"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolReferrer0 = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'referrer0',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolRenounceOwnership = /*#__PURE__*/ createUseReadContract(
  { abi: poolAbi, address: poolAddress, functionName: 'renounceOwnership' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"salesCount"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolSalesCount = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'salesCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"teamSalesCount"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolTeamSalesCount = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'teamSalesCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"tierThresholds"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolTierThresholds = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'tierThresholds',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"token"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolToken = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'token',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"tokenIncome"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolTokenIncome = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'tokenIncome',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"tokenPool"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolTokenPool = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'tokenPool',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"totalProjectUsdtIncome"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolTotalProjectUsdtIncome =
  /*#__PURE__*/ createUseReadContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'totalProjectUsdtIncome',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"treasury"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolTreasury = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'treasury',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"upline"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolUpline = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'upline',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"usdt"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolUsdt = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'usdt',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"usdtIncome"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolUsdtIncome = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'usdtIncome',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"usdtPrice"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useReadPoolUsdtPrice = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'usdtPrice',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePool = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolAcceptOwnership = /*#__PURE__*/ createUseWriteContract(
  { abi: poolAbi, address: poolAddress, functionName: 'acceptOwnership' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"activateBatch"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolActivateBatch = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'activateBatch',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"addBatch"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolAddBatch = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'addBatch',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"buyPhone"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolBuyPhone = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'buyPhone',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"deactivateBatch"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolDeactivateBatch = /*#__PURE__*/ createUseWriteContract(
  { abi: poolAbi, address: poolAddress, functionName: 'deactivateBatch' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"register"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolRegister = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'register',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setCommissionTier"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolSetCommissionTier =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setCommissionTier',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setMaxCommissionDepth"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolSetMaxCommissionDepth =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setMaxCommissionDepth',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setMaxCumulativePurchase"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolSetMaxCumulativePurchase =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setMaxCumulativePurchase',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setMaxReferralDepth"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolSetMaxReferralDepth =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setMaxReferralDepth',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setMaxSinglePurchase"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolSetMaxSinglePurchase =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setMaxSinglePurchase',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setPaused"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolSetPaused = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'setPaused',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setTokenPool"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolSetTokenPool = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'setTokenPool',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolSetTreasury = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'setTreasury',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setUsdtPrice"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolSetUsdtPrice = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'setUsdtPrice',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setWhitelist"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolSetWhitelist = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'setWhitelist',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"updateBatch"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolUpdateBatch = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'updateBatch',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"withdrawToken"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWritePoolWithdrawToken = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'withdrawToken',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePool = /*#__PURE__*/ createUseSimulateContract({
  abi: poolAbi,
  address: poolAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolAcceptOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"activateBatch"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolActivateBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'activateBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"addBatch"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolAddBatch = /*#__PURE__*/ createUseSimulateContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'addBatch',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"buyPhone"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolBuyPhone = /*#__PURE__*/ createUseSimulateContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'buyPhone',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"deactivateBatch"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolDeactivateBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'deactivateBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"register"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolRegister = /*#__PURE__*/ createUseSimulateContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'register',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setCommissionTier"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolSetCommissionTier =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setCommissionTier',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setMaxCommissionDepth"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolSetMaxCommissionDepth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setMaxCommissionDepth',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setMaxCumulativePurchase"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolSetMaxCumulativePurchase =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setMaxCumulativePurchase',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setMaxReferralDepth"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolSetMaxReferralDepth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setMaxReferralDepth',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setMaxSinglePurchase"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolSetMaxSinglePurchase =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setMaxSinglePurchase',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setPaused"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolSetPaused = /*#__PURE__*/ createUseSimulateContract(
  { abi: poolAbi, address: poolAddress, functionName: 'setPaused' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setTokenPool"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolSetTokenPool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setTokenPool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolSetTreasury =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setTreasury',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setUsdtPrice"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolSetUsdtPrice =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setUsdtPrice',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setWhitelist"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolSetWhitelist =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setWhitelist',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"updateBatch"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolUpdateBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'updateBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"withdrawToken"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useSimulatePoolWithdrawToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'withdrawToken',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: poolAbi,
  address: poolAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"BatchActivated"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolBatchActivatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'BatchActivated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"BatchAdded"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolBatchAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'BatchAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"BatchDeactivated"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolBatchDeactivatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'BatchDeactivated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"BatchUpdated"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolBatchUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'BatchUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"CommissionTierSet"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolCommissionTierSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'CommissionTierSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"MaxCommissionDepthSet"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolMaxCommissionDepthSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'MaxCommissionDepthSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"MaxCumulativePurchaseSet"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolMaxCumulativePurchaseSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'MaxCumulativePurchaseSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"MaxReferralDepthSet"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolMaxReferralDepthSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'MaxReferralDepthSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"MaxSinglePurchaseSet"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolMaxSinglePurchaseSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'MaxSinglePurchaseSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolOwnershipTransferStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"PausedStateChanged"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolPausedStateChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'PausedStateChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"PhonePurchased"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolPhonePurchasedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'PhonePurchased',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"PurchaseTokenRewarded"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolPurchaseTokenRewardedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'PurchaseTokenRewarded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"ReferralRegistered"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolReferralRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'ReferralRegistered',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"TokenCommissionRecorded"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolTokenCommissionRecordedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'TokenCommissionRecorded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"TokenPoolSet"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolTokenPoolSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'TokenPoolSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"TokenWithdrawn"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolTokenWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'TokenWithdrawn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"TreasurySet"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolTreasurySetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'TreasurySet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"UsdtCommissionPaid"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolUsdtCommissionPaidEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'UsdtCommissionPaid',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"UsdtPriceSet"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolUsdtPriceSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'UsdtPriceSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"WhitelistUpdated"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd0FB85E347f5894904C6592D597CBFB6222226ab)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x59fEbf632f1E22227f8daDe303438d9A4BbE0548)
 * -
 */
export const useWatchPoolWhitelistUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'WhitelistUpdated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useReadToken = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"MAX_BATCH_LENGTH"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useReadTokenMaxBatchLength = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'MAX_BATCH_LENGTH',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"MAX_SUPPLY"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useReadTokenMaxSupply = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'MAX_SUPPLY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useReadTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useReadTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useReadTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"isWhitelisted"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useReadTokenIsWhitelisted = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'isWhitelisted',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useReadTokenName = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useReadTokenOwner = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useReadTokenRenounceOwnership =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useReadTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useReadTokenTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"tradingEnabled"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useReadTokenTradingEnabled = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'tradingEnabled',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useWriteToken = /*#__PURE__*/ createUseWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useWriteTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"batchSetWhitelist"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useWriteTokenBatchSetWhitelist =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'batchSetWhitelist',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"batchTransfer"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useWriteTokenBatchTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'batchTransfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useWriteTokenBurn = /*#__PURE__*/ createUseWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"burnFrom"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useWriteTokenBurnFrom = /*#__PURE__*/ createUseWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'burnFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"enableTrading"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useWriteTokenEnableTrading = /*#__PURE__*/ createUseWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'enableTrading',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"setWhitelist"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useWriteTokenSetWhitelist = /*#__PURE__*/ createUseWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'setWhitelist',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useWriteTokenTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useWriteTokenTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useWriteTokenTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useSimulateToken = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useSimulateTokenApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"batchSetWhitelist"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useSimulateTokenBatchSetWhitelist =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'batchSetWhitelist',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"batchTransfer"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useSimulateTokenBatchTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'batchTransfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useSimulateTokenBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"burnFrom"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useSimulateTokenBurnFrom = /*#__PURE__*/ createUseSimulateContract(
  { abi: tokenAbi, address: tokenAddress, functionName: 'burnFrom' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"enableTrading"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useSimulateTokenEnableTrading =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'enableTrading',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"setWhitelist"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useSimulateTokenSetWhitelist =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'setWhitelist',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useSimulateTokenTransfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: tokenAbi, address: tokenAddress, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useSimulateTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useSimulateTokenTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useWatchTokenEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: tokenAbi,
  address: tokenAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useWatchTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useWatchTokenOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"TradingEnabled"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useWatchTokenTradingEnabledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: 'TradingEnabled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useWatchTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"WhitelistUpdated"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x464c9503d58b37fb673C47AD056a1a0e8e70555b)
 * -
 */
export const useWatchTokenWhitelistUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: 'WhitelistUpdated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPool = /*#__PURE__*/ createUseReadContract({
  abi: tokenPoolAbi,
  address: tokenPoolAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"distribution"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolDistribution = /*#__PURE__*/ createUseReadContract(
  {
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'distribution',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"getClaimable"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolGetClaimable = /*#__PURE__*/ createUseReadContract(
  {
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'getClaimable',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"getSchedule"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolGetSchedule = /*#__PURE__*/ createUseReadContract({
  abi: tokenPoolAbi,
  address: tokenPoolAddress,
  functionName: 'getSchedule',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"getScheduleCount"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolGetScheduleCount =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'getScheduleCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"getVestingInfo"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolGetVestingInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'getVestingInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"globalTotalClaimed"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolGlobalTotalClaimed =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'globalTotalClaimed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"globalTotalVested"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolGlobalTotalVested =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'globalTotalVested',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"immediatePercent"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolImmediatePercent =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'immediatePercent',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"isBlacklisted"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolIsBlacklisted =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'isBlacklisted',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"minClaimAmount"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolMinClaimAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'minClaimAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolOwner = /*#__PURE__*/ createUseReadContract({
  abi: tokenPoolAbi,
  address: tokenPoolAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"pendingOwner"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolPendingOwner = /*#__PURE__*/ createUseReadContract(
  {
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'pendingOwner',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolProxiableUuid =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'proxiableUUID',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"token"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolToken = /*#__PURE__*/ createUseReadContract({
  abi: tokenPoolAbi,
  address: tokenPoolAddress,
  functionName: 'token',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"totalClaimedAmount"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolTotalClaimedAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'totalClaimedAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"totalImmediateAmount"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolTotalImmediateAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'totalImmediateAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"totalVestedAmount"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolTotalVestedAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'totalVestedAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"treasury"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolTreasury = /*#__PURE__*/ createUseReadContract({
  abi: tokenPoolAbi,
  address: tokenPoolAddress,
  functionName: 'treasury',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"vestingDuration"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolVestingDuration =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'vestingDuration',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"vestingPercent"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useReadTokenPoolVestingPercent =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'vestingPercent',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenPoolAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWriteTokenPool = /*#__PURE__*/ createUseWriteContract({
  abi: tokenPoolAbi,
  address: tokenPoolAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWriteTokenPoolAcceptOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"addVesting"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWriteTokenPoolAddVesting = /*#__PURE__*/ createUseWriteContract(
  { abi: tokenPoolAbi, address: tokenPoolAddress, functionName: 'addVesting' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"claim"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWriteTokenPoolClaim = /*#__PURE__*/ createUseWriteContract({
  abi: tokenPoolAbi,
  address: tokenPoolAddress,
  functionName: 'claim',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWriteTokenPoolInitialize = /*#__PURE__*/ createUseWriteContract(
  { abi: tokenPoolAbi, address: tokenPoolAddress, functionName: 'initialize' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWriteTokenPoolRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"setBlacklist"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWriteTokenPoolSetBlacklist =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'setBlacklist',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"setDistribution"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWriteTokenPoolSetDistribution =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'setDistribution',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"setMinClaimAmount"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWriteTokenPoolSetMinClaimAmount =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'setMinClaimAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWriteTokenPoolSetTreasury =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'setTreasury',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"setVestingConfig"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWriteTokenPoolSetVestingConfig =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'setVestingConfig',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWriteTokenPoolTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWriteTokenPoolUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"withdrawToken"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWriteTokenPoolWithdrawToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'withdrawToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenPoolAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useSimulateTokenPool = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenPoolAbi,
  address: tokenPoolAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useSimulateTokenPoolAcceptOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"addVesting"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useSimulateTokenPoolAddVesting =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'addVesting',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"claim"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useSimulateTokenPoolClaim =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'claim',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useSimulateTokenPoolInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useSimulateTokenPoolRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"setBlacklist"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useSimulateTokenPoolSetBlacklist =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'setBlacklist',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"setDistribution"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useSimulateTokenPoolSetDistribution =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'setDistribution',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"setMinClaimAmount"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useSimulateTokenPoolSetMinClaimAmount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'setMinClaimAmount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useSimulateTokenPoolSetTreasury =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'setTreasury',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"setVestingConfig"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useSimulateTokenPoolSetVestingConfig =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'setVestingConfig',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useSimulateTokenPoolTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useSimulateTokenPoolUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenPoolAbi}__ and `functionName` set to `"withdrawToken"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useSimulateTokenPoolWithdrawToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    functionName: 'withdrawToken',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenPoolAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWatchTokenPoolEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: tokenPoolAbi, address: tokenPoolAddress },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenPoolAbi}__ and `eventName` set to `"BlacklistUpdated"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWatchTokenPoolBlacklistUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    eventName: 'BlacklistUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenPoolAbi}__ and `eventName` set to `"DistributionUpdated"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWatchTokenPoolDistributionUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    eventName: 'DistributionUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenPoolAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWatchTokenPoolInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenPoolAbi}__ and `eventName` set to `"InsufficientBalance"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWatchTokenPoolInsufficientBalanceEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    eventName: 'InsufficientBalance',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenPoolAbi}__ and `eventName` set to `"MinClaimAmountSet"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWatchTokenPoolMinClaimAmountSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    eventName: 'MinClaimAmountSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenPoolAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWatchTokenPoolOwnershipTransferStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenPoolAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWatchTokenPoolOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenPoolAbi}__ and `eventName` set to `"TokenWithdrawn"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWatchTokenPoolTokenWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    eventName: 'TokenWithdrawn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenPoolAbi}__ and `eventName` set to `"TokensClaimed"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWatchTokenPoolTokensClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    eventName: 'TokensClaimed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenPoolAbi}__ and `eventName` set to `"TreasuryUpdated"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWatchTokenPoolTreasuryUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    eventName: 'TreasuryUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenPoolAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWatchTokenPoolUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenPoolAbi}__ and `eventName` set to `"VestingConfigUpdated"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWatchTokenPoolVestingConfigUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    eventName: 'VestingConfigUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenPoolAbi}__ and `eventName` set to `"VestingCreated"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xd7d85a8e063345186E9E6e5ab03d54Aa46b78f90)
 * -
 */
export const useWatchTokenPoolVestingCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenPoolAbi,
    address: tokenPoolAddress,
    eventName: 'VestingCreated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const useReadUsdt = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const useReadUsdtAllowance = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const useReadUsdtBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const useReadUsdtDecimals = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const useReadUsdtName = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const useReadUsdtSymbol = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const useReadUsdtTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const useWriteUsdt = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const useWriteUsdtApprove = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const useWriteUsdtTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const useWriteUsdtTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const useSimulateUsdt = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const useSimulateUsdtApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const useSimulateUsdtTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const useSimulateUsdtTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usdtAbi,
    address: usdtAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const useWatchUsdtEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdtAbi,
  address: usdtAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const useWatchUsdtApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usdtAbi,
    address: usdtAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x337610d27c682E347C9cD60BD4b3b107C9d34dDd)
 * -
 */
export const useWatchUsdtTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usdtAbi,
    address: usdtAddress,
    eventName: 'Transfer',
  })
