import mongoose, { Schema } from "mongoose";
import { ChatDocument, messageSchema } from "../../../entities/chat";



const chatSchema: Schema<ChatDocument> = new Schema<ChatDocument>({
    userId: { type: [String], default: [], required: true },
    archived: { type: Boolean, default: false, required: true },
    details: { type: [messageSchema], default: [], required: true }
});



export const ChatModel = mongoose.model<ChatDocument>('chats', chatSchema)