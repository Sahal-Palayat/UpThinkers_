import { User } from "../../entities/user";
import { SignupData } from "../../entities/signupData";

export interface UserRepository{
    save(user: User): Promise<{ user: User | null, token: string | null,refreshToken:string|null }>;
    userExists(email: string): Promise<boolean>;
    saveToDB(signupData: SignupData, otp: string): Promise<boolean>;
    verifyotp(otp: string): Promise<User | null>;
    findCredentials (email : string,password: string): Promise <{user:User | null,message:string, token : string | null}> 
    getUsers():Promise<User[] | [] >;
    updateOTP(emailId: string,newOtp:string) : Promise<boolean>;

}