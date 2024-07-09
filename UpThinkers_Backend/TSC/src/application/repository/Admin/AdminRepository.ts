import { User } from "../../entities/user";
import UserModel from "../../../frameworks/database/models/user";
import { AdminRepository } from "../../interfaces/repositories/admin-repository";
import { genAccessToken } from "../../functions/CommonFunctions";
import { Tutor } from "../../entities/tutor";
import TutorModel from "../../../frameworks/database/models/tutor";
import { isObjectIdOrHexString } from "mongoose";
import { Category } from "../../entities/category";
import CategoryModel from "../../../frameworks/database/models/category";
import { CourseDetails, RevenueDetails } from "../../interfaces/customInterfaces/customInterface";
import OrderModel from "../../../frameworks/database/models/order";
import CourseModel from "../../../frameworks/database/models/course";

export class AdminRepositoryImpl implements AdminRepository {

    async findCredentials(email: string, password: string): Promise<{ user: User | null, adminToken: string | null, message: string }> {
      
        try {
            console.log('user repositoryyyy');
            console.log(email, password);
    
            const user = await UserModel.findOne({ Email: email, isAdmin: true })
    
            console.log(user)
    
            let message = ''
            let adminToken = null
    
    
            if (!user) {
                message = ' invalid user'
            } else {
                if (password !== user.Password) {
                    console.log('invalid password');
                    message = 'Invalid Password'
                } else {
                    adminToken = await genAccessToken(user, 'admin')
                    console.log('token', adminToken);
                }
            }
    
            if (user && !message) {
                return { user: user.toObject() as User, message, adminToken }
            } else {
                console.log('message222', message);
    
                return { user: null, message, adminToken };
            }
            
        } catch (error) {
            console.log(error);
            throw error
            
        }
       


    }


    async getUsers(): Promise<User[] | []> {
        try {
            const users: User[] = await UserModel.find();
            return users
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

    async getTutors(): Promise<Tutor[] | []> {
        try {
            const tutors: Tutor[] = await TutorModel.find();
            return tutors
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

    async blockUser(id: string): Promise<User | null> {

        try {
            const result = isObjectIdOrHexString(id)
            if (!result) {

            }
            const user = await UserModel.findById(id)
            if (!user) {

            }
            if (user) {
                user.isBlocked = !user.isBlocked
                await user.save()
            }
            return user ? user.toObject() as User : null
        } catch (error) {
            console.log(error);
            throw error

        }
    }

    async blockTutor(id: string): Promise<Tutor | null> {

        try {
            const result = isObjectIdOrHexString(id)
            if (!result) {

            }
            const tutor = await TutorModel.findById(id)
            if (!tutor) {

            }
            if (tutor) {
                tutor.isBlocked = !tutor.isBlocked
                await tutor.save()
            }
            return tutor ? tutor.toObject() as Tutor : null
        } catch (error) {
            console.log(error);
            throw error

        }
    }
    async addCategory(category: Category): Promise<{ category: Category | null; }> {
        try {

            const { Name, Description } = category
            const newCategory = new CategoryModel({ Name, Description })

            await newCategory.save()
            return { category: newCategory.toObject() as Category }
        } catch (error) {
            console.log(error);
            throw error
        }
    }


    async getCategory(): Promise<Category[] | []> {
        try {


            const category: Category[] = await CategoryModel.find();
            return category

        } catch (error) {
            console.log(error);
            throw error

        }
    }


    async editCategory(id: string, category: Category): Promise<Category | null> {
        try {
            const { Name, Description } = category;
            const updateCategory = await CategoryModel.findByIdAndUpdate(id, { Name, Description }, { new: true });
            return updateCategory;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async categoryExists(Name: string): Promise<Category[]|null> {
        return await CategoryModel.find()
    }
    

    async  getRevenueDetails(): Promise<RevenueDetails | null> {
        try {
          
          const orders = await OrderModel.find();
          
         
          const countOrder = orders.length;
          if (countOrder === 0) return null;
      
          let totalRevenue = 0;
          let weeklySales = 0;
          let monthlySales = 0;
          
          const currentDate = new Date();
          const oneWeekAgo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
          const oneMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
      
          const courseDetails: CourseDetails[] = [];
          const studentDetails: User[] = [];
          const studentIds = new Set<string>();
      
          for (const order of orders) {
            const orderDate = new Date(order.CreatedAt);
            const price = Number(order.Price);
      
            totalRevenue += price;
      
            if (orderDate >= oneWeekAgo) {
              weeklySales += price;
            }
      
            if (orderDate >= oneMonthAgo) {
              monthlySales += price;
            }
      
         
            studentIds.add(order.StudentId.toString());
      
  
  
           const student=await UserModel.findById(order.StudentId);
            if(student){
              studentDetails.push({
                _id: student._id,
                Name: student.Name,
                Password: student.Password,
                Email: student.Email,
                Mobile: student.Mobile,
                Image: student.Image,
                CreatedAt: student.CreatedAt,
              });
            }
  
  
            const course = await CourseModel.findById(order.CourseId);
            if (course) {
              courseDetails.push({
                Name: course.Name,
                Description: course.Description,
                Price: course.Price,
                Duration: course.Duration,
                CreatedAt: course.CreatedAt,
                UpdatedAt: course.UpdatedAt,
              });
            }
          }
      
          const uniqueStudentCount = studentIds.size;
          const tutorsCount = await TutorModel.countDocuments();
          return {
            countOrder,
            totalRevenue,
            weeklySales,
            monthlySales,
            courses: courseDetails,
            uniqueStudentCount,
            students: studentDetails,
            tutorsCount
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      }
  

}