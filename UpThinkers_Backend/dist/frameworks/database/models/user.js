"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    FirstName: String,
    LastName: String,
    Email: String,
    Mobile: Number,
    Password: String,
    Status: Boolean,
    CreatedAt: Date,
    Image: String,
    UpdatedAt: Date,
    wishlist: []
});
const User = (0, mongoose_1.model)('users', userSchema);
exports.default = User;
