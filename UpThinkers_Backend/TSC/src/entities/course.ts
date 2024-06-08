import { Document,ObjectId } from "mongoose";

export default interface CourseDocument extends   Document {
  
    Name:string,
    Status:boolean,
    Description:string,
    Image:string,
    Price:number,
    OfferPrice:number,
    Duration:string,
    Category:string,
    Students:string[],
    lessons:[],
    Rating : number,
    TutorId:ObjectId,
    isApproved : boolean;
    CreatedAt:Date,
    UpdatedAt:Date,
}