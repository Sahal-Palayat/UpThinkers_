import {Router} from 'express'
const userRouter:Router = Router()



userRouter.post('/register')
userRouter.post('/login')



export default userRouter;