import { Schema,model } from "mongoose";
import { ObjectId } from "mongoose";
import CategoryDocument from "../../../entities/category";

const categorySchema= new Schema<CategoryDocument>({
    Name:String,
    Status:{
        type:Boolean,
        default:true
    },
    Description:String,

    
   
})


const CategoryModel = model <CategoryDocument>('category',categorySchema);
export default CategoryModel;