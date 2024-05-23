import { User } from "../../entities/user";
import { Tutor } from "../../entities/tutor";

export interface AdminRepository {
     findCredentials (email : string,password: string): Promise <{user:User | null,message:string, adminToken : string | null}> 
     getUsers():Promise<User[] | [] >;
     getTutors():Promise<Tutor[] | [] >;
     blockUser(id: string): Promise<User | null>;
     blockTutor(id: string): Promise<Tutor | null>;

}