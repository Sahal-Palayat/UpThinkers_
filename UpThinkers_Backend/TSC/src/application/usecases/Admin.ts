import { AdminRepository } from "../interfaces/repositories/admin-repository";
import { genRefreshToken } from "../functions/CommonFunctions";
import { User } from "../entities/user";
import { AdminInteractor } from "../interfaces/usecases/AdminInteractor";
import { Tutor } from "../entities/tutor";




export class AdminInteractorImpl implements AdminInteractor {
    constructor(private readonly Repository: AdminRepository) {
        // this.Repository.save()
    }


    
    async login(credentials: { email: string, password: string }): Promise<{ user: User | null, message: string, adminToken: string | null, refreshToken: string | null }> {
        try {



            const { user, message, adminToken }: {
                user: User | null,
                message: string,
                adminToken: string | null
            } = await this.Repository.findCredentials(credentials.email, credentials.password)
            console.log(user, adminToken, message, 'loggggg');


            const refreshToken = user ? await genRefreshToken(user,'admin') : ''

            return { user, message, adminToken, refreshToken }

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

    
    async getTutors(): Promise<Tutor[] |[]> {
        try {
            const tutor = await this.Repository.getTutors()
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

    async blockUser(userId: string):Promise <User|null> {
        try {
            const user = await this.Repository.blockUser(userId)
           return user
        } catch (error) {
            console.log(error);
            throw error
            
        }

    }


    async blockTutor(tutorId: string):Promise <Tutor|null> {
        try {
            const tutor = await this.Repository.blockTutor(tutorId)
           return tutor
        } catch (error) {
            console.log(error);
            throw error
            
        }

    }
}