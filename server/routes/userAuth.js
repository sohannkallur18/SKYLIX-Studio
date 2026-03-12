import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

// Rate limiting state (simple in-memory, per-IP)
const attempts = new Map();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 15;

function checkRateLimit(ip) {
    const now = Date.now();
    const record = attempts.get(ip);
    if (!record || now - record.start > WINDOW_MS) {
        attempts.set(ip, { start: now, count: 1 });
        return true;
    }
    record.count++;
    return record.count <= MAX_ATTEMPTS;
}

// ─── POST /api/auth/register ────────────────────────────────
router.post('/register', async (req, res) => {
    try {
        const ip = req.ip || req.connection.remoteAddress;
        if (!checkRateLimit(ip)) {
            return res.status(429).json({ success: false, error: 'Too many requests. Please try again later.' });
        }

        const { username, email, password, confirmPassword } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, error: 'Username, email, and password are required.' });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, error: 'Password must be at least 8 characters.' });
        }
        if (confirmPassword && password !== confirmPassword) {
            return res.status(400).json({ success: false, error: 'Passwords do not match.' });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ success: false, error: 'An account with this email already exists.' });
        }

        // Create user
        const user = await User.create({
            username: username.trim(),
            email: email.toLowerCase().trim(),
            password
        });

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        console.log(`[USER] New registration: ${user.email}`);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        console.error('[USER REGISTER ERROR]', err.message);
        if (err.code === 11000) {
            return res.status(409).json({ success: false, error: 'An account with this email already exists.' });
        }
        res.status(500).json({ success: false, error: 'Registration failed. Please try again.' });
    }
});

// ─── POST /api/auth/login ───────────────────────────────────
router.post('/login', async (req, res) => {
    try {
        const ip = req.ip || req.connection.remoteAddress;
        if (!checkRateLimit(ip)) {
            return res.status(429).json({ success: false, error: 'Too many login attempts. Please try again later.' });
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Email and password are required.' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid email or password.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        console.log(`[USER] Login: ${user.email}`);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        console.error('[USER LOGIN ERROR]', err.message);
        res.status(500).json({ success: false, error: 'Login failed. Please try again.' });
    }
});

// ─── GET /api/auth/verify ───────────────────────────────────
router.get('/verify', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, error: 'No token provided.' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ success: false, error: 'User not found.' });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        res.status(401).json({ success: false, error: 'Invalid or expired token.' });
    }
});

import AdminUser from '../models/AdminUser.js';

// ─── POST /api/auth/unified-login ───────────────────────────
router.post('/unified-login', async (req, res) => {
    try {
        const ip = req.ip || req.connection.remoteAddress;
        if (!checkRateLimit(ip)) {
            return res.status(429).json({ success: false, error: 'Too many login attempts. Please try again later.' });
        }

        const { loginIdentifier, password } = req.body;

        if (!loginIdentifier || !password) {
            return res.status(400).json({ success: false, error: 'Email/Username and password are required.' });
        }

        const identifierLower = loginIdentifier.toLowerCase().trim();

        // 1. Check AdminUser first
        // Use case-insensitive regex to find the admin
        const admin = await AdminUser.findOne({
            username: { $regex: new RegExp(`^${loginIdentifier}$`, 'i') }
        });

        console.log(`[AUTH DEBUG] Unified Login Attempt: "${loginIdentifier}" -> Admin Found: ${admin ? admin.username : 'No'}`);

        if (admin) {
            const isMatch = await admin.comparePassword(password);
            console.log(`[AUTH DEBUG] Admin Password Match: ${isMatch}`);
            if (isMatch) {
                // Generate Admin Token (uses same secret for now, but different payload structure if needed)
                const token = jwt.sign(
                    { id: admin._id, username: admin.username, role: admin.role || 'admin', type: 'admin' },
                    process.env.JWT_SECRET,
                    { expiresIn: '12h' }
                );

                console.log(`[AUTH] Unified Login: Admin ${admin.username}`);
                return res.json({
                    success: true,
                    role: 'admin',
                    token,
                    user: { username: admin.username, role: admin.role }
                });
            }
        }

        // 2. Check Regular User
        console.log(`[AUTH DEBUG] Checking Regular User: "${identifierLower}"`);
        const user = await User.findOne({ email: identifierLower });
        if (user) {
            const isMatch = await user.comparePassword(password);
            if (isMatch) {
                const token = jwt.sign(
                    { userId: user._id, email: user.email, username: user.username, type: 'user' },
                    process.env.JWT_SECRET,
                    { expiresIn: '7d' }
                );

                console.log(`[AUTH] Unified Login: User ${user.email}`);
                return res.json({
                    success: true,
                    role: 'user',
                    token,
                    user: { id: user._id, username: user.username, email: user.email }
                });
            }
        }

        // Failed both
        return res.status(401).json({ success: false, error: 'Invalid credentials.' });

    } catch (err) {
        console.error('[UNIFIED LOGIN ERROR]', err.message);
        res.status(500).json({ success: false, error: 'Login failed. Please try again.' });
    }
});

export default router;
