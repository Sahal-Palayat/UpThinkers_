import { ObjectId } from "mongoose";

export interface User {
   _id?: ObjectId;
    Name?: string;
    Password?: string;
    Email?: string;
    Mobile?: number;
    gender?: string;
    Image?: string;
    CreatedAt?:Date;
}
