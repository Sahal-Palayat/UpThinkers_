import { User } from "../../entities/user";
import { Tutor } from "../../entities/tutor";

export interface AdminInteractor {
    login(credentials : {email: string, password:string}):Promise <{user:User | null,adminToken :string |null,message: string, refreshToken:string | null}>
    getUsers(): Promise<User[] | []>;
    getTutors(): Promise<Tutor[] | []>;
    blockUser(id: string): Promise<User|null>;
    blockTutor(id: string): Promise<Tutor|null>;
} 