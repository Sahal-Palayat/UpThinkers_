import { genRefreshToken } from '../functions/CommonFunctions'
import { SignupData } from '../entities/signupData'
import { User } from '../entities/user'
import { IMailer } from '../interfaces/external-lib/IMailer'
import { UserRepository } from '../interfaces/repositories/user-repository'
import { UserInteractor } from '../interfaces/usecases/UserInteractor'

export class UserInteractorImpl implements UserInteractor {
    constructor(private readonly Repository: UserRepository, private readonly mailer:IMailer){ }

    async register (userData:{FirstName:string,Email:string,Mobile:number,Password:string}): Promise<{ user: User | null, token: string | null }>{

        try {
            const newUser = {
                FirstName: userData.FirstName,
                Email: userData.Email,
                Mobile: userData.Mobile,
                Password:  userData.Password,
                CreatedAt: new Date()
            }
            console.log(newUser);
            
            const {user,token }= await this.Repository.save(newUser)

            return {user,token}
        } catch (error) {
            console.error('Error during signup:', error);
            throw error;
        }

    }

    async sendMail(signupData: SignupData): Promise<{ userExists: boolean, isMailSent: boolean }> {
        console.log('2', signupData)
        const email = signupData.Email;
        const userExists = await this.Repository.userExists(email);
        if (userExists) {
            return { userExists: true, isMailSent: false };
        }

        try {
            const { otp, success } = await this.mailer.sendMail(email);
            if (success) {
                const saveToDB = await this.Repository.saveToDB(signupData, otp)
                return { userExists: false, isMailSent: true };
            } else {
                return { userExists: false, isMailSent: false };
            }
        } catch (error) {
            console.error('Error sending email:', error);
            return { userExists: false, isMailSent: false };
        }
    }


    async verifyOtp(otp: string):Promise<{success:boolean,token:string|null}>{
        try {
            const isUser= await this.Repository.verifyotp(otp)
            if(isUser){
                const {user,token}=await this.Repository.save(isUser)
                if(user){
                    return { success: true, token };

                }

            }   
            return { success: false,token:null };
         
        } catch (error) {
            console.log(error);
            return  {success: false,token:null};
            
        }
    }



}

