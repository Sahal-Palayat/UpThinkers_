// LessonDetails.js
import React from 'react';
import { useNavigate } from 'react-router-dom';





const LessonDetails = ({ lesson }) => {

    const navigate= useNavigate()

    return (


        <div key={lesson._id} className="flex flex-col">
            <div className="relative">
                <img onClick={() => navigate('/videotag', { state:  lesson })} src={lesson.Image} alt={lesson.Title} className="w-full h-48 object-cover" />


                <div className="bg-customBlue absolute bottom-0 left-0 p-2 bg-opacity-75">
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
    )
}

export default LessonDetails;
