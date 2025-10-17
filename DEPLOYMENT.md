# 🚀 VPS Deployment Guide for Radio BOLID

This guide will help you deploy your Radio BOLID fullstack application to a VPS securely.

## 📋 Prerequisites

### VPS Requirements

- **OS**: Ubuntu 20.04+ or CentOS 8+
- **RAM**: Minimum 2GB (4GB recommended)
- **Storage**: Minimum 20GB
- **CPU**: 1-2 cores minimum
- **Network**: Public IP address

### Domain Setup

- Domain name pointing to your VPS IP
- DNS A record configured

## 🔧 VPS Setup

### 1. Initial Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Create non-root user
sudo adduser bolid
sudo usermod -aG sudo bolid
sudo usermod -aG docker bolid

# Switch to new user
su - bolid
```

### 2. Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

### 3. Configure Firewall

```bash
# Install ufw
sudo apt install ufw -y

# Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

## 🚀 Deployment Process

### 1. Clone Repository

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/bolid-web.git
cd bolid-web
```

### 2. Configure Environment

```bash
# Create production environment files
cp frontend/env.production.example frontend/.env.production
cp backend/config.env.example backend/config.env

# Edit with your actual values
nano frontend/.env.production
nano backend/config.env
```

**Required Environment Variables:**

**Frontend (.env.production):**

```env
VITE_API_URL=https://your-domain.com
```

**Backend (config.env):**

```env
NODE_ENV=production
PORT=3000
SMTP_USER=your-email@domain.com
SMTP_PASSWORD=your-smtp-password
```

### 3. Deploy Application

```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### 4. Verify Deployment

```bash
# Check if services are running
docker-compose -f docker-compose.prod.yml ps

# Check logs
docker-compose -f docker-compose.prod.yml logs

# Test endpoints
curl http://localhost
curl http://localhost:3000/health
```

## 🔒 SSL/HTTPS Setup

### Option 1: Let's Encrypt (Recommended)

```bash
# Install certbot
sudo apt install certbot -y

# Get SSL certificate
sudo certbot certonly --standalone -d your-domain.com

# Copy certificates to project
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ~/bolid-web/ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ~/bolid-web/ssl/

# Set up auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Option 2: Self-Signed Certificate (Testing)

```bash
# Create self-signed certificate
mkdir -p ~/bolid-web/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ~/bolid-web/ssl/privkey.pem \
    -out ~/bolid-web/ssl/fullchain.pem
```

## 🔧 Nginx Configuration for HTTPS

Create `~/bolid-web/nginx/nginx-ssl.conf`:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔄 Updates and Maintenance

### Update Application

```bash
cd ~/bolid-web
git pull origin main
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up --build -d
```

### Backup Configuration

```bash
# Backup environment files
tar -czf bolid-backup-$(date +%Y%m%d).tar.gz \
    backend/config.env \
    frontend/.env.production \
    ssl/ \
    nginx/
```

### Monitor Logs

```bash
# View logs
docker-compose -f docker-compose.prod.yml logs -f

# View specific service logs
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend
```

## 🛡️ Security Checklist

- [ ] Non-root user created
- [ ] Firewall configured
- [ ] SSL certificates installed
- [ ] Environment variables secured
- [ ] Regular updates scheduled
- [ ] Backups configured
- [ ] Monitoring set up

## 🆘 Troubleshooting

### Services Won't Start

```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs

# Check disk space
df -h

# Check memory
free -h
```

### SSL Issues

```bash
# Test SSL certificate
openssl x509 -in ssl/fullchain.pem -text -noout

# Check certificate validity
curl -I https://your-domain.com
```

### Port Conflicts

```bash
# Check what's using ports
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443
sudo netstat -tulpn | grep :3000
```

## 📞 Support

If you encounter issues:

1. Check the logs first
2. Verify environment variables
3. Ensure all ports are accessible
4. Check SSL certificate validity

Your Radio BOLID application should now be live and secure! 🎉
