import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError ,Secret} from 'jsonwebtoken';
import UserModel from '../../frameworks/database/models/user';
import { User } from '../../application/entities/user'
import {config} from 'dotenv'
config()

// export const userAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const authorizationHeader = req.headers.authorization;
  
//     if (!authorizationHeader) {
//         res.status(401).json({ message: 'Authorization header missing' });
//         return
//     }
  
//     const [bearer, token] = authorizationHeader.split(' ');
  
//     if (!token || bearer.toLowerCase() !== 'bearer') {
//      res.status(401).json({ message: 'Invalid Authorization header format' });
//      return 
//     }
  
//     try {
//       const decodedToken = jwt.verify(token, 'thadavil__aanu') as { userId: string, exp: number };
//       if (decodedToken.exp * 1000 < Date.now()) {
//          res.status(401).json({ message: 'Token expired' });
//          return
//       }
  
//       const userIdString = decodedToken.userId.toString();
//       const user: User | null = await UserModel.findOne({ _id: userIdString });
  
//       if (user) {
//         if (user.isBlocked) {
//          res.status(403).json({ message: 'User is blocked' });
//          return
//         }
//         // req.user = user as User;
//         next();
//       } else {
//         res.status(401).json({ message: 'Invalid user' });
//         return
//       }
//     } catch (error) {
//       if (error instanceof TokenExpiredError) {
//          res.status(401).json({ message: 'TokenExpiredError' });
//          return
//       }
//        res.status(401).json({ message: 'Invalid token' });
//     }
//   };


  export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ error: 'No token found' });
        }

        const token = authHeader.split(' ')[1];

        console.log(token,'tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');

        if (!token) {
            return res.status(401).json({ error: 'No token found' });
        }



        let decoded:any = null
        const secret =  process.env.JWT_SECRET || ''
        jwt.verify(token,secret,(err,data:any)=>{
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    console.log(err);
                    
                    return res.status(401).json({ error: 'Invalid token' });
                } else if (err.name === 'TokenExpiredError') {
                    console.log(err);
                    
                    return res.status(402).json({ error: 'Token expired' });
                } else {
                    console.log(err);
                    return res.status(403).json({ error: 'Token verification failed' });
                }
            }

            if (data && data?.role === 'user') {
                console.log(data)
                data
                next()
            } else {
                return res.status(401).json({ error: 'Unauthorized' })
                
            } 

        })

      
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};





  
  export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
   
    try {  
        const authHeader = req.headers.authorization
        console.log(authHeader,'tokenano');
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ error: 'No token found' });
        }
        const adminToken = authHeader.split(' ')[1]

        console.log(adminToken,'tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');

        if (!adminToken) {
            return res.status(401).json({ error: 'No token found' });
        }
        let decoded:any = null
        const secret =  process.env.JWT_SECRET || ''
        jwt.verify(adminToken,secret,(err,data:any)=>{
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    console.log(err);
                    
                    return res.status(401).json({ error: 'Invalid token' });
                } else if (err.name === 'TokenExpiredError') {
                    console.log(err);
                    
                    return res.status(402).json({ error: 'Token expired' });
                } else {
                    console.log(err);
                    return res.status(403).json({ error: 'Token verification failed' });
                }
            }

            if (data && data?.role === 'admin') {
                console.log(data)
                data
                next()
            } else {
                return res.status(401).json({ error: 'Unauthorized' });
                
                
            } 

        })
        // const user =await findUserById(decoded._id)
        // if(!user){
        //     return res.status(401).json({ error: 'Admin Details Not Found' });
        // }
        
    } catch (error) {
        console.log(error);
    }
}
