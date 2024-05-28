import React, { useState } from 'react'
import logo from '/logoo.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import OtpTutor from '../../Components/OtpTutor';
import { config } from '../../../config';


function TutorRegister() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [showOTP, setShowOTP] = useState(false);

    const signupData = { email, name, mobile, password }


    const handleInputChange = (e) => {
        const { name, value } = e.target

        switch (name) {
            case 'email':
                setEmail(value);
                setEmailError('');
                break;
            case 'name':
                setName(value);
                setNameError('');
                break;
            case 'mobile':
                setUsername(value);
                setMobileError('');
                break;
            case 'password':
                setPassword(value);
                setPasswordError('');
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                setConfirmPasswordError('');
                break;
            case 'image':
            default:
                break;
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;


        if (!email.trim()) {
            setEmailError('Email is required');
            hasError = true;
        } else if (!/\b[A-Za-z0-9._%+-]+@gmail\.com\b/.test(email.trim())) {
            setEmailError('Email must be in the format example@gmail.com');
            hasError = true;
        } else {
            setEmailError('');
        }


        if (!name.trim()) {
            setNameError('Name is required');
            hasError = true;
        } else {
            setNameError('');
        }

        if (!mobile.trim()) {
            setMobileError('Mobile is required');
            hasError = true;
        } else if (!/^\d{10}$/.test(mobile.trim())) {
            setMobileError('Mobile number must be exactly 10 digits');
            hasError = true;
        } else {
            setMobileError('');
        }


        if (!password.trim()) {
            setPasswordError('Password is required');
            hasError = true;
        } else if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}/.test(password.trim())) {
            setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character');
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (!confirmPassword.trim()) {
            setConfirmPasswordError('Confirm Password is required');
            hasError = true;
        } else if (confirmPassword.trim() !== password.trim()) {
            setConfirmPasswordError('Passwords do not match');
            hasError = true;
        } else {
            setConfirmPasswordError('');
        }


        if (!hasError) {
            try {
                console.log('vannnnn', signupData);
                const response = await fetch(`${config.TUTOR_BASE_URL}/sendMail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(signupData)
                })

                if (response.status === 200) {
                    console.log('email sent sucsess');
                    toast.success('Email sent sucsess')
                    setShowOTP(true)

                } else if (response.status === 400) {
                    console.log('user already exist');
                } else if (response.status === 500) {
                    console.log('failed to send otp');
                } else {
                    console.log('Unhandled status code:', response.status);
                }


            } catch (error) {
                console.log(error);
            }
        }


    }
    if (showOTP) {
        return (
            <>

                <ToastContainer position="top-center" autoClose={1500} />
                <OtpTutor signupData={signupData} />

            </>
        )
    }




    return (
        <div className="h-screen bg-gray-100 text-gray-900 flex justify-center">
            <ToastContainer position="top-center" autoClose={1500} />

            <div className="w-full bg-white shadow sm:rounded-lg flex h-screen justify-center flex-1">
                <div className="flex-1 text-center hidden lg:flex" style={{ backgroundImage: "url('https://www.corporatevision-news.com/wp-content/uploads/2020/07/online-learning-1.jpg')", height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                </div>
                <div className="lg:w-1/2 xl:w-5/12 p-2 sm:p-12">
                    <div>
                        <img src={logo} className="w-mx-auto" alt="Logo" style={{ width: '30%' }} />
                    </div>
                    <div className="mt-4 flex flex-col items-center">
                        <div className="w-full flex-1 justify-start items-start mt-2">
                            <div className="flex flex-col items-center mr-5">
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

                            {/* <div className="my-12  text-start">
                            </div> */}
                            <div className="max-w-xs w-full   p-2 ml-20">
                                <form onSubmit={handleSubmit}>

                                    <input
                                        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        id="name"
                                        name="name"
                                        placeholder="Full Name"
                                        type="text"
                                        value={name}
                                        onChange={handleInputChange}
                                    />
                                    {nameError && <p className="text-xs text-red-500">{nameError}</p>}
                                    <input
                                        autoFocus
                                        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        type="text"
                                        value={email}
                                        onChange={handleInputChange}
                                    />
                                    {emailError && <p className="text-xs text-red-500">{emailError}</p>}
                                    <input
                                        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        id="mobile"
                                        name="mobile"
                                        placeholder="Mobile"
                                        type="text"
                                        value={mobile}
                                        onChange={handleInputChange}
                                    />
                                    {mobileError && <p className="text-xs text-red-500">{mobileError}</p>}
                                    <input
                                        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        value={password}
                                        onChange={handleInputChange}
                                    />
                                    {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
                                    <input
                                        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                    {confirmPasswordError && <p className="text-xs text-red-500">{confirmPasswordError}</p>}
                                    <button
                                        type='submit' className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-2 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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
                                </form>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    You have a Account click here--
                                    <a href="" className="text-blue-500 text-sm font-semibold">
                                        <button onClick={() => navigate('/tutor/login')}>Log In</button>
                                    </a>


                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TutorRegister
