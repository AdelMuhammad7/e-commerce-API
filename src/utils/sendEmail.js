import nodemailer from "nodemailer"

export const sendEmail  = async (options) => {
    // 1) create transporter >> send email via (gmail - mailgun - mailtrap - sendgrid)
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true, // Use true for port 465, false for port 587
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // 2) Define email options like (from , to , subject , content)
    const mailOptions = {
        from : "Dola Shop",
        to : options.email,
        subject : options.subject,
        text : options.message,
    }

    // 3) Send Email
    await transporter.sendMail(mailOptions)
}