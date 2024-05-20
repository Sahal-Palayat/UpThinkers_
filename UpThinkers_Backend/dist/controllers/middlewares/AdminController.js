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
exports.AdminController = void 0;
class AdminController {
    constructor(interactor) {
        this.interactor = interactor;
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
                console.log(error);
                throw error;
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
}
exports.AdminController = AdminController;
