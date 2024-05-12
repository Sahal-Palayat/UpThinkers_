"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePayload = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../../config/auth"));
const CreatePayload = ({ Payload, RememberMe }) => {
    try {
        const { JWT_EXPIRES_IN, JWT_REMEMBER_ME, JWT_SECRET } = auth_1.default;
        return jsonwebtoken_1.default.sign(Payload, JWT_SECRET, { expiresIn: RememberMe ? JWT_REMEMBER_ME : JWT_EXPIRES_IN });
    }
    catch (e) {
        console.log(e);
        return 'Internal server error';
    }
};
exports.CreatePayload = CreatePayload;
