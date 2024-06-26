import UserDocument from "../../entities/user";

export interface Register {
    FirstName: string;
    LastName: string;
    Email: string;
    Mobile:Number;
    Password: string;
}