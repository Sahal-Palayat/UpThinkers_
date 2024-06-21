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
    constructor(repository, mailer) {
        this.repository = repository;
        this.mailer = mailer;
        // this.repository.save()
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = {
                    Name: userData.Name,
                    Email: userData.Email,
                    Password: userData.Password,
                    CreatedAt: new Date()
                };
                console.log(newUser, 'usecaseeeeeeeeeeeee');
                const { user, token, refreshToken } = yield this.repository.save(newUser);
                return { user, token, refreshToken };
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
            const userExists = yield this.repository.userExists(email);
            console.log(userExists, "userData");
            if (userExists) {
                return { userExists: true, isMailSent: false };
            }
            try {
                const { otp, success } = yield this.mailer.sendMail(email);
                console.log(otp);
                if (success) {
                    const saveToDB = yield this.repository.saveToDB(signupData, otp);
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
                const isUser = yield this.repository.verifyotp(otp);
                if (isUser) {
                    const { user, token, refreshToken } = yield this.repository.save(isUser);
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
    googleAuth(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = {
                    Name: data.Name,
                    Email: data.Email,
                    Mobile: data.Mobile,
                    Password: data.Password
                };
                console.log(newUser);
                const { user, token, refreshToken } = yield this.repository.googleAuth(newUser);
                return { user, token, refreshToken };
            }
            catch (error) {
                console.log(error);
                return { user: null, token: null, refreshToken: null };
            }
        });
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, message, token } = yield this.repository.findCredentials(credentials.email, credentials.password);
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
                const user = yield this.repository.getUsers();
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
                    const updateOTP = yield this.repository.updateOTP(emailId, otp);
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
    getCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.repository.getCategory();
                if (category) {
                    return category;
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
    getCourse() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield this.repository.getCourse();
                if (course) {
                    return course;
                }
                else {
                    return [];
                }
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
    placeOrder(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newOrder = {
                    CourseId: orderData.CourseId,
                    TutorId: orderData.TutorId,
                    StudentId: orderData.StudentId,
                    Price: orderData.Price,
                    Payment: orderData.Payment,
                    CreatedAt: new Date()
                };
                const order = yield this.repository.placeOrder(newOrder);
                return order;
            }
            catch (error) {
                console.log(error);
                return { order: null };
            }
        });
    }
}
exports.UserInteractorImpl = UserInteractorImpl;
