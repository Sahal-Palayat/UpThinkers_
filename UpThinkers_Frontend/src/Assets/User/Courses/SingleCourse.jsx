import React, { useEffect, useState } from "react";
import TutorSidebar from "../../Components/TutorComponents/TutorSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosApiTutor } from "../../../Services/axios";
import Navbar from "../../Components/UserComponents/Navbar";

const SingleCourse = () => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { course } = location.state || {};
    console.log(course);



    return (
        <div>
            <Navbar />
            <div className="pt-10">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-customBlue mb-3 text-center">Course Details...</h1>
                <div className="bg-gray-100 dark:bg-white py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row -mx-4">
                            <div className="md:w-1/2 px-4">
                                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                    <img className="w-full h-full object-cover" src={course.Image} alt="Product Image" />
                                </div>
                            </div>
                            <div className="md:w-1/2 px-4">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-black mb-2">{course.Name}</h2>
                                <p className="text-gray-600 dark:text-black text-sm mb-4">{course.Description}</p>
                                <div className="flex mb-4">
                                    <div className="mr-4">
                                        <span className="font-bold text-gray-700 dark:text-black">Price: </span>
                                        <span className="text-gray-600 dark:text-black">${course.Price}</span>
                                    </div>
                                    <div>
                                        <span className="font-bold text-gray-700 dark:text-black">Offer Price:</span>
                                        <span className="text-gray-600 dark:text-black">{course.OfferPrice}</span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold text-gray-700 dark:text-black">Course Duration:</span>
                                    <span className="text-gray-600 dark:text-black">{course.Duration}</span>
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold text-gray-700 dark:text-black">Category:</span>
                                    <span className="text-gray-600 dark:text-black">{course.Category}</span>
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold text-gray-700 dark:text-black">Rating :</span>
                                    <span className="text-gray-600 dark:text-black">{course.Rating}</span>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700 dark:text-black">Product Description:</span>
                                    <p className="text-gray-600 dark:text-black text-sm mt-2">
                                        This Description dolor sit amet, consectetur adipiscing elit. Sed sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                                    </p>
                                </div>
                                <div className="flex justify-center mt-8">
                                    <button className="bg-green-500 text-black font-bold py-2 px-4 w-40 md:w-60 lg:w-80 rounded-full hover:bg-green-700 transition duration-300">
                                        Buy Now
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default SingleCourse;
