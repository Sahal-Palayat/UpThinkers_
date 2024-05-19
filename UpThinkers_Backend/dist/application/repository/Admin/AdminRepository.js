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
exports.AdminRepositoryImpl = void 0;
const user_1 = __importDefault(require("../../../frameworks/database/models/user"));
const CommonFunctions_1 = require("../../functions/CommonFunctions");
class AdminRepositoryImpl {
    findCredentials(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('user repositoryyyy');
            console.log(email, password);
            const user = yield user_1.default.findOne({ Email: email, isAdmin: true });
            console.log(user);
            let message = '';
            let token = null;
            if (!user) {
                message = ' invalid user';
            }
            else {
                if (password !== user.Password) {
                    console.log('invalid password');
                    message = 'Invalid Password';
                }
                else {
                    token = yield (0, CommonFunctions_1.genAccessToken)(user);
                    console.log('token', token);
                }
            }
            if (user && !message) {
                return { user: user.toObject(), message, token };
            }
            else {
                console.log('message222', message);
                return { user: null, message, token };
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
}
exports.AdminRepositoryImpl = AdminRepositoryImpl;
