import React, { useEffect, useState } from 'react';
import TutorSidebar from '../../Components/TutorComponents/TutorSidebar';
import ReactApexChart from 'react-apexcharts';
import { axiosApiTutor } from '../../../Services/axios';
import { useSelector } from 'react-redux';

const RevenuePage = () => {
   
    const lineChartOptions = {
        series: [{
            name: 'TEAM A',
            type: 'area',
            data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33]
        }, {
            name: 'TEAM B',
            type: 'line',
            data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43]
        }],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        stroke: {
            curve: 'smooth'
        },
        fill: {
            type: 'solid',
            opacity: [0.35, 1],
        },
        labels: ['Dec 01', 'Dec 02', 'Dec 03', 'Dec 04', 'Dec 05', 'Dec 06', 'Dec 07', 'Dec 08', 'Dec 09 ', 'Dec 10', 'Dec 11'],
        markers: {
            size: 0
        },
        yaxis: [{
            title: {
                text: 'Series A',
            },
        }, {
            opposite: true,
            title: {
                text: 'Series B',
            },
        }],
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " points";
                    }
                    return y;
                }
            }
        }
    };

    const radialChartOptions = {
        series: [44, 55, 67, 83],
        chart: {
            height: 350,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: '22px',
                    },
                    value: {
                        fontSize: '16px',
                    },
                    total: {
                        show: true,
                        label: 'Total',
                        formatter: function (w) {
                            return 249;
                        }
                    }
                }
            }
        },
        labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
    };

    const [details, setDetails] = useState([])
    const {tutor}=useSelector((state)=>state.tutor)

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const { data } = await axiosApiTutor.get('/getrevuenu?tutorId=' + tutor?._id);
                setDetails(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchDetails()
    }, [])
    

    console.log(details, 'detaaaaaaaaaaaillssssssssssssssss');

    return (
        <div>
            <TutorSidebar />
            <div className="lg:w-[80%] lg:ml-64 px-6 py-8">
                <main className="mt-16">
                    <div className="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                                <div className="col-span-12 mt-8">
                                    <div className="flex items-center h-10 intro-y">
                                        <h2 className="mr-5 text-lg font-medium truncate">Dashboard</h2>
                                    </div>
                                    <div className="grid grid-cols-12 gap-6 mt-5">
                                        <a className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white" href="#">
                                            <div className="p-5">
                                                <div className="flex justify-between">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                    </svg>
                                                    {/* <div className="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                        <span className="flex items-center">30%</span>
                                                    </div> */}
                                                </div>
                                                <div className="ml-2 w-full flex-1">
                                                    <div>
                                                        <div className="mt-3 text-3xl font-bold leading-8">{details.totalRevenue}.00</div>
                                                        <div className="mt-1 text-base text-gray-600">Total Income</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <a className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white" href="#">
                                            <div className="p-5">
                                                <div className="flex justify-between">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                    </svg>
                                                    {/* <div className="bg-red-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                        <span className="flex items-center">30%</span>
                                                    </div> */}
                                                </div>
                                                <div className="ml-2 w-full flex-1">
                                                    <div>
                                                        <div className="mt-3 text-3xl font-bold leading-8">{details.uniqueStudentCount}</div>
                                                        <div className="mt-1 text-base text-gray-600">Enrolled Students</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        {/* <a className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white" href="#">
                                            <div className="p-5">
                                                <div className="flex justify-between">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                                    </svg>
                                                    <div className="bg-yellow-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                        <span className="flex items-center">30%</span>
                                                    </div>
                                                </div>
                                                <div className="ml-2 w-full flex-1">
                                                    <div>
                                                        <div className="mt-3 text-3xl font-bold leading-8">4.510</div>
                                                        <div className="mt-1 text-base text-gray-600">Users</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a> */}
                                        <a className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white" href="#">
                                            <div className="p-5">
                                                <div className="flex justify-between">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 102 0V3a3 3 0 00-3-3H4a3 3 0 00-3 3v1a1 1 0 102 0V3zM3 8a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 102 0V8a3 3 0 00-3-3H4a3 3 0 00-3 3v1a1 1 0 102 0V8z" clipRule="evenodd" />
                                                        <path fillRule="evenodd" d="M3 13a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 102 0v-1a3 3 0 00-3-3H4a3 3 0 00-3 3v1a1 1 0 102 0v-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {/* <div className="bg-pink-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                        <span className="flex items-center">30%</span>
                                                    </div> */}
                                                </div>
                                                <div className="ml-2 w-full flex-1">
                                                    <div>
                                                        <div className="mt-3 text-3xl font-bold leading-8">{details.countOrder}</div>
                                                        <div className="mt-1 text-base text-gray-600">Orders</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-span-12 mt-8">
                                    <div className="flex items-center h-10 intro-y">
                                        <h2 className="mr-5 text-lg font-medium truncate">Charts</h2>
                                    </div>
                                    <div className=" grid grid-cols-12 gap-6 mt-5">
                                        <div className="col-span-12 sm:col-span-6 xl:col-span-6 intro-y transform hover:scale-105 transition duration-300 shadow-xl rounded-lg  intro-y bg-white">
                                            <div className="box">
                                                <div className="flex items-center p-5">
                                                    <h2 className="text-lg font-medium truncate mr-5">Line & Area Chart</h2>
                                                </div>
                                                <div className="p-5">
                                                    <ReactApexChart options={lineChartOptions} series={lineChartOptions.series} type="line" height={350} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12 sm:col-span-6 xl:col-span-6 intro-y transform hover:scale-105 transition duration-300 shadow-xl rounded-lg  intro-y bg-white">
                                            <div className="box">
                                                <div className="flex items-center p-5">
                                                    <h2 className="text-lg font-medium truncate mr-5">Radial Bar Chart</h2>
                                                </div>
                                                <div className="p-5">
                                                    <ReactApexChart options={radialChartOptions} series={radialChartOptions.series} type="radialBar" height={350} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-12 mt-5">
                                <div class="grid gap-2 grid-cols-1 lg:grid-cols-1">
                                    <div class="bg-white p-4 shadow-lg rounded-lg">
                                        <h1 class="font-bold text-base">Table</h1>
                                        <div class="mt-4">
                                            <div class="flex flex-col">
                                                <div class="-my-2 overflow-x-auto">
                                                    <div class="py-2 align-middle inline-block min-w-full">
                                                        <div
                                                            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                                                            <table class="min-w-full divide-y divide-gray-200">
                                                                <thead>
                                                                    <tr>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">Course NAME</span>
                                                                            </div>
                                                                        </th>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">Mobile</span>
                                                                            </div>
                                                                        </th>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">STATUS</span>
                                                                            </div>
                                                                        </th>
                                                                        <th
                                                                            class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                            <div class="flex cursor-pointer">
                                                                                <span class="mr-2">Email</span>
                                                                            </div>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="bg-white divide-y divide-gray-200">
                                                                    {Array.isArray(details.students) ? (
                                                                        details.students.map((item, index) => (
                                                                            <tr key={index}>
                                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <p>{item.Name}</p>
                                                                                    <p className="text-xs text-gray-400">{item.Mobile}</p>
                                                                                </td>
                                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <p>{item.Mobile}</p>
                                                                                </td>
                                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <div className="flex text-green-500">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                        </svg>
                                                                                        <p>Active</p>
                                                                                    </div>
                                                                                </td>
                                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <p>{item.Email}</p>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    ) : (
                                                                        <tr>
                                                                            <td colSpan="4" className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                No courses available
                                                                            </td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>



                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div >
        </div >
    );
}

export default RevenuePage;
