import React, { useContext, useEffect, useState } from 'react'
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar'
import axios from 'axios'
import { AuthContext } from '../../../Context/AuthContext';
import { blockTutor } from '../Functions/Block';
import AdminNavbar from '../../Components/AdminComponents/AdminNavbar';
import {  axiosApiAdmin } from '../../../Services/axios';

function TutorsList() {

    const [tutors, setTutors] = useState([]);
    const {token} = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const {adminToken}= useContext(AuthContext)
    const [currentItems, setCurrentItems] = useState([])



    
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState (6);

 

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;

        setCurrentItems(tutors.slice(indexOfFirstItem, indexOfLastItem))
    }, [tutors])
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(tutors.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    useEffect(() => {
        axiosApiAdmin().then(({ data }) => setTutors(data.tutors))
        const fetchUsers = async () => {
            try {
               axiosApiAdmin.get('/tutorslist').then(({ data }) =>setTutors(data.tutors))
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUsers();
    }, []);

    
    const Block = (tutorId) => {
        blockTutor(tutorId,token).then(() => {
            setUsers((prev) => {
                prev.map((tutor) => {
                    tutor._id === id ? { ...tutor, isBlocked: true } : tutor
                })
            })
        })
    }

    return (
        <div >

            <AdminSidebar />
            <AdminNavbar/>
            <div style={{ marginLeft: '21%', width: '100%' }} className="mt-4 max-w-full bg-white-200" >
            <h1 class="p-8 text-customBlue text-3xl font-bold">Tutors List...</h1>

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
                        {currentItems.map((tutor,index) => (




                            <tr key={tutor._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {/* <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt="" />
                      </div> */}
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {tutor.Name}
                                            </div>

                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900"> {tutor.Mobile}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <p> <span
                                onClick={(event) => {
                                    if (tutor) {
                                        setCurrentItems((prevItems) => {
                                            return prevItems.map((item, idx) => {
                                                if (idx === index) {
                                                    return { ...item, isBlocked: !item.isBlocked };
                                                }
                                                return item;
                                            });
                                        });
                                        blockUser(tutor._id).then(() => {
                                                const newStd = [...new Set([...tutor,...currentItems])]
                                                setStudents(newStd)
                                        }).catch((error) => {
                                            console.error('Error blocking/unblocking user:', error);
                                        });
                                    }
                                }}

                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tutor.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
                            >
                                { tutor.isBlocked ? 'Blocked' : 'Active'}
                                    </span>
                                    
                                    </p> 
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                   Tutor
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {tutor.Email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                    {/* <a href="#" className="ml-2 text-red-600 hover:text-red-900">Delete</a> */}
                                </td>
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

export default TutorsList
