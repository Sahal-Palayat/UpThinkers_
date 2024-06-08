import {hash ,compare } from 'bcrypt'
import { User } from '../entities/user'
import { Tutor } from '../entities/tutor'
const jwt = require('jsonwebtoken')
import {config} from 'dotenv'
config()
// export function genRandomString(length :number):string {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = ''
//     for(let i=0 ;i < length ;i++) {
//         result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return result
// }

// export function genRandomName (prefix :string, randomStringLength :number):string {
//       const randomNumber = Math.floor(Math.random()* 9000)+1000
//       const randomString = genRandomString(randomStringLength)
//       return `${prefix}-${randomNumber}-${randomString}`
// }


// export function genVerificationLink():  string {
//     const VerificationToken= genRandomString(32)
//     return VerificationToken
// }

export const HashPassword: Function = async (Password:string)=>{
    return await hash(Password,10)
}

export const CalculateTime: Function = async (Password: string ,Hashed:string )=>{
    return await compare(Password,Hashed)
}


export function genAccessToken(user:any,role:string):string {
   const secret = process.env.JWT_SECRET || ' ';
    return jwt.sign({ id: user._id, role:role }, secret, { expiresIn: '1d' });
}

// export function genAccessTokenTutor(user:any,role:string):string {
//     const secret = process.env.JWT_SECRET || ' ';
//      return jwt.sign({ id: user._id, role:role }, secret, { expiresIn: '1d' });
//  }



export function genRefreshToken(user:User,role:any): string {
    const secret = process.env.JWT_SECRET || ' ';
    return jwt.sign({ id: user.Email,role:role }, secret, { expiresIn: '7d' });
}


export const genRandomOtp:Function= ()=>{
    const otp=Math.floor(1000 + Math.random()*9000);
    return otp.toString()
}

