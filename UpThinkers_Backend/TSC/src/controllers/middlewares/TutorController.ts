import { Request, Response, NextFunction } from "express"
import { TutorInteractor } from "../../application/interfaces/usecases/TutorInteractor"



export class TutorController {

    constructor(private readonly interactor: TutorInteractor) { }

    async register(req: Request, res: Response, next: NextFunction) {

        try {

            const { name, email, mobile, password } = req.body
            console.log('bodyyy', req.body);

            const { tutor, token } = await this.interactor.register({ Name:name, Password:password,Email: email,Mobile: mobile  })
            console.log(tutor, token, 'returningggggg');

            res.status(200).json({ message: 'Signup successful', tutor, token })
        } catch (error) { 
            console.error('Error during signup:', error);
            res.status(500).send('Internal server error');
        }
    }

    async sendMail(req: Request, res: Response, next: NextFunction) {
        try {
          
            
            const signupData= req.body
            console.log(req.body,'firsttttttttttttttt');
            
            const { tutorExists, isMailSent } = await this.interactor.sendMail(signupData)

            if(tutorExists){
                res.status(400).json({success:false, message: 'User already exists' })
            }else if(isMailSent){
                res.status(200).json({success:true,message:'Email sent successfully'})
            }else{
                res.status(500).json({success:false,message :'Failed to send email'})
            }

        } catch (error) {
            res.status(500).send('Internal server error');
        }
    }


    
    async verifyOtp(req: Request, res: Response) {
        try {
            console.log('0000000')
            const {otp }=req.body
            const {tutor,success,token,refreshToken}=await this.interactor.verifyOtp(otp)
            if(success){
                res.status(200).json({success:true,message:'otp verification success',token,refreshToken,tutor})
            }else{
                res.status(400).json({success:false,message:'otp verification failed'})
            }

        } catch (error) {
            console.error('Error verifying OTP:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }

    async login(req: Request, res: Response,next: NextFunction){
        try {
            console.log('entered login controller',req.body);

            const {email,password}=req.body;
            console.log(email,password);


            const {tutor,message,token,refreshToken}= await this.interactor.login({email:email,password:password})
            
            if(tutor){
                console.log('user und');
                console.log('cntrllr user',tutor,token,refreshToken);
                res.status(200).json({message:'Login Succefull',tutor,token:token,refreshToken})
                
            }else{
                res.status(302).json({ message: message });
            }

            
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
            
        }
    }
    async getUsers(req: Request, res: Response,next: NextFunction){
        try {
            const tutors= await this.interactor.getUsers()
            res.status(200).json({tutors})
            
        } catch (error) {
            
        }
    }


}