import {Router} from 'express'
const userRouter:Router = Router()
import {UserController} from '../controller/UserController'
import { MailerImp } from '../../application/external-lib/mailer'
import { UserRepositoryImpl } from '../../application/repository/User/UserRepository'
import { UserInteractorImpl } from '../../application/usecases/User'
import { userAuth } from '../middlewares/authmiddleware'
import { CourseController } from '../controller/CourseController'

const repository = new UserRepositoryImpl()
const mailer= new MailerImp()
const interactor= new UserInteractorImpl(repository,mailer)
const controller = new UserController(interactor)

userRouter.post('/register',controller.register.bind(controller))
userRouter.post('/sendMail',controller.sendMail.bind(controller))
userRouter.post('/verifyOtp',controller.verifyOtp.bind(controller))
userRouter.post('/resendMail/:emailId', controller.resendMail.bind(controller));
userRouter.post('/login',controller.login.bind(controller))  
userRouter.post('/googlauth',controller.googleAuth.bind(controller)) 
// userRouter.get('/home',userAuth,controller.getHome.bind(controller))


userRouter.get('/categorylist',userAuth,controller.getCategory.bind(controller))
userRouter.get('/courselist',userAuth,controller.getCourse.bind(controller))
userRouter.post('/placeorder',userAuth,controller.placeOrder.bind(controller))
userRouter.get('/tutorslist',userAuth,controller.getTutors.bind(controller))
userRouter.get('/tutorcourses/:tutorId',userAuth,controller.getTutorCourse.bind(controller))
userRouter.get('/enrolledcourses/:userId',userAuth,controller.getEnrolledCourse.bind(controller))
userRouter.post('/addimage/:userId',userAuth,controller.addImage.bind(controller))

export default userRouter;