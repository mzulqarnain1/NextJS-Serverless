// This code is copied from nodemailer package & then modified
import nodemailer from 'nodemailer'

export async function sendEmail(email: string, name: string, days: number){
    let transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false,
        auth: {
            user: "",
            pass: "",
        },
    });
    let info = await transporter.sendMail({
        from: '"Stackbuilders 👻" <stackbuilders.swag@gmail.com>',
        to: email, // list of receivers
        subject: "Swag From Stackbuilders", // Subject line
        html: `<h1>Hey ${name}, Thank you for your swag request. You will receive a parcel within ${days} days.</h1>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
