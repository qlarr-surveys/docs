---
sidebar_position: 2
---

# Cloud Deployment

Deploy Qlarr (frontend + backend + PostgreSQL) on a cloud server with a custom domain and automatic TLS via Caddy.

## Prerequisites

- **Domain name** registered (e.g., from GoDaddy, Namecheap, Cloudflare)
- **Server**: AWS EC2 (t3.small+) or DigitalOcean droplet (2 vCPU, 4GB RAM)
- **DNS**: A record pointing to your server's public IP

## Step 1: Provision Server

**DigitalOcean**:
- Image: Ubuntu 24.04 LTS
- Size: Basic (2 vCPU, 4GB RAM)
- Region: Near your users

**AWS EC2**:
- AMI: Ubuntu Server 24.04 LTS
- Type: t4g.medium (2 vCPU, 4GB)
- Security Group: Open ports 22, 80, 443
- Allocate and associate an Elastic IP

## Step 2: Configure DNS

In your domain registrar's DNS settings:

| Type | Name | Value |
|---|---|---|
| A | your-domain.com or a subdomain | Server's public IPv4 address |

Verify with: `dig +short your-domain.com`

## Step 3: SSH into Server

```bash
ssh ubuntu@your-server-ip
```

## Step 4: Install Docker

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu
newgrp docker
```

Ensure Docker Compose is installed:

```bash
docker compose version

# or install if not present
sudo apt install docker-compose-plugin -y
```

## Step 5: Configure Firewall

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## Step 6: Get Deployment Files

Clone the frontend repository on the server:

```bash
git clone https://github.com/qlarr-surveys/frontend.git && cd frontend/deploy
```

## Step 7: Create Environment File

```bash
cat > .env << 'EOF'
CADDY_FRONTEND_HOSTNAME=your-domain.com
CADDY_API_HOSTNAME=api.your-domain.com

POSTGRES_DB=qlarr
POSTGRES_USER=qlarr
POSTGRES_PASSWORD=change_me_in_production

JWT_SECRET=change_me_to_a_secure_random_string

# optional mail settings, keep dummy values if not sending emails
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_SMTP_SSL=false
MAIL_SMTP_STARTTLS=false
MAIL_USERNAME=dummy@example.com
MAIL_PASSWORD=dummy_password
EOF
```

Generate a secure JWT secret:

```bash
openssl rand -base64 32
```

## Step 8: Deploy

```bash
docker compose up -d
```

Verify the containers are running:

```bash
docker compose ps
```

First run: Caddy provisions the TLS certificate automatically (may take ~30 seconds). Access your survey platform at `https://your-domain.com`.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `CADDY_FRONTEND_HOSTNAME` | Yes | Frontend domain name |
| `CADDY_API_HOSTNAME` | Yes | API domain name |
| `POSTGRES_USER` | Yes | Database user |
| `POSTGRES_PASSWORD` | Yes | Database password |
| `POSTGRES_DB` | No | Database name (default: `qlarr`) |
| `JWT_SECRET` | Yes | Secret for JWT authentication |
| `MAIL_HOST` | No* | SMTP server |
| `MAIL_PORT` | No* | SMTP port |
| `MAIL_SMTP_SSL` | No* | Use SSL |
| `MAIL_SMTP_STARTTLS` | No* | Use STARTTLS |
| `MAIL_USERNAME` | No* | SMTP username |
| `MAIL_PASSWORD` | No* | SMTP password |

*Mail variables are optional but required if you want to send emails (password reset, invitations).

## Docker Compose Architecture

The `docker-compose.yml` runs three services:

| Service | Image | Purpose |
|---|---|---|
| `caddy` | `public.ecr.aws/qlarr/frontend` | Frontend + Caddy reverse proxy with automatic TLS |
| `backend-app` | `public.ecr.aws/qlarr/backend` | Spring Boot backend API |
| `postgres-db` | `postgres:15.1` | PostgreSQL database |

Caddy serves the frontend and reverse-proxies API requests to the backend. The backend waits for PostgreSQL to be healthy before starting.

## Maintenance

### Update Deployment

```bash
docker compose down
docker compose pull
docker compose up -d
```

### View Resource Usage

```bash
docker stats
```

### Backup Database

```bash
docker exec postgres-db pg_dump -U qlarr qlarr > backup.sql
```

### Restore Database

```bash
docker exec -i postgres-db psql -U qlarr qlarr < backup.sql
```

## Single Container (Frontend Only)

If you already have a backend running elsewhere:

```bash
docker run -p 80:80 -p 443:443 -p 443:443/udp \
  -e CADDY_FRONTEND_HOSTNAME="app.example.com" \
  -e VITE_PROTOCOL="https" \
  -e VITE_FRONT_END_HOST="app.example.com" \
  -e VITE_BE_URL="http://your-backend.com:8080" \
  -v caddy-config:/config \
  -v caddy-data:/data \
  public.ecr.aws/qlarr/frontend
```

## Troubleshooting

### View Logs

```bash
docker compose logs -f              # all services
docker compose logs -f backend-app  # backend only
docker compose logs -f caddy        # frontend/proxy only
docker compose logs -f postgres-db  # database only
```

### Reset Database

```bash
docker compose down -v
docker compose up -d
```

### DNS Not Resolving

```bash
dig +short your-domain.com
```

### Port Already in Use

```bash
sudo lsof -i :80
sudo lsof -i :443
```

### TLS Certificate Issues

```bash
docker exec qlarr-caddy caddy list-certificates
```

## Security Recommendations

1. **Enable automatic security updates**: `sudo apt install unattended-upgrades`
2. **Use strong passwords**: Generate with `openssl rand -base64 32`
3. **Limit SSH access**: Use key-based authentication, disable password login
4. **Configure fail2ban**: Block brute force SSH attempts
