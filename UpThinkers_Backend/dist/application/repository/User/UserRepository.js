"use strict";
// import * as UserEntity  from '../../../controllers/interfaces/UserInterfaces';
// import * as DatabaseFunctions from '../../functions/DatabaseFunctions';
// import * as ResponseFunctions from '../../responses/Response/UserResponse';
// import * as Responses from '../../responses/Interfaces/UserResponsesInterface'
// import UserAuth from '../../../frameworks/database/models/UnverifiedUsers';
// import * as Response from '../../responses/Interfaces/UserResponsesInterface';
// import * as CommonFunctions from '../../functions/CommonFunctions'
// import UnverifiedUsers from '../../../entities/UnverifiedUsers';
// import { CreatePayload } from '../../functions/JWT';
// import auth from '../../../config/auth';
// import UserDocument from '../../../entities/user';
// import { VerifyUser } from '../../functions/UserFunctions';
// import { ObjectId } from 'mongodb';
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
const jwt = require('jsonwebtoken');
class UserRepositoryImpl {
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('repositoryy');
            const { FirstName, LastName, Email, Mobile, Password } = user;
            const newUser = new user_1.default({ FirstName, LastName, Email, Mobile, Password });
            yield newUser.save();
            let token = yield (0, CommonFunctions_1.genAccessToken)(user);
            console.log('tokennn', token);
            return { user: newUser ? newUser.toObject() : null, token };
        });
    }
    userExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('3', email);
            const userExists = yield user_1.default.findOne({ email: email });
            return !!userExists;
        });
    }
    saveToDB(signupData, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { FirstName, Email, Password, Mobile, otp } = signupData;
                const isAddedToDb = yield otp_1.default.create({ Name: FirstName, Email: Email, Password: Password, Mobile: Mobile });
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
                console.log('3');
                const user = yield otp_1.default.findOne({ otp: otp });
                console.log('user', user);
                return user ? user.toObject() : null;
            }
            catch (error) {
                console.error('Error verifying OTP from database:', error);
                return null;
            }
        });
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
