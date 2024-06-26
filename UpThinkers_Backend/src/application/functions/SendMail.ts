import nodemailer from 'nodemailer';
import { Mailer, MailerInterface } from '../../config/mailer';

async function sendMail(email: string,otp: string): Promise <{success:boolean}>{
    const transporter=nodemailer.createTransport({
        service :'Gmail',
        auth:{
            user:Mailer.user,
            pass:Mailer.pass,
        },
        tls:{
            rejectUnauthorized:false,
        }
    })

    const mailOptions={
        from : Mailer.user,
        to: email,
        subject: 'Heyy.. this is registration otp for UpThinkers',
        text: `Your OTP is ${otp}`
    }
    try {
        const info=await transporter.sendMail(mailOptions)
        return {success:true}
        
    } catch (error) {
        console.error("Error sending email: ", error);
        return { success: false };
        
    }
}


export default sendMail;