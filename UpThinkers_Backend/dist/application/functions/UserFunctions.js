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
exports.VerifyUser = exports.uploadBase64Image = exports.UploadFile = void 0;
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const fs_1 = __importDefault(require("fs"));
const UploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileBuffer = fs_1.default.readFileSync(file.path);
        const fileString = fileBuffer.toString('base64');
        const result = yield cloudinary_1.default.uploader.upload(`data:${file.mimetype};base64,${fileString}`, {
            folder: 'User Profile'
        });
        fs_1.default.unlinkSync(file.path);
        return result.secure_url;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.UploadFile = UploadFile;
const uploadBase64Image = (base64Image) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary_1.default.uploader.upload(base64Image, {
            folder: 'Post_Images',
        });
        return result.secure_url;
    }
    catch (error) {
        console.error('Error uploading image:', error);
        return 'Internal Server Error';
    }
});
exports.uploadBase64Image = uploadBase64Image;
const VerifyUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!user)
            return { message: "No User Found", status: false };
        if (user.Terminated)
            return { message: "Account Terminated", status: false };
        if (user.Suspended) {
            const currentDate = new Date();
            if (user.SuspendedTill && user.SuspendedTill > currentDate) {
                return { message: "Account Suspended", status: false };
            }
            else {
                user.Suspended = false;
                user.SuspendedTill = undefined;
                yield user.save();
            }
        }
        return { message: "User Verified", status: true };
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: false,
        };
    }
});
exports.VerifyUser = VerifyUser;
