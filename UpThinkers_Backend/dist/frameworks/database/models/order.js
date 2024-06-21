"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.Schema({
    StudentId: { type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'UserModal',
    },
    TutorId: { type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'TutorModel',
    },
    CourseId: { type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'CourseModel',
    },
    Price: Number,
    Payment: String,
    CreatedAt: Date,
});
const OrderModel = (0, mongoose_1.model)('orders', orderSchema);
exports.default = OrderModel;
