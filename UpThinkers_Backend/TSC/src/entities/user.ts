import { Document,ObjectId } from "mongoose";

export default interface UserDocument extends   Document {
   Name: string;
   Email: string;
   Mobile:number;
   Password: string;
   Status:boolean;
   CreatedAt:Date;
   RefreshToken:string;
   isAdmin:{
    type:Boolean,
    default:false
   }
   isGoogle:{
      type:Boolean,
    default:false 
   }, 
   Image:string;
   UpdatedAt:Date;
   wishlist:ObjectId;
   isBlocked:boolean;
   
}