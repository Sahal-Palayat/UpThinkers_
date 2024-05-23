"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tutorSchema = new mongoose_1.Schema({
    Name: String,
    Email: String,
    Mobile: Number,
    Password: String,
    Status: Boolean,
    CreatedAt: Date,
    Image: String,
    UpdatedAt: Date,
    wishlist: [],
    isBlocked: {
        type: Boolean,
        default: false,
    },
    Courses: []
});
const TutorModel = (0, mongoose_1.model)('tutors', tutorSchema);
exports.default = TutorModel;
