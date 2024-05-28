import React, { useContext, useEffect, useState } from 'react'
import AdminSidebar from '../../Components/AdminSidebar'
import axios from 'axios'
import { AuthContext } from '../../../Context/AuthContext';
import { block } from '../Functions/Block';
import AdminNavbar from '../../Components/AdminNavbar';
import { adminApi, axiosApiAdmin } from '../../../Services/axios';

function StudentsList() {
    const [students, setStudents] = useState([]);
    const [users, setUsers] = useState([])
    const { token } = useContext(AuthContext)
    const { adminToken } = useContext(AuthContext)




    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = students.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(students.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }


    useEffect(() => {
        adminApi().then(({ data }) => setStudents(data.users))
        const fetchUsers = async () => {
            try {
                axiosApiAdmin.get('/studentslist').then(({ data }) => setStudents(data.users))
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUsers();
    }, []);


    const blockUser = (userId) => {
        block(userId, token).then(() => {
            setUsers((prev) => {
                prev.map((user) => {
                    user._id === id ? { ...user, isBlocked: true } : user
                })
            })
        })
    }


    console.log(students, 'checcccckkkkkkkkkkkk');



    return (
        <div>

            <AdminSidebar />
            <AdminNavbar />
            <div style={{ paddingTop: '1%', paddingLeft: '21%', width: '100%' }} className="h-full w-full ">
                <h1 class="p-8 text-customBlue text-3xl font-bold">Students List...</h1>

                <table style={{ width: '100%' }} className="  divide-gray-200 ">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Mobile
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th> */}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map(student => (




                            <tr key={student._id}>


                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {/* <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt="" />
                                </div> */}
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {student.Name}
                                            </div>

                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900"> {student.Mobile}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <a href="">
                                        <span
                                            onClick={!student.isAdmin ? () => blockUser(student._id) : null}
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                                }`}
                                        >
                                            {student.isAdmin ? 'Active' : (student.isBlocked ? 'Blocked' : 'Active')}
                                        </span>
                                    </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {student.isAdmin ? 'Admin' : 'User'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {student.Email}
                                </td>
                                {/* <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                    <a href="#" className="ml-2 text-red-600 hover:text-red-900">Delete</a>
                                </td> */}

                            </tr>

                        ))}
                    </tbody>
                </table>
                <div>

                    {pageNumbers.map((number) => (
                        <button key={number} onClick={() => paginate(number)} className="rounded-md bg-customBlue text-white m-2 px-3 py-1 hover:bg-green-600">
                            {number}
                        </button>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default StudentsList
