#!/usr/bin/env node
import { createPublicClient, http, formatEther } from 'viem';
import { bsc } from 'viem/chains';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const poolAbi = require('../abis/PhoneDistribution.json');

const mainnetAddress = '0xc0134f7724c79Aa10292bBaf7F9c8b0c878bF4f4';

console.log('🔍 查询主网合约数据...\n');
console.log('合约地址:', mainnetAddress);
console.log('网络: BSC Mainnet (56)\n');

const client = createPublicClient({
  chain: bsc,
  transport: http('https://bsc-dataseed.binance.org')
});

async function query() {
  try {
    // 查询活跃批次
    const activeBatch = await client.readContract({
      address: mainnetAddress,
      abi: poolAbi,
      functionName: 'getActiveBatch',
    });
    
    console.log('✅ 活跃批次 (getActiveBatch):');
    console.log('   批次索引:', activeBatch[0].toString());
    console.log('   剩余库存:', activeBatch[1].toString());
    
    // 查询批次详情
    const batchDetails = await client.readContract({
      address: mainnetAddress,
      abi: poolAbi,
      functionName: 'getBatch',
      args: [activeBatch[0]],
    });
    
    console.log('\n✅ 批次详情 (getBatch):');
    console.log('   总库存 (totalStock):', batchDetails[3].toString());
    console.log('   已售 (soldCount):', batchDetails[4].toString());
    console.log('   是否激活 (isActive):', batchDetails[5]);
    
    const remaining = Number(activeBatch[1]);
    const total = Number(batchDetails[3]);
    
    console.log('\n📊 最终显示应该是:');
    console.log(`   ${remaining}/${total}`);
    
  } catch (err) {
    console.error('❌ 查询失败:', err.message);
  }
}

query();
