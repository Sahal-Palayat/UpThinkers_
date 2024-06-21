import { Tutor } from "../../entities/tutor";
import { SignupDataTutor } from "../../entities/signUpDataTutor";
import { Course } from "../../entities/course";
import { Category } from "../../entities/category";
import { Lesson } from "../../entities/lesson";
import { User } from "../../entities/user";

export interface TutorInteractor {
    register(tutorData: { Name: string, Password: string, Email: string, Mobile: number }): Promise<{ tutor: Tutor | null, tutorToken: string | null }>
    sendMail(signupData: SignupDataTutor): Promise<{ tutorExists: boolean, isMailSent: boolean }>
    verifyOtp(otp: string): Promise<{ success: boolean, tutorToken: string | null,tutor?: Tutor, refreshToken:string |null}>;
    login(credentials : {email: string, password:string}):Promise <{tutor:Tutor | null,tutorToken :string |null,message: string, refreshToken:string | null}>
    getUsers(): Promise<Tutor[] | []>;
    resendMail(email: string):  Promise<boolean>;
    addCourse(courseData:{Name:string,Status:boolean,Description:string,Image:string,Price:number,OfferPrice:number, Duration:string,Category:string,lessons:[],Tutor:string,CreatedAt:Date,UpdatedAt:Date,}): Promise <{course:Course |null}>
    getCategory():Promise<Category[] |[]>;
    getCourse():Promise<Course[] |[]>;
    editCourse(id:string,courseData:{Name:string,Status:boolean,Description:string,Image:string,Price:number,OfferPrice:number, Duration:string,Category:string,lessons:[],Tutor:string,CreatedAt:Date,UpdatedAt:Date,}): Promise <{course:Course |null}>
    deleteCourse(id:string): Promise<Course|null>;
    addLesson(lessonData:{Title:string,Content:string,Image:string,Video:string,Documents:[],Course:string}):Promise<{lesson:Lesson|null}>
    getLessons(id:string):Promise<Course |null>
    getStudents(courseId:string,tutorId:string):Promise<User[]|[]>;

}