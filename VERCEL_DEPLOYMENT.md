# Vercel 部署配置指南

## 环境变量配置

在 Vercel 部署时，需要配置以下环境变量以确保使用正确的合约地址。

### 必需的环境变量

在 Vercel 项目设置中添加以下环境变量：

#### 合约地址（BSC Testnet）
```
NEXT_PUBLIC_PHONE_DISTRIBUTION=0x59fEbf632f1E22227f8daDe303438d9A4BbE0548
NEXT_PUBLIC_NEXTFLOW_TOKEN=0x464c9503d58b37fb673C47AD056a1a0e8e70555b
NEXT_PUBLIC_TOKEN_POOL=0x5494C5aD0d1d8Ab988caF13dc559711299f0628B
NEXT_PUBLIC_USDT=0x337610d27c682E347C9cD60BD4b3b107C9d34dDd
```

#### 默认推荐人地址
```
NEXT_PUBLIC_DEFAULT_REFERRER=0xA71EC938e19d1809f34788af6354eccD1B8246fc
```

#### TheGraph 配置
```
NEXT_PUBLIC_THEGRAPH_DEV_API_URL=https://api.studio.thegraph.com/query/1744394/nextflow-subgraph/version/latest
NEXT_PUBLIC_ENABLE_TESTNETS=true
```

#### RPC 节点
```
NEXT_PUBLIC_BSC_TESTNET_RPC=https://data-seed-prebsc-1-s1.bnbchain.org:8545
```

## 配置步骤

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 进入 **Settings** → **Environment Variables**
4. 添加上述所有环境变量
5. 确保环境变量应用到 **Production**, **Preview**, 和 **Development** 环境
6. 重新部署项目以应用新的环境变量

## 构建流程

项目的构建脚本已配置为在构建前自动生成 wagmi 配置：

```json
"build": "wagmi generate && next build"
```

这确保了：
1. 在构建时，`wagmi generate` 会读取 Vercel 的环境变量
2. 生成的 `wagmi/generated.ts` 会包含正确的合约地址
3. Next.js 构建会使用最新生成的配置

## 本地开发

本地开发时，复制 `.env.example` 到 `.env.local` 并配置相应的环境变量：

```bash
cp .env.example .env.local
```

然后编辑 `.env.local` 文件，填入你的配置。

## 验证部署

部署后，可以通过以下方式验证合约地址是否正确：

1. 打开浏览器开发者工具
2. 在控制台中运行：
```javascript
console.log(process.env.NEXT_PUBLIC_TOKEN_POOL)
```
3. 确认输出的地址与配置的环境变量一致

## 注意事项

- ⚠️ 所有以 `NEXT_PUBLIC_` 开头的环境变量会被打包到客户端代码中
- ⚠️ 修改环境变量后需要重新部署才能生效
- ⚠️ 不要将 `.env.local` 提交到 Git 仓库
- ✅ 使用 `.env.example` 作为环境变量模板
- ✅ 在 Vercel 中为不同环境（Production/Preview/Development）配置相应的地址
