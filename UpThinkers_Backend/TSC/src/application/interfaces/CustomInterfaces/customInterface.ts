import { User } from "../../entities/user";

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
  }


 export interface CourseDetails {
    Name: string;
    Description: string;
    Price: number;
    Duration: string;
    CreatedAt: Date;
    UpdatedAt: Date;
  }

  