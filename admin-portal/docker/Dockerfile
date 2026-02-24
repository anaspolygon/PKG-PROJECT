############################################
# Stage 1: Dependencies
############################################
FROM node:20-slim AS deps
WORKDIR /app

ARG BUILD=production

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./

RUN if [ "$BUILD" = "production" ]; then \
      npm ci --include=optional && npm cache clean --force; \
    else \
      npm ci --include=optional && npm cache clean --force; \
    fi


############################################
# Stage 2: Builder
############################################
FROM node:20-slim AS builder
WORKDIR /app

ENV NODE_ENV=production

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


############################################
# Stage 3: Production (matches your --target production)
############################################
FROM node:20-slim AS production
WORKDIR /opt/app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs \
  && adduser  --system --uid 1001 nextjs

COPY --chown=nextjs:nodejs --from=builder /app/.next/standalone ./
COPY --chown=nextjs:nodejs --from=builder /app/.next/static ./.next/static
COPY --chown=nextjs:nodejs --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "const http=require('http'); const req=http.get('http://127.0.0.1:3000',res=>process.exit(res.statusCode===200?0:1)); req.on('error',()=>process.exit(1)); req.setTimeout(5000,()=>{req.destroy();process.exit(1)});"

CMD ["node", "server.js"]

############################################
# Stage 3: Development
############################################
# Stage 2: Development Environment
FROM deps AS development
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

