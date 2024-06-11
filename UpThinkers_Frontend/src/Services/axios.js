import axios from 'axios';
import { config } from '../config';
import Cookies from 'js-cookie'
// import toast from 'react-hot-toast';


const token = Cookies.get('token')
const tutorToken = Cookies.get('tutorToken')
const adminToken = Cookies.get('adminToken')



export const axiosApiAdmin = axios.create({
    baseURL: config.ADMIN_BASE_URL, headers: {
        'Authorization': `Bearer ${adminToken}`
    }
})


export const axiosApiTutor = axios.create({
    baseURL: config.TUTOR_BASE_URL, headers: {
        'Authorization': `Bearer ${tutorToken}`
    }
})


export const axiosApiUser = axios.create({
    baseURL: config.USER_BASE_URL, headers: {
        'Authorization': `Bearer ${token}`
    }
})

axiosApiUser.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.error('Token is not available');
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


// axiosApiUser.interceptors.response.use((response) => {
//     if(token){
//         response.headers.Authorization=token
//       }
//     if (response.status === 208) {
//         Cookies.remove('token')
//         window.location.href = '/login'
//     }
//     return response
// }, (err) => {
//     console.log(err, "this is the error");

//     const { response } = err;
    
// })






axiosApiAdmin.interceptors.request.use(response=>{
    const adminToken=Cookies.get("adminToken")
    if(adminToken){
      response.headers.Authorization=adminToken
    }
    return config
  })
  
  axiosApiAdmin.interceptors.response.use((response) => {
    return response;  
  }, (error) => {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      console.error("Status Code:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  });



  axiosApiTutor.interceptors.request.use((config) => {
    const token = Cookies.get('tutorToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.error('Token is not available');
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});



  

//   axiosApiTutor.interceptors.request.use(response=>{
//     const tutorToken=Cookies.get("tuturToken")
//     if(tutorToken){
//       response.headers.Authorization=tutorToken
//     }
//     return config
//   })
  
//   axiosApiTutor.interceptors.response.use((response) => {
//     return response;  
//   }, (error) => {
//     if (error.response) {
//       console.error("Response Error:", error.response.data);
//       console.error("Status Code:", error.response.status);
//       console.error("Headers:", error.response.headers);
//     } else if (error.request) {
//       console.error("Request Error:", error.request);
//     } else {
//       console.error("Error:", error.message);
//     }
//     return Promise.reject(error);
//   });


    
    // export const api = axios.create({
    //     baseURL: config.AUTH_BASE_URL,
    //     headers:{
    //         "Content-Type":"application/json"
    //       },
    //       withCredentials: true
    // });
    
    
    // export const adminApi = axios.create({
    //     baseURL: config.ADMIN_BASE_URL,
    //     headers:{
    //         "Content-Type":"application/json"
    //       },
    //       withCredentials: true
    // });
    
    
    // export const userApi = axios.create({
    //     baseURL: config.USER_BASE_URL,
    //     headers:{
    //         "Content-Type":"application/json"
    //       },
    //       withCredentials: true
    // });
    
    
    // export const tutorApi = axios.create({
    //     baseURL: config.TUTOR_BASE_URL,
    //     headers:{
    //         "Content-Type":"application/json"
    //       },
    //       withCredentials: true
    // });