import { Schema,model } from "mongoose";
import { ObjectId } from "mongoose";
import UserDocument from "../../../entities/user";

const userSchema= new Schema<UserDocument>({
    FirstName:String,
    LastName:String,
    Email:String,
    Mobile:Number,
    Password:String,
    Status:Boolean,
    CreatedAt:Date,
    Image:String,
    UpdatedAt:Date,
    wishlist:[]
})


const User = model <UserDocument>('users',userSchema);
export default User;