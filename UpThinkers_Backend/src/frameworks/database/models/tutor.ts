import { Schema,model } from "mongoose";
import { ObjectId } from "mongoose";
import TutorDocument from "../../../entities/tutor";
import bcrypt from 'bcrypt'

const tutorSchema= new Schema<TutorDocument>({
    Name:String,
    
    Email:String,
    Mobile:Number,
    Password:String,
    Status:Boolean,
    CreatedAt:Date,
    Image:String,
    UpdatedAt:Date,
    wishlist:[],
    isBlocked:{
        type:Boolean,
        default:false,
    },
    Courses:[]
})



tutorSchema.pre<TutorDocument>("save", async function (next) {
    if (this.Password) {
        if (!this.isModified("Password")) {
            next()
        }
        const salt = await bcrypt.genSalt(10);
        this.Password = await bcrypt.hash(this.Password, salt)
    }
})

tutorSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const TutorModel = model <TutorDocument>('tutors',tutorSchema);
export default TutorModel;