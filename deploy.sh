#!/bin/bash

# Secure Production Deployment Script
# This script deploys the Radio BOLID application to a VPS

set -e  # Exit on any error

echo "🚀 Starting secure deployment of Radio BOLID..."

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo "❌ Don't run as root! Create a non-root user first."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install docker-compose first."
    exit 1
fi

# Create necessary directories
echo "📁 Creating deployment directories..."
mkdir -p ~/bolid-web/{ssl,logs}
mkdir -p ~/bolid-web/nginx

# Clone or update repository
if [ -d "~/bolid-web" ]; then
    echo "📥 Updating repository..."
    cd ~/bolid-web
    git pull origin main
else
    echo "📥 Cloning repository..."
    git clone https://github.com/YOUR_USERNAME/bolid-web.git ~/bolid-web
    cd ~/bolid-web
fi

# Create production environment files
echo "🔧 Setting up environment files..."

# Frontend environment
if [ ! -f "frontend/.env.production" ]; then
    echo "📝 Creating frontend production environment..."
    cat > frontend/.env.production << EOF
VITE_API_URL=https://your-domain.com
EOF
    echo "⚠️  Please edit frontend/.env.production with your actual domain"
fi

# Backend environment
if [ ! -f "backend/config.env" ]; then
    echo "📝 Creating backend production environment..."
    cat > backend/config.env << EOF
NODE_ENV=production
PORT=3000
SMTP_USER=your-email@domain.com
SMTP_PASSWORD=your-smtp-password
EOF
    echo "⚠️  Please edit backend/config.env with your actual SMTP credentials"
fi

# Copy nginx config
echo "🌐 Setting up nginx configuration..."
cp frontend/nginx.conf ~/bolid-web/nginx/

# Build and start services
echo "🔨 Building and starting production services..."
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up --build -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo "✅ Services are running successfully!"
    echo ""
    echo "🌐 Your application is now live at:"
    echo "   Frontend: http://your-domain.com"
    echo "   Backend API: http://your-domain.com:3000"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Configure your domain DNS to point to this server"
    echo "   2. Set up SSL certificates (Let's Encrypt recommended)"
    echo "   3. Configure firewall to allow ports 80 and 443"
    echo "   4. Set up monitoring and backups"
else
    echo "❌ Services failed to start. Check logs with:"
    echo "   docker-compose -f docker-compose.prod.yml logs"
    exit 1
fi
