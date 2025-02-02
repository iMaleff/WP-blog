# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Declare and set build arguments
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
    NEXT_PUBLIC_SITE_API_METHOD=$NEXT_PUBLIC_SITE_API_METHOD

# Install dependencies
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy source
COPY . .

# Build with cache
RUN --mount=type=cache,target=/app/.next/cache \
    npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Copy built files
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Runtime environment variables
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the app
CMD ["node", "server.js"]
