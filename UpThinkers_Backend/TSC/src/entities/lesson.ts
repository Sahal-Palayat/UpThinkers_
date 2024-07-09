import { Types } from "mongoose";
import { Document,ObjectId } from "mongoose";


export default interface LessonDocument extends   Document {
    Title:string,
    Content:string,
    Video:string,
    Image:string,
    Documents:[],
    Course:ObjectId,
    Seen:Types.ObjectId[],
    Rating:number,
    Students:ObjectId[],
    CreatedAt:Date
}

