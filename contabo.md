ohhh yes, king — let's make this stupid-easy for any AI (or junior dev) to drop **any web app** onto your server with zero drama. I wrapped everything into a single, explicit "**Hosting Profile**" you can paste into repos/PRs/ChatGPT to guide file edits and deployments. Use it as your master README for your infra. 😘

# HOSTING PROFILE — READ ME FIRST (FOR AI DEPLOYMENTS)

## 0) Quick summary (the TL;DR rules)

* **Reverse proxy:** Traefik v3 on Docker. It terminates TLS, routes by `Host()`, and issues certs via Let's Encrypt HTTP-01.
* **Network:** All apps join the external Docker network **`web`**. No app binds 80/443 directly.
* **HTTPS:** Always use Traefik labels. Force HTTP→HTTPS. Redirect `www` → apex (or vice versa) per app.
* **DNS:** `A` records for apex and `www` to server IP (or proxied via Cloudflare with SSL "Full (strict)").
* **Compose:** One `docker-compose.yml` per app folder. Use Traefik labels, not host ports.
* **Health:** Every app must have a healthcheck and a `/health` (or equivalent) endpoint if feasible.
* **Secrets:** Use `.env` (not committed) or Docker secrets; never hardcode secrets in compose.
* **Zero downtime:** Prefer rolling or blue/green (v2/v3 services) where possible.

---

## 1) Server & base stack

* **OS:** Linux VPS (Docker & Docker Compose v2 installed).
* **Global docker network:**

  ```bash
  docker network create web 2>/dev/null || true
  ```
* **Traefik stack location:** `~/infra/traefik/`

  * **Exposes:** 80, 443 (public)
  * **Watches:** Docker provider; `exposedbydefault=false`
  * **Certificates:** Let's Encrypt (HTTP-01). ACME storage: `/letsencrypt/acme.json`
  * **Never change:** The entrypoints (web:80, websecure:443), ACME storage path, or disabling Docker provider.

**Canonical Traefik compose (reference, do not duplicate per app):**

```yaml
services:
  traefik:
    image: traefik:v3.1
    container_name: traefik
    restart: unless-stopped
    command:
      - --providers.docker=true
      - --providers.docker.exposedbydefault=false
      - --entrypoints.web.address=:80
      - --entrypoints.websecure.address=:443
      - --certificatesresolvers.letsencrypt.acme.email=you@example.com
      - --certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json
      - --certificatesresolvers.letsencrypt.acme.httpchallenge=true
      - --certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./letsencrypt:/letsencrypt
      - /var/run/docker.sock:/var/run/docker.sock:ro
    networks:
      - web
networks:
  web:
    external: true
```

---

## 2) DNS & domains

* **Records required:**

  * `A` for **apex** (e.g., `example.com`) → server public IP
  * `A` for **www** (e.g., `www.example.com`) → server public IP
* **Cloudflare (if used):** Proxy allowed. Set **SSL/TLS = Full (strict)**. Don't enable "Always Use HTTPS" at CF (Traefik handles redirects).
* **Wildcard:** Not required but can be added later using DNS-01 (not default).

---

## 3) Directory layout & conventions

```
~
├─ infra/
│  └─ traefik/
│     ├─ docker-compose.yml
│     └─ letsencrypt/acme.json
└─ sites/
   └─ <app-name>/
      ├─ docker-compose.yml
      ├─ .env                # not committed
      ├─ Dockerfile          # if needed
      ├─ site/               # for static sites (index.html, assets)
      └─ data/               # for app volumes (db/storage), if any
```

**Rules for AI edits:**

* Put each app in `~/sites/<app-name>/`.
* Join service to network `web`.
* Do **not** publish host ports (no `- "3000:3000"`); use Traefik labels with `loadbalancer.server.port`.
* Keep config minimal & 12-factor. Mount volumes only when needed.
* Use `.env` for secrets; never commit them.

---

## 4) Per-app requirements (the inputs the AI must ask/know)

For every new deployment, AI must obtain or infer:

1. **Application type:** `static`, `Node/Next`, `Python (Flask/FastAPI/Django)`, `PHP (FPM+Nginx)`, `Go`, etc.
2. **Domain(s):** primary apex (e.g., `example.com`) and any alternates (`www.example.com`, `api.example.com`).
3. **Internal port:** the container's listening port (e.g., 3000, 8080, 8000).
4. **Start command:** e.g., `npm start`, `node server.js`, `gunicorn app:app -b 0.0.0.0:8000`.
5. **Build needs:** Does it need `npm run build`, migrations, assets, etc.?
6. **Environment variables:** runtime URLs, DB strings, API keys.
7. **Persistent storage:** path(s) to mount under `./data/…` (databases, uploads).
8. **Health endpoint:** `/health`, `/api/health`, or internal TCP healthcheck.
9. **Redirect policy:** `www → apex` (default) or `apex → www`.
10. **Robots/sitemaps/CORS:** any special headers or routes to expose via Traefik middlewares.

---

## 5) Compose templates (AI can copy/paste & fill)

### A) Static site (Nginx)

```yaml
services:
  web:
    image: nginx:alpine
    restart: unless-stopped
    volumes:
      - ./site:/usr/share/nginx/html:ro
    labels:
      - traefik.enable=true
      # HTTPS router (apex)
      - traefik.http.routers.app.rule=Host(`example.com`)
      - traefik.http.routers.app.entrypoints=websecure
      - traefik.http.routers.app.tls.certresolver=letsencrypt

      # HTTP → HTTPS (apex + www)
      - traefik.http.routers.app-http.rule=Host(`example.com`,`www.example.com`)
      - traefik.http.routers.app-http.entrypoints=web
      - traefik.http.routers.app-http.middlewares=redirect-https

      # www → apex (permanent)
      - traefik.http.routers.app-www.rule=Host(`www.example.com`)
      - traefik.http.routers.app-www.entrypoints=websecure
      - traefik.http.routers.app-www.tls.certresolver=letsencrypt
      - traefik.http.routers.app-www.middlewares=to-apex

      # Middlewares
      - traefik.http.middlewares.redirect-https.redirectscheme.scheme=https
      - traefik.http.middlewares.redirect-https.redirectscheme.permanent=true
      - traefik.http.middlewares.to-apex.redirectregex.regex=^https?://www\\.example\\.com/(.*)
      - traefik.http.middlewares.to-apex.redirectregex.replacement=https://example.com/$$1
      - traefik.http.middlewares.to-apex.redirectregex.permanent=true
    networks: [web]
networks:
  web:
    external: true
```

### B) Node / Next.js

```yaml
services:
  app:
    build: .
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      # add more from .env as needed
    labels:
      - traefik.enable=true
      - traefik.http.services.app.loadbalancer.server.port=3000
      - traefik.http.routers.app.rule=Host(`example.com`)
      - traefik.http.routers.app.entrypoints=websecure
      - traefik.http.routers.app.tls.certresolver=letsencrypt
      - traefik.http.routers.app-http.rule=Host(`example.com`,`www.example.com`)
      - traefik.http.routers.app-http.entrypoints=web
      - traefik.http.routers.app-http.middlewares=redirect-https
      - traefik.http.routers.app-www.rule=Host(`www.example.com`)
      - traefik.http.routers.app-www.entrypoints=websecure
      - traefik.http.routers.app-www.tls.certresolver=letsencrypt
      - traefik.http.routers.app-www.middlewares=to-apex
      - traefik.http.middlewares.redirect-https.redirectscheme.scheme=https
      - traefik.http.middlewares.redirect-https.redirectscheme.permanent=true
      - traefik.http.middlewares.to-apex.redirectregex.regex=^https?://www\\.example\\.com/(.*)
      - traefik.http.middlewares.to-apex.redirectregex.replacement=https://example.com/$$1
      - traefik.http.middlewares.to-apex.redirectregex.permanent=true
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 30s
    networks: [web]
networks:
  web:
    external: true
```

**Node Dockerfile (generic):**

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
EXPOSE 3000
CMD ["npm","start"]
```

### C) Python (Flask/FastAPI) + Gunicorn

```yaml
services:
  api:
    build: .
    restart: unless-stopped
    environment:
      - PYTHONUNBUFFERED=1
    labels:
      - traefik.enable=true
      - traefik.http.services.api.loadbalancer.server.port=8000
      - traefik.http.routers.api.rule=Host(`api.example.com`)
      - traefik.http.routers.api.entrypoints=websecure
      - traefik.http.routers.api.tls.certresolver=letsencrypt
      - traefik.http.routers.api-http.rule=Host(`api.example.com`)
      - traefik.http.routers.api-http.entrypoints=web
      - traefik.http.routers.api-http.middlewares=redirect-https
      - traefik.http.middlewares.redirect-https.redirectscheme.scheme=https
      - traefik.http.middlewares.redirect-https.redirectscheme.permanent=true
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 5
    networks: [web]
networks:
  web:
    external: true
```

**Python Dockerfile (generic):**

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY pyproject.toml poetry.lock* requirements.txt* ./
RUN pip install --no-cache-dir -r requirements.txt || true
COPY . .
EXPOSE 8000
CMD ["gunicorn","-b","0.0.0.0:8000","app:app","--workers","2","--threads","4","--timeout","60"]
```

### D) PHP (Laravel/WordPress) via FPM + Nginx (pattern)

* Nginx service serves :80 internally → FPM.
* Traefik routes to Nginx container port 80.

---

## 6) Environment & secrets policy

* **Where:** `~/sites/<app>/.env` (referenced by compose with `env_file: .env` or `environment:`).
* **Never commit:** `.env`, keys, JWTs, DB URLs, service role keys.
* **Secret rotation:** If AI changes secrets, it must:

  1. Update `.env`
  2. Restart app (`docker compose up -d`)
  3. Document the change in PR or deployment note

---

## 7) Health, logging, and monitoring

* **Healthchecks:** Each service defines a `healthcheck` (HTTP or TCP) to enable safe restarts and clear troubleshooting.
* **Logs:** Use `docker compose logs -f <service>`.
* **Access logs:** From Traefik; app logs should be stdout/stderr.
* **(Optional) Metrics/analytics:** If present (e.g., Prometheus/Grafana, or simple uptime monitors), AI should not disable them.

---

## 8) Performance & caching (sane defaults)

* Prefer **gzip/brotli** at the app or Nginx layer for static assets.
* Long-cache immutable assets with content hashes if building SPAs.
* If Cloudflare proxy is used, leverage its CDN caching (but don't break APIs).
* Avoid serving large static from the app runtime; put under Nginx/static or object storage.

---

## 9) Security rules

* No container should bind host ports except Traefik (80/443).
* Keep packages updated in base images.
* Use non-root containers when possible.
* Enforce HTTPS (Traefik redirect).
* Don't leak `.env`, `.git`, or build artifacts to `/usr/share/nginx/html`.

---

## 10) Backups & disaster recovery (minimum viable)

* Keep app data under `./data/` with clear volumes.
* Databases (if any) should have scheduled dumps to an off-box location.
* Store `~/infra/traefik/letsencrypt/acme.json` safely (for cert reuse).
* Document restore steps in each app's README.

---

## 11) Deployment workflow (what the AI should do, step-by-step)

1. **Prepare folder:** `mkdir -p ~/sites/<app>`; clone or upload code there.
2. **Populate files:** Add `Dockerfile`, `docker-compose.yml`, `.env`, and `site/` (if static).
3. **DNS:** Ensure apex + www A records exist and propagate to server IP (or CF proxied).
4. **Build & start:**

   ```bash
   cd ~/sites/<app>
   docker compose up -d --build
   ```
5. **Verify:**

   ```bash
   curl -I http://example.com     # should 301 → https
   curl -I https://example.com    # should 200
   docker compose ps
   docker compose logs -f
   ```
6. **Rollouts:** For updates, `git pull` (or upload), then `docker compose up -d --build`.

---

## 12) Common troubleshooting (CLI the AI can run)

* **Check routing/labels:** `docker inspect <container>` (look at `Labels`).
* **Container status:** `docker compose ps` / `docker compose logs -f <svc>`
* **Network membership:** `docker network inspect web`
* **Certificate issues:** Ensure port 80 reachable; check Traefik logs.
* **DNS mismatch:** `dig A example.com +short` should show server IP.

---

## 13) Redirect policy presets (pick one per app)

**Default:** `www → apex` (SEO-friendly single hostname)

* Add the three label blocks shown in templates (`app`, `app-http`, `app-www`) and `to-apex` middleware.

**Alternative:** `apex → www`

* Swap hostnames and regex replacement accordingly.

---

## 14) CI/CD (optional pattern the AI can create)

* **GitHub Actions:** build image → `ssh` into server → `docker compose pull && docker compose up -d --remove-orphans`.
* Or **Watchtower** if you publish tagged images to a registry.

---

## 15) Email (if the app needs it)

* Prefer transactional providers (Postmark/SendGrid/Resend).
* If hosting mailboxes elsewhere, keep MX records pointed to your provider; do not run SMTP on this box.
* Ensure SPF/DKIM/DMARC records exist at DNS provider.

---

## 16) The "don't break this" list for AIs

* Do **not** modify the global Traefik stack's entrypoints, ACME resolver, or Docker provider.
* Do **not** bind host ports in app services.
* Do **not** commit `.env` or secrets.
* Do **not** remove the `web` network or forget to join it.
* Do **not** create conflicting routers or duplicate `Host()` rules across running apps.

---

## 17) Minimal info the AI must print back after a deploy

* ✅ Domain routed: `https://example.com`
* ✅ Compose path: `~/sites/<app>/docker-compose.yml`
* ✅ Container health: `healthy` (or last logs line if not)
* ✅ SSL: issued via Let's Encrypt (date)
* ✅ How to rollback: `git revert` / previous tag, then `docker compose up -d --build`

---

breathe, gorgeous — with this profile, any AI knows exactly what to change, where to put files, which labels to add, and how to go live safely. want me to tailor this to a specific domain/app you're deploying right now? drop the domain + app type + internal port and I'll spit out the exact `docker-compose.yml`, `Dockerfile`, and `.env` skeleton for you. 💋