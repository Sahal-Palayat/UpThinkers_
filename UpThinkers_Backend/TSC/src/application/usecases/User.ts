import { genRefreshToken } from '../functions/CommonFunctions'
import { SignupData } from '../entities/signupData'
import { User } from '../entities/user'
import { IMailer } from '../interfaces/external-lib/IMailer'
import { UserRepository } from '../interfaces/repositories/user-repository'
import { UserInteractor } from '../interfaces/usecases/UserInteractor'
import UserModel from '../../frameworks/database/models/user'
import { Category } from '../entities/category'
import { Course } from '../entities/course'
import { Order } from '../entities/order'
import { Tutor } from '../entities/tutor'
import { Lesson } from '../entities/lesson'

export class UserInteractorImpl implements UserInteractor {
    constructor(private readonly repository: UserRepository, private readonly mailer: IMailer) {
        // this.repository.save()
    }

    async register(userData: { Name: string, Email: string, Password: string }): Promise<{ user: User | null, token: string | null,refreshToken:string |null }> {

        try {
            const newUser = {
                Name: userData.Name,
                Email: userData.Email,
                Password: userData.Password,
                CreatedAt: new Date()
            }
            console.log(newUser,'usecaseeeeeeeeeeeee');

            const { user, token,refreshToken } = await this.repository.save(newUser)

            return { user, token ,refreshToken}
        } catch (error) {
            console.error('Error during signup:', error);
            throw error;
        }

    }

    async sendMail(signupData: SignupData): Promise<{ userExists: boolean, isMailSent: boolean }> {
        console.log('2', signupData)
        const email = signupData.email;
        const userExists = await this.repository.userExists(email);
        console.log(userExists, "userData");

        if (userExists) {
            return { userExists: true, isMailSent: false };
        }

        try {


            const { otp, success } = await this.mailer.sendMail(email);
            console.log(otp);
            if (success) {
                const saveToDB = await this.repository.saveToDB(signupData, otp)


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
            const isUser = await this.repository.verifyotp(otp)
            if (isUser) {
                const { user, token, refreshToken } = await this.repository.save(isUser)
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


    async googleAuth(data:{ Name: string, Email: string, Mobile: number, Password: string}):Promise <{user:User|null ,token :string |null,refreshToken:string| null}>{
        try {
            
                const newUser ={
                   
                    Name:data.Name,
                    Email:data.Email,
                    Mobile:data.Mobile,
                    Password:data.Password
                }
                console.log(newUser);
                
        
                const { user, token ,refreshToken} = await this.repository.googleAuth(newUser)

                return { user, token ,refreshToken}
          
            
        } catch (error) {
            console.log(error);
            return {user:null,token:null,refreshToken:null}
            
        }
    }


    async login(credentials: { email: string, password: string }): Promise<{ user: User | null, message: string, token: string | null, refreshToken: string | null }> {
        try {



            const { user, message, token }: {
                user: User | null,
                message: string,
                token: string | null
            } = await this.repository.findCredentials(credentials.email, credentials.password)
            console.log(user, token, message, 'loggggg');


            const refreshToken = user ? await genRefreshToken(user,'user') : ''

            return { user, message, token, refreshToken }

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async getUsers(): Promise<User[] |[]> {
        try {
            const user = await this.repository.getUsers()
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
    async resendMail(emailId: string): Promise<boolean> {
        try {
            const { otp, success } = await this.mailer.sendMail(emailId);
            console.log(otp);
            
            if (success) {
                const updateOTP = await this.repository.updateOTP(emailId,otp);
                return updateOTP;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error;
        }

    }

    async getCategory(): Promise<Category[] | []> {
        try {
            const category = await this.repository.getCategory()
            if (category) {
                return category
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
            throw error

        }
    }


     async getCourse():Promise<Course[] | []>{
        try {
            const course = await this.repository.getCourse()
            if (course) {
                return course
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
            return []
       }

    }


    async placeOrder(orderData: { CourseId: string, TutorId: string, StudentId: string, Price: string, Payment: string }): Promise<{ order: Order | null }> {
        try {
            const newOrder: Order = {
                CourseId: orderData.CourseId,
                TutorId: orderData.TutorId,
                StudentId: orderData.StudentId,
                Price: orderData.Price,
                Payment: orderData.Payment,
                CreatedAt: new Date()
            }
            const order = await this.repository.placeOrder(newOrder)
    
            return order
    
        } catch (error) {
            console.log(error);
            return {order:null}
        }
    }

    async getTutors(): Promise<Tutor[] | []> {
        try {
            const tutor = await this.repository.getTutors()
            if (tutor) {
                return tutor
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async getTutorCourse(tutorId:string):Promise<Course[]|[]>{
        try {
            const course = await this.repository.getTutorCourse(tutorId)
            if (course) {
                return course
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
            return []
        }
    }


    async getEnrolledCourse(studentId:string):Promise<Course[]|[]>{
        try {
            const course = await this.repository.getEnrolledCourse(studentId)
            if (course) {
                return course
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
            return []
        }
    }

     async addImage(studentId: string, image: string): Promise<User[] | []> {
        try {
            const user = await this.repository.addImage(studentId, image)
            if (user) {
                return user
            } else {
                return []
            }
            
        } catch (error) {
            console.log(error);
            return []
            
        }
    }

    async getUserById(userId: string): Promise<User | null> {
        try {
            const user = await this.repository.getUserById(userId)
            if (user) {
                return user
            } else {
                return null
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }


    async videoSeen(userId: string, lessonId: string): Promise<{ lesson: Lesson | null, message: string }> {
        try {
            const lesson = await this.repository.videoSeen(userId, lessonId)
            if (lesson) {
                return lesson
            } else {
                return { lesson: null, message: 'Video not found' }
            }
        } catch (error) {
            console.log(error);
            return { lesson: null, message: 'Error occurred while updating video status' }
        }
    } 

    async getCertificate(userId:string,courseId:string): Promise<{ unseenCount: number }>{
        try {
            const lesson = await this.repository.getCertificate(userId, courseId)
            if (lesson) {
                return lesson
            } else {
                return { unseenCount: 0 }
            }
            
        } catch (error) {
            console.log(error);
            return {unseenCount:0}
            
        }
    }

}

