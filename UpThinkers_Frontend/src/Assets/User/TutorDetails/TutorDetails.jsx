import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/UserComponents/Navbar'
import { useLocation } from 'react-router-dom'
import { axiosApiUser } from '../../../Services/axios'

function TutorDetails() {

    const [courses, setCourses] = useState([])
    const location = useLocation()
    const { tutor } = location.state || {}


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                axiosApiUser.get(`/tutorcourses/${tutor._id}`).then(({ data }) => {
                    console.log(data, 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
                    setCourses(data.tutorCourse)
                })
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchCourses();
    }, [])
    console.log(courses, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    return (
        <div>
            <Navbar />
            <div className="flex mt-8 ml-16  max-w-8xl mx-auto">
                <div className="w-full lg:w-8/12 bg-white shadow-md rounded-lg overflow-hidden mr-6">
                    <div className="p-4">
                        <div className="flex items-center">
                            <img
                                src="https://assets.setmore.com/website/v2/images/industry-pages/online-tutoring/smiling-lady-books.png"
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover"
                            />
                            <div className="ml-6">
                                <h2 className="text-2xl font-bold">{tutor.Name}</h2>
                                <p><strong>Email:</strong> {tutor.Email}</p>
                                <p><strong>Mobile:</strong> {tutor.Mobile}</p>
                                <p><strong>Courses:</strong> Yes </p>
                                <p><strong>Position:</strong> Expert in 2 Years</p>
                            </div>
                        </div>

                    </div>
                    <div className="p-4">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar consectetur
                            tristique. Vivamus sed sem mauris. Integer molestie lacus ipsum, ut dignissim massa
                            luctus in. Curabitur ac lacinia metus. Aliquam erat volutpat. Orci varius natoque penatibus
                            et magnis dis parturient montes, nascetur ridiculus mus. Quisque ligula nisl, porta non
                            auctor nec, eleifend ut leo. Nunc luctus odio at mollis vehicula.
                        </p>
                        <p className="mt-4">
                            Duis gravida odio augue, nec venenatis nisl commodo quis. Vestibulum ante ipsum primis
                            in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi convallis egestas leo.
                            Pellentesque a aliquam nulla. Curabitur egestas sapien libero, id auctor tellus lacinia in.
                        </p>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-3xl font-semibold mb-4">Courses</h3>
                        {courses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {courses.map((course) => (
                                    <div key={course._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                        <img src={course.Image} alt={course.Name} className="w-full h-32 object-cover" />
                                        <div className="p-4">
                                            <h4 className="text-lg font-semibold">{course.Name}</h4>
                                            <p className="mt-2">{course.Description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-lg text-gray-500">Courses not available</p>
                        )}
                    </div>


                </div>
                <div className="w-full lg:w-5/12 bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        <img
                            src="https://media.istockphoto.com/id/534037992/photo/classmates-drawing-together.jpg?s=612x612&w=0&k=20&c=_S0vLWLK5JTV5n0rgt_9F6xbZTGgHql9avztiBYdpi8="
                            alt="Right Section Image 1"
                            className="w-full h-full object-cover"
                        />
                        <img
                            src="https://www.shutterstock.com/image-photo/female-teacher-helps-school-kids-600nw-1918252379.jpg"
                            alt="Right Section Image 2"
                            className="w-full h-full object-cover"
                        />
                        <img
                            src="https://www.shutterstock.com/image-photo/female-teacher-helps-school-kids-600nw-1918252379.jpg"
                            alt="Right Section Image 3"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TutorDetails
