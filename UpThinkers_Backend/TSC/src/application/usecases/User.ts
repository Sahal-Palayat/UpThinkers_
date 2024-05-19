import { genRefreshToken } from '../functions/CommonFunctions'
import { SignupData } from '../entities/signupData'
import { User } from '../entities/user'
import { IMailer } from '../interfaces/external-lib/IMailer'
import { UserRepository } from '../interfaces/repositories/user-repository'
import { UserInteractor } from '../interfaces/usecases/UserInteractor'
import UserModel from '../../frameworks/database/models/user'

export class UserInteractorImpl implements UserInteractor {
    constructor(private readonly Repository: UserRepository, private readonly mailer: IMailer) {
        // this.Repository.save()
    }

    async register(userData: { Name: string, Email: string, Mobile: number, Password: string }): Promise<{ user: User | null, token: string | null }> {

        try {
            const newUser = {
                Name: userData.Name,
                Email: userData.Email,
                Mobile: userData.Mobile,
                Password: userData.Password,
                CreatedAt: new Date()
            }
            console.log(newUser);

            const { user, token } = await this.Repository.save(newUser)

            return { user, token }
        } catch (error) {
            console.error('Error during signup:', error);
            throw error;
        }

    }

    async sendMail(signupData: SignupData): Promise<{ userExists: boolean, isMailSent: boolean }> {
        console.log('2', signupData)
        const email = signupData.email;
        const userExists = await this.Repository.userExists(email);
        console.log(userExists, "userData");

        if (userExists) {
            return { userExists: true, isMailSent: false };
        }

        try {


            const { otp, success } = await this.mailer.sendMail(email);
            console.log(otp);
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


    async verifyOtp(otp: string): Promise<{ success: boolean, user?: User, token: string | null, refreshToken: string | null }> {
        try {
            const isUser = await this.Repository.verifyotp(otp)
            if (isUser) {
                const { user, token, refreshToken } = await this.Repository.save(isUser)
                if (user && token) {
                    return { success: true, token, refreshToken, user };

                }

            }
            return { success: false, token: null, refreshToken: null };

        } catch (error) {
            console.log(error);
            return { success: false, token: null, refreshToken: null };

        }
    }


    async login(credentials: { email: string, password: string }): Promise<{ user: User | null, message: string, token: string | null, refreshToken: string | null }> {
        try {



            const { user, message, token }: {
                user: User | null,
                message: string,
                token: string | null
            } = await this.Repository.findCredentials(credentials.email, credentials.password)
            console.log(user, token, message, 'loggggg');


            const refreshToken = user ? await genRefreshToken(user) : ''

            return { user, message, token, refreshToken }

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async getUsers(): Promise<User[] |[]> {
        try {
            const user = await this.Repository.getUsers()
            if(user) {
                return user
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    }



}

