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
        <div>
            <div>
                
                <TutorSidebar/>
                <div className="pt-28 lg:w-[80] lg:ml-64 py-6">
                <div class="container mx-auto shadow-lg rounded-lg">

                  
                    <div class="flex flex-row justify-between bg-white">
                        <div class="flex flex-col w-2/5 border-r-2 overflow-y-auto">

                            <div class="border-b-2 py-4 px-2">
                                <input
                                    type="text"
                                    placeholder="search chatting"
                                    class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                                />
                            </div>

                            <div class="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                                {enStudents.length > 0 ? (
                                    <ul class="w-full">
                                        {enStudents.map(student => (
                                            <li key={student._id} class="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                                                <div class="w-1/4">
                                                    <img
                                                        src="https://source.unsplash.com/_7LbC5J-jw4/600x600" // Placeholder image; replace with dynamic image URL if available
                                                        class="object-cover h-12 w-12 rounded-full"
                                                        alt={student.studentName}
                                                    />
                                                </div>
                                                <div class="w-full ml-3">
                                                    <div class="text-lg font-semibold">{student.studentName}</div>
                                                    <span class="text-gray-500">{student.Email}</span> {/* Replace this with any other dynamic content if necessary */}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No students enrolled in this course.</p>
                                )}
                            </div>


                        </div>

                        <div class="w-full px-5 flex flex-col justify-between">
                            <div class="flex flex-col mt-5">
                                <div class="flex justify-end mb-4">
                                    <div
                                        class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                    >
                                        Welcome to group everyone !
                                    </div>
                                    <img
                                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                        class="object-cover h-8 w-8 rounded-full"
                                        alt=""
                                    />
                                </div>
                                <div class="flex justify-start mb-4">
                                    <img
                                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                        class="object-cover h-8 w-8 rounded-full"
                                        alt=""
                                    />
                                    <div
                                        class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                                    >
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                                        at praesentium, aut ullam delectus odio error sit rem. Architecto
                                        nulla doloribus laborum illo rem enim dolor odio saepe,
                                        consequatur quas?
                                    </div>
                                </div>
                                <div class="flex justify-end mb-4">
                                    <div>
                                        <div
                                            class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                        >
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                            Magnam, repudiandae.
                                        </div>

                                        <div
                                            class="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                        >
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Debitis, reiciendis!
                                        </div>
                                    </div>
                                    <img
                                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                        class="object-cover h-8 w-8 rounded-full"
                                        alt=""
                                    />
                                </div>
                                <div class="flex justify-start mb-4">
                                    <img
                                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                        class="object-cover h-8 w-8 rounded-full"
                                        alt=""
                                    />
                                    <div
                                        class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                                    >
                                        happy holiday guys!
                                    </div>
                                </div>
                            </div>
                            <div class="py-5">
                                <input
                                    class="w-full bg-gray-300 py-5 px-3 rounded-xl"
                                    type="text"
                                    placeholder="type your message here..."
                                />
                            </div>
                        </div>
                        
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default EnrolledStudents
