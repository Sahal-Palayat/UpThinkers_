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
exports.TutorController = void 0;
class TutorController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, mobile, password } = req.body;
                console.log('bodyyy', req.body);
                const { tutor, tutorToken } = yield this.interactor.register({ Name: name, Password: password, Email: email, Mobile: mobile });
                console.log(tutor, tutorToken, 'returningggggg');
                res.status(200).json({ message: 'Signup successful', tutor, tutorToken });
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
                const { tutorExists, isMailSent } = yield this.interactor.sendMail(signupData);
                if (tutorExists) {
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
                const { tutor, success, tutorToken, refreshToken } = yield this.interactor.verifyOtp(otp);
                if (success) {
                    res.status(200).json({ success: true, message: 'otp verification success', tutorToken, refreshToken, tutor });
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
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('entered login controller', req.body);
                const { email, password } = req.body;
                console.log(email, password);
                const { tutor, message, tutorToken, refreshToken } = yield this.interactor.login({ email: email, password: password });
                if (tutor) {
                    console.log('user und');
                    console.log('cntrllr user', tutor, tutorToken, refreshToken);
                    res.status(200).json({ message: 'Login Succefull', tutor, tutorToken: tutorToken, refreshToken });
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
                const tutors = yield this.interactor.getUsers();
                res.status(200).json({ tutors });
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Internal server error');
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
                console.log('keriii');
                const category = yield this.interactor.getCategory();
                res.status(200).json(category);
            }
            catch (error) {
                res.status(500).json({ error: error });
                console.log(error);
            }
        });
    }
    getByTutorId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tutorId = req.query.tutorId;
                console.log(tutorId, 'ITH CONTRRR');
                const tutor = yield this.interactor.getTutorById(tutorId);
                res.status(200).json(tutor);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: error });
            }
        });
    }
}
exports.TutorController = TutorController;
