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
                const { FirstName, LastName, Email, Mobile, Password } = req.body;
                console.log('bodyyy', req.body);
                const { user, token } = yield this.interactor.register({ FirstName, Password, Email, Mobile });
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
                console.log('ethi', req.body.email);
                const signupData = req.body;
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
                const { success, token } = yield this.interactor.verifyOtp(otp);
                if (success) {
                    res.status(200).json({ success: true, message: 'otp verification success', token });
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
}
exports.UserController = UserController;
