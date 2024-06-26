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
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRandomOtp = exports.genRefreshToken = exports.genAccessToken = exports.CalculateTime = exports.HashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const jwt = require('jsonwebtoken');
const util_functions_nodejs_1 = require("util-functions-nodejs");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// export function genRandomString(length :number):string {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = ''
//     for(let i=0 ;i < length ;i++) {
//         result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return result
// }
// export function genRandomName (prefix :string, randomStringLength :number):string {
//       const randomNumber = Math.floor(Math.random()* 9000)+1000
//       const randomString = genRandomString(randomStringLength)
//       return `${prefix}-${randomNumber}-${randomString}`
// }
// export function genVerificationLink():  string {
//     const VerificationToken= genRandomString(32)
//     return VerificationToken
// }
const HashPassword = (Password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcrypt_1.hash)(Password, 10);
});
exports.HashPassword = HashPassword;
const CalculateTime = (Password, Hashed) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcrypt_1.compare)(Password, Hashed);
});
exports.CalculateTime = CalculateTime;
function genAccessToken(user, role) {
    const secret = process.env.JWT_SECRET || ' ';
    return jwt.sign({ id: user._id, role: role }, secret, { expiresIn: '1d' });
}
exports.genAccessToken = genAccessToken;
// export function genAccessTokenTutor(user:any,role:string):string {
//     const secret = process.env.JWT_SECRET || ' ';
//      return jwt.sign({ id: user._id, role:role }, secret, { expiresIn: '1d' });
//  }
function genRefreshToken(user, role) {
    const secret = process.env.JWT_SECRET || ' ';
    return jwt.sign({ id: user.Email, role: role }, secret, { expiresIn: '7d' });
}
exports.genRefreshToken = genRefreshToken;
const genRandomOtp = () => {
    return (0, util_functions_nodejs_1.generateOtp)(4).toString();
};
exports.genRandomOtp = genRandomOtp;
(0, exports.genRandomOtp)();
