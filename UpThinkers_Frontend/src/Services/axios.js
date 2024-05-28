import axios from 'axios';
import { config } from '../config';
import Cookies from 'js-cookie'
// import toast from 'react-hot-toast';



export const api = axios.create({
    baseURL: config.AUTH_BASE_URL,
    withCredentials: true
});


export const adminApi = axios.create({
    baseURL: config.ADMIN_BASE_URL,
});


export const userApi = axios.create({
    baseURL: config.USER_BASE_URL,
    // withCredentials:true
});


const tutorApi = axios.create({
    baseURL: config.TUTOR_BASE_URL,
});


const adminToken = Cookies.get('adminToken')

export const axiosApiAdmin = axios.create({
    baseURL: config.ADMIN_BASE_URL, headers: {
        'Authorization': `Bearer ${adminToken}`
    }
})


const token = Cookies.get('token')

export const axiosApiUser = axios.create({
    baseURL: config.USER_BASE_URL, headers: {
        'Authorization': `Bearer ${token}`
    }
})

axiosApiUser.interceptors.response.use((response) => {
    
    if (response.status === 208) {
        Cookies.remove('token')
        window.location.href = '/login'
    }
    return response
}, (err) => {
    console.log(err, "this is the error");

    const { response } = err;

})





// axiosApiGateWay.interceptors.