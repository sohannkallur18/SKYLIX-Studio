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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

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
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4
      });
      console.log('✦ MongoDB connected successfully');
      return true;
    } catch (err) {
      console.error(`✖ MongoDB connection attempt ${attempt}/${retries} failed.`);

      if (attempt === retries) {
        console.log('  Attempting fallback with insecure SSL...');
        try {
          await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            family: 4,
            tlsInsecure: true
          });
          console.warn('⚠ MongoDB connected with INSECURE SSL (tlsInsecure: true). Please check your IP whitelist.');
          console.log('✦ MongoDB connected successfully (Fallback)');
          return true;
        } catch (fallbackErr) {
          console.error('✖ Fallback connection also failed.');
        }
      }

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

  if (mongoose.connection.readyState === 1) {
  }

  return false;
}

// ─── Admin Seeding ──────────────────────────────────────────
mongoose.connection.once('connected', async () => {
  try {
    const adminUsername = 'sohankallur18';
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || '@Sohankallur18';

    const existingAdmin = await AdminUser.findOne({ username: adminUsername });
    if (!existingAdmin) {
      await AdminUser.create({
        username: adminUsername,
        password: adminPassword,
        role: 'superadmin'
      });
      console.log(`✦ Admin user created: ${adminUsername}`);
    } else {
      existingAdmin.password = adminPassword;
      await existingAdmin.save();
      console.log(`✦ Admin user verified & password updated: ${adminUsername}`);
    }

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

// ─── Security Middleware ───────────────────────────
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

// ─── CORS (UPDATED FOR PRODUCTION) ─────────────────────────
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    // Allow all origins since this is a public api, or restrict as needed
    // In production, you might want to replace this with an allowlist like:
    // const allowedOrigins = ['https://skylix-client.onrender.com'];
    // if(allowedOrigins.indexOf(origin) === -1) return callback(new Error('CORS policy violation'), false);
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json({ limit: '10kb' }));

// ─── Public Routes ──────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    dbConnected: mongoose.connection.readyState === 1
  });
});

app.post('/api/contact', async (req, res) => {
  const sanitized = req.body;

  if (mongoose.connection.readyState === 1) {
    try {
      await Contact.create(sanitized);
    } catch (err) {
      console.error('[CONTACT DB ERROR]', err.message);
      return res.status(500).json({ success: false, error: 'Failed to save your message. Please try again.' });
    }
  }

  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'sohannkallur18@gmail.com';

  sendEmail({
    to: notificationEmail,
    subject: `New Contact Enquiry: ${sanitized.name}`,
    html: sanitized.message
  });

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

// ─── Serve frontend (Vite build) ────────────────────────────
const clientDist = path.join(__dirname, "../client/dist");

app.use(express.static(clientDist));

// ─── React router fallback ──────────────────────────────────
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

// ─── Global Error Handler ───────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err.message);
  res.status(500).json({ success: false, error: 'Internal server error.' });
});

// ─── Start Server ───────────────────────────────────────────
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`✦ SKYLIX API running on http://localhost:${PORT}`);
  });

  const shutdown = async (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    server.close(() => {
      mongoose.connection.close(false).then(() => {
        console.log('✦ MongoDB connection closed.');
        process.exit(0);
      });
    });
    setTimeout(() => process.exit(1), 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
});