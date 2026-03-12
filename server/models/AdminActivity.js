import mongoose from 'mongoose';

const adminActivitySchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminUser',
        required: true
    },
    adminUsername: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true,
        enum: ['login', 'status_change', 'delete_contact', 'export_csv', 'view_contacts']
    },
    target: {
        type: String,
        default: null
    },
    details: {
        type: String,
        default: null
    },
    ip: {
        type: String,
        default: null
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Indexes
adminActivitySchema.index({ timestamp: -1 });
adminActivitySchema.index({ adminId: 1 });
adminActivitySchema.index({ action: 1 });

const AdminActivity = mongoose.model('AdminActivity', adminActivitySchema);

export default AdminActivity;
