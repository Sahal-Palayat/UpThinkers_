"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = exports.userAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
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
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        let decoded = null;
        const secret = process.env.JWT_SECRET || '';
        jsonwebtoken_1.default.verify(token, secret, (err, data) => {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    console.log(err);
                    return res.status(401).json({ error: 'Invalid token' });
                }
                else if (err.name === 'TokenExpiredError') {
                    console.log(err);
                    return res.status(402).json({ error: 'Token expired' });
                }
                else {
                    console.log(err);
                    return res.status(403).json({ error: 'Token verification failed' });
                }
            }
            if (data && (data === null || data === void 0 ? void 0 : data.role) === 'user') {
                console.log(data);
                data;
                next();
            }
            else {
                return res.status(401).json({ error: 'Unauthorized' });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.userAuth = userAuth;
const adminAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader, 'tokenano');
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ error: 'No token found' });
        }
        const adminToken = authHeader.split(' ')[1];
        console.log(adminToken, 'tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
        if (!adminToken) {
            return res.status(401).json({ error: 'No token found' });
        }
        let decoded = null;
        const secret = process.env.JWT_SECRET || '';
        jsonwebtoken_1.default.verify(adminToken, secret, (err, data) => {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    console.log(err);
                    return res.status(401).json({ error: 'Invalid token' });
                }
                else if (err.name === 'TokenExpiredError') {
                    console.log(err);
                    return res.status(402).json({ error: 'Token expired' });
                }
                else {
                    console.log(err);
                    return res.status(403).json({ error: 'Token verification failed' });
                }
            }
            if (data && (data === null || data === void 0 ? void 0 : data.role) === 'admin') {
                console.log(data);
                data;
                next();
            }
            else {
                return res.status(401).json({ error: 'Unauthorized' });
            }
        });
        // const user =await findUserById(decoded._id)
        // if(!user){
        //     return res.status(401).json({ error: 'Admin Details Not Found' });
        // }
    }
    catch (error) {
        console.log(error);
    }
});
exports.adminAuth = adminAuth;
