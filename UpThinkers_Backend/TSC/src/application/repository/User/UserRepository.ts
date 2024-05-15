import { User } from '../../entities/user';
import UserModel from '../../../frameworks/database/models/user';
import { UserRepository } from '../../interfaces/repositories/user-repository';
import { SignupData } from '../../entities/signupData';
import { genAccessToken } from '../../functions/CommonFunctions';
import otpModel from '../../../frameworks/database/models/otp';
const jwt = require('jsonwebtoken')



export class UserRepositoryImpl implements UserRepository {

    async save (user: User):Promise <{user:User| null,token :string|null}>{
        console.log('repositoryy');

        const {FirstName,Email,Mobile,Password}=user

        const newUser = new UserModel({FirstName,Email,Mobile,Password})
        await newUser.save()

        let token = await genAccessToken(user)
        console.log('tokennn',token);
        return {user:newUser ? newUser.toObject() as User:null,token}
           
    }


    async userExists(email: string): Promise<boolean> {
        console.log('3', email);

        const userExists = await UserModel.findOne({ email: email });
        return !!userExists;
    }

    async saveToDB (signupData:SignupData,otp : string):Promise<boolean> {
        try {
            console.log('redyyy');
            
            const {FirstName,email,Password,Mobile,otp }= signupData
            const isAddedToDb= await otpModel.create({Name:FirstName,Email:email,Password:Password,Mobile:Mobile,otp:otp})
            return isAddedToDb ? true : false
        
        } catch (error) {
            console.error("Error saving data to database:", error);
            return false;
        }
    }

    async verifyotp(otp: string): Promise<User | null> {
        try {
            console.log('3');

            const user = await otpModel.findOne({ otp: otp });
            console.log('user', user);

            return user ? user as unknown as User : null;
        } catch (error) {
            console.error('Error verifying OTP from database:', error);
            return null;
        }
    }



}

