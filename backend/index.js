require("dotenv").config();

const fs = require("fs");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");

const app = express();
const PORT = process.env.PORT || 3000;
const STREAM_URL = "https://icecast-bulteam.cdnvideo.ru/bolid128";

let currentTrackCache = {
  updatedAt: 0,
  data: {
    artist: "Радио Болид",
    title: "Прямая трансляция",
    raw: "Прямая трансляция",
  },
};

const splitTrackTitle = (rawTitle) => {
  const raw = rawTitle && rawTitle.trim();

  if (!raw) {
    return {
      artist: "Радио Болид",
      title: "Прямая трансляция",
      raw: "Прямая трансляция",
    };
  }

  const separatorIndex = raw.indexOf(" - ");

  if (separatorIndex === -1) {
    return {
      artist: "Радио Болид",
      title: raw,
      raw,
    };
  }

  return {
    artist: raw.slice(0, separatorIndex).trim() || "Радио Болид",
    title: raw.slice(separatorIndex + 3).trim() || "Прямая трансляция",
    raw,
  };
};

const readCurrentTrackFromStream = async () => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(STREAM_URL, {
      headers: { "Icy-MetaData": "1" },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Stream returned ${response.status}`);
    }

    const metaint = Number(response.headers.get("icy-metaint"));

    if (!metaint || !response.body) {
      throw new Error("Stream did not return ICY metadata interval");
    }

    const reader = response.body.getReader();
    const chunks = [];
    let totalLength = 0;
    const requiredLength = metaint + 4081;

    while (totalLength < requiredLength) {
      const { value, done } = await reader.read();
      if (done) break;
      chunks.push(Buffer.from(value));
      totalLength += value.length;
    }

    await reader.cancel();

    const buffer = Buffer.concat(chunks, totalLength);
    const metadataLength = buffer[metaint] * 16;
    const metadata = buffer
      .slice(metaint + 1, metaint + 1 + metadataLength)
      .toString("utf8")
      .replace(/\0/g, "");
    const match = metadata.match(/StreamTitle='([^']*)';/);

    return splitTrackTitle(match?.[1]);
  } finally {
    clearTimeout(timeoutId);
  }
};

// Trust proxy for rate limiting behind reverse proxy
app.set("trust proxy", 1);

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: "smtp.timeweb.ru",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Rate limiting for contact form
const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message: {
    success: false,
    error: "Слишком много запросов. Попробуйте позже.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// General rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("combined")); // Logging
app.use(express.json({ limit: "10mb" })); // Parse JSON bodies with size limit
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Parse URL-encoded bodies
app.use(generalLimiter); // Apply general rate limiting

// Basic route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Bolid Backend API",
    status: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.get("/api/status", (req, res) => {
  res.json({
    message: "API is working",
    version: "1.1.0",
  });
});

app.get("/api/current-track", async (req, res) => {
  const cacheTtlMs = 15000;

  if (Date.now() - currentTrackCache.updatedAt < cacheTtlMs) {
    return res.json({
      success: true,
      source: "cache",
      ...currentTrackCache.data,
    });
  }

  try {
    const data = await readCurrentTrackFromStream();
    currentTrackCache = {
      updatedAt: Date.now(),
      data,
    };

    res.json({
      success: true,
      source: "icy",
      ...data,
    });
  } catch (err) {
    console.error("Current track error:", err);
    res.status(502).json({
      success: false,
      error: err.message,
      ...currentTrackCache.data,
    });
  }
});

// Input validation rules
const contactFormValidation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Имя должно быть от 2 до 50 символов")
    .matches(/^[а-яА-ЯёЁa-zA-Z\s]+$/)
    .withMessage("Имя может содержать только буквы"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Введите корректный email адрес"),
  body("subject")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Тема не должна превышать 100 символов"),
  body("message")
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Сообщение должно быть от 10 до 2000 символов")
    .escape(), // Sanitize HTML
];

// Email sending route with spam protection
app.post(
  "/send",
  contactFormLimiter,
  contactFormValidation,
  async (req, res) => {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: "Некорректные данные",
        details: errors.array().map((err) => err.msg),
      });
    }

    const { name, email, subject, message, honeypot } = req.body;

    // Honeypot check - if filled, it's likely spam
    if (honeypot && honeypot.trim() !== "") {
      console.log(`Spam detected - honeypot field filled from ${email}`);
      return res.status(400).json({
        success: false,
        error: "Сообщение отклонено",
      });
    }

    try {
      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: "office@bolidfm.ru",
        replyTo: email,
        subject: subject
          ? `Сообщение с сайта: ${subject}`
          : "Сообщение с сайта",
        text: `Имя: ${name}\nEmail: ${email}\nТема: ${subject}\n\nСообщение:\n${message}`,
      });

      // Log successful email
      console.log(`Email sent successfully from ${email} (${name})`);

      res.status(200).json({ success: true });
    } catch (err) {
      console.error("Ошибка отправки:", err);
      res.status(500).json({
        success: false,
        error: "Не удалось отправить письмо",
      });
    }
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API status: http://localhost:${PORT}/api/status`);
});

module.exports = app;
