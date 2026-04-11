# Multi-stage build za Next.js standalone mode
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# --- Dependencies faza ---
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

# --- Builder faza ---
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json* ./
COPY . .

ARG NODE_OPTIONS="--max-old-space-size=2048"
ENV NODE_OPTIONS=$NODE_OPTIONS
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# --- Production faza (standalone) ---
FROM node:22-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Standalone build sadrži sve dependencies unutar sebe
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# standalone generira server.js u root direktoriju
CMD ["node", "server.js"]
