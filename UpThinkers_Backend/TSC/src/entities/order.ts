import mongoose,{ Document,ObjectId } from "mongoose";

export  default interface OrderDocument extends Document {
    TutorId:ObjectId;
    StudentId:ObjectId;
    CourseId: mongoose.Types.ObjectId;
    Price:number;
    Payment :string;
    CreatedAt :Date;

}