// import { UploadApiResponse } from 'cloudinary';
// import cloudinaryV2 from '../../config/cloudinary';
// import fs from 'fs'
// import UnverifiedUsers from '../../entities/UnverifiedUsers';
// import UserDocument from '../../entities/user';



// export const UploadFile:Function = async (file : Express.Multer.File)=>{
//     try {
//         const fileBuffer= fs.readFileSync(file.path)
//         const fileString= fileBuffer.toString('base64')
//         const result : UploadApiResponse = await cloudinaryV2.uploader.upload (`data:${file.mimetype};base64,${fileString}`, {
//             folder: 'User Profile'
//         });
//         fs.unlinkSync(file.path)
//         return result.secure_url
//     } catch (error) {
//         console.log(error);

//         return false
        
//     }
// }


// export const uploadBase64Image: Function = async (base64Image:string) => {
//     try {
//       const result = await cloudinaryV2.uploader.upload(base64Image, {
//         folder:'Post_Images',
//       });
//       return result.secure_url;
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       return 'Internal Server Error'
//     }
//   };

  
// export const VerifyUser: Function = async (user: UnverifiedUsers | UserDocument) => {
//     try {
//         if (!user) return { message: "No User Found", status: false };
//         if (user.Terminated) return { message: "Account Terminated", status: false };
//         if (user.Suspended) {
//             const currentDate = new Date()
//             if (user.SuspendedTill && user.SuspendedTill > currentDate) {
//                 return { message: "Account Suspended", status: false };
//             } else {
//                 user.Suspended = false;
//                 user.SuspendedTill = undefined;
//                 await user.save();
//             }
//         }
//         return { message: "User Verified", status: true };
//     } catch (e) {
//         return {
//             message: 'Internal Server Error',
//             status: false,
//         }
//     }
// }