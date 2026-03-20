import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message?: string
  registered?: boolean
}

type APIError = {
  message: string
}

const baseUrl = process.env.FF_BASE_URL;
const token = process.env.FF_TOKEN;

/**
 * 验证 Solana 地址格式
 */
function isValidSolanaAddress(address: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | APIError>
) {
  try {
    // 只处理 GET 请求 - 检查 Solana 地址是否已注册
    if (req.method === 'GET') {
      const { solanaAddress } = req.query;

      // 验证参数
      if (!solanaAddress || typeof solanaAddress !== 'string') {
        return res.status(400).json({ message: '缺少 solanaAddress 参数' });
      }

      if (!isValidSolanaAddress(solanaAddress)) {
        return res.status(400).json({ message: '无效的 Solana 地址格式' });
      }

      // 检查 Solana 地址是否已注册
      const apiUrl = `${baseUrl}/user/user?wallet_address=${solanaAddress}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status}`);
      }

      const data = await response.json();
      return res.status(200).json({
        registered: !!data.user
      });
    }

    // 不支持的方法
    return res.status(405).json({ message: '不支持的请求方法' });
  } catch (error: any) {
    console.error('API 请求错误:', error);
    return res.status(500).json({ message: error.message || '处理请求时发生未知错误' });
  }
}