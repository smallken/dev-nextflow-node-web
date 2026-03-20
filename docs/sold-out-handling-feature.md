# 售罄显示功能实现

**提交记录**: `0d8d6b2` - 修复售罄显示问题  
**日期**: 2026-03-20  
**状态**: 已回退，待测试后重新应用

---

## 功能说明

当批次售罄时（`getActiveBatch` 返回错误），显示"已售罄"状态，并禁用购买按钮。

---

## 代码修改

### 1. UserContext.tsx - 处理售罄时的批次查询

**位置**: `context/UserContext.tsx:166-171`

**修改内容**:
```typescript
// 当 getActiveBatch 失败时（售罄情况），回退到批次 0
const fallbackBatchIndex = isActiveBatchError && !isActiveBatchLoading ? BigInt(0) : undefined;
const batchIndexToQuery = activeBatchData ? activeBatchData[0] : fallbackBatchIndex;

// 获取批次详情（获取 totalStock）
const { data: batchDetails, refetch: refetchBatchDetails } = useReadPoolGetBatch({
  args: batchIndexToQuery !== undefined ? [batchIndexToQuery] : undefined,
  query: {
    enabled: batchIndexToQuery !== undefined,  // 改为：batchIndexToQuery !== undefined
  }
});
```

**说明**:
- 原代码：`args: activeBatchData ? [activeBatchData[0]] : undefined`
- 新代码：当 `getActiveBatch` 失败时，回退查询批次 0 的详情
- 这样即使售罄，也能获取批次信息用于显示

---

### 2. UserContext.tsx - 设置 appInfo 时处理售罄

**位置**: `context/UserContext.tsx:259-262`

**修改内容**:
```typescript
if (nftPrice && batchDetails) {
  // 如果 getActiveBatch 成功，使用其返回值；否则使用批次 0 的数据（售罄情况）
  const activeBatchIndex = activeBatchData ? Number(activeBatchData[0]) : 0;
  const batchRemainingStock = activeBatchData ? Number(activeBatchData[1]) : 0;
  
  // ... 其余逻辑不变
}
```

**说明**:
- 原代码：`if (nftPrice && activeBatchData && batchDetails)`
- 新代码：移除 `activeBatchData` 的检查，允许在售罄时（activeBatchData 为 undefined）也能设置 appInfo
- `batchRemainingStock` 在售罄时设为 0

---

### 3. UserContext.tsx - 更新 useEffect 依赖

**位置**: `context/UserContext.tsx:298`

**修改内容**:
```typescript
}, [nftPrice, activeBatchData, batchDetails, isActiveBatchError, isActiveBatchLoading]);
```

**说明**: 添加 `isActiveBatchError` 和 `isActiveBatchLoading` 到依赖数组

---

### 4. BuyNode.tsx - 计算最大购买数量

**位置**: `components/Node/BuyNode.tsx:79-82`

**新增代码**:
```typescript
// 计算最大可购买数量
const maxBuyAmount = Math.min(50, appInfo?.batchRemainingStock || 0);

// 售罄标志
const isNftMintComplete = appInfo?.batchRemainingStock === 0;
```

**说明**:
- `maxBuyAmount`: 取 50 和剩余库存的较小值
- `isNftMintComplete`: 剩余库存为 0 时标记为售罄

---

### 5. BuyNode.tsx - 购买 1 台按钮显示售罄

**位置**: `components/Node/BuyNode.tsx:376-384`

**修改内容**:
```typescript
<Button
  size="md"
  fullWidth
  onClick={() => handlePurchase(1)}
  disabled={!isConnected || isNftMintComplete}
  loading={loadingButton === 'one' && (isPending || isConfirming)}
  // ... 其他属性
>
  {isNftMintComplete
    ? t('sold_out')
    : (loadingButton === 'one' && (isPending || isConfirming)
      ? t('processing')
      : (isRegistered ? t('buy_one_phone') : t('buy_one_node'))
        + ' (' + formatEther(BigInt(1) * (nftPrice || BigInt(0))) + ' USDT)')
  }
</Button>
```

**说明**:
- 按钮禁用条件添加 `|| isNftMintComplete`
- 按钮文本优先显示"已售罄"

---

### 6. BuyNode.tsx - 展开/收起按钮禁用

**位置**: `components/Node/BuyNode.tsx:392`

**修改内容**:
```typescript
<Group justify="center" onClick={toggle} style={{ cursor: isNftMintComplete ? 'not-allowed' : 'pointer' }}>
```

**说明**: 售罄时鼠标显示禁止图标

---

### 7. BuyNode.tsx - 数量输入框处理售罄

**位置**: `components/Node/BuyNode.tsx:420-428`

**修改内容**:
```typescript
<NumberInput
  size="md"
  placeholder={`1-${maxBuyAmount}`}
  clampBehavior="strict"
  allowNegative={false}
  allowDecimal={false}
  step={1}
  stepHoldInterval={100}
  defaultValue={1}
  min={1}
  max={maxBuyAmount}  // 改为动态最大值
  value={buyAmount || ''}
  onChange={(val) => setBuyAmount(Number(val))}
  disabled={isNftMintComplete}  // 售罄时禁用
  description={isNftMintComplete 
    ? t('sold_out') 
    : (maxBuyAmount < 50 
      ? t('remaining_phones', { count: maxBuyAmount }) 
      : t('max_50_phones_hint'))}
  // ... 其他属性
/>
```

**说明**:
- `max` 改为 `maxBuyAmount`（动态）
- `placeholder` 改为 `1-${maxBuyAmount}`
- 添加 `disabled={isNftMintComplete}`
- `description` 根据售罄状态和剩余数量显示不同提示

---

### 8. BuyNode.tsx - 自定义数量购买按钮

**位置**: `components/Node/BuyNode.tsx:483-488`

**修改内容**:
```typescript
<Button
  size="md"
  fullWidth
  onClick={() => handlePurchase(buyAmount || 1)}
  disabled={!isConnected || !buyAmount || buyAmount < 1 || isNftMintComplete}
  loading={loadingButton === 'custom' && (isPending || isConfirming)}
  // ... 其他属性
>
  {isNftMintComplete
    ? t('sold_out')
    : (loadingButton === 'custom' && (isPending || isConfirming) 
      ? t('processing') 
      : (isRegistered ? t('buy_phone') : t('buy_node')))
  }
</Button>
```

**说明**:
- 禁用条件添加 `|| isNftMintComplete`
- 按钮文本优先显示"已售罄"

---

### 9. Home.tsx - 首页显示售罄状态

**位置**: `components/Home/Home.tsx:263-272`

**修改内容**:
```typescript
{appInfo ? (
  appInfo.batchRemainingStock === 0 ? (
    <Text size="sm" c="dimmed" ta="center">
      {t('first_phase_sold_out')}
    </Text>
  ) : (
    <Text size="sm" c="dimmed" ta="center">
      {t('phase', { number: appInfo.activeBatchIndex + 1 })} - {appInfo.batchRemainingStock}/{appInfo.batchTotalStock}
    </Text>
  )
) : null}
```

**说明**: 当 `batchRemainingStock === 0` 时显示"第一期已售罄"

---

### 10. 多语言翻译新增

**文件**: `i18n/locales/zh/common.json` 和 `i18n/locales/en/common.json`

**新增内容**:
```json
{
  "sold_out": "已售罄",  // en: "Sold Out"
  "first_phase_sold_out": "第一期已售罄",  // en: "Phase 1 Sold Out"
  "remaining_phones": "剩余 {{count}} 台"  // en: "{{count}} phones remaining"
}
```

---

## 测试要点

1. **正常状态** (batchRemainingStock > 0):
   - 显示"0/3000"等正常库存
   - 购买按钮正常可用
   - 数量输入框提示"最多50台"或"剩余X台"

2. **售罄状态** (batchRemainingStock = 0):
   - 显示"已售罄"
   - 所有购买按钮显示"已售罄"并禁用
   - 数量输入框禁用并显示"已售罄"
   - 首页显示"第一期已售罄"

3. **边界情况**:
   - 剩余 < 50 台时，最大购买数量限制为剩余数量
   - `getActiveBatch` 失败时，回退查询批次 0 的数据

---

## 注意事项

⚠️ **此功能在 e4d054c 版本不存在**  
⚠️ **需要在测试稳定后再应用此功能**  
⚠️ **依赖 `appInfo.batchRemainingStock` 的正确性**

---

## 重新应用步骤

测试 e4d054c 版本稳定后，按以下文件顺序应用修改：

1. `context/UserContext.tsx` - 核心逻辑
2. `i18n/locales/zh/common.json` 和 `i18n/locales/en/common.json` - 翻译
3. `components/Node/BuyNode.tsx` - 购买组件
4. `components/Home/Home.tsx` - 首页显示
