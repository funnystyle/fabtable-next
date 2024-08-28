# Base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /usr/src/app

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Increase the timeout for npm

RUN npm config set fetch-retry-maxtimeout 60000

# Use a different npm registry (optional)

RUN npm config set registry https://registry.npmjs.org/

# Update npm to the latest version

RUN npm install -g npm@latest

# Install dependencies

RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /usr/src/app

# Set environment to production
ENV NODE_ENV=production

# Add user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the build artifacts
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/package-lock.json ./

# Set the user
USER nextjs

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
