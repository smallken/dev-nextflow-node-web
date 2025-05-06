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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const nodeNftAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
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
  {
    type: 'function',
    inputs: [
      { name: '_id', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'ContractURIUpdated' },
  {
    type: 'function',
    inputs: [
      { name: '_id', internalType: 'uint256', type: 'uint256' },
      { name: '_mintAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
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
    ],
    name: 'OwnershipRenounced',
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
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'removeFromWhiteList',
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
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'removeFromWhiteListEvent',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
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
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
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
    inputs: [{ name: 'contractURI', internalType: 'string', type: 'string' }],
    name: 'setContractURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'setFromWhiteList',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'setFromWhiteListEvent',
  },
  {
    type: 'function',
    inputs: [{ name: '_maxSupply', internalType: 'uint256', type: 'uint256' }],
    name: 'setMaxSupply',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'poolAddress_', internalType: 'address', type: 'address' },
    ],
    name: 'setPoolAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_id', internalType: 'uint256', type: 'uint256' },
      { name: '_uri', internalType: 'string', type: 'string' },
    ],
    name: 'setURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'isOn', internalType: 'bool', type: 'bool' }],
    name: 'setWhitelistedOn',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'exists',
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
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isFromWhitelisted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isWhitelistedFromOn',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    name: 'poolAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
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
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
    inputs: [{ name: '_id', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const nodeNftAddress = {
  97: '0x76304F2547aA59954F2d5d479936B073aBCcDB8d',
} as const

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const nodeNftConfig = {
  address: nodeNftAddress,
  abi: nodeNftAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// pool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const poolAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'usdtToken',
        internalType: 'contract IERC20Custom',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
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
    ],
    name: 'CommissionPaid',
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
    name: 'Invested',
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
    name: 'LevelUp',
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
    ],
    name: 'OwnershipRenounced',
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
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'parent',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Registered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_manager',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'RemoveManager',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_manager',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetManager',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'andOn', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'setWhitelistedOnEvent',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_RATE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'buyNft',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'firstAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNum',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUser',
    outputs: [
      {
        name: '',
        internalType: 'struct NftPool.UserInfo',
        type: 'tuple',
        components: [
          { name: 'usdtTotal', internalType: 'uint256', type: 'uint256' },
          { name: 'friendCount', internalType: 'uint256', type: 'uint256' },
          { name: 'teamCount', internalType: 'uint256', type: 'uint256' },
          { name: 'friendNodeCount', internalType: 'uint256', type: 'uint256' },
          { name: 'teamNodeCount', internalType: 'uint256', type: 'uint256' },
          { name: 'vipLevel', internalType: 'uint8', type: 'uint8' },
          { name: 'profitTotal', internalType: 'uint256', type: 'uint256' },
          { name: 'selfNodeCount', internalType: 'uint256', type: 'uint256' },
          { name: 'l1TeamNodeCount', internalType: 'uint256', type: 'uint256' },
          { name: 'computeL0', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'iNftMint',
    outputs: [{ name: '', internalType: 'contract INftMint', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'invitation_',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'managers',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxInviteLevel',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nftId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nftPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'nodeCountLimit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'nodeCountLimitInc',
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
    name: 'pAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_mintAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'preMint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'inviteAddress', internalType: 'address', type: 'address' },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'user_', internalType: 'address', type: 'address' }],
    name: 'removeFromWhiteList',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_manager', internalType: 'address', type: 'address' }],
    name: 'removeManager',
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
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'rewardVipRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'firstAddress_', internalType: 'address', type: 'address' },
    ],
    name: 'setFirstAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'user_', internalType: 'address', type: 'address' }],
    name: 'setFromWhiteList',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_manager', internalType: 'address', type: 'address' }],
    name: 'setManager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'maxInviteLevel_', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setMaxInviteLevel',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_maxSupply', internalType: 'uint256', type: 'uint256' }],
    name: 'setMaxSupply',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'nftId_', internalType: 'uint256', type: 'uint256' }],
    name: 'setNftId',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'nftMintAddress_', internalType: 'address', type: 'address' },
    ],
    name: 'setNftMint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'nftPrice_', internalType: 'uint256', type: 'uint256' }],
    name: 'setNftPrice',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'pAddress_', internalType: 'address', type: 'address' }],
    name: 'setProAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'isOn', internalType: 'bool', type: 'bool' }],
    name: 'setWhitelistedOn',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [
      { name: 'userAddr', internalType: 'address', type: 'address' },
      { name: 'vipLevel', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'updateUserVip',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'addressUp', internalType: 'address', type: 'address' },
      { name: 'isValid', internalType: 'bool', type: 'bool' },
    ],
    name: 'updateValidAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'usdtToken_',
    outputs: [
      { name: '', internalType: 'contract IERC20Custom', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'usdtTotal_',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'userInfo_',
    outputs: [
      { name: 'usdtTotal', internalType: 'uint256', type: 'uint256' },
      { name: 'friendCount', internalType: 'uint256', type: 'uint256' },
      { name: 'teamCount', internalType: 'uint256', type: 'uint256' },
      { name: 'friendNodeCount', internalType: 'uint256', type: 'uint256' },
      { name: 'teamNodeCount', internalType: 'uint256', type: 'uint256' },
      { name: 'vipLevel', internalType: 'uint8', type: 'uint8' },
      { name: 'profitTotal', internalType: 'uint256', type: 'uint256' },
      { name: 'selfNodeCount', internalType: 'uint256', type: 'uint256' },
      { name: 'l1TeamNodeCount', internalType: 'uint256', type: 'uint256' },
      { name: 'computeL0', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'validAddress',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const poolAddress = {
  97: '0x7dc35a306955dDa85A11Ff51Df27aAb876F25914',
} as const

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const poolConfig = { address: poolAddress, abi: poolAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// usdt
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
 */
export const usdtAddress = {
  97: '0x17512c164A86790c0b5a6ae9e2913208765164FB',
} as const

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
 */
export const usdtConfig = { address: usdtAddress, abi: usdtAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useReadNodeNft = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useReadNodeNftBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"balanceOfBatch"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useReadNodeNftBalanceOfBatch = /*#__PURE__*/ createUseReadContract(
  { abi: nodeNftAbi, address: nodeNftAddress, functionName: 'balanceOfBatch' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"contractURI"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useReadNodeNftContractUri = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'contractURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"exists"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useReadNodeNftExists = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'exists',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useReadNodeNftIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"isFromWhitelisted"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useReadNodeNftIsFromWhitelisted =
  /*#__PURE__*/ createUseReadContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'isFromWhitelisted',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"isWhitelistedFromOn"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useReadNodeNftIsWhitelistedFromOn =
  /*#__PURE__*/ createUseReadContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'isWhitelistedFromOn',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"maxSupply"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useReadNodeNftMaxSupply = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'maxSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useReadNodeNftName = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useReadNodeNftOwner = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"poolAddress"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useReadNodeNftPoolAddress = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'poolAddress',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useReadNodeNftSymbol = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"tokenURI"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useReadNodeNftTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useReadNodeNftTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"uri"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useReadNodeNftUri = /*#__PURE__*/ createUseReadContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'uri',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWriteNodeNft = /*#__PURE__*/ createUseWriteContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWriteNodeNftBurn = /*#__PURE__*/ createUseWriteContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWriteNodeNftMint = /*#__PURE__*/ createUseWriteContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"removeFromWhiteList"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWriteNodeNftRemoveFromWhiteList =
  /*#__PURE__*/ createUseWriteContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'removeFromWhiteList',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWriteNodeNftRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWriteNodeNftSetContractUri =
  /*#__PURE__*/ createUseWriteContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'setContractURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setFromWhiteList"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWriteNodeNftSetFromWhiteList =
  /*#__PURE__*/ createUseWriteContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'setFromWhiteList',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setMaxSupply"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWriteNodeNftSetMaxSupply = /*#__PURE__*/ createUseWriteContract(
  { abi: nodeNftAbi, address: nodeNftAddress, functionName: 'setMaxSupply' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setPoolAddress"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWriteNodeNftSetPoolAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'setPoolAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setURI"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWriteNodeNftSetUri = /*#__PURE__*/ createUseWriteContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'setURI',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setWhitelistedOn"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWriteNodeNftSetWhitelistedOn =
  /*#__PURE__*/ createUseWriteContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'setWhitelistedOn',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWriteNodeNftTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useSimulateNodeNft = /*#__PURE__*/ createUseSimulateContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useSimulateNodeNftBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useSimulateNodeNftMint = /*#__PURE__*/ createUseSimulateContract({
  abi: nodeNftAbi,
  address: nodeNftAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"removeFromWhiteList"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useSimulateNodeNftRemoveFromWhiteList =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'removeFromWhiteList',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useSimulateNodeNftRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useSimulateNodeNftSetContractUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'setContractURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setFromWhiteList"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useSimulateNodeNftSetFromWhiteList =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'setFromWhiteList',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setMaxSupply"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useSimulateNodeNftSetMaxSupply =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'setMaxSupply',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setPoolAddress"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useSimulateNodeNftSetPoolAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'setPoolAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setURI"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useSimulateNodeNftSetUri = /*#__PURE__*/ createUseSimulateContract(
  { abi: nodeNftAbi, address: nodeNftAddress, functionName: 'setURI' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"setWhitelistedOn"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useSimulateNodeNftSetWhitelistedOn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'setWhitelistedOn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nodeNftAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useSimulateNodeNftTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWatchNodeNftEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: nodeNftAbi,
  address: nodeNftAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWatchNodeNftApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"ContractURIUpdated"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWatchNodeNftContractUriUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'ContractURIUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"OwnershipRenounced"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWatchNodeNftOwnershipRenouncedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'OwnershipRenounced',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWatchNodeNftOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"TransferBatch"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWatchNodeNftUriEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'URI',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"removeFromWhiteListEvent"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWatchNodeNftRemoveFromWhiteListEventEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'removeFromWhiteListEvent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nodeNftAbi}__ and `eventName` set to `"setFromWhiteListEvent"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x76304F2547aA59954F2d5d479936B073aBCcDB8d)
 */
export const useWatchNodeNftSetFromWhiteListEventEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nodeNftAbi,
    address: nodeNftAddress,
    eventName: 'setFromWhiteListEvent',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPool = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"MAX_RATE"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolMaxRate = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'MAX_RATE',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"firstAddress"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolFirstAddress = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'firstAddress',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getBlockNum"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolGetBlockNum = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'getBlockNum',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getBlockTime"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolGetBlockTime = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'getBlockTime',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"getUser"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolGetUser = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'getUser',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"iNftMint"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolINftMint = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'iNftMint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"invitation_"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolInvitation = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'invitation_',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"managers"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolManagers = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'managers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"maxInviteLevel"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolMaxInviteLevel = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'maxInviteLevel',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"nftId"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolNftId = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'nftId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"nftPrice"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolNftPrice = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'nftPrice',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"nodeCountLimit"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolNodeCountLimit = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'nodeCountLimit',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"nodeCountLimitInc"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolNodeCountLimitInc = /*#__PURE__*/ createUseReadContract(
  { abi: poolAbi, address: poolAddress, functionName: 'nodeCountLimitInc' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolOwner = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"pAddress"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolPAddress = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'pAddress',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"rewardVipRate"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolRewardVipRate = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'rewardVipRate',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"usdtToken_"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolUsdtToken = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'usdtToken_',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"usdtTotal_"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolUsdtTotal = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'usdtTotal_',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"userInfo_"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolUserInfo = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'userInfo_',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"validAddress"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useReadPoolValidAddress = /*#__PURE__*/ createUseReadContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'validAddress',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePool = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"buyNft"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolBuyNft = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'buyNft',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"preMint"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolPreMint = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'preMint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"register"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolRegister = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'register',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"removeFromWhiteList"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolRemoveFromWhiteList =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'removeFromWhiteList',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"removeManager"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolRemoveManager = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'removeManager',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setFirstAddress"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolSetFirstAddress = /*#__PURE__*/ createUseWriteContract(
  { abi: poolAbi, address: poolAddress, functionName: 'setFirstAddress' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setFromWhiteList"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolSetFromWhiteList =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setFromWhiteList',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setManager"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolSetManager = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'setManager',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setMaxInviteLevel"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolSetMaxInviteLevel =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setMaxInviteLevel',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setMaxSupply"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolSetMaxSupply = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'setMaxSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setNftId"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolSetNftId = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'setNftId',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setNftMint"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolSetNftMint = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'setNftMint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setNftPrice"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolSetNftPrice = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'setNftPrice',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setProAddress"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolSetProAddress = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'setProAddress',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setWhitelistedOn"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolSetWhitelistedOn =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setWhitelistedOn',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"updateUserVip"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolUpdateUserVip = /*#__PURE__*/ createUseWriteContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'updateUserVip',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"updateValidAddress"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWritePoolUpdateValidAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'updateValidAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePool = /*#__PURE__*/ createUseSimulateContract({
  abi: poolAbi,
  address: poolAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"buyNft"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolBuyNft = /*#__PURE__*/ createUseSimulateContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'buyNft',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"preMint"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolPreMint = /*#__PURE__*/ createUseSimulateContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'preMint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"register"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolRegister = /*#__PURE__*/ createUseSimulateContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'register',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"removeFromWhiteList"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolRemoveFromWhiteList =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'removeFromWhiteList',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"removeManager"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolRemoveManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'removeManager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setFirstAddress"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolSetFirstAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setFirstAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setFromWhiteList"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolSetFromWhiteList =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setFromWhiteList',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setManager"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolSetManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setManager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setMaxInviteLevel"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolSetMaxInviteLevel =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setMaxInviteLevel',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setMaxSupply"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolSetMaxSupply =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setMaxSupply',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setNftId"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolSetNftId = /*#__PURE__*/ createUseSimulateContract({
  abi: poolAbi,
  address: poolAddress,
  functionName: 'setNftId',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setNftMint"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolSetNftMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setNftMint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setNftPrice"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolSetNftPrice =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setNftPrice',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setProAddress"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolSetProAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setProAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"setWhitelistedOn"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolSetWhitelistedOn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'setWhitelistedOn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"updateUserVip"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolUpdateUserVip =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'updateUserVip',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolAbi}__ and `functionName` set to `"updateValidAddress"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useSimulatePoolUpdateValidAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolAbi,
    address: poolAddress,
    functionName: 'updateValidAddress',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWatchPoolEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: poolAbi,
  address: poolAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"CommissionPaid"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWatchPoolCommissionPaidEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'CommissionPaid',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"Invested"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWatchPoolInvestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'Invested',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"LevelUp"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWatchPoolLevelUpEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'LevelUp',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"OwnershipRenounced"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWatchPoolOwnershipRenouncedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'OwnershipRenounced',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWatchPoolOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"Registered"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWatchPoolRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'Registered',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"RemoveManager"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWatchPoolRemoveManagerEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'RemoveManager',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"SetManager"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWatchPoolSetManagerEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'SetManager',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolAbi}__ and `eventName` set to `"setWhitelistedOnEvent"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x7dc35a306955dDa85A11Ff51Df27aAb876F25914)
 */
export const useWatchPoolSetWhitelistedOnEventEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolAbi,
    address: poolAddress,
    eventName: 'setWhitelistedOnEvent',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
 */
export const useReadUsdt = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"allowance"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
 */
export const useReadUsdtAllowance = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
 */
export const useReadUsdtBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"decimals"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
 */
export const useReadUsdtDecimals = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
 */
export const useReadUsdtName = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
 */
export const useReadUsdtSymbol = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
 */
export const useReadUsdtTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
 */
export const useWriteUsdt = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
 */
export const useWriteUsdtApprove = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
 */
export const useWriteUsdtTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
 */
export const useWriteUsdtTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
 */
export const useSimulateUsdt = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
 */
export const useSimulateUsdtApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
 */
export const useSimulateUsdtTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  address: usdtAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
 */
export const useWatchUsdtEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdtAbi,
  address: usdtAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
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
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x17512c164A86790c0b5a6ae9e2913208765164FB)
 */
export const useWatchUsdtTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usdtAbi,
    address: usdtAddress,
    eventName: 'Transfer',
  })
