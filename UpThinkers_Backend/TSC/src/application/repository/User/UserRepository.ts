import * as UserEntity  from '../../../controllers/interfaces/UserInterfaces';
import * as DatabaseFunctions from '../../functions/DatabaseFunctions';
import * as ResponseFunctions from '../../responses/Response/UserResponse';
import * as Responses from '../../responses/Interfaces/UserResponsesInterface'
import UserAuth from '../../../frameworks/database/models/UnverifiedUsers';
import * as Response from '../../responses/Interfaces/UserResponsesInterface';
import * as CommonFunctions from '../../functions/CommonFunctions'
import UnverifiedUsers from '../../../entities/UnverifiedUsers';
import { SendVerificationLink } from '../../functions/SendMail'
import { CreatePayload } from '../../functions/JWT';
import User from '../../../frameworks/database/models/user';
import auth from '../../../config/auth';
import UserDocument from '../../../entities/user';
import { VerifyUser } from '../../functions/UserFunctions';
import { ObjectId } from 'mongodb';



export const RegisterRepository: Function = async (data: UserEntity.Register): Promise<Responses.SignUpResponse> => {
    try {
        const { FirstName,LastName, Email, Mobile }: UserEntity.Register = data
        let { Password }: UserEntity.Register = data
        const user: UnverifiedUsers = await DatabaseFunctions.findOneData(UserAuth, { Email: Email })
        if (user && user.Verified) {
            return ResponseFunctions.SignupRes(<Responses.SignUpResponse>{
                errors: [],
                status: 202,
                message: 'User Already Exists'
            })
        }
        const LinkTimeout: Date = CommonFunctions.CalculateTime(2)
        const VerificationLink: string = CommonFunctions.genVerificationLink()
        const link = `${auth.baseLink}/${auth.verifyAccount}/${VerificationLink}/`

        if (user && !user.Verified) {
            await DatabaseFunctions.updateById(UserAuth, user._id, { VerificationLink: VerificationLink, LinkTimeout: LinkTimeout })
            await SendVerificationLink(Email, link + user._id)
            return ResponseFunctions.SignupRes(<Responses.SignUpResponse>{
                errors: [],
                message: 'Already Logged Account Please Verify Account Through Link Shared Via Email',
                status: 200
            })
        }
        const Username = CommonFunctions.genRandomName('user', 8)
        console.log(Username)
        Password = await CommonFunctions.HashPassword(Password)
        const [Userdata] = await DatabaseFunctions.insertData(UserAuth, { FirstName, Email, Password, Mobile, Username, VerificationLink, LinkTimeout })
        await SendVerificationLink(Email, link + Userdata._id)
        return ResponseFunctions.SignupRes(<Responses.SignUpResponse>{
            errors: [],
            message: 'A Verification Link Has Been Shared to Your Email',
            status: 200
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.SignupRes(<Responses.SignUpResponse>{
            errors: [],
            message: 'Internal Server Error',
            status: 500
        })
    }
}



