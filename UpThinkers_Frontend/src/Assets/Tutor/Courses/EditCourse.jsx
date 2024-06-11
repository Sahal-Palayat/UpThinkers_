import React, { useEffect, useState } from 'react';
import TutorSidebar from '../../Components/TutorComponents/TutorSidebar';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosApiTutor } from '../../../Services/axios';
import Cookies from 'js-cookie';
import { uploadImages } from '../../../Services/uploadImages';

function EditCourse() {
    const navigate = useNavigate();
    const location = useLocation();
    const { course } = location.state || {};
    console.log(course);
    const [category, setCategory] = useState([])

    const [formState, setFormState] = useState({
        name: '',
        duration: '',
        description: '',
        category: '',
        price: '',
        image: ''
    });

    useEffect(() => {
        
        const fetchCategory = async () => {
            try {
                console.log('Fetching categories...');
                const { data } = await axiosApiTutor.get('/categorylist');
                console.log(data)
                setFormState({
                    name: course.Name,
                    duration: course.Duration,
                    description: course.Description,
                    // category: data.map((val)=>val.Name),
                    price: course.Price,
                    image: course.Image
                });
                setCategory(data.map((val) => val.Name))
                console.log(data, 'Categories fetched');
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        fetchCategory();
    }, [course]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosApiTutor.put(`/editcourse/${course._id}`, {
                name: formState.name,
                duration: formState.duration,
                description: formState.description,
                category: formState.category,
                price: formState.price,
                img: formState.image
            },
            );

            if (response.status === 200) {
                toast.success('Course Updated Successfully', {
                    autoClose: true,
                    onClose: () => {
                        navigate('/tutor/courselist');
                    }
                });
            } else {
                toast.error('Error updating course');
            }
        } catch (error) {
            console.error('Error updating course:', error);
            toast.error('Error updating course');
        }
    };

    const inputChange = (e) => {
        const { name, value } = e.target;
        // alert(name + ' ' + value);
        setFormState({ ...formState, [name]: value });
    };

    const handleFileChange = async (e) => {
        try {
            const uploadedImage = await uploadImages(e.target.files[0]); // Assuming uploadImages is an asynchronous function
            console.log(uploadedImage);
            setFormState({ ...formState, image: uploadedImage });
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <TutorSidebar />
            <ToastContainer position="top-center" autoClose={1500} />
            <div className="lg:w-[80%] lg:ml-64 px-6 py-8">
                <h1 className="p-8 text-customBlue text-3xl font-bold">Edit Course</h1>
               
                <div className="h-full bg-gray-400 dark:bg-white">
                    <div className="mx-auto">
                        <div className="flex justify-center py-10">
                            <div className="w-full xl:w-4/4 lg:w-3/3 flex">
                                <div className="w-full lg:w-7/12 bg-white dark:bg-gray-100 p-5 rounded-lg lg:rounded-l-none">
                                    <h3 className="py-4 text-2xl text-center text-gray-100 dark:text-black">Edit Course</h3>
                                    <form onSubmit={handleUpdate} className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-100 rounded">
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
                                                    value={formState.name}
                                                    onChange={inputChange}
                                                />
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
                                                    value={formState.duration}
                                                    onChange={inputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-black" htmlFor="description">
                                                Description
                                            </label>
                                            <input
                                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                id="description"
                                                type="text"
                                                name="description"
                                                placeholder="Description"
                                                value={formState.description}
                                                onChange={inputChange}
                                            />
                                        </div>
                                        <div className="mb-4 md:flex md:justify-between">
                                            <div className="mb-4 md:mr-2 md:mb-0">
                                                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-black" htmlFor="category">
                                                    Category
                                                </label>
                                                <select
                                                    className="w-[20rem] px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="category"
                                                    value={formState.category}
                                                    onChange={inputChange}
                                                    name="category"
                                                >
                                                    <option value="" disabled>Choose a category</option>
                                                    {category && category.map((cat, index) => (
                                                        <option key={index} value={cat}>{cat}</option>
                                                    ))}

                                                </select>
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
                                                    value={formState.price}
                                                    onChange={inputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="mx-auto max-w-xs">
                                            <label htmlFor="image" className="mb-1 block text-sm font-medium text-gray-700">Upload Image</label>
                                            <input
                                                id="image"
                                                type="file"
                                                name="image"
                                                onChange={handleFileChange}
                                                className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-customBlue file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                                            />
                                             <img src={formState.image} alt="" />
                                        </div>
                                        <br /><br />
                                        {/* <div>
                                            <h1>Add Lessons</h1>
                                        </div> */}
                                        <div className="mb-6 text-center">
                                            <button
                                                className="w-full px-4 py-2 font-bold text-white bg-customGreen rounded-full hover:bg-customGreen dark:bg-customGreen dark:text-white dark:hover:bg-customGreen focus:outline-none focus:shadow-outline"
                                                type="submit"
                                            >
                                                Update Course
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
    );
}

export default EditCourse;
