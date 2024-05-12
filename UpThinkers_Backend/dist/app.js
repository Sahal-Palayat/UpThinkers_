"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./frameworks/server/server"));
const config_1 = __importDefault(require("./config/config"));
const Mongoose_1 = __importDefault(require("./frameworks/database/Mongoose"));
const router_1 = __importDefault(require("./frameworks/server/router"));
const express_1 = __importDefault(require("./frameworks/server/express"));
const app = (0, server_1.default)(config_1.default);
(0, express_1.default)(app);
(0, router_1.default)(app);
(0, Mongoose_1.default)(config_1.default);
exports.default = app;
