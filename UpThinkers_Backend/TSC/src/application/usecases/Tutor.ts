import { genRefreshTokenTutor } from "../functions/CommonFunctions";
import { SignupDataTutor } from "../entities/signUpDataTutor";
import { Tutor } from "../entities/tutor";
import { IMailer } from "../interfaces/external-lib/IMailer";
import { TutorRepository } from "../interfaces/repositories/tutor-repository";
import { TutorInteractor } from "../interfaces/usecases/TutorInteractor";


export class TutorInteractorImpl implements TutorInteractor {
    constructor(private readonly Repository: TutorRepository, private readonly mailer: IMailer){ }

    async register(tutorData: { Name: string, Email: string, Mobile: number, Password: string }): Promise<{ tutor: Tutor | null, token: string | null }> {

        try {
            const newUser = {
                Name: tutorData.Name,
                Email: tutorData.Email,
                Mobile: tutorData.Mobile,
                Password: tutorData.Password,
                CreatedAt: new Date()
            }
            console.log(newUser);

            const { tutor, token } = await this.Repository.save(newUser)

            return { tutor, token }
        } catch (error) {
            console.error('Error during signup:', error);
            throw error;
        }

    }

    async sendMail(signupData: SignupDataTutor): Promise<{ tutorExists: boolean, isMailSent: boolean }> {
        console.log('2', signupData)
        const email = signupData.email;
        const tutorExists = await this.Repository.tutorExists(email);
        console.log(tutorExists, "tutorData");

        if (tutorExists) {
            return { tutorExists: true, isMailSent: false };
        }

        try {


            const { otp, success } = await this.mailer.sendMail(email);
            console.log(otp);
            if (success) {
                const saveToDB = await this.Repository.saveToDB(signupData, otp)


                return { tutorExists: false, isMailSent: true };
            } else {
                return { tutorExists: false, isMailSent: false };
            }
        } catch (error) {
            console.error('Error sending email:', error);
            return { tutorExists: false, isMailSent: false };
        }
    }

    async verifyOtp(otp: string): Promise<{ success: boolean,tutor?: Tutor, token: string | null,refreshToken:string|null }> {
        try {
            const isUser = await this.Repository.verifyotp(otp)
            if (isUser) {
                const { tutor, token, refreshToken} = await this.Repository.save(isUser)
                if (tutor && token) {
                    return { success: true, token,refreshToken,tutor};

                }

            }
            return { success: false, token: null,refreshToken: null }; 

        } catch (error) {
            console.log(error);
            return { success: false, token: null,refreshToken:null };

        }
    }

    
    async login(credentials: { email: string, password: string }): Promise<{ tutor: Tutor | null, message: string, token: string | null, refreshToken: string | null }> {
        try {



            const { tutor, message, token }: {
                 tutor: Tutor | null,
                message: string,
                token: string | null
            } = await this.Repository.findCredentials(credentials.email, credentials.password)
            console.log(tutor, token, message, 'loggggg');


            const refreshToken = tutor ? await genRefreshTokenTutor(tutor) : ''

            return { tutor, message, token, refreshToken }

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async getUsers(): Promise<Tutor[] |[]> {
        try {
            const tutor = await this.Repository.getUsers()
            if(tutor) {
                return tutor
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    }



}