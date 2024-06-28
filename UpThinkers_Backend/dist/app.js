"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverr = void 0;
const server_1 = __importDefault(require("./src/frameworks/server/server"));
const config_1 = __importDefault(require("./src/config/config"));
const Mongoose_1 = __importDefault(require("./src/frameworks/database/Mongoose"));
const router_1 = __importDefault(require("./src/frameworks/server/router"));
const express_1 = __importDefault(require("./src/frameworks/server/express"));
const socket_io_1 = require("socket.io");
const SocketCode_1 = require("./src/application/functions/Socket/SocketCode");
const http_1 = __importDefault(require("http"));
const app = (0, server_1.default)(config_1.default);
(0, express_1.default)(app);
(0, router_1.default)(app);
(0, Mongoose_1.default)(config_1.default);
exports.serverr = http_1.default.createServer(app);
const io = new socket_io_1.Server(exports.serverr, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"],
        credentials: true
    }
});
(0, SocketCode_1.connectSocket)(io);
exports.default = app;
