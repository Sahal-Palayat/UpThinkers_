import React from 'react'
import { useNavigate } from 'react-router-dom';

const AboutUser = () => {
    const navigate = useNavigate();

    const homeAbout = [
        {
            id: 1,
            cover: "https://img.icons8.com/dotty/80/000000/storytelling.png",
            title: "Best Learning Courses",
            desc: "Discover our curated selection of the best learning courses designed to empower you",
            path: '/courselist' // Add path for navigation
        },
        {
            id: 2,
            cover: "https://img.icons8.com/ios/80/000000/diploma.png",
            title: "About this Company",
            desc: "Discover our curated selection of the best learning courses designed to empower you",
            path: '/about' // Add path for navigation
        },
        {
            id: 3,
            cover: "https://img.icons8.com/ios/80/000000/athlete.png",
            title: "Expert Instruction",
            desc: "Experience expert instruction from our highly qualified and dedicated educators",
            path: '/tutorspage' // Add path for navigation
        },
    ];
      
    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <>
        <section className='aboutHome pt-8'>
            <div className='container flex flex-col md:flex-row'>
                <div className='left row w-full md:w-1/2'>
                    <img src='./image.png' alt='' className='w-full h-[35] object-cover' />
                </div>
                <div className='right row w-full md:w-1/2 pl-14'>
                    {/* <Heading subtitle='LEARN ANYTHING' title='Benefits About Online Learning Expertise' /> */}
                    <div className='items mt-12'>
                        {homeAbout.map((val) => (
                            <div 
                                className='item flex items-start space-x-4 mt-8 p-5 bg-white transition duration-500 hover:bg-customGreen hover:text-white hover:shadow-lg' 
                                key={val.id}
                                onClick={() => val.path && handleClick(val.path)} // Check if path exists before navigating
                            >
                                <div className='img w-16'>
                                    <img src={val.cover} alt='' className='w-16 h-16' />
                                </div>
                                <div className='text'>
                                    <h2 className='text-xl mb-4'>{val.title}</h2>
                                    <p className='text-gray-500 hover:text-white'>{val.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default AboutUser
