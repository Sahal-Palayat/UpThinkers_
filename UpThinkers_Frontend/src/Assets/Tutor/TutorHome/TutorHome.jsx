import React from 'react'
import TutorNavbar from '../../Components/TutorComponents/TutorNavbar'
import Navbar from '../../Components/UserComponents/Navbar'
import TutorSidebar from '../../Components/TutorComponents/TutorSidebar'

function TutorHome() {


  return (
    <div>
      <TutorSidebar />
      <div className="lg:w-[80%] lg:ml-64 px-6 py-8 ">
        <section className="sm:mt-6 lg:mt-8 mt-20  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div
            className="my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Faces of UpThinkers </span>
                <span className="block text-customGreen xl:inline">online EduTech</span>
              </h1>
              <p
                className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-customGreen hover:bg-customBlue md:py-4 md:text-lg md:px-10">
                    Get started
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-customGreen bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                    Live demo
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:inset-y-0 lg:right-0 lg:w-1/2 my-4">
              <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt=""/>
            </div>
            
          </div>

        </section>
      </div>


    </div>
  )
}

export default TutorHome
