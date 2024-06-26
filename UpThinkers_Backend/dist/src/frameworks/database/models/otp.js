"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const otpSchema = new mongoose_1.default.Schema({
    otp: {
        type: String,
    },
    Name: {
        type: String,
    },
    Email: {
        type: String,
    },
    Mobile: {
        type: String,
    },
    Password: {
        type: String,
    }
});
const otpModel = mongoose_1.default.model('otps', otpSchema);
exports.default = otpModel;
