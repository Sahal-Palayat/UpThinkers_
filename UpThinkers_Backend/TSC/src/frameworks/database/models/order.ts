import { string } from "joi";
import { Schema,model } from "mongoose";
import mongoose,{ObjectId} from "mongoose";
import OrderDocument from "../../../entities/order";


const orderSchema = new Schema <OrderDocument>({

    StudentId:{ type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModal',
   },
    TutorId:{ type: mongoose.Schema.Types.ObjectId,
        ref: 'TutorModel',
   },
    CourseId:{ type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseModel',
   },
    Price:Number,
    Payment:String,
    CreatedAt:Date, 
    
})

const OrderModel= model <OrderDocument>('orders',orderSchema)

export default OrderModel;