import { Tutor } from "../../entities/tutor";
import { SignupDataTutor } from "../../entities/signUpDataTutor";


export interface TutorRepository {
    save(tutor: Tutor): Promise<{ tutor: Tutor | null, token: string | null,refreshToken:string|null }>;
    tutorExists(email: string): Promise<boolean>;
    saveToDB(signupData: SignupDataTutor, otp: string): Promise<boolean>;
    verifyotp(otp: string): Promise<Tutor | null>;
    findCredentials (email : string,password: string): Promise <{tutor:Tutor | null,message:string, token : string | null}> 
    getUsers():Promise<Tutor[] | [] >;
    updateOTP(emailId: string,newOtp:string) : Promise<boolean>;


}