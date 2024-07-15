import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/UserComponents/Navbar';
import Footer from '../../Components/UserComponents/Footer';
import { axiosApiUser } from '../../../Services/axios';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function GetCertificate() {
    const location = useLocation();
    const { course } = location.state || {};
    const [unseenCount, setUnseenCount] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchDetails = async () => {
            const res = await axiosApiUser(`/getcertificate/${user._id}/${course._id}`);
            setUnseenCount(res.data.unseenCount);
            if (res.data.unseenCount !== 0) {
                setShowModal(true);
            }
        };
        fetchDetails();
    }, [user._id, course._id]);

    const handleRedirect = () => {
        setShowModal(false);
        navigate('/profile/usercourses');
    };

    const handleDownload = async () => {
        const certificateElement = document.getElementById('certificate');
        const canvas = await html2canvas(certificateElement, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('landscape', 'pt', 'a4'); 
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 10; 
        const imgY = (pdfHeight - imgHeight * ratio) / 10; 

        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save('certificate.pdf');
    };

    return (
        <div>
            <Navbar />
            <button
                className="absolute top-36 right-12 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={handleDownload}
            >
                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span>Download</span>
            </button>
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
                            <div className="bg-white p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Incomplete Lessons
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        You still have {unseenCount} lessons left to complete. You will be redirected to your course details page to finish the remaining lessons.
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        onClick={handleRedirect}
                                    >
                                        Go to Course Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {unseenCount === 0 && (
                <div className="bg-white py-10 mt-10" id="certificate">
                    <div className="relative w-[800px] h-[600px] bg-customBlue p-7 text-gray-800 font-sans mx-auto shadow-lg">
                        <div className="absolute w-[794px] h-[594px] left-1/2 top-1/2 -ml-[397px] -mt-[297px] border-2 border-white"></div>
                        <div className="absolute w-[730px] h-[530px] left-1/2 top-1/2 -ml-[365px] -mt-[265px] border-2 border-white"></div>
                        <div className="relative w-[720px] h-[520px] p-0 border border-white bg-white left-1/2 top-1/2 -ml-[360px] -mt-[260px]">
                            <div className="w-[650px] h-[200px] relative left-1/2 -ml-[325px] top-[70px] mt-0">
                                <div className="mb-2 text-center cursive">
                                    <h2 className="text-3xl">UpThinkers Learning Hub</h2>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-full flex justify-center my-4">
                                        <div className="border-b border-customGreen pb-1 mb-4 w-3/4 text-center">
                                            <span className="font-bold">TrueNorth Administrator</span>
                                        </div>
                                    </div>
                                    <div className="text-center mb-4">
                                        <span className="block cursive">has earned</span>
                                        <span className="block font-bold">PD175: 1.0 Credit Hours</span>
                                    </div>
                                    <div className="text-center mb-4">
                                        <span className="block cursive">while completing the training course entitled</span>
                                    </div>
                                    <div className="w-full flex justify-center">
                                        <div className="border-b border-customGreen pb-1 mb-4 w-3/4 text-center">
                                            <span className="block font-bold">BPS PGS Initial PLO for Principals at Cluster Meetings</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-10">
                                    <div className="text-center">
                                        <span className="block">Buffalo City School District</span>
                                        <div className="h-10 w-full border-b border-customGreen mb-2"></div>
                                        <span className="block font-bold">Crystal Benton Instructional Specialist II, Staff Development</span>
                                    </div>
                                    <div></div>
                                    <div className="text-center">
                                        <span className="block">Date Completed</span>
                                        <div className="h-10 w-full border-b border-customGreen mb-2"></div>
                                        <span className="block font-bold">DOB: </span>
                                        <span className="block font-bold">Social Security # (last 4 digits)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default GetCertificate;
