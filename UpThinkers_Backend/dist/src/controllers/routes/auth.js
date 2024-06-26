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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../frameworks/database/models/user"));
const CommonFunctions_1 = require("../../application/functions/CommonFunctions");
const authRouter = express_1.default.Router();
authRouter.post('/refresh-token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('REFRESH TOKEN ENDPOINT CALLED');
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required.' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, 'thadavil__aanu');
        const user = yield user_1.default.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }
        const accessToken = (0, CommonFunctions_1.genAccessToken)(user, 'user');
        res.status(200).json({ accessToken });
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid refresh token.' });
    }
}));
exports.default = authRouter;
