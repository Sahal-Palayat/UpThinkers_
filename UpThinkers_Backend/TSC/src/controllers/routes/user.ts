import {Router} from 'express'
const userRouter:Router = Router()
import {UserController} from '../middlewares/UserController'
import { MailerImp } from '../../application/external-lib/mailer'
import { UserRepositoryImpl } from '../../application/repository/User/UserRepository'
import { UserInteractorImpl } from '../../application/usecases/User'

const repository = new UserRepositoryImpl()
const mailer= new MailerImp()
const interactor= new UserInteractorImpl(repository,mailer)
const controller = new UserController(interactor)


userRouter.post('/register',controller.register.bind(controller))
userRouter.post('/sendMail',controller.sendMail.bind(controller))
userRouter.post('/verifyOtp',controller.verifyOtp.bind(controller))

// userRouter.post('/login')  

 

export default userRouter;