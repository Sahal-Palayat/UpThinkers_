import React from 'react'
import Navbar from '../../Components/UserComponents/Navbar'
import Footer from '../../Components/UserComponents/Footer'
import { useSelector } from 'react-redux'
import SidebarUser from '../../Components/UserComponents/SidebarUser'

function ProfilePage() {

    const { user } = useSelector((state) => state.user)
    console.log(user);
    return (


        <div >
            <div className='h-[100px]'>
                <Navbar />
            </div>
            <SidebarUser />
            <div className="lg:w-[70%] lg:ml-64 px-6 " style={{marginBottom:'30rem'}}>
                <main className="profile-page">
                    <section className="relative h-[500px] block mt-3 ">
                        <div className="absolute top-0 w-full h-full bg-center bg-cover"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')", height: '30rem', width:"70.2rem" }}>
                            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black "></span>
                        </div>
                        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                            style={{ transform: "translateZ(0px)" }}>
                            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                                <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                            </svg>
                        </div>
                    </section>
                    <section className="absolute  bg-blueGray-200  ">
                        <div className="container mx-auto px-4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                <div className="px-6 w-full">
                                    <div className="flex flex-wrap justify-center ">
                                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                            <div className="relative">
                                                <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" className="shadow-xl rounded-full h-auto  align-middle border-none -m-16 -ml-2 lg:-ml-2 " />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                            <div className="py-6 px-3 mt-32 sm:mt-0">
                                                <button className="bg-customGreen active:bg-customGreen uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                    Connect
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                                <div className="mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Friends</span>
                                                </div>
                                                <div className="mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Photos</span>
                                                </div>
                                                <div className="lg:mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-12">
                                        <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 pt-6 mb-2">
                                            {user.Name}
                                        </h3>
                                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                            <i className="fas fa-phone-alt mr-2 text-lg text-blueGray-400"></i>
                                            +91 -{user.Mobile}
                                        </div>
                                        <div className="mb-2 text-blueGray-600 mt-10">
                                            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Solution Manager - Creative Tim Officer
                                        </div>
                                        <div className="mb-2 text-blueGray-600">
                                            <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of Computer Science
                                        </div>
                                    </div>
                                    <div className=" mt-10 py-10 border-t border-blueGray-200 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                    An artist of considerable range, Jenna the name taken by
                                                    Melbourne-raised, Brooklyn-based Nick Murphy writes,
                                                    performs and records all of his own music, giving it a
                                                    warm, intimate feel with a solid groove structure. An
                                                    artist of considerable range.
                                                </p>
                                                <a href="#pablo" className="font-normal text-pink-500">Show more</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>

                </main>
            </div>
            <Footer />
        </div>
    )
}

export default ProfilePage
