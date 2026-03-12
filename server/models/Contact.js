import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address']
    },
    phone: {
        type: String,
        trim: true,
        maxlength: 30
    },
    company: {
        type: String,
        trim: true
    },
    service: {
        type: String,
        trim: true
    },
    budget: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 5000
    },
    type: {
        type: String,
        default: 'contact_form'
    },
    status: {
        type: String,
        enum: ['new', 'read', 'replied', 'archived'],
        default: 'new'
    },
    notes: {
        type: String,
        trim: true,
        maxlength: 5000
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Indexes for query performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
