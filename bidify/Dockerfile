# Multi-stage build for optimized React static site deployment
FROM node:18-alpine AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm ci --only=production --ignore-scripts

# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./

# Copy source code
COPY src/ ./src/
COPY public/ ./public/

# Build the React app
RUN npm run build

# Production stage - Nginx server
FROM nginx:alpine AS production

# Install curl for health checks
RUN apk add --no-cache curl

# Copy built React app
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]