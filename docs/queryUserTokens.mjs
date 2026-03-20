import { createPublicClient, http, formatEther } from 'viem';
import { bscTestnet } from 'viem/chains';

const userAddress = "0x04c7c28e7fbb4d5f08741bc556528d3db04fcfb7";

const TOKEN_ADDRESS = "0x464c9503d58b37fb673C47AD056a1a0e8e70555b";
const PHONE_DISTRIBUTION_ADDRESS = "0x59fEbf632f1E22227f8daDe303438d9A4BbE0548";
const TOKEN_POOL_ADDRESS = "0x5494C5aD0d1d8Ab988caF13dc559711299f0628B";

const client = createPublicClient({
  chain: bscTestnet,
  transport: http('https://data-seed-prebsc-1-s1.binance.org:8545/')
});

const tokenAbi = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
];

const phoneDistributionAbi = [
  {
    inputs: [{ name: '', type: 'address' }],
    name: 'isRegistered',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: '', type: 'address' }],
    name: 'salesCount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: '', type: 'address' }],
    name: 'teamSalesCount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: '', type: 'address' }],
    name: 'purchaseTokens',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: '', type: 'address' }],
    name: 'tokenIncome',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: '', type: 'address' }],
    name: 'usdtIncome',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: '', type: 'address' }],
    name: 'upline',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getUsdtCommissionRate',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getTokenCommissionRate',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
];

const tokenPoolAbi = [
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getVestingInfo',
    outputs: [
      { name: '_totalVested', type: 'uint256' },
      { name: '_totalClaimed', type: 'uint256' },
      { name: '_scheduleCount', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getClaimable',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: '', type: 'address' }],
    name: 'totalImmediateAmount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: '', type: 'address' }],
    name: 'isBlacklisted',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  }
];

async function main() {
  console.log(`\n========================================`);
  console.log(`查询用户代币信息`);
  console.log(`========================================`);
  console.log(`用户地址: ${userAddress}`);
  console.log(`网络: BSC Testnet`);
  console.log(`========================================\n`);

  try {
    // 1. 查询钱包余额
    console.log("📊 1. 钱包余额（已领取）");
    console.log("─────────────────────────────────────");
    const balance = await client.readContract({
      address: TOKEN_ADDRESS,
      abi: tokenAbi,
      functionName: 'balanceOf',
      args: [userAddress]
    });
    console.log(`   余额: ${formatEther(balance)} $Nai`);

    // 2. 查询PhoneDistribution中的记录
    console.log("\n📊 2. PhoneDistribution 记录");
    console.log("─────────────────────────────────────");
    
    const isRegistered = await client.readContract({
      address: PHONE_DISTRIBUTION_ADDRESS,
      abi: phoneDistributionAbi,
      functionName: 'isRegistered',
      args: [userAddress]
    });
    console.log(`   是否注册: ${isRegistered ? "✅ 是" : "❌ 否"}`);
    
    let purchaseTokens = 0n;
    let tokenIncome = 0n;
    
    if (isRegistered) {
      const salesCount = await client.readContract({
        address: PHONE_DISTRIBUTION_ADDRESS,
        abi: phoneDistributionAbi,
        functionName: 'salesCount',
        args: [userAddress]
      });
      
      const teamSalesCount = await client.readContract({
        address: PHONE_DISTRIBUTION_ADDRESS,
        abi: phoneDistributionAbi,
        functionName: 'teamSalesCount',
        args: [userAddress]
      });
      
      purchaseTokens = await client.readContract({
        address: PHONE_DISTRIBUTION_ADDRESS,
        abi: phoneDistributionAbi,
        functionName: 'purchaseTokens',
        args: [userAddress]
      });
      
      tokenIncome = await client.readContract({
        address: PHONE_DISTRIBUTION_ADDRESS,
        abi: phoneDistributionAbi,
        functionName: 'tokenIncome',
        args: [userAddress]
      });
      
      const usdtIncome = await client.readContract({
        address: PHONE_DISTRIBUTION_ADDRESS,
        abi: phoneDistributionAbi,
        functionName: 'usdtIncome',
        args: [userAddress]
      });
      
      const upline = await client.readContract({
        address: PHONE_DISTRIBUTION_ADDRESS,
        abi: phoneDistributionAbi,
        functionName: 'upline',
        args: [userAddress]
      });
      
      const usdtRate = await client.readContract({
        address: PHONE_DISTRIBUTION_ADDRESS,
        abi: phoneDistributionAbi,
        functionName: 'getUsdtCommissionRate',
        args: [userAddress]
      });
      
      const tokenRate = await client.readContract({
        address: PHONE_DISTRIBUTION_ADDRESS,
        abi: phoneDistributionAbi,
        functionName: 'getTokenCommissionRate',
        args: [userAddress]
      });
      
      console.log(`   购买数量: ${salesCount} 台`);
      console.log(`   团队销售: ${teamSalesCount} 台`);
      console.log(`   购买奖励: ${formatEther(purchaseTokens)} $Nai`);
      console.log(`   推荐佣金: ${formatEther(tokenIncome)} $Nai`);
      console.log(`   USDT佣金: ${formatEther(usdtIncome)} USDT`);
      console.log(`   上级推荐人: ${upline}`);
      console.log(`   USDT佣金率: ${usdtRate}%`);
      console.log(`   代币佣金率: ${tokenRate}%`);
    }

    // 3. 查询TokenPool中的归属信息
    console.log("\n📊 3. TokenPool 归属信息");
    console.log("─────────────────────────────────────");
    
    const vestingInfo = await client.readContract({
      address: TOKEN_POOL_ADDRESS,
      abi: tokenPoolAbi,
      functionName: 'getVestingInfo',
      args: [userAddress]
    });
    
    const claimable = await client.readContract({
      address: TOKEN_POOL_ADDRESS,
      abi: tokenPoolAbi,
      functionName: 'getClaimable',
      args: [userAddress]
    });
    
    const totalImmediate = await client.readContract({
      address: TOKEN_POOL_ADDRESS,
      abi: tokenPoolAbi,
      functionName: 'totalImmediateAmount',
      args: [userAddress]
    });
    
    const isBlacklisted = await client.readContract({
      address: TOKEN_POOL_ADDRESS,
      abi: tokenPoolAbi,
      functionName: 'isBlacklisted',
      args: [userAddress]
    });
    
    console.log(`   总归属代币: ${formatEther(vestingInfo[0])} $Nai`);
    console.log(`   已领取: ${formatEther(vestingInfo[1])} $Nai`);
    console.log(`   可领取: ${formatEther(claimable)} $Nai`);
    console.log(`   历史立即释放: ${formatEther(totalImmediate)} $Nai`);
    console.log(`   归属计划数: ${vestingInfo[2]}`);
    console.log(`   黑名单状态: ${isBlacklisted ? "🚫 是" : "✅ 否"}`);

    // 4. 汇总统计
    console.log("\n📊 4. 代币汇总");
    console.log("─────────────────────────────────────");
    
    const totalEarned = purchaseTokens + tokenIncome;
    const totalVested = vestingInfo[0];
    const totalClaimed = vestingInfo[1];
    const totalUnclaimed = totalVested - totalClaimed;
    const currentBalance = balance;
    
    console.log(`   总获得代币: ${formatEther(totalEarned)} $Nai`);
    console.log(`     ├─ 购买奖励: ${formatEther(purchaseTokens)} $Nai`);
    console.log(`     └─ 推荐佣金: ${formatEther(tokenIncome)} $Nai`);
    console.log(`   `);
    console.log(`   代币分布:`);
    console.log(`     ├─ 已领取到钱包: ${formatEther(currentBalance)} $Nai`);
    console.log(`     ├─ 归属中（可领取）: ${formatEther(claimable)} $Nai`);
    console.log(`     └─ 归属中（未解锁）: ${formatEther(totalUnclaimed - claimable)} $Nai`);
    
    const expectedTotal = totalImmediate + totalVested;
    console.log(`   `);
    console.log(`   验证: ${formatEther(totalEarned)} ≈ ${formatEther(expectedTotal)}`);
    console.log(`     (总获得 ≈ 立即释放5% + 归属95%)`);

    console.log("\n========================================");
    console.log("查询完成");
    console.log("========================================\n");

  } catch (error) {
    console.error("\n❌ 查询失败:", error.message);
    if (error.data) {
      console.error("错误详情:", error.data);
    }
  }
}

main();
