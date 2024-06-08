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
    lessons:[],
    TutorId: { type: mongoose.Schema.Types.ObjectId,
          ref: 'UserModal',
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


const CourseSchema: Schema = new Schema({
    courseName: { type: String, required: true },
    courseDuration: { type: String},
    courseFee: { type: Number, required: true },
    courseDescription: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String },
    students:[{type: String}],
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating : {type: Number , default:0},
    createdAt: { type: Date, default: Date.now },
    isApproved:{type: Boolean , default : false}
  });

const CourseModel= model <CourseDocument>('courses',courseSchema);
export default CourseModel;