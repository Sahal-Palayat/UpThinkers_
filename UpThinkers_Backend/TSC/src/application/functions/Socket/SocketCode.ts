import { Server, Socket } from 'socket.io';
import { ChatDocument } from '../../../entities/chat';
import { chatRepoLayer } from '../../repository/chatRepository';

export const connectSocket = (io: any) => {

    io.on('connection', (socket: Socket) => {
        console.log("scoket connected");

        socket.on('join', (Data) => { socket.join(Data); });

        socket.on('new_message', (Data) => {
            io.to(Data.to).emit('incoming_message', Data)
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