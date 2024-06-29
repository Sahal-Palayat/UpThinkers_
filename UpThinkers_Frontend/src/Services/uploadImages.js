
import axios from 'axios';
import { config } from '../config';

export const uploadImages = async (imageFile) => {
  console.log('inside upload image');
  console.log(imageFile,"{}{}{}{}{}{}");

console.log(config.CLOUDINARY_PRESET_KEY,config.CLOUDINARY);

  const presetKey = config.CLOUDINARY_PRESET_KEY;
  const userKey = config.CLOUDINARY;

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", presetKey);

  try {
    console.log("formData in url", formData);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${userKey}/image/upload`,
      formData
    );
    console.log("res from cloud", res);

    // Extract the URL of the uploaded image
    const imageUrl = res.data.url;
    console.log("imageUrl", imageUrl);
    return imageUrl;
  } catch (error) {
    console.log("Error uploading image:", error);
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
};
