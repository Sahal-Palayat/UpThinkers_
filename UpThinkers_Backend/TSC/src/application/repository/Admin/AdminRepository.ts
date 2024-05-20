import { User } from "../../entities/user";
import UserModel from "../../../frameworks/database/models/user";
import { AdminRepository } from "../../interfaces/repositories/admin-repository";
import { genAccessToken } from "../../functions/CommonFunctions";
import { Tutor } from "../../entities/tutor";
import TutorModel from "../../../frameworks/database/models/tutor";

export class AdminRepositoryImpl implements AdminRepository {

    async findCredentials(email: string, password: string): Promise<{ user: User | null, token: string | null, message: string }> {

        console.log('user repositoryyyy');
        console.log(email, password);

        const user = await UserModel.findOne({ Email: email, isAdmin: true })

        console.log(user)

        let message = ''
        let token = null


        if (!user) {
            message = ' invalid user'
        } else {
            if (password !== user.Password) {
                console.log('invalid password');
                message = 'Invalid Password'
            } else {
                token = await genAccessToken(user)
                console.log('token', token);
            }
        }

        if (user && !message) {
            return { user: user.toObject() as User, message, token }
        } else {
            console.log('message222', message);

            return { user: null, message, token };
        }


    }


    async getUsers(): Promise<User[] | []> {
        try {
            const users: User[] = await UserModel.find();
            return users
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

    async getTutors(): Promise<Tutor[] | []> {
        try {
            const tutors: Tutor[] = await TutorModel.find();
            return tutors
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

}