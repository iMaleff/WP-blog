# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Declare all build arguments
ARG NEXT_PUBLIC_WORDPRESS_URL
ARG FAUST_SECRET_KEY
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_SITE_DIRECTION
ARG NEXT_PUBLIC_SITE_GEAR_ICON
ARG NEXT_PUBLIC_SITE_API_METHOD

# Set environment variables from build arguments
ENV NEXT_PUBLIC_WORDPRESS_URL=$NEXT_PUBLIC_WORDPRESS_URL
ENV FAUST_SECRET_KEY=$FAUST_SECRET_KEY
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_SITE_DIRECTION=$NEXT_PUBLIC_SITE_DIRECTION
ENV NEXT_PUBLIC_SITE_GEAR_ICON=$NEXT_PUBLIC_SITE_GEAR_ICON
ENV NEXT_PUBLIC_SITE_API_METHOD=$NEXT_PUBLIC_SITE_API_METHOD

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build

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