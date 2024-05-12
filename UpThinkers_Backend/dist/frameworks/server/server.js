"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server = (config) => {
    const app = (0, express_1.default)();
    app.listen(config.PORT, () => {
        console.log(`server listening on ${config.PORT}`);
    });
    return app;
};
exports.default = server;
