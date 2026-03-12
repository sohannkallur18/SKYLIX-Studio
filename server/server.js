import path from "path";
import { fileURLToPath } from "url";
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Contact from './models/Contact.js';
import AdminUser from './models/AdminUser.js';
import User from './models/User.js';
import adminRoutes from './routes/admin.js';
import chatbotRoutes from './routes/chatbot.js';
import userAuthRoutes from './routes/userAuth.js';
import { sendEmail } from './utils/email.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;

// ─── Validate Critical Environment ─────────────────────────
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET === 'your-super-secret-key-change-in-production') {
  console.error('✖ FATAL: JWT_SECRET is not set or is still the default placeholder.');
  console.error('  Generate a strong secret: node -e "console.log(require(\'crypto\').randomBytes(64).toString(\'hex\'))"');
  process.exit(1);
}

// ─── MongoDB Connection with Retry ──────────────────────────
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000;

async function getPublicIP() {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip;
  } catch (err) {
    return 'Unknown';
  }
}

async function connectDB(retries = MAX_RETRIES) {
  if (!process.env.MONGODB_URI) {
    console.warn('⚠ MONGODB_URI not set. Running without database.');
    return false;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Standard connection
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4 // Try forcing IPv4 first to avoid common IPv6 issues
      });
      console.log('✦ MongoDB connected successfully');
      return true;
    } catch (err) {
      console.error(`✖ MongoDB connection attempt ${attempt}/${retries} failed.`);

      // On last attempt, try insecure fallback just in case it's a local cert issue
      if (attempt === retries) {
        console.log('  Attempting fallback with insecure SSL...');
        try {
          await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            family: 4,
            tlsInsecure: true // WARN: For debugging/dev only
          });
          console.warn('⚠ MongoDB connected with INSECURE SSL (tlsInsecure: true). Please check your IP whitelist.');
          console.log('✦ MongoDB connected successfully (Fallback)');
          return true;
        } catch (fallbackErr) {
          console.error('✖ Fallback connection also failed.');
        }
      }

      // Fetch and display public IP to help user whitelist
      if (attempt === retries) {
        const ip = await getPublicIP();
        console.error('\n────────────────────────────────────────────────────────────────────────────────');
        console.error('✖ CRITICAL: MongoDB Connection Failed');
        console.error(`✖ CAUSE: Likely IP Whitelist or Firewall Rejection.`);
        console.error(`✖ ACTION: Go to MongoDB Atlas > Network Access > Add IP Address`);
        console.error(`✖ ADD THIS IP: ${ip}`);
        console.error('────────────────────────────────────────────────────────────────────────────────\n');
      } else {
        console.log(`  Retrying in ${RETRY_DELAY / 1000}s...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }

  // Seed default admin (moved after loop) - only runs if connected (which it won't be here)
  if (mongoose.connection.readyState === 1) {
    // ... seeding logic ...
  }

  return false;
}

// ─── Admin Seeding ──────────────────────────────────────────
mongoose.connection.once('connected', async () => {
  try {
    const adminUsername = 'sohankallur18';
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || '@Sohankallur18';

    // Check if specific admin exists
    const existingAdmin = await AdminUser.findOne({ username: adminUsername });
    if (!existingAdmin) {
      await AdminUser.create({
        username: adminUsername,
        password: adminPassword,
        role: 'superadmin'
      });
      console.log(`✦ Admin user created: ${adminUsername}`);
    } else {
      // Force update password to ensure it matches what's requested
      existingAdmin.password = adminPassword;
      await existingAdmin.save();
      console.log(`✦ Admin user verified & password updated: ${adminUsername}`);
    }

    // Legacy check for 'admin' user (optional, keeping for backward compat if needed, or removing to strict)
    // We strictly want sohankallur18 as requested.
  } catch (e) {
    console.error('✖ Admin seeding failed:', e.message);
  }
});

// ─── MongoDB Connection Events ──────────────────────────────
mongoose.connection.on('disconnected', () => {
  console.warn('⚠ MongoDB disconnected');
});
mongoose.connection.on('error', (err) => {
  console.error('✖ MongoDB connection error:', err.message);
});

// ─── Security Middleware (helmet) ───────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'", "http://localhost:*", "https://*.mongodb.net"],
    }
  },
  crossOriginEmbedderPolicy: false,
}));

// ─── CORS ────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '10kb' }));

// ─── Simple In-Memory Rate Limiter ──────────────────────────
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;

function rateLimit(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.start > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return next();
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return res.status(429).json({ success: false, error: 'Too many requests. Please try again later.' });
  }
  entry.count++;
  next();
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now - entry.start > RATE_LIMIT_WINDOW) rateLimitMap.delete(ip);
  }
}, 5 * 60 * 1000);

// ─── Input Sanitization ─────────────────────────────────────
function sanitizeInput(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      // Strip any keys starting with $ to prevent MongoDB operator injection
      sanitized[key] = value;
    } else if (typeof value === 'object' && value !== null) {
      // Block objects with $ keys (e.g., { $gt: "" })
      const hasOperator = Object.keys(value).some(k => k.startsWith('$'));
      if (!hasOperator) sanitized[key] = value;
    } else {
      sanitized[key] = value;
    }
    // Also strip the key itself if it starts with $
    if (key.startsWith('$')) delete sanitized[key];
  }
  return sanitized;
}

// ─── Input Validation ───────────────────────────────────────
function validateContactInput(body) {
  const errors = [];
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2 || body.name.trim().length > 100) {
    errors.push('Name is required (2-100 characters).');
  }
  if (!body.email || typeof body.email !== 'string') {
    errors.push('Email is required.');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) errors.push('Please provide a valid email address.');
  }
  if (!body.message || typeof body.message !== 'string' || body.message.trim().length < 10 || body.message.trim().length > 5000) {
    errors.push('Message is required (10-5000 characters).');
  }
  if (body.phone && typeof body.phone === 'string' && body.phone.trim().length > 30) {
    errors.push('Phone number is too long.');
  }
  return errors;
}

// ─── Public Routes ──────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    dbConnected: mongoose.connection.readyState === 1
  });
});

app.post('/api/contact', rateLimit, async (req, res) => {
  const body = sanitizeInput(req.body);
  const errors = validateContactInput(body);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const sanitized = {
    name: body.name.trim(),
    email: body.email.trim().toLowerCase(),
    phone: body.phone ? body.phone.trim() : null,
    company: body.company ? body.company.trim() : null,
    service: body.service || null,
    budget: body.budget || null,
    message: body.message.trim(),
    type: body.type || 'contact_form'
  };

  // Save to database if connected
  if (mongoose.connection.readyState === 1) {
    try {
      await Contact.create(sanitized);
    } catch (err) {
      console.error('[CONTACT DB ERROR]', err.message);
      return res.status(500).json({ success: false, error: 'Failed to save your message. Please try again.' });
    }
  }

  // Send Email Notification
  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'sohannkallur18@gmail.com';
  const emailHtml = `
    <h2>New Enquiry via Contact Form</h2>
    <p><strong>Name:</strong> ${sanitized.name}</p>
    <p><strong>Email:</strong> ${sanitized.email}</p>
    <p><strong>Phone:</strong> ${sanitized.phone || 'N/A'}</p>
    <p><strong>Company:</strong> ${sanitized.company || 'N/A'}</p>
    <p><strong>Service:</strong> ${sanitized.service || 'N/A'}</p>
    <p><strong>Budget:</strong> ${sanitized.budget || 'N/A'}</p>
    <p><strong>Message:</strong></p>
    <blockquote style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">
      ${sanitized.message.replace(/\n/g, '<br>')}
    </blockquote>
  `;

  // We don't await this to avoid blocking the response to the user
  sendEmail({
    to: notificationEmail,
    subject: `New Contact Enquiry: ${sanitized.name}`,
    html: emailHtml
  });

  console.log('[CONTACT]', sanitized.email, sanitized.service || 'general');
  res.status(200).json({
    success: true,
    message: 'Thank you for reaching out. We will respond within 24 hours.'
  });
});

// ─── Admin Routes ───────────────────────────────────────────
app.use('/api/admin', adminRoutes);

// ─── Chatbot Routes ─────────────────────────────────────────
app.use('/api/chatbot', chatbotRoutes);

// ─── User Auth Routes ───────────────────────────────────────
app.use('/api/auth', userAuthRoutes);
// ─── Serve Frontend (React/Vite Build) ──────────────────────
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// ─── Global Error Handler ───────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err.message);
  res.status(500).json({ success: false, error: 'Internal server error.' });
});

// ─── React Catch-All (Frontend Routing) ─────────────────────
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// ─── Start Server ───────────────────────────────────────────
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`✦ SKYLIX API running on http://localhost:${PORT}`);
  });

  // Graceful shutdown
  const shutdown = async (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    server.close(() => {
      mongoose.connection.close(false).then(() => {
        console.log('✦ MongoDB connection closed.');
        process.exit(0);
      });
    });
    // Force exit after 10s
    setTimeout(() => process.exit(1), 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
});
