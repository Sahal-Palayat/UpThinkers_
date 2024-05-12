import Joi from "joi";
import * as UserEntities from '../../controllers/interfaces/UserInterfaces';
import {log} from 'console'


export const RegisterValidate:Function = async (data:UserEntities.Register)=>{
    try {
        const passwordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const nameRegex=/^[a-zA-Z\s]+$/;
        const errors= [
            'Name is required and should not contain numbers',
            'Invalid email format',
            'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
            'Username must be alphanumeric and between 3 to 30 characters',
            'Phone number must be exactly 10 digits long'
        ]
        const schema = Joi.object<UserEntities.Register>({
            FirstName: Joi.string().regex(nameRegex).required().error(new Error(errors[0])),
            LastName: Joi.string().regex(nameRegex).required().error(new Error(errors[0])),
            Email: Joi.string().email().required().error(new Error(errors[1])),
            Mobile: Joi.number().required().error(new Error(errors[4])),
            Password: Joi.string().regex(passwordRegex).required().error(new Error(errors[2]))
        })
        
        const {error}=  schema.validate(data,{abortEarly:false})
        log(error)
        if(error){
            let errMessage:string[] = new Array(5).fill('')
            const i: number = parseInt(error.message)
            errMessage[i] = errors[i]
            return errMessage
        }
        return [];
        
    } catch (error) {
        console.log(error);
        return ['validate error....']
        
    }
}



