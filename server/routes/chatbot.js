import { Router } from 'express';
import ChatbotLog from '../models/ChatbotLog.js';

const router = Router();

// ─── POST /api/chatbot/session — Save chat session ──────────
router.post('/session', async (req, res) => {
    try {
        const { sessionId, messages, activeTab } = req.body;

        if (!sessionId || !messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ success: false, error: 'Invalid session data.' });
        }

        // Sanitize messages
        const sanitizedMessages = messages.slice(0, 100).map(m => ({
            sender: m.sender === 'user' ? 'user' : 'bot',
            text: String(m.text || '').slice(0, 2000),
            timestamp: m.timestamp ? new Date(m.timestamp) : new Date()
        }));

        await ChatbotLog.findOneAndUpdate(
            { sessionId },
            {
                $set: {
                    messages: sanitizedMessages,
                    activeTab: activeTab === 'sales' ? 'sales' : 'support',
                    messageCount: sanitizedMessages.length,
                    endedAt: new Date(),
                    userAgent: String(req.headers['user-agent'] || '').slice(0, 500)
                },
                $setOnInsert: {
                    startedAt: new Date()
                }
            },
            { upsert: true, new: true }
        );

        res.json({ success: true });
    } catch (err) {
        console.error('[CHATBOT SESSION ERROR]', err.message);
        res.status(500).json({ success: false, error: 'Failed to save session.' });
    }
});

export default router;
