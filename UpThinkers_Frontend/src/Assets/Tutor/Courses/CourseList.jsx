import React, { useEffect, useState } from 'react';
import TutorSidebar from '../../Components/TutorComponents/TutorSidebar';
import { useNavigate } from 'react-router-dom';
import { axiosApiTutor } from '../../../Services/axios';
import Cookies from 'js-cookie';

const CourseList = () => {
    const navigate = useNavigate();
    const [course, setCourse] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axiosApiTutor.get('/courselist');
                setCourse(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCourses();
    }, []);

    const deleteCourse = async (courseId) => {
        try {
            await axiosApiTutor.delete(`/deletecourse/${courseId}`);
            setCourse((prevCourses) => prevCourses.filter(course => course._id !== courseId));
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };


    return (
        <div>
            <TutorSidebar />
            <div className="pt-28 lg:w-[80] lg:ml-64 px-6 py-8">
                <div className="relative pt-2 lg:pt-2 min-h-screen">
                    <button
                        onClick={() => navigate('/tutor/addcourse')}
                        className="float-right mr-20 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                    >
                        <span className="relative px-10 py-3 transition-all ease-in duration-75 bg-white dark:bg-customBlue rounded-md group-hover:bg-opacity-0">
                            Add New Course
                        </span>
                    </button>
                    <div className="bg-cover w-full flex flex-wrap">
                        {course.length > 0 && course.map((courses) => (
                            <div key={courses._id} className="w-full md:w-3/12 lg:w-6/12 xl:w-6/12 p-2">
                                <div className="w-full bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-2xl">
                                    <article  className="bg-white p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl border">
                                        <div   onClick={() => navigate(`/tutor/coursedetails`, { state: { course: courses } })}

                                        className=" cursor-pointer relative mb-4 rounded-2xl">
                                            <img className="h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                                                src={courses.Image} alt="" />
                                            <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 text-red-700">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                </svg>
                                                <span className="ml-1 text-sm text-slate-400">2</span>
                                            </div>
                                            <div className="flex justify-center items-center bg-customGreen bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100">
                                                View More...
                                                <svg className="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center w-full pb-4 mb-auto">
                                            <div className="flex items-center">
                                                <div className="pr-3">
                                                    <img className="h-12 w-12 rounded-full object-cover" src="https://images.pexels.com/photos/163097/twitter-social-media-communication-internet-network-163097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                                                </div>
                                                <div className="flex flex-1">
                                                    <div>
                                                        <p className="text-sm font-semibold">Morris Muthigani</p>
                                                        <p className="text-sm text-gray-500">Published on 19/03/2024</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end">
                                                <div className="text-sm flex items-center text-gray-500">
                                                    2 Days ago
                                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="font-medium text-xl leading-8">
                                            <p className="block relative group-hover:text-red-700 transition-colors duration-200">
                                                {courses.Name}
                                            </p>
                                            <span>
                                                <button 
                                                    onClick={(event) => {
                                                        event.stopPropagation(); 
                                                        deleteCourse(courses._id);
                                                    }} 
                                                    type="button" 
                                                    className="float-end text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                                >
                                                    Delete
                                                </button>
                                            </span>
                                            <span>
                                                <button
                                                    onClick={() => navigate('/tutor/editcourse', { state: { course: courses } })}
                                                    type="button"
                                                    className="float-end text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                                >
                                                    Edit
                                                </button>
                                            </span>

                                            <p>{courses.Description}</p>
                                        </h3>
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

export default CourseList;
