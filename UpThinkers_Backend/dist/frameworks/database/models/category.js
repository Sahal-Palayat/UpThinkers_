"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    Name: String,
    Status: {
        type: Boolean,
        default: true
    },
    Description: String,
});
const CategoryModel = (0, mongoose_1.model)('category', categorySchema);
exports.default = CategoryModel;
