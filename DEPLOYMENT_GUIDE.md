# 🚀 Bidify Landing Site - Manual Deployment Guide

## 📋 Overview

This guide provides step-by-step instructions for manually deploying your Bidify landing site using Docker and Traefik. The deployment is production-ready with SSL, security headers, and optimized performance.

## 🔧 Prerequisites

### Server Requirements
- Linux server with Docker and Docker Compose installed
- Domain name (bidify.me) pointing to your server IP
- SSH access to the server

### Required Information
- **ACME Email**: Your email address for Let's Encrypt SSL certificates (required for SSL generation)

## 📁 Server Directory Structure

```
~
├── infra/
│   └── traefik/
│       ├── docker-compose.yml
│       ├── .env.example
│       └── letsencrypt/
│           └── acme.json
└── sites/
    └── bidify/
        ├── docker-compose.yml
        ├── Dockerfile
        ├── nginx.conf
        ├── .env.example
        ├── package.json
        ├── package-lock.json
        ├── public/
        └── src/
```

## 🚀 Deployment Steps

### Step 1: Verify Docker Installation

```bash
# Check Docker installation
docker --version
docker-compose --version

# Verify Docker is running
docker ps
```

### Step 2: Create Docker Network

```bash
# Create the global Docker network for Traefik
docker network create web
```

### Step 3: Set up Infrastructure Directory

```bash
# Create necessary directories
mkdir -p ~/infra/traefik
mkdir -p ~/sites/bidify
mkdir -p ~/logs
```

### Step 4: Configure Traefik Infrastructure

```bash
# Copy Traefik configuration files
cp -r infra/traefik/* ~/infra/traefik/

# Navigate to Traefik directory
cd ~/infra/traefik

# Create environment file
cp .env.example .env

# Edit the .env file with your ACME email
nano .env
```

**Edit `.env` file:**
```bash
# Update with your actual email address
ACME_EMAIL=your-email@example.com

# Optional settings
LOG_LEVEL=INFO
TRAEFIK_DASHBOARD_ENABLED=false
```

### Step 5: Start Traefik

```bash
# Start Traefik services
docker-compose up -d

# Wait for Traefik to start
sleep 10

# Check Traefik status
docker-compose ps

# View Traefik logs
docker-compose logs -f
```

### Step 6: Copy Application Files

```bash
# Copy Bidify application files
cp -r bidify/* ~/sites/bidify/

# Navigate to application directory
cd ~/sites/bidify
```

### Step 7: Configure Application Environment

```bash
# Create environment file
cp .env.example .env

# Edit the .env file with your ACME email
nano .env
```

**Edit `.env` file:**
```bash
# Update with your actual email address
ACME_EMAIL=your-email@example.com

# Optional settings
ANALYTICS_ID=UA-XXXXXXXXX-X
LOG_LEVEL=info
DEBUG_MODE=false
```

### Step 8: Install Dependencies and Build

```bash
# Install npm dependencies
npm install

# Build the React application
npm run build

# Verify build completed successfully
ls -la build/
```

### Step 9: Deploy Application

```bash
# Build and start the application
docker-compose up -d --build

# Wait for containers to start
sleep 15

# Check container status
docker-compose ps
```

### Step 10: Verify Deployment

```bash
# Test HTTP to HTTPS redirect
curl -I http://bidify.me
# Should return 301 redirect to HTTPS

# Test HTTPS access
curl -I https://bidify.me
# Should return 200 OK

# Test health endpoint
curl https://bidify.me/health
# Should return "healthy"

# Test SSL certificate
openssl s_client -connect bidify.me:443 -servername bidify.me </dev/null 2>/dev/null | openssl x509 -noout -dates
```

### Step 11: Monitor and Troubleshoot

```bash
# View application logs
docker-compose logs -f

# View Traefik logs
cd ~/infra/traefik && docker-compose logs -f

# Check container resource usage
docker stats

# Check network connectivity
docker network inspect web
```

## 🔍 Troubleshooting

### Common Issues

**SSL Certificate Issues:**
```bash
# Check Traefik logs for SSL errors
cd ~/infra/traefik && docker-compose logs traefik

# Verify port 80 is accessible
curl http://localhost:80/ping

# Check DNS resolution
dig bidify.me +short
```

**Container Issues:**
```bash
# Restart specific service
docker-compose restart web

# Rebuild and redeploy
docker-compose up -d --build --force-recreate

# Check container details
docker inspect bidify-web
```

**Network Issues:**
```bash
# Verify Docker network
docker network ls
docker network inspect web

# Test connectivity between containers
docker exec -it bidify-web curl http://traefik:80/ping
```

## 📊 Monitoring Commands

### Health Checks
```bash
# Application health
curl https://bidify.me/health

# Container status
docker-compose ps

# Resource usage
docker stats
```

### Log Management
```bash
# Application logs
docker-compose logs -f web

# Traefik logs
cd ~/infra/traefik && docker-compose logs -f traefik

# Access logs (if enabled)
cd ~/infra/traefik && docker-compose logs -f access
```

### Maintenance Commands
```bash
# Update application
git pull
npm install
npm run build
docker-compose up -d --build

# Clean up unused images
docker system prune -f

# Backup deployment
cp -r ~/sites/bidify ~/backups/bidify-$(date +%Y%m%d)
```

## 🌐 URLs to Test

- **Main Site**: https://bidify.me
- **WWW Redirect**: https://www.bidify.me (should redirect to main site)
- **Health Check**: https://bidify.me/health
- **Traefik Dashboard**: http://localhost:8080/dashboard/ (if enabled)

## 🔒 Security Features

Your deployment includes:
- ✅ SSL/TLS encryption with Let's Encrypt
- ✅ HTTP to HTTPS redirects
- ✅ Security headers (CSP, HSTS, XSS protection)
- ✅ Gzip compression
- ✅ Static asset caching
- ✅ Resource limits
- ✅ Health checks

## 📝 Next Steps

1. **Provide your ACME email** for SSL certificate generation
2. **Execute the deployment commands** above
3. **Test the deployed site** at https://bidify.me
4. **Set up monitoring** and regular backups

## 📞 Support

If you encounter issues during deployment:
1. Check the troubleshooting section above
2. Review container logs: `docker-compose logs -f`
3. Verify all configuration files are properly set up
4. Ensure DNS records are pointing to your server

---

**Deployment Complete!** 🎉

Your Bidify landing site should now be live at https://bidify.me with SSL, security headers, and optimized performance.