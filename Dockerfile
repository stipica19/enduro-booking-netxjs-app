# Multi-stage build za Next.js
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# --- Dependencies faza ---
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# --- Builder faza ---
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json* ./
COPY . .

ARG NODE_OPTIONS="--max-old-space-size=2048"
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ARG NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

ENV NODE_OPTIONS=$NODE_OPTIONS
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBOPACK=0
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ENV NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=$NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

RUN npm run build

# --- Production faza ---
FROM node:22-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

CMD ["node_modules/.bin/next", "start"]
