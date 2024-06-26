import { Schema,model } from "mongoose";
import mongoose, { ObjectId } from "mongoose";
import CourseDocument from "../../../entities/course";


const courseSchema= new Schema<CourseDocument>({

    Name:String,
    Status:{
        type:Boolean,
        default:true
    },
    Description:String,
    Image:String,
    Price:Number,
    OfferPrice:Number,
    Duration:String,
    Students:[{type:String}],
    Category:String,
    Lessons:[],
    TutorId: { type: mongoose.Schema.Types.ObjectId,
          ref: 'TutorModal',
     },
    Rating:{
        type:Number,
        default:0
    },
    isApproved:{
            type: Boolean ,
            default : false
    },
    CreatedAt:Date, 
    UpdatedAt:Date,

})




const CourseModel= model <CourseDocument>('courses',courseSchema);
export default CourseModel;