import { Request,Response,NextFunction } from "express"
import * as UserEntity from '../interfaces/UserInterfaces'



interface ManualRequest extends Request  {

}

type Middleware=(req:ManualRequest,res:Response,next : NextFunction )=>void

export const Register : Middleware=async (req,res)=>{

    try {
        const {
            FirstName,
            LastName,
            Email,
            Password,
            Mobile   }:UserEntity.Register=req.body
        
            

        console.log("heore")
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
        
    }

} 