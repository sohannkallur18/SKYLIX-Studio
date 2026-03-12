import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, html }) => {
    try {
        if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.warn('⚠ Email notification disabled: SMTP credentials are not fully configured in .env');
            return false;
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `"Skylix Notifications" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        });

        console.log(`✦ Email sent: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error('✖ Error sending email:', error.message);
        return false;
    }
};
