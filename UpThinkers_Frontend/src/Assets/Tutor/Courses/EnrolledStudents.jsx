import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { axiosApiTutor } from '../../../Services/axios';
import TutorSidebar from '../../Components/TutorComponents/TutorSidebar';
function EnrolledStudents() {
    const location = useLocation();
    const { course, tutor } = location.state || {};

    const [enStudents, setEnStudents] = useState('')

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                console.log(course._id, tutor._id);
                const { data } = await axiosApiTutor.get(`/getstudents/${course._id}`);
                console.log(data);
                setEnStudents(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchDetails();
    }, []);

    console.log(enStudents, 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeyyyyyyyyyyyyyyyyyynnnnnnnnnnnnnnn');

    // console.log(course,tutor,'tututututtutuut');
    return (
        //     <div class="flex flex-row py-4 px-2 justify-center items-center border-b-2">
        //     {enStudents.length > 0 ? (
        //         <ul class="w-full">
        //             {enStudents.map(student => (
        //                 <li key={student._id} class="flex flex-row py-4 px-2 justify-center items-center border-b-2">
        //                     <div class="w-1/4">
        //                         <img
        //                             src="https://source.unsplash.com/_7LbC5J-jw4/600x600" // Placeholder image; replace with dynamic image URL if available
        //                             class="object-cover h-12 w-12 rounded-full"
        //                             alt={student.studentName}
        //                         />
        //                     </div>
        //                     <div class="w-full ml-3">
        //                         <div class="text-lg font-semibold">{student.studentName}</div>
        //                         <span class="text-gray-500">{student.Email}</span> {/* Replace this with any other dynamic content if necessary */}
        //                     </div>
        //                 </li>
        //             ))}
        //         </ul>
        //     ) : (
        //         <p>No students enrolled in this course.</p>
        //     )}
        // </div>


        <div>
            <TutorSidebar />
            <div className="lg:w-[80%] lg:ml-64 px-6 py-8">
                <div className="mt-28">
                <h1 className='text-3xl font-bold text-customBlue'>Enrolled Students</h1>
                    {enStudents.length > 0 ? (
                        <div className=" mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enStudents.map(student => (
                                <div key={student._id} className="bg-white rounded-lg shadow-md p-6 text-center mb-4">
                                    <img src='https://img.freepik.com/free-photo/female-student-with-books-paperworks_1258-48204.jpg?w=360' alt={student.Name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold">{student.studentName}</h3>
                                    <p className="text-gray-600">{student.courseName}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No students enrolled in this course.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EnrolledStudents
