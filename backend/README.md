# Bolid Backend

A Node.js backend server built with Express.js.

## Features

- Express.js server with middleware setup
- CORS enabled for cross-origin requests
- Security headers with Helmet
- Request logging with Morgan
- Environment variable configuration
- Health check endpoint
- Email sending functionality via SMTP
- Error handling middleware
- 404 route handling

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd bolid-backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# Copy the example config file
cp config.env .env

# Edit .env file with your configuration
```

## Usage

### Development

```bash
npm run dev
```

This will start the server with nodemon for automatic restarts on file changes.

### Production

```bash
npm start
```

The server will start on port 3000 by default (or the port specified in your .env file).

## API Endpoints

### Base URL

- `GET /` - Welcome message and server status
- `GET /health` - Health check endpoint
- `GET /api/status` - API status information
- `POST /send` - Send email via contact form

### Example Responses

**GET /**

```json
{
  "message": "Welcome to Bolid Backend API",
  "status": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**GET /health**

```json
{
  "status": "OK",
  "uptime": 123.456,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**POST /send**

```json
// Request body
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, this is a test message"
}

// Success response
{
  "success": true
}

// Error response
{
  "success": false,
  "error": "Не удалось отправить письмо"
}
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
NODE_ENV=development
SMTP_PASSWORD=your-smtp-password-here
```

## Project Structure

```
bolid-backend/
├── index.js          # Main server file
├── package.json      # Dependencies and scripts
├── config.env        # Environment configuration example
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## Adding New Features

### Adding Routes

Create new route files in a `routes/` directory and import them in `index.js`.

### Adding Middleware

Add custom middleware functions before the route definitions in `index.js`.

### Database Integration

Install database drivers (e.g., `pg` for PostgreSQL, `mongoose` for MongoDB) and configure connections in a separate `config/` directory.

## Deployment

### Heroku

1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git:

```bash
git push heroku main
```

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License
