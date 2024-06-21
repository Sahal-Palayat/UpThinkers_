import React, { useRef, useState } from "react";
import TutorSidebar from "../../Components/TutorComponents/TutorSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadImages } from "../../../Services/uploadImages";
import { uploadVideo } from "../../../Services/uploadVideo";
import { axiosApiTutor } from "../../../Services/axios";
import { uploadPDF } from "../../../Services/uploadPdf";
import { ToastContainer, toast } from "react-toastify";







const AddLessons = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { course } = location.state || {};

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [documents, setDocuments] = useState([]);

    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [imageError, setImageError] = useState('');
    const [videoError, setVideoError] = useState('');
    const [documentsError, setDocumentsError] = useState('');


    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        switch (name) {
            case 'title':
                setTitle(value);
                setTitleError('');
                break;
            case 'content':
                setContent(value);
                setContentError('');
                break;
            case 'video':
                if (files && files.length > 0) {
                    setVideo(files[0]);
                    setVideoError('');
                }
                break;
            case 'documents':
                if (files && files.length > 0) {
                    setDocuments(files);
                    setDocumentsError('');
                }
                break;
            case 'image':
                if (files && files.length > 0) {
                    setImage(files[0]);
                    setImageError('');
                }
                break;
            default:
                break;
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let img = await uploadImages(image);
        let vdo = await uploadVideo(video);
        const pdf = [];
        for (let i = 0; i < documents.length; i++) {
            const Pdf = await uploadPDF(documents[i]);
            pdf.push(Pdf);
        }
        let id = course._id

        console.log(img, 'imageeeeeeee');
        console.log(vdo, 'videoooooooo');
        console.log(pdf, 'pdfffff');

        let hasError = false;

        if (!title.trim()) {
            setTitleError('Title is required');
            hasError = true;
        } else {
            setTitleError('');
        }
        if (!content.trim()) {
            setContentError('Content is required');
            hasError = true;
        } else {
            setContentError('');
        }

        if (!hasError) {
            try {
                const lessonData = { title, content, img, vdo, pdf };

                const response = await axiosApiTutor.post(`/addlesson/${id}`, lessonData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    toast.success('Course added successfully');
                    console.log('Course added successfully');
                    setTimeout(() => {
                        navigate('/tutor/courselist');
                    }, 2000);
                   
                } else if (response.status === 302) {
                    toast.error('Course adding error');
                    console.log('Course adding error');
                } else {
                    console.log('Unhandled status code:', response.status);
                }
            } catch (error) {
                console.error('Error adding course:', error);
            }
        }
    };




    return (
        <div>
            <TutorSidebar />
            <ToastContainer position="top-center" autoClose={1500} />
            <div className="lg:w-[80%] lg:ml-64 px-6 py-8">



                <form className="mt-20" id="login" onSubmit={handleSubmit}>
                    <div className="bg-white dark:bg-gray-800">
                        <div className="container mx-auto bg-white dark:bg-white rounded">
                            <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5 bg-white dark:bg-white">
                                <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                                    <p className="text-4xl text-customBlue dark:text-CustomBlue font-bold">Add Lessons</p>
                                    <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                                            <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="mx-auto">
                                <div className="xl:w-12/12 w-11/12 mx-auto xl:mx-0">
                                    <div className="rounded relative mt-8 h-48">
                                        <img src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form1.jpg" alt className="w-full h-full object-cover rounded absolute shadow" />
                                        <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded" />
                                        <div className="flex items-center px-3 py-2 rounded absolute right-0 mr-4 mt-4 cursor-pointer">
                                            <p className="text-xs text-black">Change Cover Photo</p>
                                            <div className="ml-2 text-black">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                                    <line x1={16} y1={5} x2={19} y2={8} />
                                                </svg>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="mt-16 flex flex-wrap">
                                        {/* Left column */}
                                        <div className="flex flex-col xl:w-1/2 lg:w-1/2 md:w-1/2 w-full px-4">
                                            <label htmlFor="lessonTitle" className="pb-2 text-sm font-bold text-gray-800 dark:text-black">
                                                Lesson Title
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={title}
                                                onChange={handleInputChange}

                                                className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400"
                                                placeholder=""
                                            />
                                            <div className="mt-8 flex flex-col">
                                                <label htmlFor="lessonDescription" className="pb-2 text-sm font-bold text-gray-800 dark:text-black">
                                                    Lesson Description
                                                </label>
                                                <textarea
                                                    id="content"
                                                    name="content"
                                                    value={content}
                                                    onChange={handleInputChange}
                                                    className="bg-transparent border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-500 dark:text-gray-400"
                                                    placeholder="Let the world know who you are"
                                                    rows={5}
                                                />
                                                <p className="w-full text-right text-xs pt-1 text-gray-500 dark:text-gray-400">
                                                    Character Limit: 200
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right column */}
                                        <div className="pl-14 flex flex-col xl:w-1/2 lg:w-1/2 md:w-1/2 w-full px-4">
                                            <div className=" grid grid-cols-1 space-y-2 mt-8 xl:mt-0 lg:mt-0 md:mt-0">
                                                <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Documents</label>
                                                <div className="mx-auto ml-0  max-w-xs">
                                                    <label htmlFor="documents" className="mb-1 block text-sm font-medium text-gray-700">Upload Pdf</label>
                                                    <input
                                                        id="documents"
                                                        type="file"
                                                        name="documents"
                                                        accept="application/pdf"
                                                        onChange={handleInputChange}
                                                        className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-customBlue file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60 border"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 space-y-2 mt-8">
                                                <div className="grid grid-cols-1 space-y-2 mt-8">
                                                    <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Videos</label>
                                                    <div className="mx-auto ml-0 max-w-xs">
                                                        <label htmlFor="video" className="mb-1 block text-sm font-medium text-gray-700">Upload Video</label>
                                                        <input
                                                            id="video"
                                                            type="file"
                                                            name="video"
                                                            accept="video/*"
                                                            onChange={handleInputChange}
                                                            className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-customBlue file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 space-y-2 mt-10 xl:mt-0 lg:mt-0 md:mt-0">
                                                    <label className="text-sm font-bold text-gray-500 tracking-wide mt-8">Attach Thumbnail Image</label>
                                                    <div className="mx-auto ml-0 max-w-xs">
                                                        <label htmlFor="image" className="mb-1 block text-sm font-medium text-gray-700">Upload Thumbnail Image</label>
                                                        <input
                                                            id="image"
                                                            type="file"
                                                            name="image"
                                                            onChange={handleInputChange}
                                                            className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-customBlue file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60 border"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-6 text-center">
                                                    <button
                                                        className="w-full px-4 py-2 font-bold text-white bg-customGreen rounded-full hover:bg-customGreen dark:bg-customGreen dark:text-white dark:hover:bg-customGreen focus:outline-none focus:shadow-outline"
                                                        type="submit"
                                                    >
                                                        Add Lesson
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        {/* <div className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
                    <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
                        <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                            <p className="text-lg text-gray-800 dark:text-black font-bold">Personal Information</p>
                            <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                                    <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto pt-4">
                        <div className="container mx-auto">
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="FirstName" className="pb-2 text-sm font-bold text-gray-800 dark:text-black">
                                    First Name
                                </label>
                                <input type="text" id="FirstName" name="firstName" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder />
                            </div>
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-black">
                                    Last Name
                                </label>
                                <input type="text" id="LastName" name="lastName" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder />
                            </div>
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="Email" className="pb-2 text-sm font-bold text-gray-800 dark:text-black">
                                    Email
                                </label>
                                <div className="border border-green-400 shadow-sm rounded flex">
                                    <div className="px-4 py-3 dark:text-black flex items-center border-r border-green-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <rect x={3} y={5} width={18} height={14} rx={2} />
                                            <polyline points="3 7 12 13 21 7" />
                                        </svg>
                                    </div>
                                    <input type="text" id="Email" name="email" required className="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-500 dark:text-gray-400" placeholder="example@gmail.com" />
                                </div>
                                <div className="flex justify-between items-center pt-1 text-green-400">
                                    <p className="text-xs">Email submission success!</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                                        <path
                                            className="heroicon-ui"
                                            d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0
                              0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
                                            stroke="currentColor"
                                            strokeWidth="0.25"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="StreetAddress" className="pb-2 text-sm font-bold text-gray-800 dark:text-black">
                                    Street Address
                                </label>
                                <input type="text" id="StreetAddress" name="streetAddress" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder />
                            </div>
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="City" className="pb-2 text-sm font-bold text-gray-800 dark:text-black">
                                    City
                                </label>
                                <div className="border border-gray-300 dark:border-gray-700 shadow-sm rounded flex">
                                    <input type="text" id="City" name="city" required className="pl-3 py-3 w-full text-sm focus:outline-none border border-transparent focus:border-indigo-700 bg-transparent rounded placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="Los Angeles" />
                                    <div className="px-4 flex items-center border-l border-gray-300 dark:border-gray-700 flex-col justify-center text-gray-500 dark:text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <polyline points="6 15 12 9 18 15" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="State/Province" className="pb-2 text-sm font-bold text-gray-800 dark:text-black">
                                    State/Province
                                </label>
                                <input type="text" id="State/Province" name="state" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="California" />
                            </div>
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="Country" className="pb-2 text-sm font-bold text-gray-800 dark:text-black">
                                    Country
                                </label>
                                <input type="text" id="Country" name="country" required className="border bg-transparent border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="United States" />
                            </div>
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <div className="flex items-center pb-2">
                                    <label htmlFor="ZIP" className="text-sm font-bold text-gray-800 dark:text-black">
                                        ZIP/Postal Code
                                    </label>
                                    <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                                            <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                                        </svg>
                                    </div>
                                </div>
                                <input type="text" name="zip" required id="ZIP" className="bg-transparent border border-red-400 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder={86745} />
                                <div className="flex justify-between items-center pt-1 text-red-400">
                                    <p className="text-xs">Incorrect Zip Code</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle">
                                        <circle cx={12} cy={12} r={10} />
                                        <line x1={15} y1={9} x2={9} y2={15} />
                                        <line x1={9} y1={9} x2={15} y2={15} />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto mt-10 rounded bg-gray-100 dark:bg-gray-700 w-11/12 xl:w-full">
                    <div className="xl:w-full py-5 px-8">
                        <div className="flex items-center mx-auto">
                            <div className="container mx-auto">
                                <div className="mx-auto xl:w-full">
                                    <p className="text-lg text-gray-800 dark:text-black font-bold">Alerts</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 pt-1">Get updates of any new activity or features. Turn on/off your preferences</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto pb-6">
                        <div className="flex items-center pb-4 border-b border-gray-300 dark:border-gray-700 px-8 text-gray-800 dark:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <rect x={3} y={5} width={18} height={14} rx={2} />
                                <polyline points="3 7 12 13 21 7" />
                            </svg>
                            <p className="text-sm font-bold ml-2 text-gray-800 dark:text-black">Via Email</p>
                        </div>
                        <div className="px-8">
                            <div className="flex justify-between items-center mb-8 mt-4">
                                <div className="w-9/12">
                                    <p className="text-sm text-gray-800 dark:text-black pb-1">Comments</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a post or comment is made</p>
                                </div>
                                <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                                    <input type="checkbox" name="email_comments" id="toggle1" className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                                    <label htmlFor="toggle1" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-8">
                                <div className="w-9/12">
                                    <p className="text-sm text-gray-800 dark:text-black pb-1">Job Applications</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a candidate applies to a job posting</p>
                                </div>
                                <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                                    <input type="checkbox" name="email_job_application" id="toggle2" className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                                    <label htmlFor="toggle2" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-8">
                                <div className="w-9/12">
                                    <p className="text-sm text-gray-800 dark:text-black pb-1">Product Updates</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notifitied when there is a new product feature or upgrades</p>
                                </div>
                                <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                                    <input type="checkbox" name="email_product_update" id="toggle3" className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                                    <label htmlFor="toggle3" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                        <div className="pb-4 border-b border-gray-300 dark:border-gray-700 px-8">
                            <div className="flex items-center text-gray-800 dark:text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                    <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                                </svg>
                                <p className="text-sm font-bold ml-2 text-gray-800 dark:text-black">Push Notifications</p>
                            </div>
                        </div>
                        <div className="px-8">
                            <div className="flex justify-between items-center mb-8 mt-4">
                                <div className="w-9/12">
                                    <p className="text-sm text-gray-800 dark:text-black pb-1">Comments</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a post or comment is made</p>
                                </div>
                                <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                                    <input type="checkbox" name="notification_comment" id="toggle4" className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                                    <label htmlFor="toggle4" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-8">
                                <div className="w-9/12">
                                    <p className="text-sm text-gray-800 dark:text-black pb-1">Job Applications</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a candidate applies to a job posting</p>
                                </div>
                                <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                                    <input type="checkbox" name="notification_application" id="toggle5" className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                                    <label htmlFor="toggle5" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-8">
                                <div className="w-9/12">
                                    <p className="text-sm text-gray-800 dark:text-black pb-1">Product Updates</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notifitied when there is a new product feature or upgrades</p>
                                </div>
                                <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                                    <input type="checkbox" name="notification_updates" id="toggle6" className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto" />
                                    <label htmlFor="toggle6" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto w-11/12 xl:w-full">
                    <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-end">
                        <button className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4">Cancel</button>
                        <button className="bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm" type="submit">
                            Save
                        </button>
                    </div>
                </div> */}
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddLessons;
