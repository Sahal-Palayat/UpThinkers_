import * as  UserEntity from '../../controllers/interfaces/UserInterfaces'
import * as Validations from '../validations/UserValidations'
import * as ResponseFunctions from '../responses/Response/UserResponse'
import * as Responses from '../responses/Interfaces/UserResponsesInterface'
import * as Repository from '../repository/User/UserRepository'






export const RegisterUser:Function =async ({FirstName, LastName,Email,Mobile,Password}:UserEntity.Register):Promise<Responses.SignUpResponse>=>{
    try {
        const errors= await Validations.RegisterValidate({FirstName,LastName,Email,Mobile,Password})
        if(errors.length>0){
            return ResponseFunctions.SignupRes(<Responses.SignUpResponse>{
                errors: errors,
                status:201,
                message:'Invalid dataaaas'
            })
        }
        return await Repository.RegisterRepository({FirstName,LastName,Email,Mobile,Password})
    } catch (error) {
        return <Responses.SignUpResponse>{
            errors: [],
            message: 'Internal Server Error 1',
            status: 500
        }
    }
}