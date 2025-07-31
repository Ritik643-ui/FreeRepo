# TravelBuddy Frontend Dockerfile
# Multi-stage build for React Expo application

# Base stage with Node.js
FROM node:18-alpine AS base

# Install global dependencies
RUN npm install -g @expo/cli@latest

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Development stage
FROM base AS development

# Install all dependencies (including dev dependencies)
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose ports
EXPOSE 3000 19006

# Set environment
ENV NODE_ENV=development
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:19006 || exit 1

# Start development server
CMD ["npm", "start"]

# Build stage
FROM base AS build

# Install all dependencies for building
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Build the web version
RUN npm run build:web

# Production stage for web
FROM nginx:alpine AS production-web

# Copy built files from build stage
COPY --from=build /app/web-build /usr/share/nginx/html

# Copy nginx configuration
COPY infrastructure/nginx/nginx.conf /etc/nginx/nginx.conf

# Create non-root user
RUN addgroup -g 1001 -S nginx && \
    adduser -S nginx -u 1001 -G nginx

# Change ownership
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# Switch to non-root user
USER nginx

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# Production stage for Node.js server (if needed for SSR)
FROM base AS production-node

# Copy built application
COPY --from=build /app .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# Start the application
CMD ["npm", "start"]

# Mobile build stage (for creating APK/IPA)
FROM base AS mobile-build

# Install additional dependencies for mobile builds
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++

# Install EAS CLI
RUN npm install -g @expo/eas-cli

# Copy source code
COPY . .

# Install dependencies
RUN npm ci

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# This stage is used for building mobile apps
# Actual build commands would be run via CI/CD pipeline
CMD ["echo", "Mobile build stage ready. Use EAS CLI to build mobile apps."]

