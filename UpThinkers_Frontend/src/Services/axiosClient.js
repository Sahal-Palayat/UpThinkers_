// import { createAxiosClient } from './CreateAxiosClient';
// import Cookies from 'js-cookie';
// import Swal from 'sweetalert2';


// const REFRESH_TOKEN_URL = 'http://localhost:3030/auth/refresh-token'
// const APP_BASE_URL = 'http://localhost:3030'


// function getCurrentAccessToken() {
//     return Cookies.get('token')
// }

// function getCurrentRefreshToken() {
//     return Cookies.get('refreshToken');
// }


// function setRefreshedTokens(tokens) {
//     Cookies.set('refreshToken', tokens.refreshToken);
// }



// export const client = createAxiosClient({
//     options: {
//         baseURL: APP_BASE_URL,
//         timeout: 300000,
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     },
//     getCurrentAccessToken,
//     getCurrentRefreshToken,
//     refreshTokenUrl: REFRESH_TOKEN_URL,
//     setRefreshedTokens
// })