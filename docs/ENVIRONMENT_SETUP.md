# 环境变量配置说明

## 概述

本项目使用环境变量来配置合约地址，确保在不同环境（本地开发、测试、生产）中使用正确的合约地址。

## 配置流程

### 1. 本地开发配置

复制 `.env.example` 到 `.env.local`：

```bash
cp .env.example .env.local
```

然后根据实际情况修改 `.env.local` 中的配置。

### 2. 环境变量说明

#### 必需的合约地址配置

```bash
# PhoneDistribution 合约地址
NEXT_PUBLIC_PHONE_DISTRIBUTION=0x59fEbf632f1E22227f8daDe303438d9A4BbE0548

# NextflowToken 合约地址
NEXT_PUBLIC_NEXTFLOW_TOKEN=0x464c9503d58b37fb673C47AD056a1a0e8e70555b

# TokenPool 合约地址
NEXT_PUBLIC_TOKEN_POOL=0x5494C5aD0d1d8Ab988caF13dc559711299f0628B

# USDT 合约地址
NEXT_PUBLIC_USDT=0x337610d27c682E347C9cD60BD4b3b107C9d34dDd

# 默认推荐人地址
NEXT_PUBLIC_DEFAULT_REFERRER=0xA71EC938e19d1809f34788af6354eccD1B8246fc
```

#### TheGraph 配置

```bash
# 测试网 API URL
NEXT_PUBLIC_THEGRAPH_DEV_API_URL=https://api.studio.thegraph.com/query/1744394/nextflow-subgraph/version/latest

# 是否启用测试网
NEXT_PUBLIC_ENABLE_TESTNETS=true
```

#### RPC 节点配置

```bash
# BSC 测试网 RPC
NEXT_PUBLIC_BSC_TESTNET_RPC=https://data-seed-prebsc-1-s1.bnbchain.org:8545
```

## 工作原理

### 1. wagmi.config.ts

`wagmi.config.ts` 文件从环境变量读取合约地址：

```typescript
const addresses = {
  [bscTestnet.id]: {
    "pool": process.env.NEXT_PUBLIC_PHONE_DISTRIBUTION,
    "usdt": process.env.NEXT_PUBLIC_USDT,
    "token": process.env.NEXT_PUBLIC_NEXTFLOW_TOKEN,
    "tokenPool": process.env.NEXT_PUBLIC_TOKEN_POOL,
  }
};
```

### 2. 构建流程

在构建时，会自动执行 `wagmi generate` 命令：

```json
"build": "wagmi generate && next build"
```

这会：
1. 读取环境变量中的合约地址
2. 生成 `wagmi/generated.ts` 文件，包含正确的地址
3. 执行 Next.js 构建

### 3. 部署到 Vercel

在 Vercel 中配置环境变量后：
1. Vercel 会在构建时注入这些环境变量
2. `wagmi generate` 会使用 Vercel 的环境变量
3. 生成的代码会包含正确的合约地址

## 验证配置

### 本地验证

运行以下命令生成 wagmi 配置：

```bash
npm run wagmi:generate
```

检查 `wagmi/generated.ts` 中的地址是否正确。

### 部署后验证

在浏览器控制台中运行：

```javascript
// 检查环境变量
console.log({
  tokenPool: process.env.NEXT_PUBLIC_TOKEN_POOL,
  phoneDistribution: process.env.NEXT_PUBLIC_PHONE_DISTRIBUTION,
  token: process.env.NEXT_PUBLIC_NEXTFLOW_TOKEN,
  usdt: process.env.NEXT_PUBLIC_USDT
});
```

## 注意事项

⚠️ **重要提示**：

1. **不要提交 `.env.local`** - 此文件包含本地配置，已在 `.gitignore` 中
2. **使用 `.env.example` 作为模板** - 这是环境变量的参考模板
3. **环境变量必须以 `NEXT_PUBLIC_` 开头** - 才能在客户端代码中访问
4. **修改环境变量后需要重新构建** - 环境变量在构建时被打包
5. **Vercel 环境变量需要手动配置** - 参考 `VERCEL_DEPLOYMENT.md`

## 常见问题

### Q: 为什么页面显示的地址不对？

A: 可能原因：
1. 环境变量未配置或配置错误
2. 修改环境变量后未重新构建
3. Vercel 环境变量未配置

解决方法：
1. 检查 `.env.local` 文件
2. 运行 `npm run wagmi:generate` 重新生成
3. 重新构建项目

### Q: 如何切换到主网地址？

A: 修改环境变量中的合约地址，并设置：
```bash
NEXT_PUBLIC_ENABLE_TESTNETS=false
```

然后重新构建项目。

### Q: addresses.json 文件还有用吗？

A: `addresses.json` 已被环境变量配置取代，建议保持更新但不再作为主要配置来源。

## 相关文件

- `.env.example` - 环境变量模板
- `.env.local` - 本地环境变量（不提交到 Git）
- `wagmi.config.ts` - wagmi 配置文件
- `wagmi/generated.ts` - 自动生成的 wagmi hooks（不要手动修改）
- `VERCEL_DEPLOYMENT.md` - Vercel 部署指南
