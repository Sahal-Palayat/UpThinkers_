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
const CommonFunctions_1 = require("../functions/CommonFunctions");
class UserInteractorImpl {
    constructor(Repository, mailer) {
        this.Repository = Repository;
        this.mailer = mailer;
        // this.Repository.save()
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = {
                    Name: userData.Name,
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
            const email = signupData.email;
            const userExists = yield this.Repository.userExists(email);
            console.log(userExists, "userData");
            if (userExists) {
                return { userExists: true, isMailSent: false };
            }
            try {
                const { otp, success } = yield this.mailer.sendMail(email);
                console.log(otp);
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
                    const { user, token, refreshToken } = yield this.Repository.save(isUser);
                    if (user && token) {
                        return { success: true, token, refreshToken, user };
                    }
                }
                return { success: false, token: null, refreshToken: null };
            }
            catch (error) {
                console.log(error);
                return { success: false, token: null, refreshToken: null };
            }
        });
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, message, token } = yield this.Repository.findCredentials(credentials.email, credentials.password);
                console.log(user, token, message, 'loggggg');
                const refreshToken = user ? yield (0, CommonFunctions_1.genRefreshToken)(user, 'user') : '';
                return { user, message, token, refreshToken };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.Repository.getUsers();
                if (user) {
                    return user;
                }
                else {
                    return [];
                }
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    resendMail(emailId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp, success } = yield this.mailer.sendMail(emailId);
                console.log(otp);
                if (success) {
                    const updateOTP = yield this.Repository.updateOTP(emailId, otp);
                    return updateOTP;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.error('Error sending email:', error);
                throw new Error;
            }
        });
    }
}
exports.UserInteractorImpl = UserInteractorImpl;
