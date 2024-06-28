import { Document, Schema } from "mongoose"

export interface ChatDocument extends Document {
    userId: string[];
    details: messageArray[];
    archived: boolean;
}


export type messageArray = {
    to: string,
    time: string,
    sender: string,
    message: string,
    file: {
        fileType: string,
        Link: string,
    },
    seen: boolean
}

export const messageSchema = new Schema<messageArray>({
    to: { type: String, required: true },
    time: { type: String, required: true },
    sender: { type: String, required: true },
    message: { type: String, required: true },
    file: {
        fileType: { type: String, default: "" },
        Link: { type: String, default: "" },
    },
    seen: { type: Boolean, required: true },
});