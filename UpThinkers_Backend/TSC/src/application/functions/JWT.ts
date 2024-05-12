import jwt,{TokenExpiredError} from 'jsonwebtoken'
import auth,{AuthInterface} from '../../config/auth'


interface JWTCreate {
    Payload:{
        UserId:string;
        Email:string;
        Admin:boolean;
    };
    RememberMe:boolean;
}

interface JWTVerify {
    token: string;
}

interface JWTVerifyResponse {
    status: boolean;
    user: { 
        UserId: string;
        Email: string;
    } | null;
    error: string | null;
}


export const CreatePayload: Function = ({ Payload, RememberMe }: JWTCreate): string => {
    try {
        const { JWT_EXPIRES_IN, JWT_REMEMBER_ME, JWT_SECRET }: AuthInterface = auth;
        return jwt.sign(Payload, JWT_SECRET, { expiresIn: RememberMe ? JWT_REMEMBER_ME : JWT_EXPIRES_IN });
    } catch (e) {
        console.log(e)
        return 'Internal server error';
    }
};