import { Request, Response, NextFunction } from "express"
import { AdminInteractor } from "../../application/interfaces/usecases/AdminInteractor"


export class AdminController{

    constructor(private readonly interactor: AdminInteractor) { }

    async login(req: Request, res: Response,next: NextFunction){
        try {
            console.log('entered login controller',req.body);

            const {email,password}=req.body;
            console.log(email,password);


            const {user,message,adminToken,refreshToken}= await this.interactor.login({email:email,password:password})
           
            
            if(user){
                console.log('user und');
                console.log('cntrllr user',user,adminToken,refreshToken);
                res.status(200).json({message:'Login Succefull',user,adminToken:adminToken,refreshToken})
                
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
            const users= await this.interactor.getUsers()
            console.log(users,'_+_+_+_+_+_+_+_+_+_+_+')
            res.status(200).json({users})
            
        } catch (error) {
            console.log(error);
            throw error
            
            
        }
    }

    async getTutors(req: Request, res: Response,next: NextFunction){
        try {
            const tutors= await this.interactor.getTutors()
            res.status(200).json({tutors})
            
        } catch (error) {
            
        }
    }

    async blockUser(req: Request, res: Response, next: NextFunction){
        try {
          
            const userId = req.params.id;

            console.log(userId);
            const blockedUser= await this.interactor.blockUser(userId)
            res.status(200).json({blockedUser,message :'user blocked successfully'})
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
            
        }
    }

    async blockTutor(req: Request, res: Response, next: NextFunction){
        try {
            console.log('keriiiiiiiiiii');
            
          
            const tutorId = req.params.id;

            console.log(tutorId);
            const blockedTutor= await this.interactor.blockTutor(tutorId)
            res.status(200).json({blockedTutor,message :'user blocked successfully'})
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
            
        }
    }

    async addCategory(req:Request,res:Response,next:NextFunction){
        try{
            // const {name,}= req.body
            // console.log(category);
            // const {}= await this.interactor.addCategory()
            

        }catch(err){

        }
    }



}