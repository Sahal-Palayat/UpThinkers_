import React, { useContext, useEffect, useState } from 'react'
import logo from '/logoo.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { AuthContext } from '../../../Context/AuthContext'
import { adminLoginFailure, adminLogin } from '../../../Store/adminAuthSlice'


function AdminLogin() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const error = useSelector((state) => state.user.error)
    const { token, setToken } = useContext(AuthContext)

    useEffect(() => {
        console.log('okkkk');
        dispatch(adminLoginFailure(null))
    }, [dispatch])

    const handleLogin = async (e) => {
        e.preventDefault()
        const minPasswordLength = 8;

        let hasError = false

        if (!email.trim()) {
            setEmailError('Email is required');
            hasError = true;
        } else if (!/\b[A-Za-z0-9._%+-]+@gmail\.com\b/.test(email.trim())) {
            setEmailError('Email must be in the format example@gmail.com');
            hasError = true;
        } else {
            setEmailError('');
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            hasError = true;
        } else if (password.length < 0) {
            setPasswordError(`Password must be at least ${minPasswordLength} characters long`);
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (!hasError) {
            try {
                await dispatch(adminLogin({ email, password })).then((response) => {
                    if (response.payload) {
                        toast.success(response?.payload?.message,{
                                autoClose:1500,
                                onClose:()=>{
                                    if(response.payload.user){
                                        setToken(response.payload.refreshToken)
                                        navigate('/admin/home')
                                    }
                                },
                                pauseOnHover:false,
                                draggable:false,
                            })
                       
                    } else {
                        toast.error(response?.error?.message,{
                            onClose:()=>{
                                return navigate('/admin/login')
                            }
                        })
                    }

                    // const type = payload.user ? 'success' : 'error';
                    // toast[type](payload.message,{
                    //     autoClose:1500,
                    //     onClose:()=>{
                    //         if(payload.user){
                    //             setToken(payload.refreshToken)
                    //             navigate('/admin/home')
                    //         }
                    //     },
                    //     pauseOnHover:false,
                    //     draggable:false,
                    // })
                })
            } catch (error) {
                console.log(error.message);
                // toast.error('Invalid user')
                // setLoginError('Login failed ,please try again later')
                // dispatch(adminLoginFailure('Login failed,try again'))
            }
        }

    }

    return (
        <div className="h-screen  bg-gray-100 overflow-hidden text-gray-900 flex justify-center">
            <ToastContainer autoClose={1500} onClose={() => navigate('/home')} />
            <div className="w-full  bg-white shadow sm:rounded-lg flex h-full  justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">

                    <div>
                        <img src={logo} className="w-mx-auto" alt="Logo" style={{ width: '30%' }} />
                    </div>
                    <div className="mt-12 flex flex-col items-center">
                        <div className="w-full flex-1 mt-8">
                            <div className="flex flex-col items-center">
                                <button
                                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                    <div className="bg-white p-2 rounded-full">
                                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                                            <path
                                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                fill="#4285f4" />
                                            <path
                                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                fill="#34a853" />
                                            <path
                                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                fill="#fbbc04" />
                                            <path
                                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                fill="#ea4335" />
                                        </svg>
                                    </div>
                                    <span className="ml-4">
                                        Sign In with Google
                                    </span>
                                </button>

                            </div>

                            <div className="mt-12 mb-7 border-b text-center">
                                <div
                                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or sign In with Cartesian E-mail
                                </div>
                            </div>
                            <form action='#' method='post'>


                                <div className="mx-auto max-w-xs">
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        placeholder="Email"
                                        onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
                                    />
                                    {emailError && <p className="error text-red-600">{emailError}</p>}
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => { setPassword(e.target.value); setPasswordError('') }}
                                    />
                                    {passwordError && <p className="error text-red-600">{passwordError}</p>}

                                    <button
                                        onClick={handleLogin}
                                        type='submit'
                                        className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">


                                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-">
                                            Sign In
                                        </span>
                                    </button>

                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        Dont have an Account clink_
                                        <a href="" className="text-blue-500 text-sm font-semibold">
                                            <button onClick={() => navigate('/register')}>SignUp</button>
                                        </a>

                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
                <div className="flex-1 text-center hidden lg:flex bg-no-repeat " style={{ backgroundImage: "url('https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg')", height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center' }}>



                </div>
            </div>
        </div>
    )
}

export default AdminLogin
