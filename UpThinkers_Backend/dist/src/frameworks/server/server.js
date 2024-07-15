"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const server = (config) => {
    const app = (0, express_1.default)();
    const server = http_1.default.createServer(app);
    server.listen(4000, () => console.log('listening on *:4000'));
    return { app, server };
};
exports.default = server;
