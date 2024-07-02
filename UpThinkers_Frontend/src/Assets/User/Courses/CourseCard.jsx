import React, { useEffect, useState } from 'react'
import { axiosApiUser } from '../../../Services/axios';


function CourseCard() {
    const [course, setCourse] = useState([])

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axiosApiUser.get('/courselist');
                setCourse(data.course);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCourses();
    }, []);
    return (
        <>
            <section className="homeAbout">

                <div className="relative pt-2 lg:pt-2 min-h-screen">
                    <h1 className="text-4xl font-bold text-customBlue pb-8 ml-20 mt-10">Best Popular Courses</h1>
                    <button
                        className=" float-right mr-10 flex select-none items-end gap-2 rounded-lg py-2 px-4 text-center align-middle font-sans text-s font-bold uppercase text-customBlue transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        data-ripple-dark="true"
                    >
                        Learn More
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            ></path>
                        </svg>
                    </button>
                    <div className="bg-cover w-full flex flex-wrap">
                        {course.length > 0 && course.map((courses) => (
                            <div key={courses._id} className="w-full md:w-3/12 lg:w-3/12 xl:w-3/12 p-2">
                                <div className="w-full ml-10 bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg ">
                                    <article className=" bg-white p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl  border">
                                        <div onClick={() => navigate(`/user/coursedetails`, { state: { course: courses } })}

                                            className=" cursor-pointer relative mb-4 rounded-2xl">
                                            <img className="h-60  w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
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


                                            <p>{courses.Description}</p>
                                        </h3>
                                    </article>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default CourseCard
