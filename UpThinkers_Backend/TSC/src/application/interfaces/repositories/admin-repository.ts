import { User } from "../../entities/user";
import { Tutor } from "../../entities/tutor";

export interface AdminRepository {
     findCredentials (email : string,password: string): Promise <{user:User | null,message:string, token : string | null}> 
     getUsers():Promise<User[] | [] >;
     getTutors():Promise<Tutor[] | [] >;
}