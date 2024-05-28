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
                const { user, message, adminToken, refreshToken } = yield this.interactor.login({ email: email, password: password });
                if (user) {
                    console.log('user und');
                    console.log('cntrllr user', user, adminToken, refreshToken);
                    res.status(200).json({ message: 'Login Succefull', user, adminToken: adminToken, refreshToken });
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
                console.log(users, '_+_+_+_+_+_+_+_+_+_+_+');
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
    blockUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                console.log(userId);
                const blockedUser = yield this.interactor.blockUser(userId);
                res.status(200).json({ blockedUser, message: 'user blocked successfully' });
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Internal server error');
            }
        });
    }
    blockTutor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('keriiiiiiiiiii');
                const tutorId = req.params.id;
                console.log(tutorId);
                const blockedTutor = yield this.interactor.blockTutor(tutorId);
                res.status(200).json({ blockedTutor, message: 'user blocked successfully' });
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Internal server error');
            }
        });
    }
    addCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description } = req.body;
                console.log(name, description, 'ssssss');
                const { categoryExists, category } = yield this.interactor.addCategory({ Name: name, Description: description });
                if (categoryExists) {
                    res.status(208).json({ success: false, message: 'User already exists' });
                }
                else {
                    res.status(200).json(category);
                }
            }
            catch (error) {
                res.status(500).json({ error: error });
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
    editCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { Name, Description } = req.body;
                console.log(id, Name, Description);
                const updateCategory = yield this.interactor.editCategory(id, { Name: Name, Description: Description });
                res.status(200).json(updateCategory);
            }
            catch (error) {
                res.status(500).json(error);
                throw error;
            }
        });
    }
}
exports.AdminController = AdminController;
