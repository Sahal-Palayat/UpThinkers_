import dotenv from 'dotenv'
dotenv.config()

export interface MailerInterface {
    user: string | undefined 
    pass: string | undefined
}

export const Mailer :MailerInterface = {

    user: process.env.MAILER,
    pass: process.env.MAILERPASSWORD

}
