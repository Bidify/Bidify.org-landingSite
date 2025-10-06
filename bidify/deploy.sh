#!/bin/bash

# Bidify Landing Site Deployment Script
# This script automates the deployment process for the Bidify landing site

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="bidify"
DEPLOY_DIR="$HOME/sites/$PROJECT_NAME"
BACKUP_DIR="$HOME/backups/$PROJECT_NAME"
LOG_FILE="$HOME/logs/deploy-$(date +%Y%m%d_%H%M%S).log"

# Logging function
log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')] $1${NC}" | tee -a "$LOG_FILE"
}

log_success() {
    echo -e "${GREEN}✓ $1${NC}" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}✗ $1${NC}" | tee -a "$LOG_FILE"
}

log_warning() {
    echo -e "${YELLOW}⚠ $1${NC}" | tee -a "$LOG_FILE"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   log_error "This script should not be run as root"
   exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    log_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    log_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if deployment directory exists
if [[ ! -d "$DEPLOY_DIR" ]]; then
    log_error "Deployment directory not found: $DEPLOY_DIR"
    log "Please ensure the React source code is copied to $DEPLOY_DIR"
    exit 1
fi

# Change to deployment directory
cd "$DEPLOY_DIR"
log "Changed to deployment directory: $DEPLOY_DIR"

# Check if required files exist
required_files=("Dockerfile" "docker-compose.yml" "nginx.conf" "package.json")
for file in "${required_files[@]}"; do
    if [[ ! -f "$file" ]]; then
        log_error "Required file not found: $file"
        exit 1
    fi
done

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup existing deployment
if [[ -d "$DEPLOY_DIR/build" ]]; then
    log "Creating backup of existing build..."
    cp -r "$DEPLOY_DIR/build" "$BACKUP_DIR/build-$(date +%Y%m%d_%H%M%S)"
    log_success "Backup created"
fi

# Check if .env exists
if [[ ! -f ".env" ]]; then
    log_warning ".env file not found. Creating from template..."
    if [[ -f ".env.example" ]]; then
        cp .env.example .env
        log_success ".env created from template"
        log_warning "Please update .env with your ACME email and other configuration"
    else
        log_error ".env.example not found. Cannot create .env file"
        exit 1
    fi
fi

# Install dependencies if node_modules doesn't exist
if [[ ! -d "node_modules" ]]; then
    log "Installing npm dependencies..."
    npm install
    if [[ $? -eq 0 ]]; then
        log_success "Dependencies installed successfully"
    else
        log_error "Failed to install dependencies"
        exit 1
    fi
else
    log "Dependencies already installed. Running update..."
    npm update
    log_success "Dependencies updated"
fi

# Build the React app
log "Building React application..."
npm run build
if [[ $? -eq 0 ]]; then
    log_success "React application built successfully"
else
    log_error "Failed to build React application"
    exit 1
fi

# Stop existing containers
log "Stopping existing containers..."
docker-compose down --remove-orphans 2>/dev/null || true

# Build and start new containers
log "Building and starting new containers..."
docker-compose up -d --build

# Wait for containers to start
log "Waiting for containers to start..."
sleep 10

# Check container status
log "Checking container status..."
docker-compose ps

# Verify deployment
log "Verifying deployment..."
sleep 5

# Test HTTP to HTTPS redirect
log "Testing HTTP to HTTPS redirect..."
http_redirect=$(curl -s -o /dev/null -w "%{http_code}" http://bidify.me)
if [[ "$http_redirect" == "301" ]]; then
    log_success "HTTP to HTTPS redirect working"
else
    log_warning "HTTP to HTTPS redirect may not be working (status: $http_redirect)"
fi

# Test HTTPS access
log "Testing HTTPS access..."
https_status=$(curl -s -o /dev/null -w "%{http_code}" https://bidify.me)
if [[ "$https_status" == "200" ]]; then
    log_success "HTTPS access working"
else
    log_error "HTTPS access failed (status: $https_status)"
fi

# Test health endpoint
log "Testing health endpoint..."
health_status=$(curl -s -o /dev/null -w "%{http_code}" https://bidify.me/health)
if [[ "$health_status" == "200" ]]; then
    log_success "Health endpoint working"
else
    log_warning "Health endpoint may not be working (status: $health_status)"
fi

# Check SSL certificate
log "Checking SSL certificate..."
if openssl s_client -connect bidify.me:443 -servername bidify.me </dev/null 2>/dev/null | openssl x509 -noout -checkend 86400; then
    log_success "SSL certificate is valid"
else
    log_warning "SSL certificate may be expired or invalid"
fi

# Clean up unused Docker images
log "Cleaning up unused Docker images..."
docker system prune -f
log_success "Cleanup completed"

# Display deployment summary
echo ""
echo "=========================================="
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo "=========================================="
echo ""
echo "📍 Site URL: https://bidify.me"
echo "📊 Health Check: https://bidify.me/health"
echo "📋 Container Status: docker-compose ps"
echo "📄 Logs: docker-compose logs -f"
echo "🔧 Configuration: $DEPLOY_DIR"
echo ""
echo "📁 Backup location: $BACKUP_DIR"
echo "📄 Deployment log: $LOG_FILE"
echo ""
echo "🔗 Useful Commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Restart: docker-compose restart"
echo "  - Stop: docker-compose down"
echo "  - Update: docker-compose pull && docker-compose up -d"
echo ""
echo "⚠️  Next Steps:"
echo "  1. Verify site functionality in browser"
echo "  2. Update .env with your ACME email if not done"
echo "  3. Set up monitoring and backups"
echo "  4. Configure DNS if not already done"
echo ""

# Exit successfully
exit 0