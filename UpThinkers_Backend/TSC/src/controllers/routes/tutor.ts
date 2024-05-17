import {Router} from 'express'
const tutorRouter:Router = Router()
import { TutorController } from '../middlewares/TutorController';
import { MailerImp } from '../../application/external-lib/mailer';
import { TutorInteractorImpl } from '../../application/usecases/Tutor';
import { TutorRepositoryImpl } from '../../application/repository/Tutor/TutorRepository';


const repository = new TutorRepositoryImpl()
const mailer= new MailerImp()
const interactor = new TutorInteractorImpl(repository,mailer)
const controller= new TutorController(interactor)


tutorRouter.post('/register',controller.register.bind(controller))
tutorRouter.post('/sendMail',controller.sendMail.bind(controller))
tutorRouter.post('/verifyOtp',controller.verifyOtp.bind(controller))

tutorRouter.post('/login',controller.login.bind(controller))  


export default tutorRouter;