import React, { useEffect } from 'react'
import logo from '/logoo.png'
import Navbar from '../../Components/UserComponents/Navbar'
import { useDispatch, useSelector } from 'react-redux'

import { axiosApiUser } from '../../../Services/axios';
import AboutUser from '../AboutPage/AboutUser';
import Footer from '../../Components/UserComponents/Footer';
import CourseCard from '../Courses/CourseCard';
import CategoryCard from '../Category/CategoryCard';







function UserHome() {

    const user = useSelector((state) => state.user.user)


    useEffect(() => {
        axiosApiUser.get('/home')
    }, [])


    return (
        <div>
            <Navbar />
            <section style={{ backgroundImage: 'url(https://rare-gallery.com/uploads/posts/812614-Boys-Little-girls-Three-3-Sofa-Smile.jpg)' }} className="hero bg-cover bg-fixed bg-center h-[35rem] pt-20 mt-2 text-white relative">

                <div className="container mx-auto px-4 ">
                    <div className="row flex flex-col items-start ">
                        <div subtitle="WELCOME TO Easy Education Himatnagar" title="Best Online Education" />
                        <div style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)' }} className="p-6 rounded-lg">
                            <h1 className="text-5xl font-bold text-customBlue mb-4">Best Online Education</h1>
                            <h1 className="text-2xl font-bold text-black">WELCOME TO UpThinkers LearningHub</h1>

                            <p className="mt-4 pt-14">
                                Welcome to Easy Education Himatnagar. Education is going to start soon. <br />
                                An online test of 20 marks will be conducted daily and a class test will be conducted on Sunday. <br />
                                15000+15000 will be eligible for government assistance for class 11, 12 Science Arts, Commerce.
                            </p>

                            <div className="button mt-8 flex space-x-4">
                                <button className="primary-btn bg-customGreen text-white py-2 px-4 rounded hover:bg-customBlue">
                                    GET STARTED NOW <i className="fa fa-long-arrow-alt-right"></i>
                                </button>
                                <button className="bg-white text-customBlue py-2 px-4 rounded border border-customGreen hover:bg-gray-100">
                                    VIEW COURSE <i className="fa fa-long-arrow-alt-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <AboutUser />



            <CategoryCard />


            
            {/* <div className>
                <div className="flex justify-end items-center">
                    <img className="object-cover md:hidden  w-full h-60" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/banner_12_bg.png" alt="background" />
                    <img className="hidden md:block object-cover  w-full h-56 lg:h-52" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/banner_12_bg_ipad_desktop.png" alt="background" />
                    <div className=" flex xl:px-20 justify-start items-start flex-col absolute">
                        <h1 className="text0-xl xl:text-2xl font-medium leading-5 xl:leading-normal text-gray-800">Join UpThinkers Group</h1>
                        <p className="w-44 sm:w-64 lg:w-2/3 mt-4 text-base leading-6 xl:leading-5 text-gray-800">Shop our mid Season sale for a range of discounted items</p>
                        <button className="mt-5 xl:mt-6 hover:underline underline-offset-4 transition duration-300 ease-in-out flex justify-start items-center space-x-2">
                            <p className="text-base font-medium leading-none pb-0.5">Enquire now</p>
                            <svg width={6} height={12} viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.21967 0.96967C0.512563 0.676777 0.987437 0.676777 1.28033 0.96967L5.78033 5.46967C6.07322 5.76256 6.07322 6.23744 5.78033 6.53033L1.28033 11.0303C0.987437 11.3232 0.512563 11.3232 0.21967 11.0303C-0.0732233 10.7374 -0.0732233 10.2626 0.21967 9.96967L4.18934 6L0.21967 2.03033C-0.0732233 1.73744 -0.0732233 1.26256 0.21967 0.96967Z" fill="#242424" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div> */}
            <CourseCard />



            
            <Footer />


        </div>
    )


}

export default UserHome
