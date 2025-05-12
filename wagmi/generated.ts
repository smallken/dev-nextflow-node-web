import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// nodeNft
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const nodeNftAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
      { name: '_uri', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  {
    type: 'error',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'currentSupply', internalType: 'uint256', type: 'uint256' },
      { name: 'requestedAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'maxSupply', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ExceedsMaxSupply',
  },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  {
    type: 'error',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'currentSupply', internalType: 'uint256', type: 'uint256' },
      { name: 'proposedMaxSupply', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'MaxSupplyTooLow',
  },
  { type: 'error', inputs: [], name: 'NoRecipientsSpecified' },
  {
    type: 'error',
    inputs: [
      { name: 'recipientsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'amountsLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'RecipientsAmountsLengthMismatch',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'TokenNotCreated',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'TransferNotAllowed',
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
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'BaseURIUpdated' },
  { type: 'event', anonymous: false, inputs: [], name: 'ContractURIUpdated' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'maxSupply',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MaxSupplySet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'TokenCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokenMinted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'TokenURIUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'recipients',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'amounts',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TokensAirdropped',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenIds',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'amounts',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TokensBatchMinted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'function',
    inputs: [],
    name: 'AIRDROP_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'METADATA_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipients', internalType: 'address[]', type: 'address[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'airdrop',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'contractURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenURI', internalType: 'string', type: 'string' }],
    name: 'createToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'exists',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'grantAirdropRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'grantMetadataRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'maxSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'mintBatch',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'revokeAirdropRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'revokeMetadataRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newContractURI', internalType: 'string', type: 'string' },
    ],
    name: 'setContractURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: '_maxSupply', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setMaxSupply',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenURI', internalType: 'string', type: 'string' },
    ],
    name: 'setTokenURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newuri', internalType: 'string', type: 'string' }],
    name: 'setURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
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
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const nodeNftAddress = {
  97: '0xA2c14F04A79535600F68d1E682C0215b027E56d9',
} as const

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const nodeNftConfig = {
  address: nodeNftAddress,
  abi: nodeNftAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// pool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
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
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'CommissionTransferFailed',
  },
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
  { type: 'error', inputs: [], name: 'InvalidAddress' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  {
    type: 'error',
    inputs: [{ name: 'level', internalType: 'uint8', type: 'uint8' }],
    name: 'InvalidLevel',
  },
  { type: 'error', inputs: [], name: 'InvalidPriceOracleAddress' },
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
    name: 'ReferrerHasNoNodes',
  },
  {
    type: 'error',
    inputs: [{ name: 'referrer', internalType: 'address', type: 'address' }],
    name: 'ReferrerNotRegistered',
  },
  {
    type: 'error',
    inputs: [
      { name: 'expectedToken', internalType: 'address', type: 'address' },
      { name: 'providedToken', internalType: 'address', type: 'address' },
    ],
    name: 'TokenMismatch',
  },
  { type: 'error', inputs: [], name: 'TokenTransferFailed' },
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
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'fromLevel',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
      { name: 'toLevel', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'CommissionPaid',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'level', internalType: 'uint8', type: 'uint8', indexed: false },
      { name: 'rate', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'CommissionRateSet',
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
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'oldLevel',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'newLevel',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'LevelUpdated',
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
        name: 'nodeNFT',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'NodeNFTSet',
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
    name: 'NodePurchased',
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
        name: 'priceOracle',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'PriceOracleSet',
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
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'buyNode',
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
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'directPurchaseCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
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
    name: 'getNodePrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: '_level', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'getTeamNodeBaseline',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
      { name: '_nodeCount', internalType: 'uint256', type: 'uint256' },
      { name: '_income', internalType: 'uint256', type: 'uint256' },
      { name: '_level', internalType: 'uint8', type: 'uint8' },
      { name: '_teamNodeCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserUpline',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'income',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_treasury', internalType: 'address', type: 'address' },
      { name: '_referrer0', internalType: 'address', type: 'address' },
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
    name: 'level',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'levelRequirements',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nodeCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nodeNFT',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nodeTokenId',
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
    name: 'priceOracle',
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
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_level', internalType: 'uint8', type: 'uint8' },
      { name: '_rate', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'setCommissionRate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_maxCumulativePurchase',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setMaxCumulativePurchase',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_maxReferralDepth', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'setMaxReferralDepth',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_maxSinglePurchase', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setMaxSinglePurchase',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_nodeNFT', internalType: 'address', type: 'address' },
      { name: '_nodeTokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setNodeNFT',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_priceOracle', internalType: 'address', type: 'address' },
    ],
    name: 'setPriceOracle',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_wallet', internalType: 'address', type: 'address' }],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'teamNodeBaseline',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'teamNodeCount',
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
    inputs: [],
    name: 'totalProjectIncome',
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
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'upline',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const poolAddress = {
  97: '0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9',
} as const

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const poolConfig = { address: poolAddress, abi: poolAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// usdt
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
 */
export const usdtAddress = {
  97: '0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0',
} as const

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
 */
export const usdtConfig = { address: usdtAddress, abi: usdtAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useReadNodeNft = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"AIRDROP_ROLE"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useReadNodeNftAirdropRole = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'AIRDROP_ROLE',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useReadNodeNftDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"METADATA_ROLE"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useReadNodeNftMetadataRole = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'METADATA_ROLE',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useReadNodeNftBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"balanceOfBatch"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useReadNodeNftBalanceOfBatch = /*#__PURE__*/ createUseReadContract(
  { abi: nodeNftAbi, address: nodeNftAddress, functionName: 'balanceOfBatch' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"contractURI"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useReadNodeNftContractUri = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'contractURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"exists"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useReadNodeNftExists = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'exists',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useReadNodeNftGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'getRoleAdmin',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"hasRole"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useReadNodeNftHasRole = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'hasRole',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useReadNodeNftIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"maxSupply"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useReadNodeNftMaxSupply = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'maxSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useReadNodeNftName = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"paused"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useReadNodeNftPaused = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useReadNodeNftSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useReadNodeNftSymbol = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useReadNodeNftTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"uri"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useReadNodeNftUri = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'uri',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNft = /*#__PURE__*/ createUseWriteContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"airdrop"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftAirdrop = /*#__PURE__*/ createUseWriteContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'airdrop',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"createToken"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftCreateToken = /*#__PURE__*/ createUseWriteContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'createToken',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"grantAirdropRole"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftGrantAirdropRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'grantAirdropRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"grantMetadataRole"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftGrantMetadataRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'grantMetadataRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"grantRole"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'grantRole',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftMint = /*#__PURE__*/ createUseWriteContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"mintBatch"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftMintBatch = /*#__PURE__*/ createUseWriteContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'mintBatch',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"pause"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftPause = /*#__PURE__*/ createUseWriteContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"renounceRole"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftRenounceRole = /*#__PURE__*/ createUseWriteContract(
  { abi: nodeNftAbi, address: nodeNftAddress, functionName: 'renounceRole' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"revokeAirdropRole"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftRevokeAirdropRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'revokeAirdropRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"revokeMetadataRole"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftRevokeMetadataRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'revokeMetadataRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"revokeRole"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'revokeRole',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftSafeBatchTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setContractURI"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftSetContractUri =
  /*#__PURE__*/ createUseWriteContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'setContractURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setMaxSupply"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftSetMaxSupply = /*#__PURE__*/ createUseWriteContract(
  { abi: nodeNftAbi, address: nodeNftAddress, functionName: 'setMaxSupply' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setTokenURI"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftSetTokenUri = /*#__PURE__*/ createUseWriteContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'setTokenURI',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setURI"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftSetUri = /*#__PURE__*/ createUseWriteContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'setURI',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"unpause"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWriteNodeNftUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNft = /*#__PURE__*/ createUseSimulateContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"airdrop"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftAirdrop =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'airdrop',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"createToken"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftCreateToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'createToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"grantAirdropRole"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftGrantAirdropRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'grantAirdropRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"grantMetadataRole"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftGrantMetadataRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'grantMetadataRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"grantRole"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftMint = /*#__PURE__*/ createUseSimulateContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"mintBatch"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftMintBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'mintBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"pause"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftPause = /*#__PURE__*/ createUseSimulateContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"renounceRole"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"revokeAirdropRole"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftRevokeAirdropRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'revokeAirdropRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"revokeMetadataRole"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftRevokeMetadataRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'revokeMetadataRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"revokeRole"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftSafeBatchTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setContractURI"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftSetContractUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'setContractURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setMaxSupply"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftSetMaxSupply =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'setMaxSupply',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setTokenURI"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftSetTokenUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'setTokenURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setURI"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftSetUri = /*#__PURE__*/ createUseSimulateContract(
  { abi: nodeNftAbi, address: nodeNftAddress, functionName: 'setURI' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"unpause"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useSimulateNodeNftUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWatchNodeNftEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: nodeNftAbi,
  address: nodeNftAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWatchNodeNftApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"BaseURIUpdated"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWatchNodeNftBaseUriUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'BaseURIUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"ContractURIUpdated"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWatchNodeNftContractUriUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'ContractURIUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"MaxSupplySet"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWatchNodeNftMaxSupplySetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'MaxSupplySet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"Paused"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWatchNodeNftPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWatchNodeNftRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWatchNodeNftRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWatchNodeNftRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"TokenCreated"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWatchNodeNftTokenCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'TokenCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"TokenMinted"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWatchNodeNftTokenMintedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'TokenMinted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"TokenURIUpdated"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWatchNodeNftTokenUriUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'TokenURIUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"TokensAirdropped"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWatchNodeNftTokensAirdroppedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'TokensAirdropped',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"TokensBatchMinted"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWatchNodeNftTokensBatchMintedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'TokensBatchMinted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"TransferBatch"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWatchNodeNftTransferBatchEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'TransferBatch',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"TransferSingle"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWatchNodeNftTransferSingleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'TransferSingle',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"URI"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWatchNodeNftUriEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'URI',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"Unpaused"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xA2c14F04A79535600F68d1E682C0215b027E56d9)
 */
export const useWatchNodeNftUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPool = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolCommissionRates = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'commissionRates',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"directPurchaseCount"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolDirectPurchaseCount =
  /*#__PURE__*/ createUseReadContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'directPurchaseCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"downlines"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolDownlines = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'downlines',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getNodePrice"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolGetNodePrice = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'getNodePrice',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getTeamNodeBaseline"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolGetTeamNodeBaseline =
  /*#__PURE__*/ createUseReadContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'getTeamNodeBaseline',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getUserDownlines"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolGetUserDownlines = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'getUserDownlines',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getUserInfo"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolGetUserInfo = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'getUserInfo',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getUserUpline"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolGetUserUpline = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'getUserUpline',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"income"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolIncome = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'income',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"isRegistered"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolIsRegistered = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'isRegistered',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"level"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolLevel = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'level',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"levelRequirements"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolLevelRequirements = /*#__PURE__*/ createUseReadContract(
  { abi: poolAbi, address: poolAddress, functionName: 'levelRequirements' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"maxCumulativePurchase"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolMaxCumulativePurchase =
  /*#__PURE__*/ createUseReadContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'maxCumulativePurchase',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"maxReferralDepth"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolMaxReferralDepth = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'maxReferralDepth',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"maxSinglePurchase"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolMaxSinglePurchase = /*#__PURE__*/ createUseReadContract(
  { abi: poolAbi, address: poolAddress, functionName: 'maxSinglePurchase' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"nodeCount"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolNodeCount = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'nodeCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"nodeNFT"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolNodeNft = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'nodeNFT',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"nodeTokenId"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolNodeTokenId = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'nodeTokenId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolOwner = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"priceOracle"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolPriceOracle = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'priceOracle',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'proxiableUUID',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"referrer0"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolReferrer0 = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'referrer0',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"teamNodeBaseline"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolTeamNodeBaseline = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'teamNodeBaseline',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"teamNodeCount"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolTeamNodeCount = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'teamNodeCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"token"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolToken = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'token',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"totalProjectIncome"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolTotalProjectIncome =
  /*#__PURE__*/ createUseReadContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'totalProjectIncome',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"treasury"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolTreasury = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'treasury',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"upline"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useReadPoolUpline = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'upline',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWritePool = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"buyNode"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWritePoolBuyNode = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'buyNode',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"initialize"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWritePoolInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"register"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWritePoolRegister = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'register',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWritePoolRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setCommissionRate"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWritePoolSetCommissionRate =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setCommissionRate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setMaxCumulativePurchase"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWritePoolSetMaxSinglePurchase =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setMaxSinglePurchase',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setNodeNFT"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWritePoolSetNodeNft = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'setNodeNFT',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setPriceOracle"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWritePoolSetPriceOracle = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'setPriceOracle',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setTreasury"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWritePoolSetTreasury = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'setTreasury',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWritePoolTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWritePoolUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useSimulatePool = /*#__PURE__*/ createUseSimulateContract({
  abi: poolAbi,
  address: poolAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"buyNode"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useSimulatePoolBuyNode = /*#__PURE__*/ createUseSimulateContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'buyNode',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"initialize"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useSimulatePoolRegister = /*#__PURE__*/ createUseSimulateContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'register',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useSimulatePoolRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setCommissionRate"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useSimulatePoolSetCommissionRate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setCommissionRate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setMaxCumulativePurchase"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useSimulatePoolSetMaxSinglePurchase =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setMaxSinglePurchase',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setNodeNFT"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useSimulatePoolSetNodeNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setNodeNFT',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setPriceOracle"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useSimulatePoolSetPriceOracle =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setPriceOracle',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setTreasury"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useSimulatePoolSetTreasury =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setTreasury',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useSimulatePoolTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useSimulatePoolUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWatchPoolEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: poolAbi,
  address: poolAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"CommissionPaid"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWatchPoolCommissionPaidEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'CommissionPaid',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"CommissionRateSet"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWatchPoolCommissionRateSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'CommissionRateSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"Initialized"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWatchPoolInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"LevelUpdated"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWatchPoolLevelUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'LevelUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"MaxCumulativePurchaseSet"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWatchPoolMaxSinglePurchaseSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'MaxSinglePurchaseSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"NodeNFTSet"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWatchPoolNodeNftSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'NodeNFTSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"NodePurchased"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWatchPoolNodePurchasedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'NodePurchased',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWatchPoolOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"PriceOracleSet"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWatchPoolPriceOracleSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'PriceOracleSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"ReferralRegistered"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWatchPoolReferralRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'ReferralRegistered',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"TreasurySet"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8D74dD3b6957e44632B020e6F9F86FA05E8FA3C9)
 */
export const useWatchPoolUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
 */
export const useReadUsdt = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"allowance"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
 */
export const useReadUsdtAllowance = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
 */
export const useReadUsdtBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"decimals"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
 */
export const useReadUsdtDecimals = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
 */
export const useReadUsdtName = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
 */
export const useReadUsdtSymbol = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
 */
export const useReadUsdtTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
 */
export const useWriteUsdt = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
 */
export const useWriteUsdtApprove = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
 */
export const useWriteUsdtTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
 */
export const useWriteUsdtTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
 */
export const useSimulateUsdt = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
 */
export const useSimulateUsdtApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
 */
export const useSimulateUsdtTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
 */
export const useWatchUsdtEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdtAbi,
  address: usdtAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0xa1f6966b416e221C9F3bD1D49B3F8fDE5Fd495d0)
 */
export const useWatchUsdtTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usdtAbi,
    address: usdtAddress,
    eventName: 'Transfer',
  })
