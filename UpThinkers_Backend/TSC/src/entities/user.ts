import { Document,ObjectId } from "mongoose";

export default interface UserDocument extends   Document {
   FirstName: string;
   LastName: string;
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