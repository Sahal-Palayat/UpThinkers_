import React, { useEffect } from 'react'
import logo from '/logoo.png'
import Navbar from '../../Components/Navbar'
import { useDispatch, useSelector } from 'react-redux'

import { axiosApiUser, userApi } from '../../../Services/axios';







function UserHome() {

    const user = useSelector((state) => state.user.user)


   useEffect(()=>{
    axiosApiUser.get('/home')
   },[])


    return (
        <div>
            <Navbar />
            <section className="hero bg-cover bg-fixed bg-center h-screen pt-20 text-white relative">
                <div className="container mx-auto px-4">
                    <div className="row flex flex-col items-start">
                        <div subtitle="WELCOME TO Easy Education Himatnagar" title="Best Online Education" />
                        <p className="mt-4">
                            Welcome to Easy Education Himatnagar. Education is going to start soon. An online test of 20 marks will be conducted daily and a class test will be conducted on Sunday. 15000+15000 will be eligible for government assistance for class 11, 12 Science Arts, Commerce.
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
            </section>


        </div>
    )


}

export default UserHome
