"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../controllers/routes/user"));
const tutor_1 = __importDefault(require("../../controllers/routes/tutor"));
const RouterConfig = (app) => {
    app.use('/user', user_1.default);
    // app.use('/admin',adminRouter)
    app.use('/tutor', tutor_1.default);
};
exports.default = RouterConfig;
