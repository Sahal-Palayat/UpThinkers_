import mongoose from "mongoose"

const otpSchema = new mongoose.Schema({
    otp:{
        type:String,
        required:true,
    },
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    Mobile:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true, 
    }
})

const otpModel = mongoose.model('otps',otpSchema);

export default otpModel;