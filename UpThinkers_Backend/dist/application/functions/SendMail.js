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
exports.SendVerificationLink = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailer_1 = require("../../config/mailer");
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: mailer_1.Mailer
});
const SendVerificationLink = (Email, VerificationLink) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = "Welcome to upthinkers learning hub.";
        const footer = `Link : ${VerificationLink}. link will be expired `;
        const mailOptions = {
            from: mailer_1.Mailer.user,
            to: Email,
            subject: "Welcome to upthinkers learning hub",
            text: text,
            html: footer
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('error sending mail', error.message);
                return false;
            }
            console.log('email successfully sent', info.response);
        });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.SendVerificationLink = SendVerificationLink;
const htmlSender = (OTP, text) => {
    return `
        <html>
        <body>
        <center><p style='text-decoration:underline'>OTP For Login Verification</p></center>
            <center><h1 style="font-size: 36px; color: #ff0000;">${OTP}</h1></center>
            <p>${text}</p>
        </body>
        </html>
    `;
};
