import React, { useEffect, useState } from "react";
import TutorSidebar from "../../Components/TutorComponents/TutorSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosApiTutor } from "../../../Services/axios";

const CourseDetails = () => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [lessons, setLessons] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const { course } = location.state || {};
    // console.log(course);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                console.log('Fetching lessons...');
                const { data } = await axiosApiTutor.get(`/getlessons/${course._id}`);
                setLessons(data.lessons);
                console.log(data.lessons, 'lessons fetched');
            } catch (error) {
                console.error('Error fetching lessons:', error);
            }
        }
        fetchLessons();
    }, []);

    console.log(lessons, 'lesooosn');
    return (
        <div>
            <TutorSidebar />
            <div className="pt-28 lg:w-[80] lg:ml-64  py-6">
                <h1 class="text-4xl font-bold text-gray-800 dark:text-customBlue mb-3 ml-6">Course Details...</h1>
                <div class="bg-gray-100 dark:bg-white py-8">
                    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex flex-col md:flex-row -mx-4">
                            <div class="md:flex-1 px-4">
                                <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                    <img class="w-full h-full object-cover" src={course.Image} alt="Product Image" />
                                </div>

                            </div>
                            <div class="md:flex-1 px-4">
                                <h2 class="text-2xl font-bold text-gray-800 dark:text-black mb-2">{course.Name}</h2>
                                <p class="text-gray-600 dark:text-black text-sm mb-4">
                                    {course.Description}
                                </p>
                                <div class="flex mb-4">
                                    <div class="mr-4">
                                        <span class="font-bold text-gray-700 dark:text-black">Price: </span>
                                        <span class="text-gray-600 dark:text-black">${course.Price}</span>
                                    </div>
                                    <div>
                                        <span class="font-bold text-gray-700 dark:text-black">OfferPrice:</span>
                                        <span class="text-gray-600 dark:text-black">{course.OfferPrice}</span>
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <span class="font-bold text-gray-700 dark:text-black">Course Duration:</span>
                                    <span class="text-gray-600 dark:text-black">{course.Duration}</span>
                                </div>
                                <div class="mb-4">
                                    <span class="font-bold text-gray-700 dark:text-black">Category:</span>
                                    <span class="text-gray-600 dark:text-black">{course.Category}</span>

                                </div>
                                <div>

                                    <span class="font-bold text-gray-700 dark:text-black">Rating :</span>
                                    <span class="text-gray-600 dark:text-black">{course.Duration}</span>
                                </div>
                                <div>
                                    <span class="font-bold text-gray-700 dark:text-black">Product Description:</span>
                                    <p class="text-gray-600 dark:text-black text-sm mt-2">
                                        This Description dolor sit amet, consectetur adipiscing elit. Sed
                                        sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                                        lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                                        ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                                        sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                                    </p>
                                </div>

                            </div>

                        </div>
                        <div class="flex -mx-2 mb-4">
                            <div class="w-1/2 px-2">
                                <button class="w-full bg-gray-900 dark:bg-customGreen text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                                    Edit Course</button>
                            </div>
                            <div class="w-1/2 px-2">
                                <button
                                    onClick={() => navigate('/tutor/coursedetails/addlessons', { state: { course: course } })}
                                    class="w-full bg-gray-200 dark:bg-customGreen text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-customGreen">
                                    Add Lessons</button>
                            </div>
                        </div>
                    </div>

                </div>




                <div className="2xl:mx-auto 2xl:container 2xl:px-20 xl:px-12 sm:px-6 px-4 py-16">
                    <h1 className="lg:text-4xl text-3xl font-semibold leading-9 text-gray-800">Lesson Details...</h1>
                    <p className="md:w-1/2 text-base leading-normal mt-4 sm:pr-10 text-gray-600">
                        If you're looking for lesson details, you've scroll page.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {lessons.map((lesson, index) => (
                            <div key={index} className="flex flex-col">
                                <div className="relative">
                                  <a href={lesson.Video}> <img src={lesson.Image} alt={lesson.Title} className="w-full h-48 object-cover" /></a> 
                                    <div className="bg-customBlue   absolute bottom-0 left-0 p-2 bg-opacity-75">
                                        <p className="text-sm leading-4 text-white">{lesson.Title}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex-1">
                                    <h1 className="text-xl font-semibold leading-7 text-gray-800">{lesson.Content}</h1>
                                    <p className="text-sm leading-normal mt-2 text-gray-600">
                                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                    </p>
                                </div>
                                <div className="flex justify-between w-full mt-4">
                                    <button className="flex items-center justify-center w-1/2 bg-customBlue p-2 hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 mr-2">
                                        <p className="text-sm font-medium leading-4 text-white">Watch Video</p>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                                            <path d="M3.33203 8H12.6654" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10 10.6667L12.6667 8" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10 5.33344L12.6667 8.0001" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <button className="flex items-center justify-center w-1/2 bg-customBlue p-2 hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
                                     <p className="text-sm font-medium leading-4 text-white">Watch Document</p>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                                            <path d="M3.33203 8H12.6654" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10 10.6667L12.6667 8" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10 5.33344L12.6667 8.0001" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>



            </div>
        </div>

    );
};

export default CourseDetails;
