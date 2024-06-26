"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongooseConfig = (config) => {
    mongoose_1.default.connect(config.MONGO).then(() => console.log('mongodb connected'));
};
exports.default = mongooseConfig;
