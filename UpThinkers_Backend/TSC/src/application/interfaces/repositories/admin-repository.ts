import { User } from "../../entities/user";

export interface AdminRepository {
     findCredentials (email : string,password: string): Promise <{user:User | null,message:string, token : string | null}> 
     getUsers():Promise<User[] | [] >;

}