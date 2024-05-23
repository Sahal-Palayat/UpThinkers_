"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminRouter = (0, express_1.Router)();
const Admin_1 = require("../../application/usecases/Admin");
const AdminRepository_1 = require("../../application/repository/Admin/AdminRepository");
const AdminController_1 = require("../controller/AdminController");
const authmiddleware_1 = require("../middlewares/authmiddleware");
const repository = new AdminRepository_1.AdminRepositoryImpl();
const interactor = new Admin_1.AdminInteractorImpl(repository);
const controller = new AdminController_1.AdminController(interactor);
adminRouter.post('/login', controller.login.bind(controller));
adminRouter.get('/studentslist', authmiddleware_1.adminAuth, controller.getUsers.bind(controller));
adminRouter.get('/Tutorslist', authmiddleware_1.adminAuth, controller.getTutors.bind(controller));
adminRouter.patch('/studentslist/blockUser/:id', controller.blockUser.bind(controller));
adminRouter.patch('/tutorslist/blockTutor/:id', controller.blockTutor.bind(controller));
// adminRouter.post( '/addcategory',adminAuth,controller.addCategory.bind(controller))
exports.default = adminRouter;
