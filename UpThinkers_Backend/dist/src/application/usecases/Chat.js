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
exports.chatUseCase = void 0;
// import { uploadAudio } from "../../data/adapters/cloudinary";
// import { messageArray } from "../../data/interfaces/chatSchema";
const chatRepository_1 = require("../repository/chatRepository");
const UserRepository_1 = require("../repository/User/UserRepository");
const TutorRepository_1 = require("../repository/Tutor/TutorRepository");
const userRepository = new UserRepository_1.UserRepositoryImpl();
const tutorRepository = new TutorRepository_1.TutorRepositoryImpl();
class chat_use_case {
    errorResponse(error) {
        var _a;
        return { status: false, message: (_a = error.message) !== null && _a !== void 0 ? _a : "error occured" };
    }
    successResponse(data) {
        return { status: false, message: "success", data };
    }
    getChatOfUser(userId, tutor) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = [];
            try {
                if (tutor === "true") {
                    const course = [...yield tutorRepository.getCourse("664ae1b33f73524777a2573a")];
                    data = [...yield (yield Promise.all(yield course.map((item) => __awaiter(this, void 0, void 0, function* () { return yield tutorRepository.getStudents(item._id + ''); })))).flat(Infinity)];
                    console.log(data, 'aaaaaaaaaaaaaaaaaaaaaa');
                    data = data.map((item) => item.studentId);
                    data = yield Promise.all(data.map((id) => __awaiter(this, void 0, void 0, function* () { return yield userRepository.getUserById(id); })));
                    console.log(data);
                }
                else {
                    console.log('else');
                    data = yield (yield userRepository.getEnrolledCourse(userId)).map((item) => item.TutorId + "");
                    data = yield Promise.all(data.map((id) => __awaiter(this, void 0, void 0, function* () { return yield tutorRepository.getTutorById(id); })));
                    console.log(data);
                }
                // const data = await chatRepoLayer.getChatOfUser(userId)
                return { status: true, message: "success", data: data };
            }
            catch (error) {
                return this.errorResponse(error);
            }
        });
    }
    // async saveAudio(message: messageArray, audioBuffer: any) {
    //     try {
    //         const { url } = await uploadAudio(audioBuffer[0], "chat_audio")
    //         message.file.Link = url; message.message = "AUDIO_MESSAGE"
    //         const data = await chatRepoLayer.addChat(message)
    //         return { status: true, message: "success", data: message }
    //     } catch (error) {
    //         return this.errorResponse(error)
    //     }
    // }
    setAllMessageSeen(userId, personId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield chatRepository_1.chatRepoLayer.setAllMessageSeen(userId, personId);
            }
            catch (error) {
                return this.errorResponse(error);
            }
        });
    }
    getNewChats(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(id, "ith eth id");
                const newChats = yield chatRepository_1.chatRepoLayer.getChatOfUser(id);
                return { status: true, message: "success", data: newChats };
            }
            catch (error) {
                console.error(error);
                return { status: false, message: "failed", data: [] };
            }
        });
    }
    getChats(userId, personId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chats = yield chatRepository_1.chatRepoLayer.getChats(userId, personId);
                return { status: true, message: "success", data: chats };
            }
            catch (error) {
                return this.errorResponse(error);
            }
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const user = yield chatRepository_1.chatRepoLayer.getUserById(userId);
                return { status: true, message: "success", data: user ? user : null };
            }
            catch (error) {
                console.log(error);
                return { status: false, message: (_a = error.message) !== null && _a !== void 0 ? _a : "internal error" };
            }
        });
    }
}
exports.chatUseCase = new chat_use_case();
