import { Document,ObjectId } from "mongoose";

export default interface UserDocument extends   Document {
   Name: string;
   Email: string;
   Mobile:Number;
   Password: string;
   Status:boolean;
   CreatedAt:Date;
   Image:string;
   Suspended: boolean;
   Terminated: boolean;
   SuspendedTill?: Date;
   UpdatedAt:Date;
   wishlist:ObjectId;
   
}