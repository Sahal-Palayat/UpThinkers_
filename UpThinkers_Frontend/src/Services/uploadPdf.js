import axios from 'axios';
import { config } from '../config';

export const uploadPDF = async (pdfFile) => {
  console.log('inside upload PDF');
  console.log(pdfFile);

  const presetKey = config.CLOUDINARY_PRESET_KEY;
  const userKey = config.CLOUDINARY;

  const formData = new FormData();
  formData.append("file", pdfFile);
  formData.append("upload_preset", presetKey);

  try {
    console.log("formData in url", formData);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${userKey}/raw/upload`,
      formData
    );
    console.log("res from cloud", res);

    // Extract the URL of the uploaded PDF
    const pdfUrl = res.data.url;
    console.log("pdfUrl", pdfUrl);
    return pdfUrl;
  } catch (error) {
    console.log("Error uploading PDF:", error);
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
