import { Request, Response, NextFunction } from "express"
import { UserInteractor } from "../../application/interfaces/usecases/UserInteractor";
import { timeLog } from "console";

export class UserController {

    constructor(private readonly interactor: UserInteractor) { }

    async register(req: Request, res: Response, next: NextFunction) {

        try {

            const { name, email, mobile, password } = req.body
            console.log('bodyyy', req.body);

            const { user, token } = await this.interactor.register({ Name: name, Password: password, Email: email, Mobile: mobile })
            console.log(user, token, 'returningggggg');

            res.status(200).json({ message: 'Signup successful', user, token })
        } catch (error) {
            console.error('Error during signup:', error);
            res.status(500).send('Internal server error');
        }
    }

    async sendMail(req: Request, res: Response, next: NextFunction) {
        try {


            const signupData = req.body
            console.log(req.body, 'firsttttttttttttttt');

            const { userExists, isMailSent } = await this.interactor.sendMail(signupData)

            if (userExists) {
                res.status(400).json({ success: false, message: 'User already exists' })
            } else if (isMailSent) {
                res.status(200).json({ success: true, message: 'Email sent successfully' })
            } else {
                res.status(500).json({ success: false, message: 'Failed to send email' })
            }

        } catch (error) {
            res.status(500).send('Internal server error');
        }
    }


    async verifyOtp(req: Request, res: Response) {
        try {
            console.log('0000000')
            const { otp } = req.body
            const { user, success, token, refreshToken } = await this.interactor.verifyOtp(otp)
            if (success) {
                res.status(200).json({ success: true, message: 'otp verification success', token, refreshToken, user })
            } else {
                res.status(400).json({ success: false, message: 'otp verification failed' })
            }

        } catch (error) {
            console.error('Error verifying OTP:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }

    async googleAuth(req:Request,res:Response,next: NextFunction) {
        try {
            const { name, email, sub } = req.body
            console.log(name, email, sub);
            
            const user = await this.interactor.googleAuth({ Name: name, Password: sub, Email: email })
            res.status(200).json({ message: "User registered successfully", user: user?.user, token: user?.token ,refreshToken: user?.refreshToken});

            
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }


    async login(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('entered login controller', req.body);

            const { email, password } = req.body;
            console.log(email, password);


            const { user, message, token, refreshToken } = await this.interactor.login({ email: email, password: password })

            if (user) {
                console.log('user und');
                console.log('cntrllr user', user, token, refreshToken);
                res.status(200).json({ message: 'Login Succefull', user, token: token, refreshToken })

            } else {
                res.status(302).json({ message: message });
            }


        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');

        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.interactor.getUsers()
            res.status(200).json({ users })

        } catch (error) {

        }
    }

    async resendMail(req: Request, res: Response, next: NextFunction) {
        try {

            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

            const emailId = req.params.emailId
            console.log(emailId, 'jjjjjjjjjjjjjjjjjjj');

            const success = await this.interactor.resendMail(emailId)
            if (success) {

                console.log('Sheriyayii');

                res.status(200).json({ success: true, message: 'Email sent successfully.' });
            } else {
                res.status(302).json({ success: false, message: 'Failed to send email.' });

            }


        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });

        }
    }


    async getCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const category = await this.interactor.getCategory()
            res.status(200).json({ category })

        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');

        }
    }


    async getCourse(req:Request, res: Response, next: NextFunction) {
        try {
            const course = await this.interactor.getCourse()
            res.status(200).json({ course })
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
            
        }
    }



    async placeOrder(req:Request,res:Response,next: NextFunction) {
        try {
            console.log(req.body);
            const {courseId,studentId,tutorId,amount,payment}= req.body
            const order = await this.interactor.placeOrder({CourseId:courseId,TutorId:tutorId,StudentId:studentId,Price:amount,Payment:payment})
            res.status(200).json({ order })
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
            
        }
    }


    async getTutors(req: Request, res: Response,next: NextFunction){
        try {
            const tutors= await this.interactor.getTutors()
            res.status(200).json({tutors})
            
        } catch (error) {
            
        }
    }

    async getTutorCourse(req: Request, res: Response, next: NextFunction){
        try {

            console.log('aiwaaaaaaaaaaaaaa');
            
            const tutorId= req.params.tutorId
            const tutorCourse= await this.interactor.getTutorCourse(tutorId)

            res.status(200).json({tutorCourse})
            
        } catch (error) { 
            console.log(error)
            res.status(500).json({'error': error})
            
        }
    }


    async getEnrolledCourse(req: Request, res: Response,next: NextFunction){
        try {
            const studentId= req.params.userId
            const enrolledCourse= await this.interactor.getEnrolledCourse(studentId)
            res.status(200).json({enrolledCourse})
            
        } catch (error) {
             console.log(error)
            res.status(500).json({'error': error})
        }
    }


    async addImage(req: Request, res: Response,next: NextFunction){
        try {
            const studentId= req.params.userId
            const { img } = req.body
            console.log(img,studentId,'saaaaaaaaaaaaaaaaaaaaa');
            const uploadImage = await this.interactor.addImage(studentId, img)
            res.status(200).json({ uploadImage })

            
        } catch (error) {
            
        }
    }

    async getUserById(req: Request, res: Response, next:NextFunction){
        try {
            const userId:string= req.query.userId as string
            const user= await this.interactor.getUserById(userId )
            res.status(200).json({user})
            

        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
            
        }
    }

    

}



