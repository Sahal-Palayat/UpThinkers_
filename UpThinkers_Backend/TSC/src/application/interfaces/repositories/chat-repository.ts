import { ChatDocument ,messageArray} from "../../../entities/chat";

export type responseInterface = {
    status: boolean,
    message: string,
    data?: any
}

export type chat_repo_interface = {
    getChatOfUser(userId: string): Promise<ChatDocument[] | []>;
    addChat(message: messageArray): Promise<any>;
    setAllMessageSeen(userId: string, personId: string): Promise<responseInterface>;
}