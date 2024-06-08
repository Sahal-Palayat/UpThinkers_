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
exports.adminAuth = exports.tutorAuth = exports.userAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
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
const tutorAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        let decoded = null;
        const secret = process.env.JWT_SECRET || '';
        jsonwebtoken_1.default.verify(tutorToken, secret, (err, data) => {
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
            if (data && (data === null || data === void 0 ? void 0 : data.role) === 'tutor') {
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
exports.tutorAuth = tutorAuth;
const adminAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader, 'tokenano');
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ error: 'No token found' });
        }
        const adminToken = authHeader.split(' ')[1];
        console.log(adminToken, 'adminntokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
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
