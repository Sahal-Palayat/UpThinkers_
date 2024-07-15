import { Schema,model } from "mongoose";
import { ObjectId } from "mongoose";
import UserDocument from "../../../entities/user";
import bcrypt from 'bcrypt'

const userSchema= new Schema<UserDocument>({
    Name:String,
    Email:String,
    Mobile:Number,
    Password:String,
    Status:Boolean,
    CreatedAt:Date,
    Image:String,
    UpdatedAt:Date,
    RefreshToken:String,
    isGoogle: {
        type: Boolean,
        default: false
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    wishlist:[],
    isBlocked:{
        type:Boolean,
        default:false,
    }
})

userSchema.pre<UserDocument>("save", async function (next) {
    if (this.Password) {
        if (!this.isModified("Password")) {
            next()
        }
        const salt = await bcrypt.genSalt(10);
        this.Password = await bcrypt.hash(this.Password, salt)
    }
})

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}


const UserModel = model <UserDocument>('users',userSchema);
export default UserModel;