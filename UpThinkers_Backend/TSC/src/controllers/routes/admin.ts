import {Router} from 'express'
const adminRouter:Router = Router()
import { AdminInteractorImpl } from '../../application/usecases/Admin';
import { AdminRepositoryImpl } from '../../application/repository/Admin/AdminRepository';
import { AdminController } from '../middlewares/AdminController';



const repository = new AdminRepositoryImpl()
const interactor= new AdminInteractorImpl(repository)
const controller = new AdminController(interactor)


adminRouter.post('/login',controller.login.bind(controller))
adminRouter.get('/studentslist',controller.getUsers.bind(controller))
adminRouter.get('/Tutorslist',controller.getTutors.bind(controller))





export default adminRouter;