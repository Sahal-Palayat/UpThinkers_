import {hash ,compare } from 'bcrypt'

export function genRandomString(length :number):string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ''
    for(let i=0 ;i < length ;i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result
}

export function genRandomName (prefix :string, randomStringLength :number):string {
      const randomNumber = Math.floor(Math.random()* 9000)+1000
      const randomString = genRandomString(randomStringLength)
      return `${prefix}-${randomNumber}-${randomString}`
}


export function genVerificationLink():  string {
    const VerificationToken= genRandomString(32)
    return VerificationToken
}

export const HashPassword: Function = async (Password:string)=>{
    return await hash(Password,10)
}

export const CalculateTime: Function = async (Password: string ,Hashed:string )=>{
    return await compare(Password,Hashed)
}


export const Otpgen:Function= ()=>{
    const otp=Math.floor(100000 + Math.random()*900000);
    return otp.toString()
}

