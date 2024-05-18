import { Application } from "express";
import userRouter from '../../controllers/routes/user'
import adminRouter from '../../controllers/routes/admin'
import tutorRouter from '../../controllers/routes/tutor'




const RouterConfig:Function =(app:Application)=>{
    app.use('/user',userRouter);
    app.use('/admin',adminRouter)
    app.use('/tutor',tutorRouter)
}


export default RouterConfig;