#!/bin/bash

# Bidify Landing Site Complete Setup Script
# This script sets up the entire infrastructure for hosting bidify.me

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="bidify"
INFRA_DIR="$HOME/infra"
TRAEFIK_DIR="$INFRA_DIR/traefik"
SITES_DIR="$HOME/sites"
BIDIFY_DIR="$SITES_DIR/$PROJECT_NAME"
BACKUP_DIR="$HOME/backups"
LOG_DIR="$HOME/logs"
LOG_FILE="$LOG_DIR/setup-$(date +%Y%m%d_%H%M%S).log"

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

# Create necessary directories
log "Creating necessary directories..."
mkdir -p "$INFRA_DIR"
mkdir -p "$TRAEFIK_DIR"
mkdir -p "$SITES_DIR"
mkdir -p "$BACKUP_DIR"
mkdir -p "$LOG_DIR"
log_success "Directories created"

# Setup Traefik infrastructure
log "Setting up Traefik infrastructure..."
cd "$TRAEFIK_DIR"

# Check if docker-compose.yml exists
if [[ ! -f "docker-compose.yml" ]]; then
    log_error "Traefik docker-compose.yml not found. Please copy it to $TRAEFIK_DIR"
    exit 1
fi

# Check if .env exists
if [[ ! -f ".env" ]]; then
    if [[ -f ".env.example" ]]; then
        cp .env.example .env
        log_warning ".env file created from template. Please update it with your ACME email."
    else
        log_error ".env.example not found. Cannot create .env file"
        exit 1
    fi
fi

# Create Docker network if it doesn't exist
log "Creating Docker network..."
docker network create web 2>/dev/null || true
log_success "Docker network created"

# Start Traefik
log "Starting Traefik..."
docker-compose up -d
sleep 10

# Check Traefik status
if docker-compose ps | grep -q "traefik.*Up"; then
    log_success "Traefik started successfully"
else
    log_error "Traefik failed to start"
    docker-compose logs traefik
    exit 1
fi

# Setup Bidify site directory
log "Setting up Bidify site directory..."
cd "$SITES_DIR"

# Create bidify directory if it doesn't exist
if [[ ! -d "$PROJECT_NAME" ]]; then
    mkdir -p "$PROJECT_NAME"
    log_success "Bidify directory created"
fi

# Copy deployment files to bidify directory
log "Copying deployment files to bidify directory..."
cd "$PROJECT_NAME"

# Check if required files exist and copy them
required_files=("Dockerfile" "docker-compose.yml" "nginx.conf" "package.json")
for file in "${required_files[@]}"; do
    if [[ ! -f "$file" ]]; then
        log_warning "Required file not found: $file. Please copy it manually."
    else
        log_success "Found required file: $file"
    fi
done

# Copy React source code if not present
if [[ ! -d "src" ]]; then
    log_warning "React source code not found. Please copy your React app source code to $BIDIFY_DIR"
fi

# Create .env if not present
if [[ ! -f ".env" ]]; then
    if [[ -f ".env.example" ]]; then
        cp .env.example .env
        log_warning ".env file created from template. Please update it with your ACME email."
    else
        log_error ".env.example not found. Cannot create .env file"
        exit 1
    fi
fi

# Make scripts executable
chmod +x deploy.sh rollback.sh 2>/dev/null || true

# Verify setup
log "Verifying setup..."

# Check if Docker network exists
if docker network ls | grep -q "web"; then
    log_success "Docker network 'web' exists"
else
    log_error "Docker network 'web' not found"
    exit 1
fi

# Check if Traefik is accessible
if curl -s http://localhost:80/ping > /dev/null; then
    log_success "Traefik health check passed"
else
    log_warning "Traefik health check failed"
fi

# Display setup summary
echo ""
echo "=========================================="
echo -e "${GREEN}🎉 Setup completed successfully!${NC}"
echo "=========================================="
echo ""
echo "📁 Directory Structure:"
echo "  - Infrastructure: $INFRA_DIR"
echo "  - Traefik: $TRAEFIK_DIR"
echo "  - Sites: $SITES_DIR"
echo "  - Bidify: $BIDIFY_DIR"
echo "  - Backups: $BACKUP_DIR"
echo "  - Logs: $LOG_DIR"
echo ""
echo "🔧 Configuration Files:"
echo "  - Traefik: $TRAEFIK_DIR/docker-compose.yml"
echo "  - Bidify: $BIDIFY_DIR/docker-compose.yml"
echo "  - Environment: $BIDIFY_DIR/.env"
echo ""
echo "🚀 Next Steps:"
echo "  1. Update $TRAEFIK_DIR/.env with your ACME email"
echo "  2. Update $BIDIFY_DIR/.env with your configuration"
echo "  3. Copy your React source code to $BIDIFY_DIR"
echo "  4. Set up DNS records for bidify.me and www.bidify.me"
echo "  5. Run deployment: cd $BIDIFY_DIR && ./deploy.sh"
echo ""
echo "📋 Useful Commands:"
echo "  - Deploy: cd $BIDIFY_DIR && ./deploy.sh"
echo "  - Rollback: cd $BIDIFY_DIR && ./rollback.sh"
echo "  - View logs: cd $TRAEFIK_DIR && docker-compose logs -f"
echo "  - Check status: cd $TRAEFIK_DIR && docker-compose ps"
echo ""
echo "🔗 URLs:"
echo "  - Bidify Site: https://bidify.me"
echo "  - Traefik Dashboard: http://localhost:8080/dashboard/ (if enabled)"
echo ""
echo "⚠️  Important Notes:"
echo "  - Please update .env files with your ACME email before deployment"
echo "  - Ensure DNS records are pointing to your server IP"
echo "  - Test the deployment thoroughly before going live"
echo ""
echo "📄 Setup log: $LOG_FILE"
echo ""

# Exit successfully
exit 0