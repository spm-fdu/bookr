const express = require('express');
const nodemailer = require("nodemailer");

const app = express();

export default {
    path: '/api/mailer',
    handler: app
}

app.use(express.json());

app.post('/', async (req, res) => {
    console.log("Start post");
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'spm.fudan@gmail.com',
            pass: process.env.GMAIL_APP_PASSWORD
        },
    });

    const info = await transporter.sendMail({
        from: '"SPM Fudan" <spm.fudan@gmail.com>',
        to: req.body.email,
        subject: "Booking confirmation",
        text: "Hi, this mail has been sent to you to confirm your recently made bookings. Thank you.",
    });

    console.log("Message sent: %s", info.messageId);
});
