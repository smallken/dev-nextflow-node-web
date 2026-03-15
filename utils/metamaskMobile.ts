/**
 * MetaMask移动端连接辅助函数
 * 用于Android Chrome/iOS Safari中直接唤醒MetaMask app
 */

/**
 * 检测是否为移动设备
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

/**
 * 获取MetaMask的Universal Link (用于iOS)
 * @param dappUrl DApp的URL
 */
export function getMetaMaskUniversalLink(dappUrl: string): string {
  return `https://metamask.app.link/dapp/${dappUrl}`;
}

/**
 * 获取MetaMask的Deep Link (用于Android)
 * @param dappUrl DApp的URL
 */
export function getMetaMaskDeepLink(dappUrl: string): string {
  return `metamask://dapp/${dappUrl}`;
}

/**
 * 打开MetaMask app (移动端)
 * 会根据平台自动选择Universal Link或Deep Link
 */
export function openMetaMaskApp(): void {
  if (typeof window === 'undefined') return;

  const currentUrl = window.location.href;

  // iOS使用Universal Link
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  // Android使用Deep Link
  const isAndroid = /Android/i.test(navigator.userAgent);

  let metamaskUrl: string;

  if (isIOS) {
    // iOS使用Universal Link
    metamaskUrl = getMetaMaskUniversalLink(currentUrl);
  } else if (isAndroid) {
    // Android使用Deep Link
    metamaskUrl = getMetaMaskDeepLink(currentUrl);
  } else {
    // 桌面端，跳转到MetaMask网站
    metamaskUrl = 'https://metamask.io/download/';
  }

  // 打开MetaMask
  window.location.href = metamaskUrl;
}

/**
 * 在新窗口打开MetaMask
 */
export function openMetaMaskInNewTab(): void {
  if (typeof window === 'undefined') return;

  const currentUrl = window.location.href;
  const metamaskUrl = getMetaMaskUniversalLink(currentUrl);

  window.open(metamaskUrl, '_blank');
}
