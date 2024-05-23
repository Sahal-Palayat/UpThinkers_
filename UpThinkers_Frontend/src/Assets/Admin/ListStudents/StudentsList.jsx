import React, { useContext, useEffect, useState } from 'react'
import AdminSidebar from '../../Components/AdminSidebar'
import axios from 'axios'
import { AuthContext } from '../../../Context/AuthContext';
import { block } from '../Functions/Block';
import Cookies from 'js-cookie'
import { config } from '../../../config';

function StudentsList() {
    const [students, setStudents] = useState([]);
    const [users, setUsers] = useState([])
    const { token } = useContext(AuthContext)
    const {adminToken}= useContext(AuthContext)


    useEffect(() => {
        axios.get(`${config.ADMIN_BASE_URL}/studentslist`).then(({ data }) => setStudents(data.users))
        const fetchUsers = async () => {
            Cookies.get('adminToken')
            Cookies.get('refreshToken')
            try {
                const response = await axios.get(`${config.ADMIN_BASE_URL}/studentslist`, {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                })
                console.log(response.data,'????????????');
                setStudents(response.data.users);

            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUsers();
    }, []);


    const Block = (userId) => {
        block(userId, token).then(() => {
            setUsers((prev) => {
                prev.map((user) => {  
                    user._id === id ? { ...user, isBlocked: true } : user
                })
            })
        })
    }


console.log(students,'checcccckkkkkkkkkkkk');



    return (
        <div className="flex h-screen">

            <AdminSidebar />

            <div style={{ marginLeft: '18%', width: '100%' }} className="mt-10 max-w-full bg-white-200" >
                <table style={{ width: '100%' }} className=" divide-y divide-gray-200 w-[500px] ml-auto">
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {students.map(student => (




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
                                    <a href=""> <span onClick={() => Block(student._id)} className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                        {student.isBlocked ? 'Blocked' : 'Active'}
                                    </span></a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {student.isAdmin ? 'Admin' : 'User'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {student.Email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                    {/* <a href="#" className="ml-2 text-red-600 hover:text-red-900">Delete</a> */}
                                </td>

                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentsList
