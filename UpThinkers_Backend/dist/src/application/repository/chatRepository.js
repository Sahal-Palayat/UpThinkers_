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
exports.chatRepoLayer = void 0;
const chat_1 = require("../../frameworks/database/models/chat");
const user_1 = __importDefault(require("../../frameworks/database/models/user"));
class ChatRepository {
    getChatOfUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield chat_1.ChatModel.find({ userId });
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
    addChat(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chat = yield chat_1.ChatModel.findOne({ userId: { $all: [message.sender, message.to] } });
                console.log(chat, "this is the chat");
                if (chat) {
                    chat.details.push(message);
                    yield chat.save();
                    return chat;
                }
                else {
                    return yield chat_1.ChatModel.insertMany({
                        userId: [message.sender, message.to],
                        archived: false,
                        details: [message]
                    });
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    setAllMessageSeen(userId, personId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield chat_1.ChatModel.findOne({ userId: { $all: [userId, personId] } });
            if (chat) {
                chat.details = chat.details.map(item => {
                    if (item.to === personId) {
                        item.seen = true;
                    }
                    return item;
                });
                yield chat.save();
            }
            return { status: true, message: "success", data: chat };
        });
    }
    getChats(userId, personId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                return { status: true, message: "success", data: yield chat_1.ChatModel.findOne({ userId: { $all: [userId, personId] } }) };
            }
            catch (error) {
                console.log(error);
                return { status: false, message: (_a = error.message) !== null && _a !== void 0 ? _a : "error occured", data: null };
            }
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                return { status: true, message: "success", data: yield user_1.default.findById(userId) };
            }
            catch (error) {
                console.log(error);
                return { status: false, message: (_a = error.message) !== null && _a !== void 0 ? _a : "error occured", };
            }
        });
    }
}
exports.chatRepoLayer = new ChatRepository();
