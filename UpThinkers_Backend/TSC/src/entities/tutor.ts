import { Document,ObjectId } from "mongoose";

export default interface TutorDocument extends   Document {
   Name: string;
   Email: string;
   Mobile:Number;
   Password: string;
   Status:boolean;
   CreatedAt:Date;
   Image:string;
   UpdatedAt:Date;
   wishlist:ObjectId;
   
}