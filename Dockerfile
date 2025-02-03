# Builder stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install required system dependencies
RUN apk add --no-cache ca-certificates fontconfig

# Environment variables
ARG NEXT_PUBLIC_WORDPRESS_URL
ARG FAUST_SECRET_KEY
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_SITE_DIRECTION
ARG NEXT_PUBLIC_SITE_GEAR_ICON
ARG NEXT_PUBLIC_SITE_API_METHOD

ENV NEXT_PUBLIC_WORDPRESS_URL=$NEXT_PUBLIC_WORDPRESS_URL \
    FAUST_SECRET_KEY=$FAUST_SECRET_KEY \
    NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL \
    NEXT_PUBLIC_SITE_DIRECTION=$NEXT_PUBLIC_SITE_DIRECTION \
    NEXT_PUBLIC_SITE_GEAR_ICON=$NEXT_PUBLIC_SITE_GEAR_ICON \
    NEXT_PUBLIC_SITE_API_METHOD=$NEXT_PUBLIC_SITE_API_METHOD \
    NODE_ENV=production

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Generate types and build
RUN npm run generate && npm run build

# Runner stage
FROM node:20-alpine AS runner
WORKDIR /app

# Environment variables for runtime
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME="0.0.0.0" \
    NEXT_TELEMETRY_DISABLED=1

# Copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the application
CMD ["npm", "start"]