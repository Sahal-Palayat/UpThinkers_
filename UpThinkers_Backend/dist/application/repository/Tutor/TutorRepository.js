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
class TutorRepositoryImpl {
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('repositoryy');
            const { Name, Email, Mobile, Password } = user;
            console.log(user, 'lasttt');
            const newTutor = new tutor_1.default({ Name, Email, Mobile, Password });
            console.log(newTutor, 'new userrrrrrrrrrrrrrrrrr');
            yield newTutor.save();
            let token = yield (0, CommonFunctions_1.genAccessTokenTutor)(user);
            let refreshToken = yield (0, CommonFunctions_1.genRefreshTokenTutor)(user);
            console.log('tokennn', token);
            return { tutor: newTutor ? newTutor.toObject() : null, token, refreshToken };
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
            console.log('user repositoryyyy');
            console.log(email, password);
            const tutor = yield tutor_1.default.findOne({ Email: email });
            console.log(tutor);
            let message = '';
            let token = null;
            if (!tutor) {
                message = ' invalid user';
            }
            else {
                if (password !== tutor.Password) {
                    console.log('invalid password');
                    message = 'Invalid Password';
                }
                else {
                    token = yield (0, CommonFunctions_1.genAccessTokenTutor)(tutor);
                    console.log('token', token);
                }
            }
            if (tutor && !message) {
                return { tutor: tutor.toObject(), message, token };
            }
            else {
                console.log('message222', message);
                return { tutor: null, message, token };
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
}
exports.TutorRepositoryImpl = TutorRepositoryImpl;
