# 数据获取简化 - 移除实时刷新机制

**日期**: 2026-03-19  
**目标**: 简化数据获取策略，移除 WebSocket 实时监听和轮询机制，只在必要时查询区块链数据

---

## 📋 改动总结

### 从 8 个查询减少到 6 个查询

**移除的查询（3个）：**
1. ❌ `useReadPoolUpline(address)` - 推荐人地址（`getUserInfo` 已包含）
2. ❌ `useReadPoolGetUserDownlines(address)` - 好友列表（页面只需要计数，不需要完整列表）
3. ❌ `useReadPoolSalesCount(address)` - 购买数量（`getUserInfo` 已包含）

**保留的查询（6个）：**
1. ✅ `useReadPoolGetActiveBatch()` - 批次信息（batchIndex, remainingStock）
2. ✅ `useReadPoolGetBatch(batchId)` - 批次详情（获取 totalStock）
3. ✅ `useReadPoolGetUserInfo(address)` - 用户完整信息
4. ✅ `useReadPoolUsdtPrice()` - 手机价格
5. ✅ `useReadUsdtBalanceOf(address)` - USDT 余额
6. ✅ `useReadUsdtAllowance(address, poolAddress)` - USDT 授权额度

---

## 🔧 核心修改

### 1. 删除 WebSocket 事件监听

**删除的文件：**
- `/hooks/useContractEvents.ts` ✅ 已删除

**修改的文件：**
- `/context/UserContext.tsx` - 移除 `useContractEvents()` 调用

**结果：**
- 不再有每 5 个区块（~15秒）的自动刷新
- 不再有 WebSocket 实时监听

---

### 2. 简化数据结构

#### ContractUserInfo（简化前 vs 简化后）

**简化前（13个字段）：**
```typescript
type ContractUserInfo = {
  nodeCount: number,
  level: number,
  teamNodeCount: number,
  income: bigint,
  friends: string[],           // ❌ 删除
  salesCount: number,
  usdtIncome: bigint,
  downlineCount: number,
  teamSalesCount: number,
  usdtCommissionRate: number,
  parent?: string,             // ❌ 改为 upline
  address?: `0x${string}`,     // ❌ 删除
};
```

**简化后（6个字段）：**
```typescript
type ContractUserInfo = {
  salesCount: number,       // 已购买手机数
  teamSalesCount: number,   // 我的团队
  usdtIncome: bigint,       // 收益
  downlineCount: number,    // 我的推荐
  level: number,            // 用户等级（基于 usdtCommissionRate）
  upline: string,           // 推荐人（直接从 getUserInfo 获取）
};
```

**字段映射说明：**
- `salesCount` ← 直接从 `getUserInfo[0]` 获取
- `teamSalesCount` ← 直接从 `getUserInfo[1]` 获取
- `usdtIncome` ← 直接从 `getUserInfo[2]` 获取
- `downlineCount` ← 直接从 `getUserInfo[5]` 获取
- `level` ← 直接使用 `getUserInfo[6]`（usdtCommissionRate）
- `upline` ← 直接从 `getUserInfo[4]` 获取（之前需要单独调用 `upline()` 函数）

---

### 3. 更新 refreshData 函数

**简化前（9个查询）：**
```typescript
await Promise.all([
  refetchUserData(),
  refetchParentAddress(),     // ❌ 删除
  refetchFriendsList(),       // ❌ 删除
  refetchActiveBatch(),
  refetchBatchDetails(),
  refetchNftPrice(),
  refetchUsdtBalance(),
  refetchUsdtAllowance(),
  refetchSalesCount(),        // ❌ 删除
]);
```

**简化后（6个查询）：**
```typescript
const refetchPromises = [];

if (address) {
  refetchPromises.push(refetchUserData());      // getUserInfo
  refetchPromises.push(refetchUsdtBalance());   // balanceOf
  refetchPromises.push(refetchUsdtAllowance()); // allowance
}

refetchPromises.push(refetchNftPrice());        // usdtPrice
refetchPromises.push(refetchActiveBatch());     // getActiveBatch
if (activeBatchData) {
  refetchPromises.push(refetchBatchDetails());  // getBatch
}

await Promise.all(refetchPromises);
```

---

### 4. 数据刷新时机

**移除的自动刷新：**
- ❌ WebSocket 监听新区块自动刷新
- ❌ `refetchInterval` 定时轮询

**保留的手动刷新：**
- ✅ 页面首次加载
- ✅ 页面刷新（F5）
- ✅ 用户购买手机后（`BuyNode.tsx` 第 219 行）
- ✅ 链 ID 变化时

---

## 📝 修改的组件

### 更新字段名的组件（parent → upline, nodeCount → salesCount）

1. **`/components/User/InviteModal.tsx`**
   - `contractUserInfo.parent` → `contractUserInfo.upline`
   - `contractUserInfo.nodeCount` → `contractUserInfo.salesCount`

2. **`/components/User/Register.tsx`**
   - `contractUserInfo.parent` → `contractUserInfo.upline`

3. **`/components/Profile/Profile.tsx`**
   - `contractUserInfo.parent` → `contractUserInfo.upline`

4. **`/components/Node/BuyNode.tsx`**
   - `contractUserInfo.parent` → `contractUserInfo.upline`

5. **`/components/Home/HomeContent.tsx`**
   - `contractUserInfo.parent` → `contractUserInfo.upline`
   - 更新 `HomeContentProps` 接口定义

---

## 📊 性能改善

| 指标 | 简化前 | 简化后 | 改善 |
|------|--------|--------|------|
| **区块链查询数** | 8 个 | 6 个 | **-25%** |
| **WebSocket 监听** | 每 15s 刷新 | 无 | **-100%** |
| **首次加载请求** | 8 个 | 6 个 | **-25%** |
| **购买后刷新** | 8 个 | 6 个 | **-25%** |
| **切页请求** | 0 个（缓存） | 0 个（缓存） | 无变化 |

---

## ✅ 验证结果

### 构建测试
```bash
pnpm build
```
**结果：** ✅ 成功编译，无类型错误

### 类型检查
- ✅ 所有组件类型定义已更新
- ✅ `ContractUserInfo` 类型简化成功
- ✅ 所有字段引用已更新

---

## 🎯 数据获取策略

### 现在的策略：按需获取，一次缓存

**数据获取时机：**
1. **页面首次加载** → 自动获取所有 6 个查询
2. **用户购买后** → 刷新所有 6 个查询
3. **页面刷新（F5）** → 重新获取所有数据
4. **链 ID 变化** → 刷新所有数据

**不再触发刷新的场景：**
- ❌ 定时刷新（之前每 60 秒）
- ❌ 区块监听（之前每 15 秒）
- ❌ 页面切换（使用缓存数据）

---

## ⚠️ 注意事项

### 数据实时性考虑

1. **长时间停留页面**
   - 数据可能过期（但用户不关心）
   - 需要手动刷新页面获取最新数据

2. **多设备购买**
   - 其他设备的购买不会自动同步
   - 需要刷新页面

3. **批次剩余数量**
   - 显示的剩余数可能不准确
   - 但购买时会从链上获取最新数据，不会超卖

### 推荐做法

- 购买前刷新页面确保数据最新
- 长时间未操作后刷新页面
- 交易完成后会自动刷新数据

---

## 🔍 技术细节

### getUserInfo 返回值结构

```typescript
// 合约返回 8 个值：
[
  salesCount,        // [0] 个人购买数量
  teamSalesCount,    // [1] 团队业绩
  usdtIncome,        // [2] USDT 收益
  tokenIncome,       // [3] 代币收益（未使用）
  upline,            // [4] 推荐人地址
  downlineCount,     // [5] 直推人数
  usdtCommissionRate,// [6] USDT 佣金费率（等级）
  tokenCommissionRate // [7] 代币佣金费率（未使用）
]
```

### getActiveBatch + getBatch 组合

```typescript
// getActiveBatch 返回：
[batchIndex, remainingStock]

// getBatch(batchIndex) 返回：
[endCount, purchaseReward, referralReward, totalStock, soldCount, isActive]
```

**为什么需要两个查询？**
- `getActiveBatch` 只返回当前批次的索引和剩余数
- `getBatch` 需要额外调用才能获取 `totalStock`
- 未来可以优化合约，让 `getActiveBatch` 直接返回 `totalStock`

---

## 📌 下一步建议

### 可选优化（如需要）

1. **合约优化**
   - 修改 `getActiveBatch` 返回 `totalStock`
   - 减少到 5 个查询

2. **缓存策略**
   - 考虑添加 localStorage 持久化
   - 页面刷新时先显示缓存数据

3. **用户提示**
   - 添加"数据可能过期，点击刷新"提示
   - 显示最后更新时间

---

## 🎉 总结

本次简化成功实现：
- ✅ 移除 WebSocket 实时监听
- ✅ 减少 25% 的区块链查询
- ✅ 简化数据结构（13个字段 → 6个字段）
- ✅ 保留必要的缓存机制
- ✅ 构建成功，无类型错误

**核心理念：按需获取，一次缓存，购买刷新。**
