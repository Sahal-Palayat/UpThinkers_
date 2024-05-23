"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
const UserController_1 = require("../controller/UserController");
const mailer_1 = require("../../application/external-lib/mailer");
const UserRepository_1 = require("../../application/repository/User/UserRepository");
const User_1 = require("../../application/usecases/User");
const repository = new UserRepository_1.UserRepositoryImpl();
const mailer = new mailer_1.MailerImp();
const interactor = new User_1.UserInteractorImpl(repository, mailer);
const controller = new UserController_1.UserController(interactor);
userRouter.post('/register', controller.register.bind(controller));
userRouter.post('/sendMail', controller.sendMail.bind(controller));
userRouter.post('/verifyOtp', controller.verifyOtp.bind(controller));
userRouter.post('/resendMail/:emailId', controller.resendMail.bind(controller));
// userRouter.get('/home',controller.getHome.bind(controller))
userRouter.post('/login', controller.login.bind(controller));
exports.default = userRouter;
