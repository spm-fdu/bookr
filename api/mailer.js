const nodemailer = require("nodemailer");

async function main() {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'spm.fudan@gmail.com',
            pass: 'trbjvavdwdkxteji'
        },
    });

    let info = await transporter.sendMail({
        from: '"SPM Fudan 👻" <spm.fudan@gmail.com>',
        to: "gerardmarcosfreixas@gmail.com",
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>"
    });

    console.log("Message sent: %s", info.messageId);
}
