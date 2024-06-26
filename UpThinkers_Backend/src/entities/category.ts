import { Document,ObjectId } from "mongoose";

export default interface CategoryDocument extends   Document {
   Name: string;
   Status:boolean;
   Description: string;

}