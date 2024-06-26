import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/UserComponents/Navbar'
import { axiosApiUser } from '../../../Services/axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/UserComponents/Footer';

function CoursePage() {


    const navigate = useNavigate()

    const [course, setCourse] = useState([])
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axiosApiUser.get('/courselist');
                setCourse(data.course);
                console.log(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCourses();
    }, []);
    console.log(course);
    return (
        <div>
            <Navbar />

            <div
                style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/modern-soft-green-watercolor-texture-background_1055-17888.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
                className="h-40 w-full mt-7 flex items-center justify-center"
            >
                <h1 className="text-5xl font-bold text-black">Courses</h1>
            </div>


           
            <section id="Projects"
                class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                {course.length > 0 && course.map((course, index) => (


                    <div key={index}>

                        <div onClick={() => navigate('/coursedetails', { state: { course: course } })} class="w-72 cursor-pointer bg-white shadow-md  duration-500 hover:scale-105 hover:shadow-xl">
                            <p >
                                <img src={course.Image}
                                    alt="Product" class="h-60 w-72 object-cover " />
                                <div class="px-4 py-3 w-72">
                                    <span class="text-gray-400 mr-3 uppercase text-xs">{course.Category}</span>
                                    <p class="text-lg font-bold text-black truncate block capitalize">{course.Name}</p>
                                    <div class="flex items-center">
                                        <p class="text-lg font-semibold text-black cursor-auto my-3">${course.Price}</p>
                                        <del>
                                            <p class="text-sm text-gray-600 cursor-auto ml-2">${course.OfferPrice}</p>
                                        </del>
                                        <div class="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                            <path
                                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                        </svg></div>
                                    </div>
                                </div>
                            </p>
                        </div>



                    </div>
                ))}
            </section>



            <Footer />
        </div>
    )

}



export default CoursePage







// import React, { useState } from 'react';

// const categories = [
//   { name: 'IT and Software' },
//   { name: 'Finance & Accounting' },
//   { name: 'Data Science' },
//   { name: 'System Analyst' },
//   { name: 'Personal Dev' },
//   { name: 'Health & Fitness' },
//   { name: 'Design & Illustration' },
//   { name: 'Photo & Video' },
//   { name: 'Teach & Academics' }
// ];

// const courses = [
//   {
//     image: 'https://source.unsplash.com/random/200x200?sig=1',
//     title: 'IT Troubleshooting Skill Training',
//     tutor: 'Noel Temena',
//     popularity: 'Most Popular',
//     students: 1934,
//     duration: '2h 45m'
//   },
//   {
//     image: 'https://source.unsplash.com/random/200x200?sig=2',
//     title: 'Information Technology Essentials',
//     tutor: 'Destin Learning',
//     popularity: 'Most Popular',
//     students: 1881,
//     duration: '1h 44m'
//   },
//   {
//     image: 'https://source.unsplash.com/random/200x200?sig=3',
//     title: 'Computer Forensics Fundamentals',
//     tutor: 'John Boyle',
//     students: 186,
//     duration: '3h 49m'
//   },
//   {
//     image: 'https://source.unsplash.com/random/200x200?sig=4',
//     title: 'Linux Command Line Basics',
//     tutor: 'Abdullah Tarek and Ahmed',
//     popularity: 'Most Popular',
//     students: 300,
//     duration: '2h 40m'
//   }
// ];

// const Courses = () => {
//   const [selectedCategory, setSelectedCategory] = useState('IT and Software');
//   const [selectedFilter, setSelectedFilter] = useState('Most Popular');

//   return (
//     <div className="p-6">
//   <div className="text-sm text-gray-500">
//     <span>Home</span> / <span>Courses</span>
//   </div>
//   <h1 className="text-3xl font-semibold my-4">
//     Find Courses <span className="text-orange-500">"127 results"</span>
//   </h1>
//   <div className="flex flex-wrap gap-2 mb-4">
//     {categories.map(category => (
//       <button
//         key={category.name}
//         className={`px-4 py-2 border rounded ${selectedCategory === category.name ? 'border-orange-500 bg-gray-100' : 'border-gray-300'}`}
//         onClick={() => setSelectedCategory(category.name)}
//       >
//         {category.name}
//       </button>
//     ))}
//   </div>
//   <div className="flex justify-between items-center mb-4">
//     <button className="px-4 py-2 border border-gray-300 rounded">Filter</button>
//     <div className="flex items-center">
//       <span className="mr-2">Sort by</span>
//       <select
//         value={selectedFilter}
//         onChange={(e) => setSelectedFilter(e.target.value)}
//         className="border border-gray-300 rounded px-2 py-1"
//       >
//         <option value="Recommended">Recommended</option>
//         <option value="Most Popular">Most Popular</option>
//         <option value="New">New</option>
//         <option value="Best Seller">Best Seller</option>
//       </select>
//     </div>
//   </div>
//       <div className="flex gap-2 mb-4">
//         <button className={`px-4 py-2 ${selectedFilter === 'Most Popular' ? 'border-b-2 border-orange-500' : ''}`} onClick={() => setSelectedFilter('Most Popular')}>Most Popular</button>
//         <button className={`px-4 py-2 ${selectedFilter === 'New' ? 'border-b-2 border-orange-500' : ''}`} onClick={() => setSelectedFilter('New')}>New</button>
//         <button className={`px-4 py-2 ${selectedFilter === 'Best Seller' ? 'border-b-2 border-orange-500' : ''}`} onClick={() => setSelectedFilter('Best Seller')}>Best Seller</button>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {courses.map(course => (
//           <div key={course.title} className="border border-gray-300 rounded overflow-hidden bg-white">
//             <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <p className="text-sm text-gray-500">{course.students} students</p>
//               <h2 className="text-lg font-semibold my-2">{course.title}</h2>
//               <p className="text-sm text-gray-500">{course.tutor} <span className="text-orange-500">{course.popularity}</span></p>
//               <p className="text-sm text-gray-500">{course.duration}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Courses;
