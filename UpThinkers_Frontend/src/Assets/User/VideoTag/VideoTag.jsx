import React, { useEffect } from 'react';
import Navbar from '../../Components/UserComponents/Navbar';
import Footer from '../../Components/UserComponents/Footer';
import { useLocation } from 'react-router-dom';
import { axiosApiUser } from '../../../Services/axios';
import { useSelector } from 'react-redux';

function VideoTag() {
    const location = useLocation();
    const lesson = location.state;

    const {user} =useSelector((state)=>state.user)

    if (!lesson) {
        return <div>Loading...</div>;
    }

    useEffect(()=>{
        try {

            const res=  axiosApiUser.post(`/videoSeen/${lesson._id}/${user._id}`).then((response)=>{
                console.log(response.data);
            })
        } catch (error) {
            console.log(error);
        }

        
    },[])

    console.log(lesson, 'sasas');

    return (
        <div>
            <Navbar />
            <div className="flex-grow flex flex-col justify-center items-center py-8">
                <h1 className='text-customBlue text-4xl font-bold mb-10'>Watch Lesson Video</h1>

                <video className="w-full max-w-3xl h-auto rounded-lg" controls>
                    <source src={lesson.Video} type="video/mp4" />

                    Your browser does not support the video tag.
                </video>

            </div>
           

            <Footer />
        </div>
    );
}

export default VideoTag;
