import {Router} from 'express'
const adminRouter:Router = Router()
import { AdminInteractorImpl } from '../../application/usecases/Admin';
import { AdminRepositoryImpl } from '../../application/repository/Admin/AdminRepository';
import { AdminController } from '../controller/AdminController';
import { adminAuth } from '../middlewares/authmiddleware';



const repository = new AdminRepositoryImpl()
const interactor= new AdminInteractorImpl(repository)
const controller = new AdminController(interactor)


adminRouter.post('/login',controller.login.bind(controller))
adminRouter.get('/studentslist',adminAuth,controller.getUsers.bind(controller))
adminRouter.get('/Tutorslist',adminAuth,controller.getTutors.bind(controller))
adminRouter.patch('/studentslist/blockUser/:id',controller.blockUser.bind(controller))
adminRouter.patch('/tutorslist/blockTutor/:id',controller.blockTutor.bind(controller))


// adminRouter.post( '/addcategory',adminAuth,controller.addCategory.bind(controller))



export default adminRouter;