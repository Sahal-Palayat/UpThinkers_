import { messageArray } from "../../../entities/chat";




export type responseInterface = {
    status: boolean,
    message: string,
    data?: any
}

export type chat_use_case_interface = {
    errorResponse(error: any): responseInterface;
    successResponse(data: any): responseInterface;
    getChatOfUser(userId: string,tutor:string): Promise<responseInterface>;
    // saveAudio(message: messageArray, audioBuffer: any): Promise<responseInterface>;
    setAllMessageSeen(userId: string, personId: string): Promise<responseInterface>;
    getNewChats(id:string):Promise<responseInterface>;
    getChats(userId: string,personId:string): Promise<responseInterface>;
    getUserById(userId:string):Promise<responseInterface>

}