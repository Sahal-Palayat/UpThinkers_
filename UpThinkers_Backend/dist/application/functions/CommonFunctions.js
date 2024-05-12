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
exports.Otpgen = exports.CalculateTime = exports.HashPassword = exports.genVerificationLink = exports.genRandomString = void 0;
const bcrypt_1 = require("bcrypt");
function genRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
exports.genRandomString = genRandomString;
function genRandomName(prefix, randomStringLength) {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    const randomString = genRandomString(randomStringLength);
    return `${prefix}-${randomNumber}-${randomString}`;
}
function genVerificationLink() {
    const VerificationToken = genRandomString(32);
    return VerificationToken;
}
exports.genVerificationLink = genVerificationLink;
const HashPassword = (Password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcrypt_1.hash)(Password, 10);
});
exports.HashPassword = HashPassword;
const CalculateTime = (Password, Hashed) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcrypt_1.compare)(Password, Hashed);
});
exports.CalculateTime = CalculateTime;
const Otpgen = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
};
exports.Otpgen = Otpgen;
