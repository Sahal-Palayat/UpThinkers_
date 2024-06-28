import React, { useEffect, useState } from 'react'
import SidebarUser from '../../Components/UserComponents/SidebarUser'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../Components/UserComponents/Navbar'
import { useSelector } from 'react-redux'
import { axiosApiUser } from '../../../Services/axios'

function UserCourse() {
    const navigate= useNavigate()
    const [course,setCourse]= useState([])
    const { user } = useSelector((state) => state.user)
    useEffect(()=>{
        const fetchCourse=async ()=>{
            try {
                const response = await axiosApiUser.get(`/enrolledcourses/${user._id}`)
                setCourse(response.data.enrolledCourse)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCourse()
    },[])
    console.log(course);
    return (
        <div>
            <Navbar/>
            <SidebarUser/>
            
            <div className="  lg:w-[80] lg:ml-64 px-6 py-8">
                <h1 className='text-4xl font-bold text-customBlue ml-6'>My Courses</h1>
                <div className="relative pt-2 lg:pt-2 min-h-screen">
                  
                    <div className=" bg-cover w-full flex flex-wrap">
                        {course.length > 0 && course.map((courses) => (
                            <div 
                            key={courses._id} 
                            className="w-full  md:w-3/12 lg:w-6/12 xl:w-4/12 p-2">
                                <div className=" w-full bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg ">
                                    <article className=" bg-white p-3 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl  border">
                                        <div 
                                        onClick={() => navigate(`/singlecourse`, { state: { course: courses } })}
                                            className=" cursor-pointer relative mb-4 ">
                                            <img className=" w-full h-40 object-cover transition-transform duration-300 transform group-hover:scale-105"
                                                src={courses.Image} alt=""
                                                 />
                                            <div className=" absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 text-red-700">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                </svg>
                                                <span className="ml-1 text-sm text-slate-400">2</span>
                                            </div>
                                            <div className="flex justify-center items-center bg-customGreen bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-white  opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100">
                                                View More...
                                                <svg className="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className='h-20'>

                                        <h3 className="font-medium text-xl leading-8">
                                            <p className="block relative group-hover:text-red-700 transition-colors duration-200">
                                               Course Name: {courses.Name}
                                            </p>
                                        </h3>
                                            <p className='text-l'>Description:{courses.Description}</p>
                                        </div>
                                    </article>
                                </div>
                            </div>
                         ))} 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCourse
