// next.config.js

const { config } = require("dotenv");
const { resolve } = require("path");

// dotenv의 config 메서드를 사용하여 .env 파일 로드
config({ path: resolve(__dirname, ".env.local") });

module.exports = {
  // Next.js 환경 변수 설정
  env: {
    REACT_APP_API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  },
  output: "standalone",
};
