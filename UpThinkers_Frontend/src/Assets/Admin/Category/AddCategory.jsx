import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar'
import { config } from '../../../config'
import axios from 'axios'
import Cookies from 'js-cookie'
import {toast,ToastContainer } from 'react-toastify'
import AdminNavbar from '../../Components/AdminComponents/AdminNavbar'
import { useNavigate } from 'react-router-dom'

function AddCategory() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const categoryData = { name, description }
    const navigate=useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target

        switch (name) {

            case 'name':
                setName(value);
                setNameError('');
                break;
            case 'description':
                setDescription(value);
                setDescriptionError('');
                break;

            default:
                break;
        }
    }

    const handleSubmit = async (e) => { 

        e.preventDefault();
        let hasError = false;
        if (!name.trim()) {
            setNameError('Name is required');
            hasError = true;
        } else {
            setNameError('');
        }

        if (!description.trim()) {
            setDescriptionError('Description is required');
            hasError = true;
        } else {
            setDescriptionError('');
        }

        if (!hasError) {
            try {
                console.log('vannnnn', categoryData);
                const token =  Cookies.get('adminToken')

                const response = await axios.post(`${config.ADMIN_BASE_URL}/addcategory`,categoryData ,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                })
                console.log(response.data);

                if (response.status === 200) {
                    console.log('category addes');
                    toast.success('Category added')
                    setTimeout(()=>{
                        navigate('/admin/categorylist');
                    },2000)


                } else if (response.status === 208) {

                    console.log('category already exist');
                    toast.error('categpory already exist')
                } else {
                    console.log('Unhandled status code:', response.status);
                }


            } catch (error) {
                console.log(error);
            }
        }


    }



    return (
        <div>
            <AdminSidebar />
            <AdminNavbar/>
            <ToastContainer position="top-center" autoClose={1500} />

            <div style={{ paddingTop: '4%', paddingLeft: '38%', width: '100%' }} class="relative flex flex-col text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
                <h4 class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Add Category
                </h4>
                <p class="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                    Nice to meet you! Enter your details to register.
                </p>
                <form class="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96" onSubmit={handleSubmit}>
                    <div class="flex flex-col gap-6 mb-1">
                        <h6
                            class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                            Category Name
                        </h6>
                        <div class="relative h-11 w-full min-w-[200px]">
                            <input
                                id="name"
                                name="name"
                                type='text'
                                class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                value={name}
                                onChange={handleInputChange}

                            />
                            {nameError && <p className="text-xs text-red-500">{nameError}</p>}

                            <label
                                class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                        </div>
                        <h6
                            class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                            Description
                        </h6>
                        <div class="relative h-11 w-full min-w-[200px]">
                            <input
                                id="description"
                                name="description"
                                type='text'
                                class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-customBlue placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                value={description}
                                onChange={handleInputChange}
                            />
                                    {descriptionError && <p className="text-xs text-red-500">{descriptionError}</p>}

                            <label
                                class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                        </div>

                    </div>
                    <div class="inline-flex items-center">
                        <label class="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3" htmlFor="remember">
                            <input type="checkbox"
                                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                id="remember" />
                            <span
                                class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                    stroke="currentColor" stroke-width="1">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </span>
                        </label>
                        <label class="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="remember">
                            <p class="flex items-center font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                                I agree the
                                <a href="#" class="font-medium transition-colors hover:text-gray-900">
                                    &nbsp;Terms and Conditions
                                </a>
                            </p>
                        </label>
                    </div>
                    <button
                        class="mt-6 block w-full select-none rounded-lg bg-customBlue py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="submit">
                        Add Category
                    </button>
                  
                </form>
            </div>

        </div>
    )
}

export default AddCategory
