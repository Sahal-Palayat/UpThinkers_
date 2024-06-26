"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    Name: String,
    Email: String,
    Mobile: Number,
    Password: String,
    Status: Boolean,
    CreatedAt: Date,
    Image: String,
    UpdatedAt: Date,
    isGoogle: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    wishlist: [],
    isBlocked: {
        type: Boolean,
        default: false,
    }
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.Password) {
            if (!this.isModified("Password")) {
                next();
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            this.Password = yield bcrypt_1.default.hash(this.Password, salt);
        }
    });
});
userSchema.methods.matchPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(enteredPassword, this.password);
    });
};
const UserModel = (0, mongoose_1.model)('users', userSchema);
exports.default = UserModel;
