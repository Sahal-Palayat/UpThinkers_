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
exports.TutorRepositoryImpl = void 0;
const tutor_1 = __importDefault(require("../../../frameworks/database/models/tutor"));
const CommonFunctions_1 = require("../../functions/CommonFunctions");
const otp_1 = __importDefault(require("../../../frameworks/database/models/otp"));
const course_1 = __importDefault(require("../../../frameworks/database/models/course"));
const category_1 = __importDefault(require("../../../frameworks/database/models/category"));
const lesson_1 = __importDefault(require("../../../frameworks/database/models/lesson"));
const mongoose_1 = __importDefault(require("mongoose"));
class TutorRepositoryImpl {
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('repositoryy');
                const { Name, Email, Mobile, Password } = user;
                console.log(user, 'lasttt');
                const newTutor = new tutor_1.default({ Name, Email, Mobile, Password });
                console.log(newTutor, 'new userrrrrrrrrrrrrrrrrr');
                yield newTutor.save();
                let tutorToken = yield (0, CommonFunctions_1.genAccessToken)(user, 'tutor');
                let refreshToken = yield (0, CommonFunctions_1.genRefreshToken)(user, 'tutor');
                console.log('tokennn', tutorToken);
                return { tutor: newTutor ? newTutor.toObject() : null, tutorToken, refreshToken };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    tutorExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const tutorExists = yield tutor_1.default.findOne({ Email: email });
            return !!tutorExists;
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
                const tutor = yield otp_1.default.findOne({ otp: otp });
                console.log('user', tutor);
                return tutor ? tutor : null;
            }
            catch (error) {
                console.error('Error verifying OTP from database:', error);
                return null;
            }
        });
    }
    findCredentials(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('user repositoryyyy');
                console.log(email, password);
                const tutor = yield tutor_1.default.findOne({ Email: email });
                console.log(tutor);
                let message = '';
                let tutorToken = null;
                if (!tutor) {
                    message = ' invalid user';
                }
                else {
                    if (password !== tutor.Password) {
                        console.log('invalid password');
                        message = 'Invalid Password';
                    }
                    else {
                        tutorToken = yield (0, CommonFunctions_1.genAccessToken)(tutor, 'tutor');
                        console.log('token', tutorToken);
                    }
                }
                if (tutor && !message) {
                    return { tutor: tutor.toObject(), message, tutorToken };
                }
                else {
                    console.log('message222', message);
                    return { tutor: null, message, tutorToken };
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
                const tutors = yield tutor_1.default.find();
                return tutors;
            }
            catch (error) {
                console.error('Error fetching users:', error);
                return [];
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
    addCourse(course) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCourse = new course_1.default(course);
                yield newCourse.save();
                return { course: newCourse };
            }
            catch (error) {
                console.log(error);
                throw error;
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
                const courses = yield course_1.default.find();
                return courses;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    editCourse(id, course) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCourse = yield course_1.default.findOneAndUpdate({ _id: id }, { $set: course }, { new: true });
                return { course: updatedCourse };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    deleteCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCourse = yield course_1.default.findOneAndDelete({ _id: id });
                return deletedCourse;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    addLesson(lesson) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newLesson = new lesson_1.default(lesson);
                yield newLesson.save();
                return { lesson: newLesson };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getLessons(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const lessons: Lesson[] = await LessonModel.aggregate([
                //     {
                //         $lookup: {
                //             from: 'courses', 
                //             localField: 'Course', 
                //             foreignField: '_id', 
                //             as: 'courseDetails'
                //         }
                //     },
                //     {
                //         $match: {
                //             'courseDetails._id': new mongoose.Types.ObjectId(id) 
                //         }
                //     },
                //     {
                //         $unwind: '$courseDetails' 
                //     }
                // ]);
                // return lessons
                const [data] = yield course_1.default.aggregate([{
                        $match: { _id: new mongoose_1.default.Types.ObjectId(id) },
                    },
                    { $lookup: {
                            from: "lessons",
                            localField: "_id",
                            foreignField: "Course",
                            as: "lessons"
                        } }
                ]);
                return data;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
}
exports.TutorRepositoryImpl = TutorRepositoryImpl;
