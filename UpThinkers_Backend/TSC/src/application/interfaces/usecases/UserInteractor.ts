import { User } from "../../entities/user";
import { SignupData } from "../../entities/signupData";
import { Category } from "../../entities/category";
import { Course } from "../../entities/course";
import { Order } from "../../entities/order";
import { Tutor } from "../../entities/tutor";
import { Lesson } from "../../entities/lesson";


export interface UserInteractor {
    register(userData: { Name: string, Password: string, Email: string, Mobile: number }): Promise<{ user: User | null, token: string | null }>;
    sendMail(signupData: SignupData): Promise<{ userExists: boolean, isMailSent: boolean }>
    verifyOtp(otp: string): Promise<{ success: boolean, token: string | null, user?: User, refreshToken: string | null }>;
    googleAuth(data:{Name: string, Password: string, Email: string}):Promise <{user:User | null ,token : string | null,refreshToken:string|null}>
    login(credentials: { email: string, password: string }): Promise<{ user: User | null, token: string | null, message: string, refreshToken: string | null }>
    getUsers(): Promise<User[] | []>;
    resendMail(email: string):  Promise<boolean>;
    getCategory():Promise<Category[] | []>
    getCourse():Promise<Course[] | []>
    placeOrder(orderData:{CourseId: string, TutorId: string,StudentId:string,Price:string,Payment :string}): Promise<{order:Order | null }>
    getTutors(): Promise<Tutor[] | []>;
    getTutorCourse(tutorId:string):Promise<Course[]|[]>
    getEnrolledCourse(studentId:string):Promise<Course[]|[]>
    addImage(studentId:string, image:string):Promise<User[]|[]>
    getUserById(userId:string):Promise<User|null>
    videoSeen(userId:string,lessonId:string):Promise<{lesson:Lesson|null,message:string}>
    getCertificate(userId:string,courseId:string): Promise<{ unseenCount: number }>
} 