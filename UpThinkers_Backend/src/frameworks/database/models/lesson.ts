import { Schema,model } from "mongoose";
import mongoose, { ObjectId } from "mongoose";
import LessonDocument from "../../../entities/lesson";

const lessonSchema= new Schema <LessonDocument>({
    Title:String,
    Content:String,
    Image:String,
    Video:String,
    Documents:[],
    Course:{ type: mongoose.Schema.Types.ObjectId,
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


