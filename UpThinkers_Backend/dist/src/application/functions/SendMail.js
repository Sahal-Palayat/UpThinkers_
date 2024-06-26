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
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailer_1 = require("../../config/mailer");
function sendMail(email, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = nodemailer_1.default.createTransport({
            service: 'Gmail',
            auth: {
                user: mailer_1.Mailer.user,
                pass: mailer_1.Mailer.pass,
            },
            tls: {
                rejectUnauthorized: false,
            }
        });
        const mailOptions = {
            from: mailer_1.Mailer.user,
            to: email,
            subject: 'Heyy.. this is registration otp for UpThinkers',
            text: `Your OTP is ${otp}`
        };
        try {
            const info = yield transporter.sendMail(mailOptions);
            return { success: true };
        }
        catch (error) {
            console.error("Error sending email: ", error);
            return { success: false };
        }
    });
}
exports.default = sendMail;
