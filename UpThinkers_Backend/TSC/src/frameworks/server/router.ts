import { Application } from "express";
import userRouter from '../../controllers/routes/user'
import adminRouter from '../../controllers/routes/admin'
import tutorRouter from '../../controllers/routes/tutor'
import authRouter from "../../controllers/routes/auth";



const RouterConfig:Function =(app:Application)=>{
    app.use('/user',userRouter);
    app.use('/admin',adminRouter)
    app.use('/tutor',tutorRouter)
    app.use('/auth',authRouter)
}


export default RouterConfig;