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

        const {Name,Email,Mobile,Password}=user
        console.log(user,'lasttt');
        

        const newUser = new UserModel({Name,Email,Mobile,Password})
        console.log(newUser,'new userrrrrrrrrrrrrrrrrr');
        
        await newUser.save()

        let token = await genAccessToken(user)
        console.log('tokennn',token);
        return {user:newUser ? newUser.toObject() as User:null,token}
           
    }


    async userExists(email: string): Promise<boolean> {
        const userExists = await UserModel.findOne({ email: email });
        return !!userExists; 
    }

    async saveToDB (signupData:SignupData,otp : string):Promise<boolean> {
        try {
            console.log('redyyy');
            
            const {name,email,password,mobile }= signupData
            console.log(signupData);
            
            const isAddedToDb= await otpModel.insertMany({Name:name,Email:email,Password:password,Mobile:mobile,otp:otp})
            return isAddedToDb ? true : false
        
        } catch (error) {
            console.error("Error saving data to database:", error);
            return false;
        }
    }

    async verifyotp(otp: string): Promise<User | null> {
        try {
            console.log('3',otp);

            const user = await otpModel.findOne({ otp: otp });
            console.log('user', user);

            return user ? user as unknown as User : null;
        } catch (error) {
            console.error('Error verifying OTP from database:', error);
            return null;
        }
    }

    async findCredentials(email: string,password: string): Promise<{user :User | null ,token: string| null,message:string}>{
      
            console.log('user repositoryyyy');
            console.log(email,password);
    
            const user = await UserModel.findOne({email:email})

            console.log(user)
            
            let message=''
            let token= null


            if(!user){
                message= ' invalid user'
            }else{
                if(password!==user.Password){
                    console.log('invalid password');
                    message= 'Invalid Password'
                }else{
                    token = await genAccessToken(user)
                    console.log('token',token);
                }
            }

          if(user && !message){
            return {user: user.toObject() as User,message,token}
          }  else {
            console.log('message', message);

            return { user: null, message, token };
        }
        
      
      }

}

