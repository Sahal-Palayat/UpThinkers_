"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY || '',
    api_key: process.env.CLOUDINARY_KEY || '',
    api_secret: process.env.CLOUDINARY_API_SECRET || ''
};
cloudinary_1.v2.config(cloudinaryConfig);
exports.default = cloudinary_1.v2;
