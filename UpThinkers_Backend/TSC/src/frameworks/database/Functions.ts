import { isObjectIdOrHexString } from "mongoose";
import UserModel from "./models/user"

export const getUsers: Function = async (userId:string) => {
    try {
        const user = await UserModel.findById(userId)
        return user
    } catch (e) {
        return null;
    }
}

export const checkobjectId: Function = async (userId:string) => {
    return isObjectIdOrHexString(userId)
}