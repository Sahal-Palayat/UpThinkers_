import dotenv from 'dotenv'

dotenv.config()

export interface AuthInterface {
    JWT_SECRET:string;
    JWT_EXPIRES_IN:string
    JWT_REMEMBER_ME:string
    baseLink:string
    verifyAccount:string;
}

const auth =<AuthInterface>{
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN,
    JWT_REMEMBER_ME:process.env.JWT_REMEMBER_ME,
    baseLink:'http://localhost:3030',
    verifyAccount:'verify-account',

}

export default auth;