"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
const UserController_1 = require("../controller/UserController");
const mailer_1 = require("../../application/external-lib/mailer");
const UserRepository_1 = require("../../application/repository/User/UserRepository");
const User_1 = require("../../application/usecases/User");
const authmiddleware_1 = require("../middlewares/authmiddleware");
const chatController = __importStar(require("../controller/ChatController"));
const repository = new UserRepository_1.UserRepositoryImpl();
const mailer = new mailer_1.MailerImp();
const interactor = new User_1.UserInteractorImpl(repository, mailer);
const controller = new UserController_1.UserController(interactor);
userRouter.post('/register', controller.register.bind(controller));
userRouter.post('/sendMail', controller.sendMail.bind(controller));
userRouter.post('/verifyOtp', controller.verifyOtp.bind(controller));
userRouter.post('/resendMail/:emailId', controller.resendMail.bind(controller));
userRouter.post('/login', controller.login.bind(controller));
userRouter.post('/googlauth', controller.googleAuth.bind(controller));
// userRouter.get('/home',userAuth,controller.getHome.bind(controller))
userRouter.get('/categorylist', authmiddleware_1.userAuth, controller.getCategory.bind(controller));
userRouter.get('/courselist', authmiddleware_1.userAuth, controller.getCourse.bind(controller));
userRouter.post('/placeorder', authmiddleware_1.userAuth, controller.placeOrder.bind(controller));
userRouter.get('/tutorslist', authmiddleware_1.userAuth, controller.getTutors.bind(controller));
userRouter.get('/tutorcourses/:tutorId', authmiddleware_1.userAuth, controller.getTutorCourse.bind(controller));
userRouter.get('/enrolledcourses/:userId', authmiddleware_1.userAuth, controller.getEnrolledCourse.bind(controller));
userRouter.post('/addimage/:userId', authmiddleware_1.userAuth, controller.addImage.bind(controller));
userRouter.get('/getuserbyid', authmiddleware_1.userAuth, controller.getUserById.bind(controller));
//chat ---------------
userRouter.get('/getChatOfUser', authmiddleware_1.userAuth, chatController.getChatOfUser);
userRouter.get('/setAllMessageSeen', authmiddleware_1.userAuth, chatController.setAllMessageSeen);
userRouter.get('/getExistingChatsOfUser', authmiddleware_1.userAuth, chatController.getNewChats);
userRouter.get('/getchats', chatController.getChats);
exports.default = userRouter;
