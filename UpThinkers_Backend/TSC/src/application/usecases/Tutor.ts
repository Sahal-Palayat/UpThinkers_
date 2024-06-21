import { SignupDataTutor } from "../entities/signUpDataTutor";
import { Tutor } from "../entities/tutor";
import { IMailer } from "../interfaces/external-lib/IMailer";
import { TutorRepository } from "../interfaces/repositories/tutor-repository";
import { TutorInteractor } from "../interfaces/usecases/TutorInteractor";
import { Course } from "../entities/course";
import { Category } from "../entities/category";
import { genRefreshToken } from "../functions/CommonFunctions";
import { Lesson } from "../entities/lesson";
import { User } from "../entities/user";

export class TutorInteractorImpl implements TutorInteractor {
    constructor(private readonly Repository: TutorRepository, private readonly mailer: IMailer) { }

    async register(tutorData: { Name: string, Email: string, Mobile: number, Password: string }): Promise<{ tutor: Tutor | null, tutorToken: string | null }> {

        try {
            const newUser = {
                Name: tutorData.Name,
                Email: tutorData.Email,
                Mobile: tutorData.Mobile,
                Password: tutorData.Password,
                CreatedAt: new Date()
            }
            console.log(newUser);

            const { tutor, tutorToken } = await this.Repository.save(newUser)

            return { tutor, tutorToken }
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

    async verifyOtp(otp: string): Promise<{ success: boolean, tutor?: Tutor, tutorToken: string | null, refreshToken: string | null }> {
        try {
            const isUser = await this.Repository.verifyotp(otp)
            if (isUser) {
                const { tutor, tutorToken, refreshToken } = await this.Repository.save(isUser)
                if (tutor && tutorToken) {
                    return { success: true, tutorToken, refreshToken, tutor };

                }

            }
            return { success: false, tutorToken: null, refreshToken: null };

        } catch (error) {
            console.log(error);
            return { success: false, tutorToken: null, refreshToken: null };

        }
    }


    async login(credentials: { email: string, password: string }): Promise<{ tutor: Tutor | null, message: string, tutorToken: string | null, refreshToken: string | null }> {
        try {



            const { tutor, message, tutorToken }: {
                tutor: Tutor | null,
                message: string,
                tutorToken: string | null
            } = await this.Repository.findCredentials(credentials.email, credentials.password)
            console.log(tutor, tutorToken, message, 'loggggg');


            const refreshToken = tutor ? await genRefreshToken(tutor, 'tutor') : ''

            return { tutor, message, tutorToken, refreshToken }

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async getUsers(): Promise<Tutor[] | []> {
        try {
            const tutor = await this.Repository.getUsers()
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


    async resendMail(emailId: string): Promise<boolean> {
        try {
            const { otp, success } = await this.mailer.sendMail(emailId);
            console.log(otp);

            if (success) {
                const updateOTP = await this.Repository.updateOTP(emailId, otp);
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
            const category = await this.Repository.getCategory()
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

    async addCourse(courseData: { Name: string; Status: boolean; Description: string; Image: string; Price: number; OfferPrice: number; Duration: string; Category: string; lessons: []; Tutor: string; CreatedAt: Date; UpdatedAt: Date; }): Promise<{ course: Course | null; }> {
        try {
            const newCourse = {
                Name: courseData.Name,
                Status: true,
                Description: courseData.Description,
                Image: courseData.Image,
                Price: courseData.Price,
                OfferPrice: courseData.Price,
                Duration: courseData.Duration,
                Category: courseData.Category,
                lessons: courseData.lessons,
                Tutor: courseData.Tutor,
                CreatedAt: courseData.CreatedAt,
                UpdatedAt: courseData.UpdatedAt
            }

            const { course } = await this.Repository.addCourse(newCourse)
            console.log(newCourse);
            return { course }

        } catch (error) {
            console.log(error);
            throw error;

        }
    }

    async getCourse(): Promise<Course[] | []> {
        try {
            const course = await this.Repository.getCourse()
            if (course) {
                return course
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
            throw error
        }

    }


    async editCourse(id: string, courseData: { Name: string; Status: boolean; Description: string; Image: string; Price: number; OfferPrice: number; Duration: string; Category: string; lessons: []; Tutor: string; CreatedAt: Date; UpdatedAt: Date; }): Promise<{ course: Course | null; }> {
        try {
            const newCourse = {
                Name: courseData.Name,
                Status: courseData.Status,
                Description: courseData.Description,
                Image: courseData.Image,
                Price: courseData.Price,
                OfferPrice: courseData.Price,
                Duration: courseData.Duration,
                Category: courseData.Category,
                lessons: courseData.lessons,
                Tutor: courseData.Tutor,
                CreatedAt: courseData.CreatedAt,
                UpdatedAt: courseData.UpdatedAt
            }
            const { course } = await this.Repository.editCourse(id, newCourse)
            console.log(newCourse);
            return { course }
        } catch (error) {
            console.log(error);
            throw error

        }
    }

    async deleteCourse(id: string): Promise<Course | null> {
        try {
            const course = await this.Repository.deleteCourse(id)
            if (course) {
                return course
            } else {
                return null
            }

        } catch (error) {
            console.log(error);
            throw error;

        }
    }

    async addLesson(lessonData: { Title: string; Content: string; Image: string; Video: string; Documents: [];Course:string }): Promise<{ lesson: Lesson | null; }> {
        try {
        const newLesson = { Title: lessonData.Title,
                             Content: lessonData.Content,
                             Image: lessonData.Image,
                             Video: lessonData.Video,
                             Documents:lessonData.Documents,
                             Course:lessonData.Course
                        };
       const { lesson } = await this.Repository.addLesson(newLesson)
        console.log(newLesson);
        return { lesson }

        } catch (error) {
            console.log(error);
            throw error;

        }
    }



    async getLessons(id:string): Promise<Course | null>{
        try {
            const lesson = await this.Repository.getLessons(id)
            if (lesson) {
                return lesson
            } else {
                return null
            }
            
        } catch (error) {
            console.log(error);
            return null
            
        }
    }
    async getStudents(courseId:string,tutorId:string): Promise<User[] | []> {
        try {
            const student = await this.Repository.getStudents(courseId,tutorId)
            if (student) {
                return student
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
            return []
        }
        
    }
}

