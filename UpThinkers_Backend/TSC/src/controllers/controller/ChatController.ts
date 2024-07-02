import { NextFunction, Request, Response } from "express";
import { chatUseCase } from "../../application/usecases/Chat";

// import { Fields, Files, IncomingForm } from 'formidable'


const errorResponse = (error: any, res: Response) => {
    res.status(200).json({ status: false, message: error?.message ?? "some error occured" })
}

const successResponse = (res: Response, data?: any) => {
    res.status(200).json(data)
}

export const getChatOfUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('hellooo hooi');
        successResponse(res, await chatUseCase.getChatOfUser(req.query.userId as string, req.query.tutor as string))
    } catch (error: any) {
        console.error(error);
        errorResponse(error, res)
    }
}

// export const saveAudio = async (req: Request, res: Response) => {
//     try {
//         const data = await multipartFormSubmission(req)
//         const message = data.fields.message ? JSON.parse(data.fields.message[0] as string) : null
//         const audioBuffer = data.files.audioBuffer
//         if (message && data.files.audioBuffer) {
//             successResponse(res, await chatUseCase.saveAudio(message, audioBuffer))
//         } else {
//             errorResponse({ message: "not enough data" }, res);
//         }
//     } catch (error: any) {
//         console.error(error);
//         errorResponse(error, res)
//     }
// }

export const setAllMessageSeen = async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId + ""
        const personId = req.query.personId + ""
        successResponse(res, await chatUseCase.setAllMessageSeen(userId, personId))
    } catch (error) {
        errorResponse(error, res)
    }
}

export const getNewChats = async (req: Request, res: Response) => {
    try {
        console.log(req.query.userId, 'tutor id ith ');

        res.status(200).json(await chatUseCase.getNewChats(req.query.userId as string))
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ status: false, message: error?.message || "internal server error" })
    }
}



export const getChats = async (req: Request, res: Response) => {
    try {
        console.log(req.query.userId, req.query.personId);

        successResponse(res, await chatUseCase.getChats(req.query.userId as string, req.query.personId as string))

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error || "internal server error" })

    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.query.userId as string
        const { data } = await chatUseCase.getUserById(userId)
        console.log(data);
        res.status(200).json({ user: data?.data ?? {} })
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');

    }
}

// function multipartFormSubmission(req: Request): Promise <{ files: Files; fields: Fields }> {
//     return new Promise((resolve, reject) => {
//         const form = new IncomingForm();
//         form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
//             if (err) {
//                 console.log(err);
//                 reject(err);
//             } else {
//                 resolve({ files, fields });
//             }
//         });
//     });
// }