# NextFlow Node Web 性能优化总结

> 优化日期：2026-03-21
> 项目：dev-nextflow-node-web (Next.js + wagmi Web3 DApp)

---

## 📊 优化效果

| 指标 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| 切换到 Team 页面 | 950-1525ms | 752-1073ms | ~30% |
| 切换回首页 | 1061-1600ms | 938-1625ms | ~15% |
| 内存变化 | - | 5015.38 KB | - |

---

## 🔍 问题原因

### 1. CSS backdrop-filter blur 导致移动端严重卡顿
- `backdrop-filter: blur()` 是 GPU 性能杀手
- 切换页面需要 10+ 秒，移动端严重卡顿

### 2. UserContext useEffect 过度渲染
- useEffect 依赖数组包含 `isActiveBatchError` 和 `isActiveBatchLoading`
- 这两个状态在区块链查询时频繁变化
- 导致全局 Context 不断更新，所有组件重新渲染

### 3. 区块链请求缓存不足
- 每次页面切换都重新发起区块链请求
- 缓存时间太短（5分钟 staleTime，10分钟 gcTime）
- 页面切换时缓存丢失（QueryClient 位置不当）

### 4. TeamTree 组件不必要的渲染
- 每次 expandedState 变化都触发更新
- 缺少缓存机制，每次访问都请求 TheGraph

---

## ✅ 优化方案

### 1. 移除 backdrop-filter blur 效果

**文件**: `styles/global.css`

```diff
- .glass {
-   background: rgba(255, 255, 255, 0.9);
-   backdrop-filter: blur(12px);
-   -webkit-backdrop-filter: blur(12px);
- }
+ .glass {
+   background: rgba(255, 255, 255, 0.95);
+ }

- .bottom-navigation {
-   background: linear-gradient(..., rgba(124, 58, 237, 0.95));
-   backdrop-filter: blur(6px);
- }
+ .bottom-navigation {
+   background: linear-gradient(..., rgba(124, 58, 237, 0.98));
+ }
```

### 2. 修复 UserContext 过度渲染

**文件**: `context/UserContext.tsx`

```diff
- }, [nftPrice, activeBatchData, batchDetails, isActiveBatchError, isActiveBatchLoading]);
+ }, [nftPrice, activeBatchData, batchDetails]);
```

### 3. 优化 QueryClient 缓存配置

**文件**: `pages/_app.tsx`

```diff
+ // QueryClient 提升到模块顶层，确保页面切换时复用缓存
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
-     staleTime: 5 * 60 * 1000,
-     gcTime: 10 * 60 * 1000,
+     staleTime: 10 * 60 * 1000,
+     gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  }
});

// 使用 useMemo 缓存 wagmi config
const wagmiConfig = useMemo(() => config, [config]);
```

### 4. 为区块链查询添加缓存配置

**文件**: `components/Tokens/Tokens.tsx`, `components/Node/BuyNode.tsx`

```typescript
const { data: balance } = useReadPoolUsdtBalanceOf({
  args: address ? [address] : undefined,
  query: {
    enabled: !!address && !!poolAddr,
    staleTime: 10 * 60 * 1000,      // 10分钟不重新获取
    refetchOnMount: false,           // 挂载时不重新获取
  }
});
```

### 5. TeamTree 页面添加 GraphQL 缓存

**文件**: `components/Profile/TeamTree.tsx`

```typescript
// 模块级别缓存
const teamCache = useRef<{ data: User | null; timestamp: number } | null>(null);
const CACHE_DURATION = 10 * 60 * 1000; // 10分钟

useEffect(() => {
  // 检查缓存
  if (teamCache.current && 
      teamCache.current.data && 
      Date.now() - teamCache.current.timestamp < CACHE_DURATION) {
    console.log('=== 使用缓存的团队数据 ===');
    setRootUser(teamCache.current.data);
    return;
  }
  
  // 发起请求并更新缓存
  const user = await getUserWithTeam(effectiveAddress);
  teamCache.current = { data: user, timestamp: Date.now() };
}, []);
```

### 6. 优化 TeamTree 组件渲染

**文件**: `components/Profile/TeamTree.tsx`

```typescript
// 使用 ref 比较，避免不必要的更新
const prevExpandedStateRef = useRef(tree.expandedState);

useEffect(() => {
  const prevState = prevExpandedStateRef.current;
  const hasChanged = JSON.stringify(tree.expandedState) !== JSON.stringify(prevState);
  
  if (hasChanged) {
    prevExpandedStateRef.current = tree.expandedState;
    // 延迟更新以减少阻塞
    const timeoutId = setTimeout(() => {
      setTreeData(prevData => updateNodeChildren(...));
    }, 0);
    return () => clearTimeout(timeoutId);
  }
}, [tree.expandedState]);
```

### 7. Next.js 配置优化

**文件**: `next.config.mjs`

```javascript
// 性能优化
compress: true,
poweredByHeader: false,

// 优化资源加载
experimental: {
  optimizeCss: true,
},

// 允许 Vercel 优化
server: {
  compress: true,
},
```

---

## 📝 Git 提交记录

```
82e89df perf: 优化 Next.js 配置，提升加载性能
7960f6b perf: 优化 TeamTree 组件，减少内存和不必要渲染
a83244a perf: 为 TeamTree 页面添加 GraphQL 数据缓存
8d06c47 perf: 为页面组件添加区块链请求缓存配置
8d34078 perf: 移除生产环境调试代码，优化性能
fd2fb4a perf: 优化页面切换性能，减少区块链请求
9e7a77a perf: 修复 UserContext useEffect 导致的过度渲染问题
16b8b4a perf: 移除所有 backdrop-filter blur 效果以解决移动端卡顿
```

---

## 🔑 关键优化点总结

1. **CSS 渲染优化**: 移除 GPU 密集型 blur 效果
2. **React 渲染优化**: 修复 Context 过度渲染问题
3. **数据缓存优化**: 
   - QueryClient 提升到模块顶层
   - 增加缓存时间（10分钟 stale，30分钟 gc）
   - 页面组件添加缓存配置
4. **GraphQL 缓存**: TeamTree 添加 10 分钟缓存
5. **构建优化**: Next.js compress 和 optimizeCss
