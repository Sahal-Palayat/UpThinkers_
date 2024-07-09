import { User } from "../../entities/user";
import { Tutor } from "../../entities/tutor";
import { Category } from "../../entities/category";
import { RevenueDetails } from "../customInterfaces/customInterface";

export interface AdminInteractor {
    login(credentials : {email: string, password:string}):Promise <{user:User | null,adminToken :string |null,message: string, refreshToken:string | null}>
    getUsers(): Promise<User[] | []>;
    getTutors(): Promise<Tutor[] | []>;
    blockUser(id: string): Promise<User|null>;
    blockTutor(id: string): Promise<Tutor|null>;
    addCategory(datas:{Name: string, Description: string}):Promise <{categoryExists: boolean,category : Category | null}>
    getCategory():Promise<Category[] |[]>;
    editCategory(id:string,datas:{Name: string, Description: string}):Promise < Category | null>
    getRevenueDetails():Promise<RevenueDetails|null>
} 