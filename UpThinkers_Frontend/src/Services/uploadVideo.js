import axios from 'axios';
import { config } from '../config';
import { S3Client,GetObjectCommand } from '@aws-sdk/client-s3';

import { Upload } from '@aws-sdk/lib-storage';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'
import { v4 as uuidv4 } from 'uuid';
 

// export const uploadVideo = async (videoFile) => {
//   console.log('inside upload video');
//   console.log(videoFile); 

//   const presetKey = config.CLOUDINARY_PRESET_KEY;
//   const userKey = config.CLOUDINARY;

//   const formData = new FormData();
//   formData.append("file", videoFile);
//   formData.append("upload_preset", presetKey);

//   try {
//     console.log("formData in url", formData);
//     const res = await axios.post(
//       `https://api.cloudinary.com/v1_1/${userKey}/video/upload`,
//       formData
//     );
//     console.log("res from cloud", res);

//     // Extract the URL of the uploaded video
//     const videoUrl = res.data.url;
//     console.log("videoUrl", videoUrl);
//     return videoUrl;
//   } catch (error) {
//     console.log("Error uploading video:", error);
//     if (error.response) {
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       console.log(error.request);
//     } else {
//       console.log('Error', error.message);
//     }
//   }
// };



// import { generateName } from './streamFunctions/streamManagement';



const s3ClientConfig = {
  region: config.S3_REGION,
  credentials: {
    accessKeyId: config.S3_ACCESS_KEY || "your acc id",
    secretAccessKey: config.S3_SECRET_KEY || "your secret okay"
  }
};



const s3Client = new S3Client(s3ClientConfig);


export const uploadToS3Bucket = async (data, onProgress) => {
  try {

    const name = uuidv4() + Date.now();
    const params = {
      Bucket: config.S3_BUCKET_NAME,
      Key: name || Date.now().toString(),
      Body: data
    };

    const upload = new Upload({
      client: s3Client,
      params, queueSize: 3,
      leavePartsOnError: false,
    });

    upload.on('httpUploadProgress', (progress) => {
      if (progress.total) {
        const percentage = Math.round((progress.loaded / progress.total) * 100);
        onProgress(percentage);
      }
    });

    await upload.done();

    const command = new GetObjectCommand({
      Bucket: config.S3_BUCKET_NAME,
      Key: params.Key, 
    })

    const url = await getSignedUrl(s3Client, command, { expiresIn: 108000 }); // 30 
    console.log(url);
    return url;
    
    // const objectKey = params.Key;
    // const region = config.S3_REGION;
    // const url = `https://${params.Bucket}.s3.${region}.amazonaws.com/${objectKey}`;
    // return url;

  } catch (err) {
    console.error('Error uploading video to S3:', err);
    throw err;
  }
};




// const s3ClientConfig = {
//   region: config.S3_REGION,
//   credentials: {
//     accessKeyId: config.S3_ACCESS_KEY || "your acc id",
//     secretAccessKey: config.S3_SECRET_KEY || "your secret okay"
//   }
// };

// const s3Client = new S3Client(s3ClientConfig);

// export const uploadToS3Bucket = async (data, onProgress) => {
//   try {
//     const name = uuidv4() + Date.now();
//     const params = {
//       Bucket: config.S3_BUCKET_NAME,
//       Key: name || Date.now().toString(),
//       Body: data
//     };

//     const upload = new Upload({
//       client: s3Client,
//       params, queueSize: 3,
//       leavePartsOnError: false,
//     });

//     upload.on('httpUploadProgress', (progress) => {
//       if (progress.total) {
//         const percentage = Math.round((progress.loaded / progress.total) * 100);
//         onProgress(percentage);
//       }
//     });

//     await upload.done();

    
//     const command = new CreatePresignedPostCommand({
//       Bucket: params.Bucket,
//       Key: params.Key,
//       Expires: 3600 
//     });

//     const presignedUrl = await s3Client.send(command);

//     return presignedUrl;

//   } catch (err) {
//     console.error('Error uploading video to S3:', err);
//     throw err;
//   }
// };