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
exports.RegisterValidate = void 0;
const joi_1 = __importDefault(require("joi"));
const console_1 = require("console");
const RegisterValidate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const nameRegex = /^[a-zA-Z\s]+$/;
        const errors = [
            'Name is required and should not contain numbers',
            'Invalid email format',
            'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
            'Username must be alphanumeric and between 3 to 30 characters',
            'Phone number must be exactly 10 digits long'
        ];
        const schema = joi_1.default.object({
            FirstName: joi_1.default.string().regex(nameRegex).required().error(new Error(errors[0])),
            LastName: joi_1.default.string().regex(nameRegex).required().error(new Error(errors[0])),
            Email: joi_1.default.string().email().required().error(new Error(errors[1])),
            Mobile: joi_1.default.number().required().error(new Error(errors[4])),
            Password: joi_1.default.string().regex(passwordRegex).required().error(new Error(errors[2]))
        });
        const { error } = schema.validate(data, { abortEarly: false });
        (0, console_1.log)(error);
        if (error) {
            let errMessage = new Array(5).fill('');
            const i = parseInt(error.message);
            errMessage[i] = errors[i];
            return errMessage;
        }
        return [];
    }
    catch (error) {
        console.log(error);
        return ['validate error....'];
    }
});
exports.RegisterValidate = RegisterValidate;
