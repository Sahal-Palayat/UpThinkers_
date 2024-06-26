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
exports.checkobjectId = exports.getUsers = void 0;
const mongoose_1 = require("mongoose");
const user_1 = __importDefault(require("./models/user"));
const getUsers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(userId);
        return user;
    }
    catch (e) {
        return null;
    }
});
exports.getUsers = getUsers;
const checkobjectId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mongoose_1.isObjectIdOrHexString)(userId);
});
exports.checkobjectId = checkobjectId;
