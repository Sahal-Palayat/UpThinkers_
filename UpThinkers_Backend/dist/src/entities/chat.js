"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.messageSchema = new mongoose_1.Schema({
    to: { type: String, required: true },
    time: { type: String, required: true },
    sender: { type: String, required: true },
    message: { type: String, required: true },
    file: {
        fileType: { type: String, default: "" },
        Link: { type: String, default: "" },
    },
    seen: { type: Boolean, required: true },
});
