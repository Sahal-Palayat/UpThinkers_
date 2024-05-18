import { User } from "../../entities/user";
import UserModel from "../../../frameworks/database/models/user";
import { AdminRepository } from "../../interfaces/repositories/admin-repository";
import { genAccessToken } from "../../functions/CommonFunctions";

export class AdminRepositoryImpl implements AdminRepository {

    async findCredentials(email: string,password: string): Promise<{user :User | null ,token: string| null,message:string}>{
      
        console.log('user repositoryyyy');
        console.log(email,password);

        const user = await UserModel.findOne({Email:email})

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
        console.log('message222', message);

        return { user: null, message, token };
    }
    
  
  }
}