import { User } from '../../entities/user';
import UserModel from '../../../frameworks/database/models/user';
import { UserRepository } from '../../interfaces/repositories/user-repository';
import { SignupData } from '../../entities/signupData';
import { genAccessToken, genRefreshToken } from '../../functions/CommonFunctions';
import otpModel from '../../../frameworks/database/models/otp';
import { Category } from '../../entities/category';
import CategoryModel from '../../../frameworks/database/models/category';
import { Course } from '../../entities/course';
import CourseModel from '../../../frameworks/database/models/course';
import { Order } from '../../entities/order';
import OrderModel from '../../../frameworks/database/models/order';
import { Tutor } from '../../entities/tutor';
import TutorModel from '../../../frameworks/database/models/tutor';
const jwt = require('jsonwebtoken')



export class UserRepositoryImpl implements UserRepository {

    async save(user: User): Promise<{ user: User | null, token: string | null, refreshToken: string | null }> {
      
      try {
        console.log('repositoryy');

        const { Name, Email, Mobile, Password } = user
        console.log(user, 'lasttt');


        const newUser = new UserModel({ Name, Email, Mobile, Password })
        console.log(newUser, 'new userrrrrrrrrrrrrrrrrr');

        await newUser.save()

        let token = await genAccessToken(user,'user')
        let refreshToken = await genRefreshToken(user,'user')
        console.log('tokennn', token);
        return { user: newUser ? newUser.toObject() as User : null, token, refreshToken }
        } catch (error) {
            console.log(error);
            throw error
            
        }
    }


    async userExists(email: string): Promise<boolean> {
        const userExists = await UserModel.findOne({ Email: email });
        return !!userExists;
    }

    async saveToDB(signupData: SignupData, otp: string): Promise<boolean> {
        try {
            console.log('redyyy');

            const { name, email, password, mobile } = signupData
            console.log(signupData);

            const isAddedToDb = await otpModel.insertMany({ Name: name, Email: email, Password: password, Mobile: mobile, otp: otp })
            return isAddedToDb ? true : false

        } catch (error) {
            console.error("Error saving data to database:", error);
            return false;
        }
    }

    async verifyotp(otp: string): Promise<User | null> {
        try {
            console.log('3', otp);

            const user = await otpModel.findOne({ otp: otp });
            console.log('user', user);

            return user ? user as unknown as User : null;
        } catch (error) {
            console.error('Error verifying OTP from database:', error);
            return null;
        }
    }

    async googleAuth(user: User): Promise<{ user: User | null, token: string | null, refreshToken: string | null }>{
        try {
            const { Name, Email, Mobile, Password } = user
            console.log(user, 'lasttt');
            const newUser = new UserModel({ Name, Email, Mobile, Password })
            console.log(newUser, 'new userrrrrrrrrrrrrrrrrr');

            await newUser.save()

            let token = await genAccessToken(user,'user')
            let refreshToken = await genRefreshToken(user,'user')
            console.log('tokennn', token);
            return { user: newUser? newUser.toObject() as User : null, token, refreshToken }
            
        } catch (error) {
            console.log(error);
            return {user:null,token:null,refreshToken:null}
            
        }
    }

    async findCredentials(email: string, password: string): Promise<{ user: User | null, token: string | null, message: string }> {

        try {
            
        
        console.log('user repositoryyyy');
        console.log(email, password);

        const user = await UserModel.findOne({ Email: email})

        console.log(user)

        let message = ''
        let token = null


        if (!user) {
            message = ' invalid user'
        } else if (user.isBlocked===true) {
            message='user blocked'
        }else{
            if (password !== user.Password) {
                console.log('invalid password');
                message = 'Invalid Password'
            } else {
                token = await genAccessToken(user,'user')
                console.log('token', token);
            }

        }

        if (user?.isBlocked===false && !message) {
            return { user: user.toObject() as User, message, token }
        } else {
            console.log('message222', message);

            return { user: null, message, token };
        }
        } catch (error) {
                console.log(error);
                throw error
                
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


    async updateOTP(emailId: string, newOtp: string): Promise<boolean> {
        try {
            const isUpdateOTP = await otpModel.findOneAndUpdate(
                { Email: emailId },
                { $set: { otp: newOtp } }
            );
            return isUpdateOTP != null;
        } catch (error) {
            console.log(error);
            throw new Error();
        }
    }


    async getCategory(): Promise<Category[] | []> {
        try {

            const category: Category[] = await CategoryModel.find();
            return category

        } catch (error) {
            console.log(error);
            throw error

        }
    }


    async getCourse():Promise <Course[] | []> {
        try {
            const course: Course[] = await CourseModel.find();
            return course
            
        } catch (error) {
            console.log(error);
            return []
            
        }
    }

    async placeOrder(order:Order):Promise<{order:Order | null} > {
        try {
            const {CourseId,TutorId,StudentId,Price,Payment} = order
            const newOrder = new OrderModel({CourseId,TutorId,StudentId,Price,Payment})
            await newOrder.save()
            return {order: newOrder? newOrder.toObject() as Order : null}
            
        } catch (error) {
            console.log(error);

            return {order: null}
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


    async getTutorCourse(tutorId: string): Promise<Course[]|[]>{
        try {
            const tutorCourse: Course[] = await CourseModel.find({TutorId:tutorId});
            return tutorCourse
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

    async getEnrolledCourse(studentId: string): Promise<Course[]|[]>{
        try {
            const enrolledStudents: Order[] = await OrderModel.find({StudentId:studentId});

            
            const enrolledCourse: Course[] = await CourseModel.find({_id:{$in:enrolledStudents.map(order=>order.CourseId)}});
            return enrolledCourse
        } catch (error) {
            console.log(error);
            return []
            
        }
    }

} 

