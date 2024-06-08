import React, { useContext, useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie'
import { AuthContext } from '../../../Context/AuthContext';
import { setUser } from '../../../Store/userAuthSlice';
import { useDispatch } from 'react-redux';
import { config } from '../../../config';
import axios from 'axios'
// import { apiRequest } from '../../Services/axios';
// import { useToast } from "@chakra-ui/react";
// import { axiosApiGateWay } from '../../Services/axios';

function Otp({ signupData }) {

  console.log(signupData?.email, 'ssssssssssssssssssssss');


  const [otpValues, setOtpValues] = useState(['', '', '', ''])
  const { setToken } = useContext(AuthContext)
  const inputs = useRef([])
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(30);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setIsDisabled(true);
    }
  }, [timer]);


  const navigate = useNavigate()


  const focusNextInput = index => {
    const nextIndex = index + 1
    if (nextIndex < inputs.current.length) {
      inputs.current[nextIndex].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtpValues = [...otpValues];
      if (otpValues[index] !== '') {
        newOtpValues[index] = '';
        setOtpValues(newOtpValues);
      } else if (index > 0) {
        newOtpValues[index - 1] = '';
        setOtpValues(newOtpValues);
        inputs.current[index - 1].focus();
      }
    }
  };
  
  const handleChange = (e, index) => {
    const { value } = e.target
    if (value && value.length === 1) {
      const newOtpValues = [...otpValues]
      newOtpValues[index] = value
      setOtpValues(newOtpValues)
      focusNextInput(index)

    }
  }
  const dispatch = useDispatch()
  const handleOtpSubmit = async () => {
    const otp = otpValues.join('')
    
    const response = await fetch(`${config.USER_BASE_URL}/verifyOtp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        otp
      })
    })

    if (response.ok) {
      const data = await response.json()
      Cookies.set('token', data.token)
      Cookies.set('refreshToken', data.refreshToken)
      toast.success('Signup successful', {
        autoClose: true,
        onClose: () => {
          dispatch(setUser(data.user))
          setToken(data.refreshToken)
          navigate('/home')
        }
      })
    } else {
      toast.error('Invalid otp')
    }
  }


  const handleResendOtp = async () => {
    const response = await axios.post(`${config.USER_BASE_URL}/resendMail/${signupData.email}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

        emailId: signupData.email
      })
    });

    console.log(response);

    if (response.status === 200) {
      setTimer(30);
      setIsDisabled(false);
      toast.success(response.success);
    } else if (response.error) {
      toast.error(response.error);
    }

  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90 z-50">
      <ToastContainer position="top-center" autoClose={1500} />
      <div className="relative bg-white px-6 py-9 shadow-xl w-full max-w-md rounded-2xl">
        <div className="mx-auto flex flex-col space-y-6">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">Email Verification</div>
            <div className="text-sm font-medium text-gray-400">We have sent a code to your email ba**@dipainhouse.com</div>
          </div>

          <div className="flex flex-col space-y-6">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              {otpValues.map((value, index) => (
                <div key={index} className="w-16 h-16">
                  <input
                    ref={el => (inputs.current[index] = el)}
                    className="w-full h-full flex items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    name=""
                    id=""
                    value={value}
                    onChange={e => handleChange(e, index)}
                    onKeyDown={e=> handleKeyDown(e,index)}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-6">
              <button

                className="flex items-center justify-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                onClick={handleOtpSubmit}
              >
                Verify Account
              </button>

              <div className="flex items-center justify-center text-sm font-medium space-x-1 text-gray-500">
                {/* <p>Didn't receive code?</p>{' '} */}
                {/* <button >Submit OTP</button> */}
                <p>Time remaining: {timer} seconds</p>
                <button
                  className={`${isDisabled ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'} font-bold py-1 px-2 rounded text-xs mt-2`}
                  onClick={handleResendOtp}
                  disabled={!isDisabled}
                >
                  Resend OTP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Otp
