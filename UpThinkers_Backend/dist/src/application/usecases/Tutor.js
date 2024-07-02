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
                const { tutor, tutorToken } = yield this.Repository.save(newUser);
                return { tutor, tutorToken };
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
                    const { tutor, tutorToken, refreshToken } = yield this.Repository.save(isUser);
                    if (tutor && tutorToken) {
                        return { success: true, tutorToken, refreshToken, tutor };
                    }
                }
                return { success: false, tutorToken: null, refreshToken: null };
            }
            catch (error) {
                console.log(error);
                return { success: false, tutorToken: null, refreshToken: null };
            }
        });
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { tutor, message, tutorToken } = yield this.Repository.findCredentials(credentials.email, credentials.password);
                console.log(tutor, tutorToken, message, 'loggggg');
                const refreshToken = tutor ? yield (0, CommonFunctions_1.genRefreshToken)(tutor, 'tutor') : '';
                return { tutor, message, tutorToken, refreshToken };
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
    getCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.Repository.getCategory();
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
    addCourse(courseData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCourse = {
                    Name: courseData.Name,
                    Status: true,
                    Description: courseData.Description,
                    Image: courseData.Image,
                    Price: courseData.Price,
                    OfferPrice: courseData.Price,
                    Duration: courseData.Duration,
                    Category: courseData.Category,
                    lessons: courseData.lessons,
                    TutorId: courseData.TutorId,
                    CreatedAt: courseData.CreatedAt,
                    UpdatedAt: courseData.UpdatedAt
                };
                const { course } = yield this.Repository.addCourse(newCourse);
                console.log(newCourse);
                return { course };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getCourse(tutorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield this.Repository.getCourse(tutorId);
                if (course) {
                    return course;
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
    editCourse(id, courseData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCourse = {
                    Name: courseData.Name,
                    Status: courseData.Status,
                    Description: courseData.Description,
                    Image: courseData.Image,
                    Price: courseData.Price,
                    OfferPrice: courseData.Price,
                    Duration: courseData.Duration,
                    Category: courseData.Category,
                    lessons: courseData.lessons,
                    Tutor: courseData.Tutor,
                    CreatedAt: courseData.CreatedAt,
                    UpdatedAt: courseData.UpdatedAt
                };
                const { course } = yield this.Repository.editCourse(id, newCourse);
                console.log(newCourse);
                return { course };
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
                const course = yield this.Repository.deleteCourse(id);
                if (course) {
                    return course;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    addLesson(lessonData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newLesson = { Title: lessonData.Title,
                    Content: lessonData.Content,
                    Image: lessonData.Image,
                    Video: lessonData.Video,
                    Documents: lessonData.Documents,
                    Course: lessonData.Course
                };
                const { lesson } = yield this.Repository.addLesson(newLesson);
                console.log(newLesson);
                return { lesson };
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
                const lesson = yield this.Repository.getLessons(id);
                if (lesson) {
                    return lesson;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    getStudents(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield this.Repository.getStudents(courseId);
                if (students) {
                    return students;
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
    getTutorById(tutorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tutor = yield this.Repository.getTutorById(tutorId);
                console.log(tutorId, 'ithan titiphij');
                if (tutor) {
                    return tutor;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
}
exports.TutorInteractorImpl = TutorInteractorImpl;
