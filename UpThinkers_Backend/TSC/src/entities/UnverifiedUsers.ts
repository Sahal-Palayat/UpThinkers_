import { Document } from "mongoose";

export default interface UnverifiedUsers extends Document {
    FirstName: string;
    LastName: string;
    Password: string;
    Username: string,
    Mobile?: string;
    Verified?: boolean;
    Terminated?: boolean;
    Suspended?: boolean;
    SuspendedTill?: Date;
    Reason?: string;
    VerificationLink: string;
    LinkTimeout: Date;
    Profile:string;
    TwoStepVerification:boolean;
    Banner:string;
}