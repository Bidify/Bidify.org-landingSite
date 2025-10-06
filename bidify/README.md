# Bidify Landing Site Deployment

This is the deployment configuration for the Bidify landing site hosted at `https://bidify.me`.

## 🚀 Quick Start

### Prerequisites
- Linux VPS with Docker and Docker Compose v2 installed
- Domain `bidify.me` pointed to your server IP
- ACME email for Let's Encrypt certificates

### 1. Setup Infrastructure
```bash
# Create global Docker network
docker network create web 2>/dev/null || true

# Setup Traefik (one-time setup)
mkdir -p ~/infra/traefik
cd ~/infra/traefik
# Create docker-compose.yml from contabo.md reference
docker compose up -d
```

### 2. Deploy Bidify Site
```bash
# Create deployment directory
mkdir -p ~/sites/bidify
cd ~/sites/bidify

# Copy deployment files
# (Place Dockerfile, docker-compose.yml, nginx.conf, .env.example here)

# Copy React source code from your project
# (Copy your React app source code here)

# Build and deploy
docker compose up -d --build
```

## 📁 Directory Structure

```
~
├─ infra/
│  └─ traefik/
│     ├─ docker-compose.yml
│     └─ letsencrypt/acme.json
└─ sites/
   └─ bidify/
      ├─ docker-compose.yml
      ├─ .env                # not committed
      ├─ Dockerfile
      ├─ nginx.conf
      ├─ .env.example
      ├─ .gitignore
      ├─ README.md
      ├─ package.json
      ├─ package-lock.json
      └─ src/                 # React source code
```

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env` and update:
```bash
cp .env.example .env
# Edit .env with your ACME email
```

### Required DNS Records
Create the following DNS A records:
- `bidify.me` → YOUR_SERVER_PUBLIC_IP
- `www.bidify.me` → YOUR_SERVER_PUBLIC_IP

## 🏗️ Build Process

### Local Build
```bash
# Install dependencies
npm install

# Build React app
npm run build

# Test build
npm start
```

### Production Build
```bash
# Build optimized Docker image
docker compose build

# Deploy to production
docker compose up -d
```

## 🔍 Verification

### Check Deployment
```bash
# Test HTTP → HTTPS redirect
curl -I http://bidify.me
# Expected: HTTP 301 → https://bidify.me

# Test HTTPS access
curl -I https://bidify.me
# Expected: HTTP 200

# Test WWW redirect
curl -I http://www.bidify.me
# Expected: HTTP 301 → https://bidify.me

# Check container health
docker compose ps
docker compose logs -f web
```

### SSL Certificate Status
```bash
# Check Traefik logs for certificate issues
docker compose logs traefik

# Check certificate expiration
docker exec traefik ls -la /letsencrypt/
```

## 📊 Monitoring

### Health Checks
- Container health: `docker compose ps`
- Application health: `curl https://bidify.me/health`
- Traefik logs: `docker compose logs traefik`
- Nginx logs: `docker compose logs web`

### Performance Monitoring
- Page load time: Use browser dev tools or GTmetrix
- Uptime monitoring: Set up external monitoring service
- Resource usage: `docker stats`

## 🔒 Security Features

### Implemented Security Headers
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: no-referrer-when-downgrade
- Content-Security-Policy: default-src 'self' http: https: data: blob: 'unsafe-inline'

### SSL/TLS Configuration
- Auto-renewing Let's Encrypt certificates
- HTTP → HTTPS redirect enforced
- Modern cipher suites
- HSTS ready (can be enabled)

## 🚀 Deployment Scripts

### Deploy Script
Create `deploy.sh`:
```bash
#!/bin/bash
cd ~/sites/bidify
git pull origin main
docker compose pull
docker compose up -d --build
docker system prune -f
```

### Rollback Script
Create `rollback.sh`:
```bash
#!/bin/bash
cd ~/sites/bidify
docker compose down
git checkout main
docker compose up -d --build
```

## 🔄 Maintenance

### Updates
```bash
# Update dependencies
npm update
docker compose build

# Restart services
docker compose up -d

# Clean up
docker system prune -f
```

### Backups
```bash
# Backup static files
tar -czf bidify-backup-$(date +%Y%m%d).tar.gz ~/sites/bidify/

# Backup certificates
cp -r ~/infra/traefik/letsencrypt/ ~/backups/letsencrypt-$(date +%Y%m%d)/
```

## 🐛 Troubleshooting

### Common Issues

#### Certificate Issues
```bash
# Check Traefik logs
docker compose logs traefik

# Check port 80 accessibility
curl http://localhost:80

# Force certificate renewal
docker compose restart traefik
```

#### Container Issues
```bash
# Check container status
docker compose ps

# View logs
docker compose logs web

# Restart container
docker compose restart web
```

#### Build Issues
```bash
# Clean build cache
docker compose down
docker system prune -f
docker compose build --no-cache
```

### Network Issues
```bash
# Check network membership
docker network inspect web

# Test connectivity
docker exec bidify-web curl http://localhost:80/health
```

## 📈 Performance Optimization

### Caching
- Browser caching for static assets
- CDN ready (Cloudflare compatible)
- Gzip compression enabled
- Brotli compression available

### Resource Limits
- Memory: 256MB limit, 128MB reservation
- CPU: 0.25 limit, 0.125 reservation
- Adjust based on server capacity

## 🔗 Additional Resources

- [Contabo Hosting Profile](../contabo.md)
- [React Documentation](https://reactjs.org/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Traefik Documentation](https://doc.traefik.io/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)

## 📞 Support

For deployment issues:
1. Check logs: `docker compose logs`
2. Verify DNS: `dig bidify.me`
3. Test connectivity: `curl https://bidify.me`
4. Check resource usage: `docker stats`

---

**Last Updated:** $(date)
**Domain:** bidify.me
**Technology:** React + Nginx + Traefik + Docker