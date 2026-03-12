import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AdminUser from './models/AdminUser.js';

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('❌ MONGODB_URI is missing from .env');
    process.exit(1);
}

const resetPassword = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(uri);
        console.log('✅ Connected.');

        // Debug: List all admin users
        const allAdmins = await AdminUser.find({});
        console.log('Current Admin Users:', allAdmins.map(u => `${u.username} (${u.role})`));

        const targetUsername = 'sohankallur18';
        const newPassword = '@Sohankallur18';

        // Find the user (case-insensitive)
        let user = await AdminUser.findOne({
            username: { $regex: new RegExp(`^${targetUsername}$`, 'i') }
        });

        if (!user) {
            console.log(`❌ User '${targetUsername}' not found. Creating it...`);
            try {
                user = await AdminUser.create({
                    username: targetUsername,
                    password: newPassword, // This will be hashed by pre-save hook
                    role: 'superadmin'
                });
                console.log(`✅ Created new admin user: '${targetUsername}' with password: '${newPassword}'`);
            } catch (createErr) {
                console.error('❌ Creation failed:', createErr.message);
            }
        } else {
            console.log(`Found user '${user.username}'. Updating password...`);
            user.password = newPassword;

            // Ensure username is exactly as requested if it was different case
            if (user.username !== targetUsername) {
                user.username = targetUsername;
            }

            await user.save();
            console.log(`✅ Successfully updated password for '${targetUsername}'`);
        }

    } catch (error) {
        console.error('❌ Top-level Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
        process.exit(0);
    }
};

resetPassword();
