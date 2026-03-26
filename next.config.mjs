import bundleAnalyzer from '@next/bundle-analyzer';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Read package.json using fs
const packageInfo = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
);

// Get the Git commit hash at build time
const getGitCommitHash = () => {
  try {
    return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim().substring(0, 7);
  } catch (error) {
    console.error('Error getting Git commit hash:', error);
    return 'unknown';
  }
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // i18n is handled by react-i18next, not Next.js built-in i18n
  devIndicators: false,

  // 性能优化
  compress: true,
  poweredByHeader: false,

  // Make version info available as environment variables
  env: {
    APP_VERSION: packageInfo.version,
    GIT_COMMIT_HASH: getGitCommitHash()
  },

  // 模块化图标导入 - 只导入使用的图标，不打包整个库
  modularizeImports: {
    '@tabler/icons-react': {
      transform: '@tabler/icons-react/dist/esm/icons/{{member}}',
      skipDefaultConversion: true,
    },
  },
});
