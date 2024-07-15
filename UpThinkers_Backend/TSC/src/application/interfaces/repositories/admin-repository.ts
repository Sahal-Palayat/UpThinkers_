import { User } from "../../entities/user";
import { Tutor } from "../../entities/tutor";
import { Category } from "../../entities/category";
import { RevenueDetails } from "../customInterfaces/customInterface";

export interface AdminRepository {
     findCredentials (email : string,password: string): Promise <{user:User | null,message:string, adminToken : string | null}> 
     getUsers():Promise<User[] | [] >;
     getTutors():Promise<Tutor[] | [] >;
     blockUser(id: string): Promise<User | null>;
     blockTutor(id: string): Promise<Tutor | null>;
     addCategory (category:Category): Promise<{category :Category | null}>
     getCategory():Promise<Category[] | []>
     editCategory(id: string, datas: { Name: string, Description: string }): Promise<Category | null>;
     categoryExists(Name: string): Promise<Category[]|null>
     getRevenueDetails(): Promise<RevenueDetails | null>
    }