import React, { useEffect } from 'react';
import { config } from '../config'; // Ensure this path is correct and config contains RAZORPAY_ID_KEY
import { axiosApiUser } from '../Services/axios';
import { useNavigate } from 'react-router-dom';

const RazorpayPayment = ({ course, user }) => {
   

    const navigate= useNavigate()
    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => {
                    resolve(true);
                };
                script.onerror = () => {
                    resolve(false);
                };
                document.body.appendChild(script);
            });
        }

        const loadRazorpay = async () => {
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
            if (!res) {
                alert('Razorpay SDK failed to load. Are you online?');
            }
        }

        loadRazorpay();
    }, []);

    const savePaymentDetails = async (response) => {
        try {
            const paymentData = {
                payment: 'Razorpay',
                studentId: user._id,
                courseId: course._id,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                amount: course.Price
            };
            await axiosApiUser.post('/placeorder', paymentData); 
            alert('Payment details saved successfully!');
            setTimeout(() => {
                navigate('/courselist')
            }, 1000);
        } catch (error) {
            console.error('Error saving payment details:', error);
            alert('Failed to save payment details. Please try again.');
        }
    };

    const handlePayment = () => {
        console.log(course, 'Course details for payment');
        const options = {
            key: config.RAZORPAY_ID_KEY,
            amount: course.Price * 100, 
            currency: 'INR',
            name: 'UpThinkers LearningHub',
            description: 'Course payment',
            image: '/logoo.png',
            notes: {
                address: 'Razorpay Corporate Office'
            },
            theme: {
                color: '#7BD654'
            },
            handler: function (response) {
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                savePaymentDetails(response); 
            },
            modal: {
                ondismiss: function () {
                    alert('Payment dismissed');
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div>
            <button
                type="button"
                onClick={handlePayment}
                style={{ backgroundColor: "white", paddingTop: "1%", paddingBottom: "1%" }}
                className="px-5 w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
            >
                <img src='/razorpayimage.png' style={{ width: "55px", height: "38px", marginLeft: '90px' }} alt="Razorpay" />
                <p className="text-black ml-10">Connect with Razorpay</p>
            </button>
        </div>
    );
};

export default RazorpayPayment;
