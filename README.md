# 🎵 Радио БОЛИД - Fullstack Radio Station Website

A modern, responsive fullstack web application for **Радио БОЛИД** (Bolid Radio Station) featuring live streaming, contact forms, and mobile app integration.

![Radio Bolid](https://img.shields.io/badge/Radio-BOLID-red?style=for-the-badge&logo=radio)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)

## 🌟 Features

### 🎧 Live Audio Streaming
- **Real-time radio streaming** with Icecast integration
- **Global audio player** that persists across all pages
- **Volume control** and mute functionality
- **Loading states** and error handling
- **Responsive design** for all devices

### 📱 Mobile App Integration
- **QR code generation** for iOS and Android app downloads
- **Smart device detection** for automatic app store redirects
- **Cross-platform compatibility** (iOS App Store, RuStore)

### 📞 Contact & Communication
- **Contact form** with email integration
- **Multiple contact methods** (phone, email, address)
- **Social media links** (VK, Telegram, YouTube)
- **Interactive map** with Yandex integration

### 🎨 Modern UI/UX
- **Responsive design** optimized for all screen sizes
- **Modern styling** with CSS Grid and Flexbox
- **Smooth animations** and transitions
- **Accessibility features** with proper ARIA labels

## 🏗️ Project Structure

```
bolid-web/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── AudioPlayer.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   └── Header.tsx
│   │   ├── contexts/        # React contexts
│   │   │   └── AudioContext.tsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Privacy.tsx
│   │   │   └── Reglament.tsx
│   │   └── assets/          # Static assets
│   ├── public/              # Public assets
│   └── dist/                # Build output
├── backend/                 # Node.js Express backend
│   ├── index.js             # Main server file
│   ├── config.env           # Environment configuration
│   └── docker-compose.yml   # Docker configuration
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Docker** (optional, for containerized deployment)

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp config.env.example config.env
   # Edit config.env with your SMTP credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Start production server**
   ```bash
   npm start
   ```

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   cd backend
   docker-compose up -d
   ```

## 🔧 Configuration

### Frontend Environment Variables
Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:3000
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Backend Environment Variables
Configure `backend/config.env`:
```env
PORT=3000
SMTP_USER=your_email@domain.com
SMTP_PASSWORD=your_smtp_password
NODE_ENV=production
```

## 🎵 Audio Streaming

The application integrates with **Icecast streaming server**:
- **Stream URL**: `https://icecast-bulteam.cdnvideo.ru/bolid128`
- **Audio format**: MP3, 128kbps
- **Protocol**: HTTP Live Streaming (HLS)

### Audio Features
- **Persistent player** across all pages
- **Volume control** with visual feedback
- **Mute/unmute** functionality
- **Loading indicators** during stream connection
- **Error handling** for connection issues

## 📱 Mobile App Integration

### App Store Links
- **iOS**: [App Store](https://apps.apple.com/us/app/радио-болид/id1483483936)
- **Android**: [RuStore](https://www.rustore.ru/catalog/app/fm.bolid.android)

### QR Code Generation
The app includes QR codes for easy mobile app downloads:
- **iOS QR Code**: `/qr-ios.png`
- **Android QR Code**: `/qr-android.png`

## 📞 Contact Integration

### Contact Methods
- **Office Phone**: +7 342 233 41 49
- **Studio Phone**: +7 342 239 33 99
- **Email**: office@bolidfm.ru
- **Address**: 614000, г. Пермь, ул. Куйбышева 37-602

### Social Media
- **VK**: [@radiobolid](https://vk.com/radiobolid)
- **Telegram**: [@radiobolid_bot](https://t.me/radiobolid_bot)
- **YouTube**: [@radiobolidVPSV](https://www.youtube.com/@radiobolidVPSV)
- **Morning Show**: [@utrobolid](https://t.me/utrobolid)

## 🛠️ Technology Stack

### Frontend
- **React 19.1.0** - Modern UI library
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Vite 7.0.0** - Fast build tool
- **React Router DOM 7.6.3** - Client-side routing
- **Lucide React** - Icon library
- **EmailJS** - Email service integration

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Nodemailer** - Email sending
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **Nodemon** - Development server auto-restart

## 📦 Available Scripts

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Scripts
```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
npm test         # Run tests (placeholder)
```

## 🌐 API Endpoints

### Backend API Routes
- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /api/status` - API status
- `POST /send` - Send contact form email

### Example API Usage
```javascript
// Send contact form
fetch('http://localhost:3000/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Hello',
    message: 'Your message here'
  })
});
```

## 🎨 Styling & Design

### CSS Architecture
- **Component-based styling** with CSS modules
- **Responsive design** using CSS Grid and Flexbox
- **Modern color scheme** with red accent colors
- **Smooth animations** and transitions
- **Mobile-first approach**

### Key Design Elements
- **Hero section** with live player integration
- **Contact cards** with icons and links
- **Interactive map** with Yandex integration
- **QR code sections** for mobile app downloads
- **Global audio player** with persistent state

## 🚀 Deployment

### Production Build
1. **Build frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy backend**
   ```bash
   cd backend
   npm start
   ```

### Docker Deployment
```bash
cd backend
docker-compose up -d
```

### Environment Setup
Ensure all environment variables are properly configured for production:
- SMTP credentials for email functionality
- API URLs for frontend-backend communication
- Security headers and CORS configuration

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add new feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/new-feature
   ```
5. **Create a Pull Request**

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Email**: office@bolidfm.ru
- **Phone**: +7 342 233 41 49
- **Website**: [bolidfm.ru](https://bolidfm.ru)

---

**Радио БОЛИД** - *То, что нужно, из всего, что можно!* 🎵
