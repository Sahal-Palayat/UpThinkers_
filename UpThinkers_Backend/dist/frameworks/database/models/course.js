"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const courseSchema = new mongoose_1.Schema({
    Name: String,
    Status: {
        type: Boolean,
        default: true
    },
    Description: String,
    Image: String,
    Price: Number,
    OfferPrice: Number,
    Duration: String,
    Students: [{ type: String }],
    Category: String,
    lessons: [],
    TutorId: { type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'UserModal',
    },
    Rating: {
        type: Number,
        default: 0
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    CreatedAt: Date,
    UpdatedAt: Date,
});
const CourseSchema = new mongoose_1.Schema({
    courseName: { type: String, required: true },
    courseDuration: { type: String },
    courseFee: { type: Number, required: true },
    courseDescription: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String },
    students: [{ type: String }],
    instructorId: { type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    isApproved: { type: Boolean, default: false }
});
const CourseModel = (0, mongoose_1.model)('courses', courseSchema);
exports.default = CourseModel;
