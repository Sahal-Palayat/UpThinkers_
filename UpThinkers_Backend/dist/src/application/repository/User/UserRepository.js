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
exports.UserRepositoryImpl = void 0;
const user_1 = __importDefault(require("../../../frameworks/database/models/user"));
const CommonFunctions_1 = require("../../functions/CommonFunctions");
const otp_1 = __importDefault(require("../../../frameworks/database/models/otp"));
const category_1 = __importDefault(require("../../../frameworks/database/models/category"));
const course_1 = __importDefault(require("../../../frameworks/database/models/course"));
const order_1 = __importDefault(require("../../../frameworks/database/models/order"));
const tutor_1 = __importDefault(require("../../../frameworks/database/models/tutor"));
const lesson_1 = __importDefault(require("../../../frameworks/database/models/lesson"));
const mongoose_1 = require("mongoose");
const jwt = require('jsonwebtoken');
const mongoose_2 = __importDefault(require("mongoose"));
const ObjectId = mongoose_2.default.Types.ObjectId;
class UserRepositoryImpl {
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('repositoryy');
                const { Name, Email, Mobile, Password } = user;
                console.log(user, 'lasttt');
                const newUser = new user_1.default({ Name, Email, Mobile, Password });
                console.log(newUser, 'new userrrrrrrrrrrrrrrrrr');
                yield newUser.save();
                let token = yield (0, CommonFunctions_1.genAccessToken)(user, 'user');
                let refreshToken = yield (0, CommonFunctions_1.genRefreshToken)(user, 'user');
                console.log('tokennn', token);
                return { user: newUser ? newUser.toObject() : null, token, refreshToken };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    userExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield user_1.default.findOne({ Email: email });
            return !!userExists;
        });
    }
    saveToDB(signupData, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('redyyy');
                const { name, email, password, mobile } = signupData;
                console.log(signupData);
                const isAddedToDb = yield otp_1.default.insertMany({ Name: name, Email: email, Password: password, Mobile: mobile, otp: otp });
                return isAddedToDb ? true : false;
            }
            catch (error) {
                console.error("Error saving data to database:", error);
                return false;
            }
        });
    }
    verifyotp(otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('3', otp);
                const user = yield otp_1.default.findOne({ otp: otp });
                console.log('user', user);
                return user ? user : null;
            }
            catch (error) {
                console.error('Error verifying OTP from database:', error);
                return null;
            }
        });
    }
    googleAuth(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Name, Email, Mobile, Password } = user;
                console.log(user, 'lasttt');
                const newUser = new user_1.default({ Name, Email, Mobile, Password });
                console.log(newUser, 'new userrrrrrrrrrrrrrrrrr');
                yield newUser.save();
                let token = yield (0, CommonFunctions_1.genAccessToken)(user, 'user');
                let refreshToken = yield (0, CommonFunctions_1.genRefreshToken)(user, 'user');
                console.log('tokennn', token);
                return { user: newUser ? newUser.toObject() : null, token, refreshToken };
            }
            catch (error) {
                console.log(error);
                return { user: null, token: null, refreshToken: null };
            }
        });
    }
    findCredentials(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('user repositoryyyy');
                console.log(email, password);
                const user = yield user_1.default.findOne({ Email: email });
                console.log(user);
                let message = '';
                let token = null;
                if (!user) {
                    message = ' invalid user';
                }
                else if (user.isBlocked === true) {
                    message = 'user blocked';
                }
                else {
                    if (password !== user.Password) {
                        console.log('invalid password');
                        message = 'Invalid Password';
                    }
                    else {
                        token = yield (0, CommonFunctions_1.genAccessToken)(user, 'user');
                        let refreshToken = yield (0, CommonFunctions_1.genRefreshToken)(user, 'user');
                        user.RefreshToken = refreshToken;
                        yield user.save();
                        //  await UserModel.save(refreshToken)
                        console.log('token', token);
                    }
                }
                if ((user === null || user === void 0 ? void 0 : user.isBlocked) === false && !message) {
                    return { user: user.toObject(), message, token };
                }
                else {
                    console.log('message222', message);
                    return { user: null, message, token };
                }
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
                const users = yield user_1.default.find();
                return users;
            }
            catch (error) {
                console.error('Error fetching users:', error);
                return [];
            }
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_1.default.findById(userId);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    updateOTP(emailId, newOtp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isUpdateOTP = yield otp_1.default.findOneAndUpdate({ Email: emailId }, { $set: { otp: newOtp } });
                return isUpdateOTP != null;
            }
            catch (error) {
                console.log(error);
                throw new Error();
            }
        });
    }
    getCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_1.default.find();
                return category;
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
                const course = yield course_1.default.find({ isDeleted: false });
                return course;
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
    getCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield course_1.default.findById(id);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    placeOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { CourseId, TutorId, StudentId, Price, Payment } = order;
                const newOrder = new order_1.default({ CourseId, TutorId, StudentId, Price, Payment });
                yield newOrder.save();
                return { order: newOrder ? newOrder.toObject() : null };
            }
            catch (error) {
                console.log(error);
                return { order: null };
            }
        });
    }
    getAllOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                return (_a = yield order_1.default.find()) !== null && _a !== void 0 ? _a : [];
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
    getTutors() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tutors = yield tutor_1.default.find();
                return tutors;
            }
            catch (error) {
                console.error('Error fetching users:', error);
                return [];
            }
        });
    }
    getTutorCourse(tutorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tutorCourse = yield course_1.default.find({ TutorId: tutorId });
                return tutorCourse;
            }
            catch (error) {
                console.error('Error fetching users:', error);
                return [];
            }
        });
    }
    getEnrolledCourse(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enrolledStudents = yield order_1.default.find({ StudentId: studentId });
                const enrolledCourse = yield course_1.default.find({ _id: { $in: enrolledStudents.map(order => order.CourseId) } });
                return enrolledCourse;
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
    addImage(studentId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield user_1.default.findOneAndUpdate({ _id: studentId }, { $set: { Image: image } }, { new: true });
                return updatedUser ? [updatedUser.toObject()] : [];
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
    videoSeen(userId, lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lesson = yield lesson_1.default.findByIdAndUpdate(lessonId, { $addToSet: { Seen: userId } });
                return { lesson, message: 'User ID added to views' };
            }
            catch (error) {
                console.log(error);
                return { lesson: null, message: `An error occurred: ${error}` };
            }
        });
    }
    getCertificate(userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lessons = yield lesson_1.default.find({ Course: courseId, Seen: { $ne: new mongoose_1.Types.ObjectId(userId) } });
                return { unseenCount: lessons.length };
            }
            catch (error) {
                console.log(error);
                return { unseenCount: 0 };
            }
        });
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
