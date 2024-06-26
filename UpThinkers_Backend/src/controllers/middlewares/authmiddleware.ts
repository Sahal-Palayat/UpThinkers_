import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError, Secret } from 'jsonwebtoken';
import UserModel from '../../frameworks/database/models/user';
import { User } from '../../application/entities/user'
import { config } from 'dotenv'
import { checkobjectId, getUsers } from '../../frameworks/database/Functions';
import UserDocument from '../../entities/user';
config()

export interface customReq extends Request {
    user: UserDocument;
}


export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ error: 'No token found' });
        }

        const token = authHeader.split(' ')[1];

        console.log(token, 'tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');

        if (!token) {
            return res.status(401).json({ error: 'No token found' });
        }



        let decoded: any = null
        const secret = process.env.JWT_SECRET || ''
        jwt.verify(token, secret, async (err, data: any) => {
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
            if (!data || data.role !== "user" || !checkobjectId(data?.id)) {
                return res.status(401).json({ error: 'Unauthorized' })
            }
            const user: UserDocument | null = await getUsers(data?.id)
            console.log(user)
            if (!user || user.isBlocked) {
                return res.status(401).json({ error: 'Unauthorized' })
            }
            // req.user = user
            return next()
        })
        // return res.status(401).json({ error: 'Unauthorized' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const tutorAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ error: 'No token found' });
        }

        const tutorToken = authHeader.split(' ')[1];

        console.log(tutorToken, 'tutorrtokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');

        if (!tutorToken) {
            return res.status(401).json({ error: 'No token found' });
        }



        let decoded: any = null
        const secret = process.env.JWT_SECRET || ''
        jwt.verify(tutorToken, secret, (err, data: any) => {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    console.log(err);

                    return res.status(401).json({ error: 'Invalid token' });
                } else if (err.name === 'TokenExpiredError') {
                    console.log(err);

                    return res.status(309).json({ error: 'Token expired' });
                } else {
                    console.log(err);
                    return res.status(403).json({ error: 'Token verification failed' });
                }
            }

            if (data && data?.role === 'tutor') {
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
        console.log(authHeader, 'tokenano');
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ error: 'No token found' });
        }
        const adminToken = authHeader.split(' ')[1]

        console.log(adminToken, 'adminntokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');

        if (!adminToken) {
            return res.status(401).json({ error: 'No token found' });
        }
        let decoded: any = null
        const secret = process.env.JWT_SECRET || ''
        jwt.verify(adminToken, secret, (err, data: any) => {
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
