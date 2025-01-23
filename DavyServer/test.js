const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendTestEmail() {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // TLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.APP_PASSWORD
            }
        });

        const info = await transporter.sendMail({
            from: `"Your Name" <${process.env.EMAIL_USER}>`,
            to: "elenakolisnyk6@gmail.com",
            subject: "Testing Nodemailer",
            text: "Hello! This is a test email.",
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

sendTestEmail();
