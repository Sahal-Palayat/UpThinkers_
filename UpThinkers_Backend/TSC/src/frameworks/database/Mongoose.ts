import mongoose from 'mongoose'

const mongooseConfig:Function=(config:any)=>{
    mongoose.connect(config.MONGO).then(()=> console.log('mongodb connected'))
}
export default mongooseConfig    