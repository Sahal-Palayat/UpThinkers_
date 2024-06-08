import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthContext'
import { clearTutor } from '../../../Store/tutorAuthSlice'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'

function TutorSidebar() {

    const navigate = useNavigate()
    const { setTutorToken } = useContext(AuthContext)
    const dispatch = useDispatch()


    const logout = () => {
        Cookies.remove('tutorToken')
        setTutorToken(null)
        dispatch(clearTutor())
        navigate('/tutor/login')
    }

    return (
        <>



            <div class="bg-white border-b border-gray-300 py-2 fixed top-0 left-0 right-0 z-50">
                <div class="flex justify-between items-center px-9">
                    <button id="menu-button" class="lg:hidden">
                        <i class="fas fa-bars text-cyan-500 text-lg"></i>
                    </button>
                    <div class="ml-1">
                        <img src="/logoo.png" alt="logo" class="h-20 w-30" />
                    </div>
                    <div class="space-x-4">
                        <button>
                            <i class="fas fa-bell text-cyan-500 text-lg"></i>
                        </button>
                        <button>
                            <i class="fas fa-user text-cyan-500 text-lg"></i>
                        </button>
                    </div>
                </div>
            </div>


            <div id="sidebar"  class="mt-28 lg:block hidden bg-white w-64 h-screen fixed rounded-none border-none">
                <div className="p-4 space-y-4">
                    <div href="#" aria-label="dashboard" className=" px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient from-customGreen to-cyan-400 hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400">
                        <i className="fas fa-home "></i>
                        <span className="-mr-1 font-medium">Home</span>
                    </div>
                    <div href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
                        <i className="fas fa-gift"></i>
                        <span>Profile</span>
                    </div>
                    <div href="" onClick={() => navigate('/tutor/courselist')} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
                        <i className="fas fa-store"></i>
                        <span>Course</span>
                    </div>
                    <div href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
                        <i className="fas fa-wallet"></i>
                        <span>Revenue</span>
                    </div>
                    <div href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
                        <i className="fas fa-exchange-alt"></i>
                        <span>Chat & Video</span>
                    </div>
                    <div href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
                        <i className="fas fa-user"></i>
                        <span>Profile</span>
                    </div>
                    <div onClick={logout} href="" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </div>
                </div>
            </div>




        </>
    )
}

export default TutorSidebar
