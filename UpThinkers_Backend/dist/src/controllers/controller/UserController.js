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
exports.UserController = void 0;
class UserController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, mobile, password } = req.body;
                console.log('bodyyy', req.body);
                const { user, token } = yield this.interactor.register({ Name: name, Password: password, Email: email, Mobile: mobile });
                console.log(user, token, 'returningggggg');
                res.status(200).json({ message: 'Signup successful', user, token });
            }
            catch (error) {
                console.error('Error during signup:', error);
                res.status(500).send('Internal server error');
            }
        });
    }
    sendMail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const signupData = req.body;
                console.log(req.body, 'firsttttttttttttttt');
                const { userExists, isMailSent } = yield this.interactor.sendMail(signupData);
                if (userExists) {
                    res.status(400).json({ success: false, message: 'User already exists' });
                }
                else if (isMailSent) {
                    res.status(200).json({ success: true, message: 'Email sent successfully' });
                }
                else {
                    res.status(500).json({ success: false, message: 'Failed to send email' });
                }
            }
            catch (error) {
                res.status(500).send('Internal server error');
            }
        });
    }
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('0000000');
                const { otp } = req.body;
                const { user, success, token, refreshToken } = yield this.interactor.verifyOtp(otp);
                if (success) {
                    res.status(200).json({ success: true, message: 'otp verification success', token, refreshToken, user });
                }
                else {
                    res.status(400).json({ success: false, message: 'otp verification failed' });
                }
            }
            catch (error) {
                console.error('Error verifying OTP:', error);
                res.status(500).json({ success: false, message: 'Internal server error.' });
            }
        });
    }
    googleAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, sub } = req.body;
                console.log(name, email, sub);
                const user = yield this.interactor.googleAuth({ Name: name, Password: sub, Email: email });
                res.status(200).json({ message: "User registered successfully", user: user === null || user === void 0 ? void 0 : user.user, token: user === null || user === void 0 ? void 0 : user.token, refreshToken: user === null || user === void 0 ? void 0 : user.refreshToken });
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Internal server error');
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('entered login controller', req.body);
                const { email, password } = req.body;
                console.log(email, password);
                const { user, message, token, refreshToken } = yield this.interactor.login({ email: email, password: password });
                if (user) {
                    console.log('user und');
                    console.log('cntrllr user', user, token, refreshToken);
                    res.status(200).json({ message: 'Login Succefull', user, token: token, refreshToken });
                }
                else {
                    res.status(302).json({ message: message });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Internal server error');
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.interactor.getUsers();
                res.status(200).json({ users });
            }
            catch (error) {
            }
        });
    }
    resendMail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                const emailId = req.params.emailId;
                console.log(emailId, 'jjjjjjjjjjjjjjjjjjj');
                const success = yield this.interactor.resendMail(emailId);
                if (success) {
                    console.log('Sheriyayii');
                    res.status(200).json({ success: true, message: 'Email sent successfully.' });
                }
                else {
                    res.status(302).json({ success: false, message: 'Failed to send email.' });
                }
            }
            catch (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ success: false, message: 'Internal server error.' });
            }
        });
    }
    getCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.interactor.getCategory();
                res.status(200).json({ category });
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Internal server error');
            }
        });
    }
    getCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield this.interactor.getCourse();
                res.status(200).json({ course });
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Internal server error');
            }
        });
    }
    placeOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { courseId, studentId, tutorId, amount, payment } = req.body;
                const order = yield this.interactor.placeOrder({ CourseId: courseId, TutorId: tutorId, StudentId: studentId, Price: amount, Payment: payment });
                res.status(200).json({ order });
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Internal server error');
            }
        });
    }
    getTutors(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tutors = yield this.interactor.getTutors();
                res.status(200).json({ tutors });
            }
            catch (error) {
            }
        });
    }
    getTutorCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('aiwaaaaaaaaaaaaaa');
                const tutorId = req.params.tutorId;
                const tutorCourse = yield this.interactor.getTutorCourse(tutorId);
                res.status(200).json({ tutorCourse });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ 'error': error });
            }
        });
    }
    getEnrolledCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentId = req.params.userId;
                const enrolledCourse = yield this.interactor.getEnrolledCourse(studentId);
                res.status(200).json({ enrolledCourse });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ 'error': error });
            }
        });
    }
    addImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentId = req.params.userId;
                const { img } = req.body;
                console.log(img, studentId, 'saaaaaaaaaaaaaaaaaaaaa');
                const uploadImage = yield this.interactor.addImage(studentId, img);
                res.status(200).json({ uploadImage });
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Internal server error');
            }
        });
    }
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                const user = yield this.interactor.getUserById(userId);
                res.status(200).json({ user });
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Internal server error');
            }
        });
    }
    videoSeen(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const lessonId = req.params.lessonId;
                const result = yield this.interactor.videoSeen(userId, lessonId);
                res.status(200).json(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Internal server error');
            }
        });
    }
    getCertificate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const courseId = req.params.courseId;
                const certificate = yield this.interactor.getCertificate(userId, courseId);
                console.log(certificate, '[][][][][][][]][]');
                res.status(200).json(certificate);
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Internal server error');
            }
        });
    }
}
exports.UserController = UserController;
