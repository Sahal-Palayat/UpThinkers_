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
function genAccessToken(user) {
    return jwt.sign({ userId: user._id }, 'athee....', { expiresIn: '1d' });
}
exports.genAccessToken = genAccessToken;
function genRefreshToken(user) {
    return jwt.sign({ userId: user.email }, 'athee...', { expiresIn: '7d' });
}
exports.genRefreshToken = genRefreshToken;
const genRandomOtp = () => {
    const otp = Math.floor(10000 + Math.random() * 90000);
    return otp.toString();
};
exports.genRandomOtp = genRandomOtp;
