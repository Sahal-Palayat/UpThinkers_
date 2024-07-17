import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/UserComponents/Navbar';
import { axiosApiUser } from '../../../Services/axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/UserComponents/Footer';

function TutorsPage() {

    const [tutors, setTutors] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                axiosApiUser.get('/tutorslist').then(({ data }) => setTutors(data.tutors))
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUsers();
    }, [])
    console.log(tutors);
    return (
        <div>
            <Navbar />
            <div className="">

                <div
                    style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/modern-soft-green-watercolor-texture-background_1055-17888.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
                    className="h-auto w-full mt-7 flex flex-col items-center justify-center p-4"
                >
                    <h1 className="md:text-4xl sm:text-3xl font-bold text-black">Our Tutors</h1>
                    <p className=" text-center  mt-4 ml-10 mr-10">
                        At our online learning platform, we pride ourselves on our team of experienced industrial
                        experts who are passionate about teaching. Our tutors bring real-world knowledge and practical
                        skills from various fields to provide you with high-quality, relevant education. Learn from the best and take
                        your skills to the next level with our expert tutors.
                    </p>
                </div>


                <div className=" mt-10 ml-10 mr-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tutors.map(tutor => (
                        <div onClick={() => navigate('/tutordetails', { state: { tutor: tutor } })} key={tutor.id} className="border border-gray-300 rounded overflow-hidden bg-white p-4">
                            <img src='https://assets.setmore.com/website/v2/images/industry-pages/online-tutoring/smiling-lady-books.png' alt={tutor.Name} className="w-full h-48 object-cover mb-4 rounded" />
                            <h2 className="text-xl font-semibold mb-2">{tutor.Name}</h2>
                            <p className="text-gray-500">{tutor.Email}</p>

                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default TutorsPage
