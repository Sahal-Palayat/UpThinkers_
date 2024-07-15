import { ObjectId } from "mongoose";
import { User } from "../../entities/user";
import { Tutor } from "../../entities/tutor";

export interface studCourse {
    studentName:string,
    courseName:string
}




export interface RevenueDetails {
    countOrder:number;
    totalRevenue: number;
    weeklySales: number;
    monthlySales: number;
    courses: CourseDetails[];
    uniqueStudentCount: number;
    students:User[]
    tutorsCount:number
  }


 export interface CourseDetails {
    Name: string;
    Description: string;
    Price: number;
    Duration: string;
    CreatedAt: Date;
    UpdatedAt: Date;
    
  }

  