# Traefik Infrastructure Configuration

This directory contains the global Traefik reverse proxy configuration for all sites deployed on your Contabo server.

## 🏗️ Architecture

```
Internet
    ↓
DNS (bidify.me, www.bidify.me)
    ↓
Server:80/443
    ↓
Traefik (Reverse Proxy)
    ↓
Individual Site Containers
```

## 📁 Files

- `docker-compose.yml` - Main Traefik configuration
- `.env.example` - Environment variables template
- `.env` - Environment variables (not committed)
- `letsencrypt/acme.json` - SSL certificates (auto-generated)

## 🚀 Initial Setup

### 1. Create Docker Network
```bash
docker network create web 2>/dev/null || true
```

### 2. Setup Environment
```bash
cp .env.example .env
# Edit .env with your ACME email
```

### 3. Deploy Traefik
```bash
docker compose up -d
```

### 4. Verify Deployment
```bash
# Check container status
docker compose ps

# Check logs
docker compose logs traefik

# Test dashboard (if enabled)
curl http://localhost:8080/dashboard/
```

## ⚙️ Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `ACME_EMAIL` | Yes | - | Email for Let's Encrypt certificates |
| `LOG_LEVEL` | No | `INFO` | Logging level (DEBUG, INFO, WARN, ERROR) |
| `TRAEFIK_DASHBOARD_ENABLED` | No | `false` | Enable Traefik dashboard |
| `TRAEFIK_AUTH_USERS` | No | - | Basic auth for dashboard |

### Key Features

- **SSL/TLS**: Automatic Let's Encrypt certificate generation
- **Routing**: Docker-based routing with host headers
- **Load Balancing**: Automatic load balancing across containers
- **Health Checks**: Container health monitoring
- **Logging**: Comprehensive access and error logs
- **Dashboard**: Optional web dashboard for monitoring

## 🔒 Security

### SSL/TLS Configuration
- **Auto-renewal**: 90-day certificates with automatic renewal
- **HTTP-01 Challenge**: Port 80 required for certificate issuance
- **Multiple Domains**: Supports multiple domains per certificate
- **Wildcard Support**: Ready for wildcard certificates

### Network Security
- **Docker Socket**: Read-only access for security
- **No Direct Port Exposure**: Only Traefik exposes 80/443
- **Container Isolation**: Each site in its own container

## 📊 Monitoring

### Access Logs
Traefik logs all HTTP requests in JSON format:
```json
{
  "ClientAddr": "192.168.1.100",
  "ClientHost": "192.168.1.100",
  "ClientPort": "12345",
  "DownstreamAddr": "10.0.0.5:80",
  "DownstreamHost": "10.0.0.5",
  "DownstreamPort": "80",
  "Duration": "0.002",
  "Level": "info",
  "OriginDuration": "0.001",
  "OverheadDuration": "0.001",
  "RequestAddr": "bidify.me",
  "RequestHost": "bidify.me",
  "RequestPort": "443",
  "RequestProto": "https",
  "RequestScheme": "https",
  "RequestMethod": "GET",
  "RequestPath": "/",
  "RequestLine": "GET / HTTP/1.1",
  "RequestContentSize": 0,
  "ResponseContentSize": 1234,
  "ResponseDuration": "0.002",
  "ResponseStatus": 200,
  "ResponseWritten": 1234,
  "ServiceName": "bidify",
  "ServiceURL": "http://10.0.0.5:80",
  "StartLocal": "2023-01-01T12:00:00Z",
  "StartUTC": "2023-01-01T12:00:00Z",
  "TimeElapsed": "0.002"
}
```

### Health Checks
- **Traefik**: HTTP health check on `/ping`
- **Containers**: Individual container health checks
- **Certificates**: Automatic monitoring and renewal

## 🔄 Maintenance

### Certificate Management
```bash
# Check certificate status
docker exec traefik ls -la /letsencrypt/

# Force certificate renewal
docker compose restart traefik

# View certificate details
docker exec traefik openssl x509 -in /letsencrypt/live/bidify.me/fullchain.pem -text -noout
```

### Log Management
```bash
# View recent logs
docker compose logs --tail=100 traefik

# Follow logs in real-time
docker compose logs -f traefik

# Export logs
docker compose logs > traefik-logs-$(date +%Y%m%d).txt
```

### Updates
```bash
# Update Traefik to latest version
docker compose pull
docker compose up -d

# Clean up old images
docker system prune -f
```

## 🐛 Troubleshooting

### Common Issues

#### Certificate Issues
```bash
# Check for certificate errors
docker compose logs traefik

# Verify port 80 accessibility
curl http://localhost:80

# Check DNS propagation
dig bidify.me +short
```

#### Container Issues
```bash
# Check container status
docker compose ps

# Restart Traefik
docker compose restart traefik

# Reset certificates (last resort)
docker compose down
rm -rf letsencrypt/*
docker compose up -d
```

#### Network Issues
```bash
# Check network membership
docker network inspect web

# Test connectivity
docker exec traefik wget -qO- http://localhost:80/ping
```

### Debug Mode
Enable debug logging for troubleshooting:
```bash
# Edit .env
LOG_LEVEL=DEBUG

# Restart Traefik
docker compose restart traefik
```

## 🔗 Integration with Sites

Each site should:
1. Join the `web` network
2. Use Traefik labels for routing
3. Include health checks
4. Follow the naming convention

Example site configuration:
```yaml
services:
  web:
    networks:
      - web
    labels:
      - traefik.enable=true
      - traefik.http.routers.site.rule=Host(`bidify.me`)
      - traefik.http.routers.site.entrypoints=websecure
      - traefik.http.routers.site.tls.certresolver=letsencrypt
```

## 📈 Performance

### Resource Usage
- **Memory**: ~50-100MB
- **CPU**: Low usage (mostly idle)
- **Storage**: ~100MB for certificates

### Optimization
- **Caching**: Built-in response caching
- **Compression**: Gzip compression
- **Keep-Alive**: HTTP keep-alive enabled
- **Load Balancing**: Automatic distribution

## 🔐 Security Best Practices

1. **Dashboard Security**: Disable dashboard in production or enable authentication
2. **Network Isolation**: Use Docker networks for container isolation
3. **Regular Updates**: Keep Traefik updated for security patches
4. **Certificate Management**: Monitor certificate expiration
5. **Access Control**: Use firewall rules to restrict access

## 📞 Support

For issues with Traefik:
1. Check logs: `docker compose logs traefik`
2. Verify configuration: `docker compose config`
3. Test connectivity: `curl https://bidify.me`
4. Check certificates: `docker exec traefik ls -la /letsencrypt/`

---

**Last Updated:** $(date)
**Version:** Traefik v3.1
**Purpose:** Global reverse proxy for bidify.me