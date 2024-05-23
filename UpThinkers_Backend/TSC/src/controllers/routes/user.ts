import {Router} from 'express'
const userRouter:Router = Router()
import {UserController} from '../controller/UserController'
import { MailerImp } from '../../application/external-lib/mailer'
import { UserRepositoryImpl } from '../../application/repository/User/UserRepository'
import { UserInteractorImpl } from '../../application/usecases/User'
import { userAuth } from '../middlewares/authmiddleware'

const repository = new UserRepositoryImpl()
const mailer= new MailerImp()
const interactor= new UserInteractorImpl(repository,mailer)
const controller = new UserController(interactor)


userRouter.post('/register',controller.register.bind(controller))
userRouter.post('/sendMail',controller.sendMail.bind(controller))
userRouter.post('/verifyOtp',controller.verifyOtp.bind(controller))
userRouter.post('/resendMail/:emailId', controller.resendMail.bind(controller));
// userRouter.get('/home',controller.getHome.bind(controller))


userRouter.post('/login',controller.login.bind(controller))  

   

export default userRouter;