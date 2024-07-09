import { Schema,model } from "mongoose";
import mongoose, { ObjectId } from "mongoose";
import LessonDocument from "../../../entities/lesson";
import { Types } from "mongoose";

const lessonSchema= new Schema <LessonDocument>({
    Title:String,
    Content:String,
    Image:String,
    Video:String,
    Documents:[],
    Seen:[Types.ObjectId],
    Course:{ type:Types.ObjectId,
        ref: 'CourseModel',
   },
    Rating:{
        type:Number,
        default:0  
    },
    Students:[{type:String}],
    CreatedAt:Date,
})

const LessonModel= model <LessonDocument>('lessons',lessonSchema)
export default LessonModel


