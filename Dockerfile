# 베이스 이미지
FROM node:18-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# 공통 종속성 설치 스테이지
FROM base AS deps

RUN apk add --no-cache libc6-compat

COPY package.json ./
COPY yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# 패키지 설치 (캐시 최적화)
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "❌ No lock file found!" && exit 1; \
  fi

# 앱 빌드 스테이지
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_TELEMETRY_DISABLED: 빌드 시 익명 데이터 수집 비활성화
ENV NEXT_TELEMETRY_DISABLED=1

# 빌드
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "❌ No lock file found for build!" && exit 1; \
  fi

# 최종 실행 이미지 (최소한의 사이즈)
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs

# 퍼블릭 파일 및 빌드 산출물 복사
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# 실행
CMD ["node", "server.js"]
