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
exports.AdminInteractorImpl = void 0;
const CommonFunctions_1 = require("../functions/CommonFunctions");
class AdminInteractorImpl {
    constructor(Repository) {
        this.Repository = Repository;
        // this.Repository.save()
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, message, token } = yield this.Repository.findCredentials(credentials.email, credentials.password);
                console.log(user, token, message, 'loggggg');
                const refreshToken = user ? yield (0, CommonFunctions_1.genRefreshToken)(user) : '';
                return { user, message, token, refreshToken };
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
                const user = yield this.Repository.getUsers();
                if (user) {
                    return user;
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
}
exports.AdminInteractorImpl = AdminInteractorImpl;
