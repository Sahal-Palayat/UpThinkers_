import UnverifiedUsers from "../../../entities/UnverifiedUsers";
import {Schema,model} from 'mongoose'


const UserAuthSchema= new Schema <UnverifiedUsers>( {
    FirstName: String,
    LastName: String,
    Password: String,
    Username: String,
    Mobile: String,
    Verified: Boolean,
    Terminated: Boolean,
    Suspended: Boolean,
    SuspendedTill: Date,
    Reason: String,
    VerificationLink: String,
    LinkTimeout: Date,
    Profile:String,
    TwoStepVerification:Boolean,
    Banner:String,
})



const UserAuth = model<UnverifiedUsers>('unverifiedusers', UserAuthSchema)
export default UserAuth