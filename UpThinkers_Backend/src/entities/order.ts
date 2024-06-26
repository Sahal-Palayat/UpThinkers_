import { Document,ObjectId } from "mongoose";

export  default interface OrderDocument extends Document {
    TutorId:ObjectId;
    StudentId:ObjectId;
    CourseId:ObjectId;
    Price:number;
    Payment :string;
    CreatedAt :Date;

}