import { Schema,model } from "mongoose";
import { ObjectId } from "mongoose";
import UserDocument from "../../../entities/user";

const userSchema= new Schema<UserDocument>({
    Name:String,
    
    Email:String,
    Mobile:Number,
    Password:String,
    Status:Boolean,
    CreatedAt:Date,
    Image:String,
    UpdatedAt:Date,
    isAdmin:{
        type:Boolean,
        default:false,
    },
    wishlist:[]
})


const UserModel = model <UserDocument>('users',userSchema);
export default UserModel;