"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const lessonSchema = new mongoose_1.Schema({
    Title: String,
    Content: String,
    Image: String,
    Video: String,
    Documents: [],
    Course: { type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'CourseModel',
    },
    Rating: {
        type: Number,
        default: 0
    },
    Students: [{ type: String }],
    CreatedAt: Date,
});
const LessonModel = (0, mongoose_1.model)('lessons', lessonSchema);
exports.default = LessonModel;
