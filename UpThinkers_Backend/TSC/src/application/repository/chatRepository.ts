import { messageArray, ChatDocument } from "../../entities/chat";
import { ChatModel } from "../../frameworks/database/models/chat";
import UserModel from "../../frameworks/database/models/user";
import { chat_repo_interface, responseInterface } from "../interfaces/repositories/chat-repository";


class ChatRepository implements chat_repo_interface {

    async getChatOfUser(userId: string) {
        try {
            return await ChatModel.find({ userId })
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async addChat(message: messageArray) {
        try {
            const chat = await ChatModel.findOne({ userId: { $all: [message.sender, message.to] } });
            console.log(chat, "this is the chat");
            if (chat) {
                chat.details.push(message)
                await chat.save();
                return chat
            } else {
                return await ChatModel.insertMany({
                    userId: [message.sender, message.to],
                    archived: false,
                    details: [message]
                })
            }

        } catch (error) {
            console.log(error);
            return null
        }
    }

    async setAllMessageSeen(userId: string, personId: string) {
        const chat = await ChatModel.findOne({ userId: { $all: [userId, personId] } })
        if (chat) {
            chat.details = chat.details.map(item => {
                if (item.to === personId) { item.seen = true }
                return item
            })
            await chat.save()
        }
        return { status: true, message: "success", data: chat }
    }

    async getChats(userId: string, personId: string) {
        try {
            return { status: true, message: "success", data: await ChatModel.findOne({ userId: { $all: [userId, personId] } }) }
        } catch (error: any) {
            console.log(error);
            return { status: false, message: error.message ?? "error occured", data: null }
        }
    }

    async getUserById (userId:string){
        try {
            return {status:true, message: "success", data: await UserModel.findById(userId)}
            
        } catch (error:any) {
            console.log(error);
            return {status: false, message: error.message ?? "error occured", }
            
        }
    }


}


export const chatRepoLayer: chat_repo_interface = new ChatRepository()