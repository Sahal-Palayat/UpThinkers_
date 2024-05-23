import { Document,ObjectId } from "mongoose";

export default interface UserDocument extends   Document {
   Name: string;
   Email: string;
   Mobile:Number;
   Password: string;
   Status:boolean;
   CreatedAt:Date;
   isAdmin:{
    type:Boolean,
    default:false
   }
   Image:string;
   UpdatedAt:Date;
   wishlist:ObjectId;
   isBlocked:boolean;
   
}