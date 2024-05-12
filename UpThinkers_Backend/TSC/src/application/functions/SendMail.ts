import nodemailer from 'nodemailer';
import { Mailer, MailerInterface } from '../../config/mailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: <MailerInterface>Mailer
})


export const SendVerificationLink: Function = async (Email: string, VerificationLink: string): Promise<boolean> => {

    try {

        const text = "Welcome to upthinkers learning hub.";
        const footer = `Link : ${VerificationLink}. link will be expired `

        const mailOptions = {
            from: Mailer.user,
            to: Email,
            subject: "Welcome to upthinkers learning hub",
            text: text,
            html: footer
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('error sending mail', error.message);
                return false
            }
            console.log('email successfully sent', info.response);

        })

        return true;

    } catch (error) {
        console.log(error);
        return false
        
    }

}

const htmlSender: Function= (OTP:number ,text:string ):string=> {
    return `
        <html>
        <body>
        <center><p style='text-decoration:underline'>OTP For Login Verification</p></center>
            <center><h1 style="font-size: 36px; color: #ff0000;">${OTP}</h1></center>
            <p>${text}</p>
        </body>
        </html>
    `;

}