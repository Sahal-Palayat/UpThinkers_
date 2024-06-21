import { Tutor } from "../../entities/tutor";
import { SignupDataTutor } from "../../entities/signUpDataTutor";
import { Course } from "../../entities/course";
import { Category } from "../../entities/category";
import { Lesson } from "../../entities/lesson";
import { User } from "../../entities/user";

export interface TutorRepository {
    save(tutor: Tutor): Promise<{ tutor: Tutor | null, tutorToken: string | null,refreshToken:string|null }>;
    tutorExists(email: string): Promise<boolean>;
    saveToDB(signupData: SignupDataTutor, otp: string): Promise<boolean>;
    verifyotp(otp: string): Promise<Tutor | null>;
    findCredentials (email : string,password: string): Promise <{tutor:Tutor | null,message:string, tutorToken : string | null}> 
    getUsers():Promise<Tutor[] | [] >;
    updateOTP(emailId: string,newOtp:string) : Promise<boolean>;
    addCourse(course:Course): Promise <{course:Course|null}>
    getCategory():Promise<Category[] | []>
    getCourse():Promise<Course[] |[]>;
    editCourse(id:string,course:Course): Promise<{course:Course| null}>;
    deleteCourse(id:string): Promise<Course|null>
    addLesson(lesson:Lesson): Promise<{lesson:Lesson|null}>
    getLessons(id:string): Promise<Course | null>
    getStudents(courseId:string,tutorId:string):Promise<User[]|[]>

}
