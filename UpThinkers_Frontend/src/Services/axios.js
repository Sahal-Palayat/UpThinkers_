import axios from 'axios';
import { config } from '../config';
// import toast from 'react-hot-toast';



const api = axios.create({
 baseURL: config.AUTH_BASE_URL,
 withCredentials:true
});


const adminApi = axios.create({
    baseURL: config.ADMIN_BASE_URL,
});


export const userApi = axios.create({
    baseURL: config.USER_BASE_URL,
    withCredentials:true
});


const tutorApi = axios.create({
    baseURL: config.TUTOR_BASE_URL,
});

// const chatApi = axios.create({
//     baseURL: config.chatBaseUrl,
// });

// chatApi.interceptors.request.use((config) => {
//     const studentToken = localStorage.getItem('studentToken');
//     if (studentToken !== null) {
//     config.headers.authorization = `Bearer ${studentToken}`;
//     }
//     return config;
//     })





userApi.interceptors.request.use((config) => {
   const studentToken = localStorage.getItem('studentToken');
   if (studentToken !== null) {
   config.headers.authorization = `Bearer ${studentToken}`;
   }
   return config;
   })



userApi.interceptors.response.use(     
      (response) => response,
      (error) => {
          if (error.response && error.response.data) {
              console.log(error.response, "error")
              const errorMessage = error.response.data.error || 'An error occurred';
              return Promise.reject(errorMessage);
          } else {
              console.error('Axios error:', error);
          }
          return Promise.reject(error);
      }
)




adminApi.interceptors.request.use((config) => {
   const adminToken = localStorage.getItem('studentToken');
   
   if (adminToken !== null) {
   config.headers.authorization = `Bearer ${adminToken}`;
   }
   return config;
   })



   adminApi.interceptors.response.use(     
      (response) => response,
      (error) => {
          if (error.response && error.response.data) {
              console.log(error.response, "error")
              const errorMessage = error.response.data.error || 'An error occurred';
              toast.error(errorMessage, { duration: 2000, style: { color: '#fff', background: 'black' } });
          } else {
              console.error('Axios error:', error);
          }
          return Promise.reject(error);
      }
)




tutorApi.interceptors.request.use((config) => {
   const tutorToken = localStorage.getItem('studentToken');
   if (tutorToken !== null) {
   config.headers.authorization = `Bearer ${tutorToken}`;
   }
   return config;
   })



   tutorApi.interceptors.response.use(     
      (response) => response,
      (error) => {
          if (error.response && error.response.data) {
              console.log(error.response, "error")
              const errorMessage = error.response.data.error || 'An error occurred';
              toast.error(errorMessage, { duration: 2000, style: { color: '#fff', background: 'black' } });
          } else {
              console.error('Axios error:', error);
          }
          return Promise.reject(error);
      }
)


// interface ApiRequestConfig extends AxiosRequestConfig {
//  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
//  url: string;
//  data?: any;
//  params?: any;
// }



// export const apiRequest = async (config: ApiRequestConfig) => {
//  try {
//     const response = await api(config);
//     return response.data;
//  } catch (error) {
//     throw error;
//  }
// };

const requestTimeout = 5000;
export const apiRequest = async (config) => {
    console.log(config)
    try {
      const response = await axios({
        method: config.method,
        url: config.baseurl,
        data : config.data,
        params: config.params,
        timeout: requestTimeout,
      });
      console.log(response);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

//   export const axiosApiGateWay = axios.create({
//     baseURL: config.USER_BASE_URL, headers: {
//         'Authorization': 
//     }
// })



// export const adminApiRequest = async (config: ApiRequestConfig) => {
//     try {
//         const abortController = new AbortController();
//         const timeoutId = setTimeout(() => {
//             abortController.abort();
//           }, requestTimeout);
//         config.signal = abortController.signal;
//        const response = await adminApi(config);
//        clearTimeout(timeoutId);
//        return response.data;
//     } catch (error) {
//         if (axios.isCancel(error)) {
//             console.error('Request canceled:', error.message);
//           } else {
//             throw error;
//           }
//     }
// };



// export const studentApiRequest = async (config: ApiRequestConfig) => {
//     try {
//         const abortController = new AbortController();
//         const timeoutId = setTimeout(() => {
//             abortController.abort();
//           }, requestTimeout);
//         config.signal = abortController.signal;
//        const response = await studentApi(config);
//        clearTimeout(timeoutId);
//        return response.data;
//     } catch (error) {
//         if (axios.isCancel(error)) {
//             console.error('Request canceled:', error.message);
//           } else {
//             throw error;
//           };
//     }
// };





// export const chatApiRequest = async (config: ApiRequestConfig) => {
//     try {
//         const abortController = new AbortController();
//         const timeoutId = setTimeout(() => {
//             abortController.abort();
//           }, requestTimeout);
//         config.signal = abortController.signal;
//        const response = await chatApi(config);
//        clearTimeout(timeoutId);
//        return response.data;
//     } catch (error) {
//         if (axios.isCancel(error)) {
//             console.error('Request canceled:', error.message);
//           } else {
//             throw error;
//           };
//     }
// };







// export const instructorApiRequest = async (config: ApiRequestConfig) => {
//     try {
//         const abortController = new AbortController();
//         const timeoutId = setTimeout(() => {
//             abortController.abort();
//           }, requestTimeout);
//         config.signal = abortController.signal;
//        const response = await instructorApi(config);
//        clearTimeout(timeoutId);
//        return response.data;
//     } catch (error) {
//         if (axios.isCancel(error)) {
//             console.error('Request canceled:', error.message);
//           } else {
//             throw error;
//           }
//     }
// };
