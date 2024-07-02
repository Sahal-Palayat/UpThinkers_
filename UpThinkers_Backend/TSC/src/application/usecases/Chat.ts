// import { uploadAudio } from "../../data/adapters/cloudinary";
// import { messageArray } from "../../data/interfaces/chatSchema";
import { chatRepoLayer } from "../repository/chatRepository";
import { chat_use_case_interface } from "../interfaces/usecases/ChatInterface";
import { UserRepository } from "../interfaces/repositories/user-repository";
import { UserRepositoryImpl } from "../repository/User/UserRepository";
import { TutorRepositoryImpl } from "../repository/Tutor/TutorRepository";

const userRepository = new UserRepositoryImpl()
const tutorRepository = new TutorRepositoryImpl()


class chat_use_case implements chat_use_case_interface {


    errorResponse(error: any) {
        return { status: false, message: error.message ?? "error occured" }
    }

    successResponse(data?: any) {
        return { status: false, message: "success", data }
    }

    async getChatOfUser(userId: string, tutor: string) {
        let data: any[] = []
        try {
            if (tutor === "true") {

                const course: any = [...await tutorRepository.getCourse("664ae1b33f73524777a2573a")]
                data = [...await (await Promise.all(await course.map(async (item: any) => await tutorRepository.getStudents(item._id + '')))).flat(Infinity)]
                console.log(data, 'aaaaaaaaaaaaaaaaaaaaaa');
                data = data.map((item: any) => item.studentId);
                data = await Promise.all(data.map(async (id: string) => await userRepository.getUserById(id)))
                console.log(data);
                
            } else {
                console.log('else');
                data = await (await userRepository.getEnrolledCourse(userId)).map((item: any) => item.TutorId + "");
                data = await Promise.all(data.map(async (id: string) => await tutorRepository.getTutorById(id)))

                console.log(data);

            }


            // const data = await chatRepoLayer.getChatOfUser(userId)
            return { status: true, message: "success", data: data }
        } catch (error) {
            return this.errorResponse(error)
        }
    }

    // async saveAudio(message: messageArray, audioBuffer: any) {
    //     try {
    //         const { url } = await uploadAudio(audioBuffer[0], "chat_audio")
    //         message.file.Link = url; message.message = "AUDIO_MESSAGE"
    //         const data = await chatRepoLayer.addChat(message)
    //         return { status: true, message: "success", data: message }
    //     } catch (error) {
    //         return this.errorResponse(error)
    //     }
    // }

    async setAllMessageSeen(userId: string, personId: string) {
        try {
            return await chatRepoLayer.setAllMessageSeen(userId, personId)
        } catch (error) {
            return this.errorResponse(error)
        }
    }

    async getNewChats(id: string) {
        try {
            console.log(id,"ith eth id");
            const newChats = await chatRepoLayer.getChatOfUser(id)
            return { status: true, message: "success", data: newChats }
        } catch (error) {
            console.error(error);

            return { status: false, message: "failed", data: [] }
        }
    }


    async getChats(userId: string,personId: string) {
        try {
            const chats = await chatRepoLayer.getChats(userId, personId)
            return { status: true, message: "success", data: chats }
        } catch (error) {
            return this.errorResponse(error)
        }
    }

    
    async getUserById(userId: string){
        try {
            const user = await chatRepoLayer.getUserById(userId)

            return {status:true, message: "success", data:user ? user : null} 
        } catch (error:any) {
            console.log(error);
            return {status:false,message:error.message ?? "internal error"}
        }
    }
}

export const chatUseCase: chat_use_case_interface = new chat_use_case()