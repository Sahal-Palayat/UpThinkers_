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
exports.TutorInteractorImpl = void 0;
const CommonFunctions_1 = require("../functions/CommonFunctions");
class TutorInteractorImpl {
    constructor(Repository, mailer) {
        this.Repository = Repository;
        this.mailer = mailer;
    }
    register(tutorData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = {
                    Name: tutorData.Name,
                    Email: tutorData.Email,
                    Mobile: tutorData.Mobile,
                    Password: tutorData.Password,
                    CreatedAt: new Date()
                };
                console.log(newUser);
                const { tutor, token } = yield this.Repository.save(newUser);
                return { tutor, token };
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
            const tutorExists = yield this.Repository.tutorExists(email);
            console.log(tutorExists, "tutorData");
            if (tutorExists) {
                return { tutorExists: true, isMailSent: false };
            }
            try {
                const { otp, success } = yield this.mailer.sendMail(email);
                console.log(otp);
                if (success) {
                    const saveToDB = yield this.Repository.saveToDB(signupData, otp);
                    return { tutorExists: false, isMailSent: true };
                }
                else {
                    return { tutorExists: false, isMailSent: false };
                }
            }
            catch (error) {
                console.error('Error sending email:', error);
                return { tutorExists: false, isMailSent: false };
            }
        });
    }
    verifyOtp(otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isUser = yield this.Repository.verifyotp(otp);
                if (isUser) {
                    const { tutor, token, refreshToken } = yield this.Repository.save(isUser);
                    if (tutor && token) {
                        return { success: true, token, refreshToken, tutor };
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
                const { tutor, message, token } = yield this.Repository.findCredentials(credentials.email, credentials.password);
                console.log(tutor, token, message, 'loggggg');
                const refreshToken = tutor ? yield (0, CommonFunctions_1.genRefreshTokenTutor)(tutor) : '';
                return { tutor, message, token, refreshToken };
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
                const tutor = yield this.Repository.getUsers();
                if (tutor) {
                    return tutor;
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
}
exports.TutorInteractorImpl = TutorInteractorImpl;
