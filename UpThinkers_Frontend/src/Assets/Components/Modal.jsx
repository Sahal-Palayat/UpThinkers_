import React, { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa';
import axios from 'axios'
import { config } from '../../config';
import Cookies from 'js-cookie'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Modal({ isOpen, setIsOpen, onClose, setCategory, category }) {
    console.log(isOpen)

    const navigate = useNavigate()

    const handleUpdate = async () => {
        try {
            const token = Cookies.get('adminToken')
            const response = await axios.put(`${config.ADMIN_BASE_URL}/editcategory/${isOpen._id}`, {
                Name: isOpen.Name,
                Description: isOpen.Description,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                toast.success('Category Updated', {
                    autoClose: true,
                    onClose: () => {
                        const updated = category.map((val) => {
                            return val._id === isOpen._id ? isOpen : val
                        })
                        setCategory(updated)
                        setIsOpen(null)
                    }
                })

            } else {
                toast.error('Error updating category')
            }

            console.log(response.data, 'responseee');
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };
    const inputChange = (e) => {
        setIsOpen({ ...isOpen, [e.target.name]: e.target.value })
    }


    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <ToastContainer autoClose={1500} />

            <div className="relative p-4 w-full max-w-md bg-gray-700 rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit Category
                    </h3>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={onClose}
                    >
                        <FaTimes />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-4 md:p-5">
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
                            <input
                                type="text"
                                value={isOpen.Name}
                                name="Name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                onChange={inputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <input
                                type="description"
                                value={isOpen.Description}
                                name="Description"
                                id="description"
                                placeholder=""
                                onChange={inputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                        </div>

                        <button

                            onClick={handleUpdate}
                            type="button"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-customBlue dark:hover:bg-customBlue dark:focus:ring-customBlue"
                        >
                            Update Category
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal
