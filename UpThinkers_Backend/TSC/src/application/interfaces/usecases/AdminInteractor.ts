import { User } from "../../entities/user";


export interface AdminInteractor {
    login(credentials : {email: string, password:string}):Promise <{user:User | null,token :string |null,message: string, refreshToken:string | null}>
    getUsers(): Promise<User[] | []>;
} 