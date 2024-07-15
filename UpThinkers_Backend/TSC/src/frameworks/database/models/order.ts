import { string } from "joi";
import { Schema,model } from "mongoose";
import mongoose,{ObjectId} from "mongoose";
import OrderDocument from "../../../entities/order";


const orderSchema = new Schema <OrderDocument>({

    StudentId:{
        type: Schema.Types.ObjectId,
        ref: 'UserModal',
   },
    TutorId:{ 
        type: Schema.Types.ObjectId,
        ref: 'TutorModel',
   },
    CourseId:{ 
        type: Schema.Types.ObjectId,
        ref: 'CourseModel',
   },
    Price:Number,
    Payment:String,
    CreatedAt:Date, 
    
    
})

const OrderModel= model <OrderDocument>('orders',orderSchema)

export default OrderModel;