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
                const { user, message, adminToken } = yield this.Repository.findCredentials(credentials.email, credentials.password);
                console.log(user, adminToken, message, 'loggggg');
                const refreshToken = user ? yield (0, CommonFunctions_1.genRefreshToken)(user, 'admin') : '';
                return { user, message, adminToken, refreshToken };
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
    getTutors() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tutor = yield this.Repository.getTutors();
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
    blockUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.Repository.blockUser(userId);
                return user;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    blockTutor(tutorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tutor = yield this.Repository.blockTutor(tutorId);
                return tutor;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    addCategory(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCategory = {
                    Name: data.Name,
                    Description: data.Description
                };
                const cate = { categoryExists: false, category: null };
                const categoryExists = yield this.Repository.categoryExists(newCategory.Name);
                if (categoryExists) {
                    categoryExists.forEach((item) => {
                        var _a;
                        if (item && ((_a = item === null || item === void 0 ? void 0 : item.Name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === data.Name.toLowerCase()) {
                            cate.categoryExists = true;
                            cate.category = item;
                        }
                    });
                }
                if (cate.categoryExists) {
                    return cate;
                }
                else {
                    const { category } = yield this.Repository.addCategory(newCategory);
                    return { categoryExists: false, category };
                }
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
    editCategory(id, datas) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.Repository.editCategory(id, {
                    Name: datas.Name,
                    Description: datas.Description,
                });
                return category;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.AdminInteractorImpl = AdminInteractorImpl;
