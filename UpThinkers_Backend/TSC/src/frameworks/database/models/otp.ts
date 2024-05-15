import mongoose from "mongoose"

const otpSchema = new mongoose.Schema({
    otp:{
        type:String,
      
    },
    Name:{
        type:String,
       
    },
    Email:{
        type:String,
        
    },
    Mobile:{
        type:String,
        
    },
    password:{
        type:String,
        
    }
})

const otpModel = mongoose.model('otps',otpSchema);

export default otpModel;