import { Router } from 'express';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';
import Contact from '../models/Contact.js';
import ChatbotLog from '../models/ChatbotLog.js';
import AdminActivity from '../models/AdminActivity.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// ─── Activity Logger Helper ─────────────────────────────────
async function logActivity(req, action, target = null, details = null) {
    try {
        await AdminActivity.create({
            adminId: req.admin?.id,
            adminUsername: req.admin?.username || 'unknown',
            action,
            target,
            details,
            ip: req.ip || req.connection?.remoteAddress
        });
    } catch (err) {
        console.error('[ACTIVITY LOG ERROR]', err.message);
    }
}

// ─── Stricter rate limit for admin login ─────────────────────
const loginAttempts = new Map();
function loginRateLimit(req, res, next) {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const entry = loginAttempts.get(ip);

    if (!entry || now - entry.start > 60000) {
        loginAttempts.set(ip, { start: now, count: 1 });
        return next();
    }
    if (entry.count >= 3) {
        return res.status(429).json({ success: false, error: 'Too many login attempts. Try again in 1 minute.' });
    }
    entry.count++;
    next();
}

// ─── POST /api/admin/login ───────────────────────────────────
router.post('/login', loginRateLimit, async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, error: 'Username and password required.' });
        }

        const admin = await AdminUser.findOne({ username: username.toLowerCase().trim() });
        if (!admin) {
            return res.status(401).json({ success: false, error: 'Invalid credentials.' });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials.' });
        }

        // Update last login — use findOneAndUpdate to avoid re-triggering pre-save password hash
        await AdminUser.findByIdAndUpdate(admin._id, { lastLogin: new Date() });

        // Generate JWT (24h expiry)
        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            token,
            admin: { username: admin.username, role: admin.role }
        });

        // Log activity (fire-and-forget)
        logActivity({ admin: { id: admin._id, username: admin.username } }, 'login', null, `Login from ${req.ip}`);
    } catch (err) {
        console.error('[ADMIN LOGIN ERROR]', err);
        res.status(500).json({ success: false, error: 'Server error.' });
    }
});

// ─── GET /api/admin/verify ───────────────────────────────────
router.get('/verify', authenticateToken, (req, res) => {
    res.json({ success: true, admin: req.admin });
});

// ─── GET /api/admin/stats ────────────────────────────────────
router.get('/stats', authenticateToken, async (req, res) => {
    try {
        const totalContacts = await Contact.countDocuments();
        const newContacts = await Contact.countDocuments({ status: 'new' });
        const repliedContacts = await Contact.countDocuments({ status: 'replied' });
        const totalChatbotSessions = await ChatbotLog.countDocuments();

        // Contacts this month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const monthlyContacts = await Contact.countDocuments({ createdAt: { $gte: startOfMonth } });

        // Recent 5 contacts
        const recentContacts = await Contact.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name email service status createdAt');

        res.json({
            success: true,
            stats: {
                totalContacts,
                newContacts,
                repliedContacts,
                monthlyContacts,
                totalChatbotSessions
            },
            recentContacts
        });
    } catch (err) {
        console.error('[ADMIN STATS ERROR]', err);
        res.status(500).json({ success: false, error: 'Server error.' });
    }
});

// ─── GET /api/admin/contacts ─────────────────────────────────
router.get('/contacts', authenticateToken, async (req, res) => {
    try {
        const { search, status, sort = '-createdAt', page = 1, limit = 20 } = req.query;
        const query = {};

        if (status && status !== 'all') query.status = status;
        if (search) {
            // Escape special regex characters to prevent ReDoS / injection
            const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            query.$or = [
                { name: { $regex: escaped, $options: 'i' } },
                { email: { $regex: escaped, $options: 'i' } },
                { company: { $regex: escaped, $options: 'i' } },
                { message: { $regex: escaped, $options: 'i' } }
            ];
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await Contact.countDocuments(query);
        const contacts = await Contact.find(query)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        res.json({
            success: true,
            contacts,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (err) {
        console.error('[ADMIN CONTACTS ERROR]', err);
        res.status(500).json({ success: false, error: 'Server error.' });
    }
});

// ─── PATCH /api/admin/contacts/:id ───────────────────────────
router.patch('/contacts/:id', authenticateToken, async (req, res) => {
    try {
        const { status, notes } = req.body;
        const update = {};
        if (status) update.status = status;
        if (notes !== undefined) update.notes = notes;

        const contact = await Contact.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!contact) return res.status(404).json({ success: false, error: 'Contact not found.' });

        res.json({ success: true, contact });

        // Log activity
        if (status) logActivity(req, 'status_change', req.params.id, `Status → ${status}`);
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error.' });
    }
});

// ─── DELETE /api/admin/contacts/:id ──────────────────────────
router.delete('/contacts/:id', authenticateToken, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ success: false, error: 'Contact not found.' });

        logActivity(req, 'delete_contact', req.params.id, `Deleted: ${contact.name} (${contact.email})`);
        res.json({ success: true, message: 'Contact deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error.' });
    }
});

// ─── GET /api/admin/export/contacts ──────────────────────────
router.get('/export/contacts', authenticateToken, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        const csvHeader = 'Name,Email,Phone,Company,Service,Budget,Message,Status,Date\n';
        const csvRows = contacts.map(c => {
            const escape = (s) => `"${(s || '').replace(/"/g, '""')}"`;
            return [
                escape(c.name), escape(c.email), escape(c.phone),
                escape(c.company), escape(c.service), escape(c.budget),
                escape(c.message), escape(c.status),
                escape(c.createdAt.toISOString())
            ].join(',');
        }).join('\n');

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=skylix-contacts.csv');
        res.send(csvHeader + csvRows);

        logActivity(req, 'export_csv', null, `Exported ${contacts.length} contacts`);
    } catch (err) {
        res.status(500).json({ success: false, error: 'Export failed.' });
    }
});

// ─── GET /api/admin/chatbot-logs ─────────────────────────────
router.get('/chatbot-logs', authenticateToken, async (req, res) => {
    try {
        const { search, tab, sort = '-startedAt', page = 1, limit = 20 } = req.query;
        const query = {};

        if (tab && tab !== 'all') query.activeTab = tab;
        if (search) {
            const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            query['messages.text'] = { $regex: escaped, $options: 'i' };
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await ChatbotLog.countDocuments(query);
        const logs = await ChatbotLog.find(query)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit))
            .select('sessionId activeTab messageCount startedAt endedAt');

        res.json({
            success: true,
            logs,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (err) {
        console.error('[ADMIN CHATBOT LOGS ERROR]', err);
        res.status(500).json({ success: false, error: 'Server error.' });
    }
});

// ─── GET /api/admin/chatbot-logs/:sessionId ──────────────────
router.get('/chatbot-logs/:sessionId', authenticateToken, async (req, res) => {
    try {
        const log = await ChatbotLog.findOne({ sessionId: req.params.sessionId });
        if (!log) return res.status(404).json({ success: false, error: 'Session not found.' });
        res.json({ success: true, log });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error.' });
    }
});

// ─── GET /api/admin/activity ─────────────────────────────────
router.get('/activity', authenticateToken, async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await AdminActivity.countDocuments();
        const activities = await AdminActivity.find()
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        res.json({
            success: true,
            activities,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error.' });
    }
});

export default router;
