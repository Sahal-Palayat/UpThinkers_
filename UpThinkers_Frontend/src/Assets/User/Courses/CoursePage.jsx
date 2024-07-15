import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/UserComponents/Navbar';
import { axiosApiUser } from '../../../Services/axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/UserComponents/Footer';

function CoursePage() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axiosApiUser.get('/courselist');
                setCourses(data.course);
                setFilteredCourses(data.course);
                setInitialLoad(false);
            } catch (error) {
                console.error('Error fetching courses', error);
            }
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        if (!initialLoad) {
            filterCourses(query, selectedCategory);
        }
    }, [query, selectedCategory, courses, initialLoad]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
    };

    const filterCourses = (searchQuery, category) => {
        let filtered = courses;

        if (searchQuery) {
            filtered = filtered.filter((course) =>
                course.Name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (category) {
            filtered = filtered.filter((course) =>
                course.Category === category
            );
        }

        setFilteredCourses(filtered);
    };

    const uniqueCategories = [...new Set(courses.map((course) => course.Category))];

    // Determine if "No courses available" should be displayed
    const showNoCoursesMessage = !initialLoad && filteredCourses.length === 0;

    return (
        <div>
            <Navbar />

            <div
                style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/modern-soft-green-watercolor-texture-background_1055-17888.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
                className="h-40 w-full mt-7 flex items-center justify-center"
            >
                <h1 className="text-5xl font-bold text-black">Courses</h1>
            </div>

            <div>
                <div className="flex justify-start items-start w-full mt-5 space-x-4">
                    <div className="relative w-40 ml-10">
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="">All Categories</option>
                            {uniqueCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="relative w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-4.35-4.35M8.5 15a6.5 6.5 0 100-13 6.5 6.5 0 000 13z"
                                ></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            placeholder="Type a command or search"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                </div>

                <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                    {showNoCoursesMessage ? (
                        <div className="text-center text-gray-500">No courses available</div>
                    ) : (
                        filteredCourses.map((course, index) => (
                            <div key={index}>
                                <div onClick={() => navigate('/coursedetails', { state: { course: course } })} className="w-72 cursor-pointer bg-white shadow-md duration-500 hover:scale-105 hover:shadow-xl">
                                    <img src={course.Image} alt="Product" className="h-60 w-72 object-cover" />
                                    <div className="px-4 py-3 w-72">
                                        <span className="text-gray-400 mr-3 uppercase text-xs">{course.Category}</span>
                                        <p className="text-lg font-bold text-black truncate block capitalize">{course.Name}</p>
                                        <div className="flex items-center">
                                            <p className="text-lg font-semibold text-black cursor-auto my-3">${course.Price}</p>
                                            <del>
                                                <p className="text-sm text-gray-600 cursor-auto ml-2">${course.OfferPrice}</p>
                                            </del>
                                            <div className="ml-auto">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </section>
            </div>

            <Footer />
        </div>
    );
}

export default CoursePage;
