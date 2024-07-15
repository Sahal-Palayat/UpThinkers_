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
exports.getUserById = exports.getChats = exports.getNewChats = exports.setAllMessageSeen = exports.getChatOfUser = void 0;
const Chat_1 = require("../../application/usecases/Chat");
// import { Fields, Files, IncomingForm } from 'formidable'
const errorResponse = (error, res) => {
    var _a;
    res.status(200).json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "some error occured" });
};
const successResponse = (res, data) => {
    res.status(200).json(data);
};
const getChatOfUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('hellooo hooi');
        successResponse(res, yield Chat_1.chatUseCase.getChatOfUser(req.query.userId, req.query.tutor));
    }
    catch (error) {
        console.error(error);
        errorResponse(error, res);
    }
});
exports.getChatOfUser = getChatOfUser;
// export const saveAudio = async (req: Request, res: Response) => {
//     try {
//         const data = await multipartFormSubmission(req)
//         const message = data.fields.message ? JSON.parse(data.fields.message[0] as string) : null
//         const audioBuffer = data.files.audioBuffer
//         if (message && data.files.audioBuffer) {
//             successResponse(res, await chatUseCase.saveAudio(message, audioBuffer))
//         } else {
//             errorResponse({ message: "not enough data" }, res);
//         }
//     } catch (error: any) {
//         console.error(error);
//         errorResponse(error, res)
//     }
// }
const setAllMessageSeen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId + "";
        const personId = req.query.personId + "";
        successResponse(res, yield Chat_1.chatUseCase.setAllMessageSeen(userId, personId));
    }
    catch (error) {
        errorResponse(error, res);
    }
});
exports.setAllMessageSeen = setAllMessageSeen;
const getNewChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.query.userId, 'tutor id ith ');
        res.status(200).json(yield Chat_1.chatUseCase.getNewChats(req.query.userId));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: (error === null || error === void 0 ? void 0 : error.message) || "internal server error" });
    }
});
exports.getNewChats = getNewChats;
const getChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.query.userId, req.query.personId);
        successResponse(res, yield Chat_1.chatUseCase.getChats(req.query.userId, req.query.personId));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error || "internal server error" });
    }
});
exports.getChats = getChats;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = req.query.userId;
        const { data } = yield Chat_1.chatUseCase.getUserById(userId);
        console.log(data);
        res.status(200).json({ user: (_a = data === null || data === void 0 ? void 0 : data.data) !== null && _a !== void 0 ? _a : {} });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});
exports.getUserById = getUserById;
// function multipartFormSubmission(req: Request): Promise <{ files: Files; fields: Fields }> {
//     return new Promise((resolve, reject) => {
//         const form = new IncomingForm();
//         form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
//             if (err) {
//                 console.log(err);
//                 reject(err);
//             } else {
//                 resolve({ files, fields });
//             }
//         });
//     });
// }
