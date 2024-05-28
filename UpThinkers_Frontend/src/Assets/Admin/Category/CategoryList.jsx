import React, { useEffect, useState } from 'react'
import { Card, Typography } from "@material-tailwind/react";
import AdminSidebar from '../../Components/AdminSidebar';
import axios from 'axios'
import { config } from '../../../config';
import Cookies from 'js-cookie'
import AdminNavbar from '../../Components/AdminNavbar';
import Modal from '../../Components/Modal';
import { adminApi, axiosApiAdmin } from '../../../Services/axios';


function CategoryList() {

    const [Category, setCategory] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(null);

    const closeModal = () => {
        setIsModalOpen(null);
    };

    useEffect(() => {
        adminApi().then(({ data }) => setCategory(data))
        const fetchUsers = async () => {
            const token = Cookies.get('adminToken')
            try {
                axiosApiAdmin.get('/categorylist').then(({data})=> setCategory(data))                 
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUsers();
    }, [])



    return (

        <div>
            <AdminSidebar />
            <AdminNavbar />
            <div style={{ paddingTop: '2%', paddingLeft: '21%', width: '60%' }} className="h-full w-full ">
                <h1 class="p-8 text-customBlue text-3xl font-bold">Category List...</h1>
                <table style={{ width: '100%' }} className=" divide-y divide-gray-200 w-[500px] ml-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>

                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {Category.length > 0 && Category.map(category => (




                            <tr key={category._id}>


                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {/* <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt="" />
                                </div> */}
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {category.Name}
                                            </div>

                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900"> {category.Description}</div>
                                </td>


                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    Active
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">


                                    <button
                                        onClick={()=>{
                                            setIsModalOpen(category)
                                        }}
                                        className="block text-white bg-customBlue hover:bg-customBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-customBlue dark:hover:bg-customBlue dark:focus:ring-customBlue"
                                    >
                                        Edit
                                    </button>

                                    <Modal category={Category} setCategory={setCategory} isOpen={isModalOpen} setIsOpen={setIsModalOpen} onClose={closeModal} />



                                </td>

                            </tr>


                        ))}
                    </tbody>
                </table>
            </div>



        </div>

    )
}

export default CategoryList
