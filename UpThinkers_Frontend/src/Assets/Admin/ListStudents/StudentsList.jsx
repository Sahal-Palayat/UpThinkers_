import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../Components/AdminSidebar'
import axios from 'axios'

function StudentsList() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3030/admin/studentslist').then(({ data }) => setStudents(data.users))

    }, []);
    // console.log(students, 'studentsssss');
    return (
        <div className="flex h-screen">
            
              <AdminSidebar />
            
            <div style={{marginLeft:'18%',width : '100%'}} className="mt-10 max-w-full bg-white-200" >
                <table style={{width : '100%'}} className=" divide-y divide-gray-200 w-[500px] ml-auto">
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
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Active
                                    </span>
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
