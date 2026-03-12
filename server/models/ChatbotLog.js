import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        enum: ['user', 'bot'],
        required: true
    },
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { _id: false });

const chatbotLogSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    activeTab: {
        type: String,
        enum: ['support', 'sales'],
        default: 'support'
    },
    messages: [chatMessageSchema],
    messageCount: {
        type: Number,
        default: 0
    },
    userAgent: {
        type: String,
        trim: true,
        maxlength: 500
    },
    startedAt: {
        type: Date,
        default: Date.now
    },
    endedAt: {
        type: Date,
        default: null
    }
});

// Indexes
chatbotLogSchema.index({ sessionId: 1 });
chatbotLogSchema.index({ startedAt: -1 });
chatbotLogSchema.index({ activeTab: 1 });

const ChatbotLog = mongoose.model('ChatbotLog', chatbotLogSchema);

export default ChatbotLog;
