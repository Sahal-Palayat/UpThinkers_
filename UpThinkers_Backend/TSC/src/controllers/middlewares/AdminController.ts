import { Request, Response, NextFunction } from "express"
import { AdminInteractor } from "../../application/interfaces/usecases/AdminInteractor"


export class AdminController{

    constructor(private readonly interactor: AdminInteractor) { }

    async login(req: Request, res: Response,next: NextFunction){
        try {
            console.log('entered login controller',req.body);

            const {email,password}=req.body;
            console.log(email,password);


            const {user,message,token,refreshToken}= await this.interactor.login({email:email,password:password})
            
            if(user){
                console.log('user und');
                console.log('cntrllr user',user,token,refreshToken);
                res.status(200).json({message:'Login Succefull',user,token:token,refreshToken})
                
            }else{
                res.status(302).json({ message: message });
            }

            
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
            
        }
    }



}