
// export default AddCourse

import React, { useEffect, useState } from 'react';
import TutorSidebar from '../../Components/TutorComponents/TutorSidebar';
import { axiosApiTutor } from '../../../Services/axios';
import { config } from '../../../config';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { uploadImages } from '../../../Services/uploadImages';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddCourse = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');


    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [offerPriceError, setOfferPriceError] = useState('');
    const [durationError, setDurationError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [imageError, setImageError] = useState('');

    const { tutor } = useSelector((state) => state.tutor)

    console.log(tutor._id,'llllllllllllllllllllllllllllllllllllll');


    const navigate = useNavigate()

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                console.log('Fetching categories...');
                const { data } = await axiosApiTutor.get('/categorylist');
                setCategory({ Name: data });
                console.log(data, 'Categories fetched');
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        fetchCategory();
    }, []);
    console.log(category, 'asasasasasas');

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        switch (name) {
            case 'description':
                setDescription(value);
                setDescriptionError('');
                break;
            case 'name':
                setName(value);
                setNameError('');
                break;
            case 'price':
                setPrice(value);
                setPriceError('');
                break;
            case 'duration':
                setDuration(value);
                setDurationError('');
                break;
            case 'category':
                setSelectedCategory(value);
                setCategoryError('');
                break;
            case 'image':
                if (files && files.length > 0) {
                    setImage(files[0]);
                    setImageError('');
                }
                break;
            case 'offerPrice':
                setOfferPrice(value);
                setOfferPriceError('');
                break;
            default:
                break;
        }
    }
    console.log(image);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let img = await uploadImages(image);
        console.log(img);
        const tutorId= tutor._id

        let hasError = false;

        if (!name.trim()) {
            setNameError('Name is required');
            hasError = true;
        } else {
            setNameError('');
        }
        if (!description.trim()) {
            setDescriptionError('Description is required');
            hasError = true;
        } else {
            setDescriptionError('');
        }
        if (!price.trim()) {
            setPriceError('Price is required');
            hasError = true;
        } else {
            setPriceError('');
        }
        if (!duration.trim()) {
            setDurationError('Duration is required');
            hasError = true;
        } else {
            setDurationError('');
        }

        if (!hasError) {
            try {
                const courseData = { name, description, price, duration, selectedCategory, img,tutorId };

                const response = await axiosApiTutor.post(`/addcourse`, courseData, {
                    headers: {
                       
                        'Content-Type': 'application/json'
                    },
                });

                if (response.status === 200) {
                    toast.success('Course added successfully');
                    console.log('Course added successfully');
                    setTimeout(() => {
                        navigate('/tutor/courselist')
                    }, 1500)
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
    }

    return (
        <div>
            <TutorSidebar />
            <ToastContainer position="top-center" autoClose={1500} />
            <div className="lg:w-[80%] lg:ml-64 px-6 py-8">
                <h1 className="p-8 text-customBlue text-3xl font-bold">Add New Course..</h1>
                <div className="h-full bg-gray-400 dark:bg-white">
                    <div className="mx-auto">
                        <div className="flex justify-center  py-10">
                            <div className="w-full xl:w-4/4 lg:w-3/3 flex">
                                <div className="w-full lg:w-7/12 bg-white dark:bg-gray-100 p-5 rounded-lg lg:rounded-l-none">
                                    <h3 className="py-4 text-2xl text-center text-gray-100 dark:text-black">Add a New Course</h3>
                                    <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-100 rounded">
                                        <div className="mb-4 md:flex md:justify-between">
                                            <div className="mb-4 md:mr-2 md:mb-0">
                                                <label className="block mb-2 text-sm font-bold text-black dark:text-black" htmlFor="name">
                                                    Course Name
                                                </label>
                                                <input
                                                    className="w-[20rem] px-3 py-2 text-sm leading-tight text-black dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    placeholder="Course Name"
                                                    value={name}
                                                    onChange={handleInputChange}
                                                />
                                                {nameError && <p className="text-xs text-red-500">{nameError}</p>}
                                            </div>
                                            <div className="md:ml-2">
                                                <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-black" htmlFor="duration">
                                                    Duration
                                                </label>
                                                <input
                                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="duration"
                                                    type="text"
                                                    name="duration"
                                                    placeholder="Duration"
                                                    value={duration}
                                                    onChange={handleInputChange}
                                                />
                                                {durationError && <p className="text-xs text-red-500">{durationError}</p>}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-black" htmlFor="description">
                                                Description
                                            </label>
                                            <textarea
                                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                id="description"
                                                name="description"
                                                placeholder="Description"
                                                value={description}
                                                onChange={handleInputChange}
                                            />
                                            {descriptionError && <p className="text-xs text-red-500">{descriptionError}</p>}
                                        </div>
                                        <div className="mb-4 md:flex md:justify-between">
                                            <div className="mb-4 md:mr-2 md:mb-0">
                                                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-black" htmlFor="category">
                                                    Category
                                                </label>
                                                <select
                                                    className="w-[20rem] px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="category"
                                                    value={selectedCategory}
                                                    onChange={handleInputChange}
                                                    name="category"
                                                >
                                                    <option value="" disabled>Choose a category</option>
                                                    {category.Name && category.Name.map((cat, index) => (
                                                        <option key={index} value={cat.Name}>{cat.Name}</option>
                                                    ))}
                                                </select>
                                                {categoryError && <p className="text-xs text-red-500">{categoryError}</p>}
                                            </div>
                                            <div className="md:ml-2">
                                                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-black" htmlFor="price">
                                                    Price
                                                </label>
                                                <input
                                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="price"
                                                    type="text"
                                                    name="price"
                                                    placeholder="Price"
                                                    value={price}
                                                    onChange={handleInputChange}
                                                />
                                                {priceError && <p className="text-xs text-red-500">{priceError}</p>}
                                            </div>
                                        </div>
                                        <div className="mx-auto max-w-xs">
                                            <label htmlFor="image" className="mb-1 block text-sm font-medium text-gray-700">Upload Image</label>
                                            <input
                                                id="image"
                                                type="file"
                                                name="image"
                                                onChange={handleInputChange}
                                                className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-customBlue file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                                            />
                                            {imageError && <p className="text-xs text-red-500">{imageError}</p>}
                                        </div>
                                        <br /><br />
                                        <div className="mb-6 text-center">
                                            <button
                                                className="w-full px-4 py-2 font-bold text-white bg-customGreen rounded-full hover:bg-customGreen dark:bg-customGreen dark:text-white dark:hover:bg-customGreen focus:outline-none focus:shadow-outline"
                                                type="submit"
                                            >
                                                Add Course
                                            </button>
                                        </div>
                                        <hr className="mb-6 border-t" />
                                    </form>
                                </div>
                                <div
                                    className="w-full h-auto bg-gray-400 dark:bg-gray-200 hidden lg:block lg:w-4/12 bg-cover rounded-l-lg"
                                    style={{ backgroundImage: 'url(https://elearningindustry.com/wp-content/uploads/2015/10/6-convincing-reasons-take-elearning-course.jpg)' }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCourse;

