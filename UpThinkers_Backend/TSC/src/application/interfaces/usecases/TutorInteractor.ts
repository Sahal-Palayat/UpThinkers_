import { Tutor } from "../../entities/tutor";
import { SignupDataTutor } from "../../entities/signUpDataTutor";

export interface TutorInteractor {
    register(tutorData: { Name: string, Password: string, Email: string, Mobile: number }): Promise<{ tutor: Tutor | null, token: string | null }>
    sendMail(signupData: SignupDataTutor): Promise<{ tutorExists: boolean, isMailSent: boolean }>
    verifyOtp(otp: string): Promise<{ success: boolean, token: string | null,tutor?: Tutor, refreshToken:string |null}>;
    login(credentials : {email: string, password:string}):Promise <{tutor:Tutor | null,token :string |null,message: string, refreshToken:string | null}>
    getUsers(): Promise<Tutor[] | []>;
    resendMail(email: string):  Promise<boolean>;

}