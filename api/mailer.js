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
            pass: ''
        },
    });

    const info = await transporter.sendMail({
        from: '"SPM Fudan 👻" <spm.fudan@gmail.com>',
        to: req.body.email,
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>"
    });

    console.log(req.body.email);
    console.log("Message sent: %s", info.messageId);
});
