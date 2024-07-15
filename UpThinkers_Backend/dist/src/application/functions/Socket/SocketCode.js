"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectSocket = void 0;
const socket_io_1 = require("socket.io");
const chatRepository_1 = require("../../repository/chatRepository");
const connectSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        },
    });
    io.on('connection', (socket) => {
        console.log("scoket connected");
        socket.on('join', (Data) => { socket.join(Data); });
        socket.on('new_message', (Data) => {
            io.to(Data.to).emit('incoming_message', Data);
            console.log(Data, "this sis thr messafe data");
            chatRepository_1.chatRepoLayer.addChat(Data);
        });
        socket.on("online", (data) => {
            io.to(data.personId).emit("online", data);
        });
        socket.on("custom_message", (data) => {
            console.log("custom message found");
            io.to(data.personId).emit("custom_message", data);
        });
    });
};
exports.connectSocket = connectSocket;
