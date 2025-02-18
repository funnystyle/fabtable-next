// next.config.js

const { config } = require("dotenv");
const { resolve } = require("path");

// dotenv의 config 메서드를 사용하여 .env 파일 로드
config({ path: resolve(__dirname, ".env.local") });

module.exports = {
  // Next.js 환경 변수 설정
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  output: "standalone",
  transpilePackages: [ "antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table" ], // https://github.com/ant-design/ant-design/issues/46053
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'], // https://nextjs.org/docs/pages/api-reference/config/next-config-js/pageExtensions
  i18n: require('./next-i18next.config.js').i18n,
  reactStrictMode: true,
  swcMinify: true,
};
