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
    Lessons: [],
    TutorId: { type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'TutorModal',
    },
    Rating: {
        type: Number,
        default: 0
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isDeleted: { type: Boolean, default: false },
    CreatedAt: Date,
    UpdatedAt: Date,
});
const CourseModel = (0, mongoose_1.model)('courses', courseSchema);
exports.default = CourseModel;
