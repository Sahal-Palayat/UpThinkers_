import React from 'react'
import { useNavigate } from 'react-router-dom'

function SidebarUser() {
    const navigate = useNavigate()
    return (
        <>

            <div id="sidebar"  class="  lg:block hidden bg-white w-64 h-screen absolute rounded-none border-none">
                <div className="p-4 space-y-4">
                   
                    <div href="#" onClick={()=>navigate('/profile')} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
                        <i className="fas fa-gift"></i>
                        <span>Profile</span>
                    </div>
                    <div href="#" onClick={()=>navigate('/profile/usercourses')}  className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
                        <i className="fas fa-store"></i>
                        <span>My Courses</span>
                    </div>
                    <div href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
                        <i className="fas fa-wallet"></i>
                        <span>Revenue</span>
                    </div>
                    <div href="#" onClick={()=>navigate('/chatpage')} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
                        <i className="fas fa-exchange-alt"></i>
                        <span>Chat & Video</span>
                    </div>
                    
                    <div href="" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </div>
                </div>
            </div>




        </>
    )
}

export default SidebarUser
