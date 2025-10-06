#!/bin/bash

# Bidify Landing Site Rollback Script
# This script rolls back to the previous deployment version

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
LOG_FILE="$HOME/logs/rollback-$(date +%Y%m%d_%H%M%S).log"

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
    exit 1
fi

# Change to deployment directory
cd "$DEPLOY_DIR"
log "Changed to deployment directory: $DEPLOY_DIR"

# Check if backup directory exists
if [[ ! -d "$BACKUP_DIR" ]]; then
    log_error "Backup directory not found: $BACKUP_DIR"
    log "No backups available for rollback"
    exit 1
fi

# Find the most recent backup
LATEST_BACKUP=$(ls -t "$BACKUP_DIR" | head -n 1)

if [[ -z "$LATEST_BACKUP" ]]; then
    log_error "No backups found in $BACKUP_DIR"
    exit 1
fi

BACKUP_PATH="$BACKUP_DIR/$LATEST_BACKUP"

log "Found latest backup: $LATEST_BACKUP"
log "Backup path: $BACKUP_PATH"

# Stop current containers
log "Stopping current containers..."
docker-compose down --remove-orphans

# Create backup of current deployment before rollback
CURRENT_BACKUP="$BACKUP_DIR/current-before-rollback-$(date +%Y%m%d_%H%M%S)"
if [[ -d "$DEPLOY_DIR/build" ]]; then
    log "Creating backup of current deployment before rollback..."
    cp -r "$DEPLOY_DIR/build" "$CURRENT_BACKUP"
    log_success "Current deployment backed up to: $CURRENT_BACKUP"
fi

# Restore from backup
log "Restoring from backup: $BACKUP_PATH"
if [[ -d "$BACKUP_PATH/build" ]]; then
    cp -r "$BACKUP_PATH/build" "$DEPLOY_DIR/"
    log_success "Build files restored successfully"
else
    log_error "Build files not found in backup: $BACKUP_PATH"
    exit 1
fi

# Start containers with restored build
log "Starting containers with restored build..."
docker-compose up -d

# Wait for containers to start
log "Waiting for containers to start..."
sleep 10

# Check container status
log "Checking container status..."
docker-compose ps

# Verify deployment
log "Verifying deployment..."
sleep 5

# Test HTTPS access
log "Testing HTTPS access..."
https_status=$(curl -s -o /dev/null -w "%{http_code}" https://bidify.me)
if [[ "$https_status" == "200" ]]; then
    log_success "HTTPS access working after rollback"
else
    log_error "HTTPS access failed after rollback (status: $https_status)"
fi

# Test health endpoint
log "Testing health endpoint..."
health_status=$(curl -s -o /dev/null -w "%{http_code}" https://bidify.me/health)
if [[ "$health_status" == "200" ]]; then
    log_success "Health endpoint working after rollback"
else
    log_warning "Health endpoint may not be working after rollback (status: $health_status)"
fi

# Display rollback summary
echo ""
echo "=========================================="
echo -e "${GREEN}🔄 Rollback completed successfully!${NC}"
echo "=========================================="
echo ""
echo "📍 Site URL: https://bidify.me"
echo "📊 Health Check: https://bidify.me/health"
echo "📋 Container Status: docker-compose ps"
echo "📄 Logs: docker-compose logs -f"
echo ""
echo "📁 Backup restored from: $BACKUP_PATH"
echo "📄 Current backup location: $CURRENT_BACKUP"
echo "📄 Rollback log: $LOG_FILE"
echo ""
echo "🔗 Useful Commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Restart: docker-compose restart"
echo "  - Stop: docker-compose down"
echo ""
echo "⚠️  Next Steps:"
echo "  1. Verify site functionality in browser"
echo "  2. Check if rollback resolved the issue"
echo "  3. Investigate the cause of the previous deployment failure"
echo ""

# Exit successfully
exit 0