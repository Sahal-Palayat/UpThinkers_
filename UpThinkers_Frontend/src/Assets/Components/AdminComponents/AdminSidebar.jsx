import React, { useContext,useState } from 'react'
import logo from '/logoo.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AuthContext } from '../../../Context/AuthContext'
import { clearAdmin } from '../../../Store/adminAuthSlice'
function AdminSidebar() {

    const user = useSelector((state) => state.admin.user)
    const navigate = useNavigate()
    const { setAdminToken } = useContext(AuthContext)
    const dispatch = useDispatch()
 
    const logout = () => {
        Cookies.remove('adminToken')
        setAdminToken(null)
        dispatch(clearAdmin())
        navigate('/admin/login')
    }
    
    console.log((user, 'sidebarrrrrr'));
    return (
        <div className='bg-green-600 font-sans '>
            <span className='absolute text-white text-4xl top-5 left-4 cursor-pointer' >
                <i className='bi bi-filter-left px-2 bg-customGreen rounded-md'></i>
            </span>

            <div className='sidebar fixed top-0 bottom-0 lg:left-0 left-[-300px]  p-2 w-[300px] overflow-y-auto text-center bg-customBlue '>

                <div className='text-gray-100 text-xl'>
                    <div className='p-2.5 mt-1 flex items-center'>
                        <i class="bi bi-app-indicator   px-2 py-1 bg-black rounded-md"></i>
                        <img onClick={() => navigate('/admin/home')} src={logo} alt="" className="w-30 h-14 ml-8" />
                        <i class="bi bi-x-lg ml-8 cursor-pointer lg:hidden" ></i>

                    </div>
                    <hr className='my-2 text-gray-600' />
                </div>
                <div className='p-2.5 mt-3  flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white'>
                    <i className='bi bi-search text-sm'></i>
                    <input type="text" placeholder='Search ' className='text-[15px] ml-4 w-full bg-transparent focus:outline-none' />

                </div>
                <div onClick={() => navigate('/admin/home')} className='p-2.5 mt-3  flex items-center rounded-md px-4 duration-300 cursor-pointer bg-customBlue text-white hover:bg-customGreen'>
                    <i className='bi bi-house-door-fill text-sm'></i>
                    <span className='text-[15px] ml-4 text-gray-200'>Home</span>

                </div>
                <div onClick={() => navigate('/admin/studentslist')} className='p-2.5 mt-3  flex items-center rounded-md px-4 duration-300 cursor-pointer bg-customBlue text-white hover:bg-customGreen'>
                    <i className='bi bi-bookmark-fill'></i>
                    <span className='text-[15px] ml-4 text-gray-200'>Students</span>

                </div>
                <div onClick={() => navigate('/admin/tutorslist')} className='p-2.5 mt-3  flex items-center rounded-md px-4 duration-300 cursor-pointer bg-customBlue text-white hover:bg-customGreen'>
                    <i className='bi bi-book-fill'></i>
                    <span className='text-[15px] ml-4 text-gray-200'>Tutors</span>

                </div>
                <hr className='my-2 text-gray-600' />
                <div className={`   p-2.5 mt-3  flex items-center rounded-md px-4 duration-300 cursor-pointer bg-customBlue text-white hover:bg-customGreen`} >
                    <i className='bi bi-chat-left-text-fill'></i>
                    <div className='flex justify-between w-full items-center'>
                        <span className='text-[15px] ml-4 text-gray-200'>Category</span>
                        <span className='text-sm rotate-180' id='arrow'>
                            <i className='bi bi-chevron-down'></i>
                        </span>
                    </div>
                </div>

                <div   className='text-left text-sm font-thin mt-2 w-4/5 mx-auto text-gray-200' id='submenu' >
                    <h1 onClick={() => navigate('/admin/addcategory')} className='cursor-pointer p-2 hover:bg-customGreen rounded-md mt-1'>Add Category</h1>
                    <h1 onClick={() => navigate('/admin/categorylist')} className='cursor-pointer p-2 hover:bg-customGreen rounded-md mt-1'>Category List</h1>
                    {/* <h1 className='cursor-pointer p-2 hover:bg-customGreen rounded-md mt-1'>Friends</h1> */}
                </div>
                <div  onClick={logout} className='p-2.5 mt-3  flex items-center rounded-md px-4 duration-300 cursor-pointer bg-customBlue text-white hover:bg-customGreen'>
                    <i className='bi bi-box-arrow-in-right '></i>
                    <span className='text-[15px] ml-4 text-gray-200'>Logout</span>

                </div>
            </div>

        </div>

    )
}

export default AdminSidebar
