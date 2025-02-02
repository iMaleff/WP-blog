# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install required SSL certificates and curl for testing
RUN apk add --no-cache ca-certificates curl openssl

# Declare and set build arguments
ARG NEXT_PUBLIC_WORDPRESS_URL
ARG FAUST_SECRET_KEY
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_SITE_DIRECTION
ARG NEXT_PUBLIC_SITE_GEAR_ICON
ARG NEXT_PUBLIC_SITE_API_METHOD

# Set environment variables
ENV NEXT_PUBLIC_WORDPRESS_URL=$NEXT_PUBLIC_WORDPRESS_URL \
    FAUST_SECRET_KEY=$FAUST_SECRET_KEY \
    NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL \
    NEXT_PUBLIC_SITE_DIRECTION=$NEXT_PUBLIC_SITE_DIRECTION \
    NEXT_PUBLIC_SITE_GEAR_ICON=$NEXT_PUBLIC_SITE_GEAR_ICON \
    NEXT_PUBLIC_SITE_API_METHOD=$NEXT_PUBLIC_SITE_API_METHOD \
    NODE_TLS_REJECT_UNAUTHORIZED=0 \
    NODE_OPTIONS=--tls-min-v1.0

# Test WordPress connection
RUN curl -v $NEXT_PUBLIC_WORDPRESS_URL/graphql || true

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Create pages directory and move files
RUN mkdir -p pages && \
    cp -r src/pages/* pages/ && \
    npm run generate && \
    npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

# Copy built files
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Start the app
CMD ["node", "server.js"]