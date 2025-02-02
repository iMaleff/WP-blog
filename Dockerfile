# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install required SSL certificates and fonts
RUN apk add --no-cache ca-certificates fontconfig

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
RUN npm ci

# Copy source
COPY . .

# Generate types and build
RUN npm run generate && npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

# Copy package.json and install production dependencies
COPY package*.json ./
RUN npm ci --production

# Copy built files
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Start the app
CMD ["npm", "start"]