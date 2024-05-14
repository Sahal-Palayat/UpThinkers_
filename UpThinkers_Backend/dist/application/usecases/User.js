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
exports.UserInteractorImpl = void 0;
class UserInteractorImpl {
    constructor(Repository, mailer) {
        this.Repository = Repository;
        this.mailer = mailer;
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = {
                    FirstName: userData.FirstName,
                    Email: userData.Email,
                    Mobile: userData.Mobile,
                    Password: userData.Password,
                    CreatedAt: new Date()
                };
                console.log(newUser);
                const { user, token } = yield this.Repository.save(newUser);
                return { user, token };
            }
            catch (error) {
                console.error('Error during signup:', error);
                throw error;
            }
        });
    }
    sendMail(signupData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('2', signupData);
            const email = signupData.Email;
            const userExists = yield this.Repository.userExists(email);
            if (userExists) {
                return { userExists: true, isMailSent: false };
            }
            try {
                const { otp, success } = yield this.mailer.sendMail(email);
                if (success) {
                    const saveToDB = yield this.Repository.saveToDB(signupData, otp);
                    return { userExists: false, isMailSent: true };
                }
                else {
                    return { userExists: false, isMailSent: false };
                }
            }
            catch (error) {
                console.error('Error sending email:', error);
                return { userExists: false, isMailSent: false };
            }
        });
    }
    verifyOtp(otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isUser = yield this.Repository.verifyotp(otp);
                if (isUser) {
                    const { user, token } = yield this.Repository.save(isUser);
                    if (user) {
                        return { success: true, token };
                    }
                }
                return { success: false, token: null };
            }
            catch (error) {
                console.log(error);
                return { success: false, token: null };
            }
        });
    }
}
exports.UserInteractorImpl = UserInteractorImpl;
