import {hash ,compare } from 'bcrypt'
import { User } from '../entities/user'
import { Tutor } from '../entities/tutor'
const jwt = require('jsonwebtoken')
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


export function genAccessToken(user:any):string {
    return jwt.sign({ userId: user._id }, 'athee....', { expiresIn: '1d' });
}
export function genAccessTokenTutor(tutor:any):string {
    return jwt.sign({ tutorId: tutor._id }, 'athee....', { expiresIn: '1d' });
}


export function genRefreshToken(user:User): string {
    return jwt.sign({ userId: user.Email }, 'athee...', { expiresIn: '7d' });
}

export function genRefreshTokenTutor(tutor:Tutor): string {
    return jwt.sign({ tutorId: tutor.Email }, 'athee...', { expiresIn: '7d' });
}

export const genRandomOtp:Function= ()=>{
    const otp=Math.floor(1000 + Math.random()*9000);
    return otp.toString()
}

