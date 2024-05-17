import { Schema,model } from "mongoose";
import { ObjectId } from "mongoose";
import TutorDocument from "../../../entities/tutor";

const tutorSchema= new Schema<TutorDocument>({
    Name:String,
    
    Email:String,
    Mobile:Number,
    Password:String,
    Status:Boolean,
    CreatedAt:Date,
    Image:String,
    UpdatedAt:Date,
    wishlist:[]
})


const TutorModel = model <TutorDocument>('tutors',tutorSchema);
export default TutorModel;