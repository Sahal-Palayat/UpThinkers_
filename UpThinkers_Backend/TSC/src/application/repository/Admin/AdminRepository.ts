import { User } from "../../entities/user";
import UserModel from "../../../frameworks/database/models/user";
import { AdminRepository } from "../../interfaces/repositories/admin-repository";
import { genAccessToken } from "../../functions/CommonFunctions";
import { Tutor } from "../../entities/tutor";
import TutorModel from "../../../frameworks/database/models/tutor";
import { isObjectIdOrHexString } from "mongoose";

export class AdminRepositoryImpl implements AdminRepository {

    async findCredentials(email: string, password: string): Promise<{ user: User | null, adminToken: string | null, message: string }> {

        console.log('user repositoryyyy');
        console.log(email, password);

        const user = await UserModel.findOne({ Email: email, isAdmin: true })

        console.log(user)

        let message = ''
        let adminToken = null


        if (!user) {
            message = ' invalid user'
        } else {
            if (password !== user.Password) {
                console.log('invalid password');
                message = 'Invalid Password'
            } else {
                adminToken = await genAccessToken(user,'admin')
                console.log('token', adminToken);
            }
        }

        if (user && !message) {
            return { user: user.toObject() as User, message, adminToken }
        } else {
            console.log('message222', message);

            return { user: null, message, adminToken };
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

    async blockUser(id: string): Promise<User | null> {

        try {
            const result = isObjectIdOrHexString(id)
            if (!result) {

            }
            const user = await UserModel.findById(id)
            if (!user) {

            }
            if (user) {
                user.isBlocked = !user.isBlocked
                await user.save()
            }
            return user ? user.toObject() as User : null
        } catch (error) {
            console.log(error);
            throw error

        }
    }

    async blockTutor(id: string): Promise<Tutor | null> {

        try {
            const result = isObjectIdOrHexString(id)
            if (!result) {

            }
            const tutor = await TutorModel.findById(id)
            if (!tutor) {

            }
            if (tutor) {
                tutor.isBlocked = !tutor.isBlocked
                await tutor.save()
            }
            return tutor ? tutor.toObject() as Tutor : null
        } catch (error) {
            console.log(error);
            throw error

        }
    }


}