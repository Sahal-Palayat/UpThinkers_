import { Tutor } from "../../entities/tutor";
import TutorModel from "../../../frameworks/database/models/tutor";
import { TutorRepository } from "../../interfaces/repositories/tutor-repository";
import { SignupDataTutor } from "../../entities/signUpDataTutor";
import { genRefreshTokenTutor,genAccessTokenTutor } from "../../functions/CommonFunctions";
import otpModel from "../../../frameworks/database/models/otp";

export class TutorRepositoryImpl implements TutorRepository {
    async save (user: Tutor):Promise <{tutor:Tutor| null,token :string|null,refreshToken :string|null}>{
        console.log('repositoryy');

        const {Name,Email,Mobile,Password}=user
        console.log(user,'lasttt');
        

        const newTutor = new TutorModel({Name,Email,Mobile,Password})
        console.log(newTutor,'new userrrrrrrrrrrrrrrrrr');
        
        await newTutor.save()

        let token = await genAccessTokenTutor(user)
        let refreshToken= await genRefreshTokenTutor(user)
        console.log('tokennn',token);
        return {tutor:newTutor ? newTutor .toObject() as Tutor:null,token,refreshToken}
           
    }

    async tutorExists(email: string): Promise<boolean> {
        const tutorExists = await TutorModel.findOne({ Email: email });
        return !!tutorExists; 
    }

    async saveToDB (signupData:SignupDataTutor,otp : string):Promise<boolean> {
        try {
            console.log('redyyy');
            
            const {name,email,password,mobile }= signupData
            console.log(signupData);
            
            const isAddedToDb= await otpModel.insertMany({Name:name,Email:email,Password:password,Mobile:mobile,otp:otp})
            return isAddedToDb ? true : false
        
        } catch (error) {
            console.error("Error saving data to database:", error);
            return false;
        }
    }

    async verifyotp(otp: string): Promise<Tutor | null> {
        try {
            console.log('3',otp);

            const tutor = await otpModel.findOne({ otp: otp });
            console.log('user', tutor);

            return tutor ? tutor as unknown as Tutor : null;
        } catch (error) {
            console.error('Error verifying OTP from database:', error);
            return null;
        }
    }

    async findCredentials(email: string,password: string): Promise<{tutor :Tutor | null ,token: string| null,message:string}>{
      
        console.log('user repositoryyyy');
        console.log(email,password);

        const tutor = await TutorModel.findOne({Email:email})

        console.log(tutor)
        
        let message=''
        let token= null


        if(!tutor){
            message= ' invalid user'
        }else{
            if(password!==tutor.Password){
                console.log('invalid password');
                message= 'Invalid Password'
            }else{
                token = await genAccessTokenTutor(tutor)
                console.log('token',token);
            }
        }

      if(tutor && !message){
        return {tutor : tutor.toObject() as Tutor,message,token}
      }  else {
        console.log('message222', message);

        return { tutor: null, message, token };
    }
    
  
  }


  async getUsers(): Promise<Tutor[] | []> {
    try {
        const tutors: Tutor[] = await TutorModel.find();
        return tutors
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

async updateOTP(emailId: string, newOtp: string): Promise<boolean> {
    try {
        const isUpdateOTP = await otpModel.findOneAndUpdate(
            { Email: emailId },
            { $set: { otp: newOtp } }
        );
        return isUpdateOTP != null;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}


}