import * as Responses from '../Interfaces/UserResponsesInterface'

export const SignupRes :Function = async (data:Responses.SignUpResponse)=>{
    return {
        errors:data.errors,
        message:data.message,
        status:data.status
    }
}