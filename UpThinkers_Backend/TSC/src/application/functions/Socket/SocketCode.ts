import { Server,Socket } from 'socket.io';
import { ChatDocument } from '../../../entities/chat';
import { chatRepoLayer } from '../../repository/chatRepository';


export const connectSocket = (server: any) => {

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        },
    });

    
    io.on('connection', (socket: Socket) => {

        console.log("scoket connected");

        socket.on('join', (Data) => { socket.join(Data); });

        socket.on('new_message', (Data) => {
            io.to(Data.to).emit('incoming_message', Data);
            console.log(Data,"this sis thr messafe data");
            chatRepoLayer.addChat(Data)
        })



        socket.on("online", (data: any) => {
            io.to(data.personId).emit("online", data)
        })

        socket.on("custom_message", (data: any) => {
            console.log("custom message found");
            io.to(data.personId).emit("custom_message", data)
        })

    });

}