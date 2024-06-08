import React from 'react'









export const coursesCard = [
    {
      id: 1,
      cover: "./images/courses/1.png",
      coursesName: "Standard 1",
      courTeacher: [
        {
          dcover: "./images/Avatar.png",
          name: "by Ram Gurung",
          totalTime: "50 lectures (100 hrs)",
        },
      ],
      priceAll: "\u20B90",
      pricePer: "Free",
    },
    {
      id: 2,
      cover: "./images/courses/2.png",
      coursesName: "Standard 2",
      courTeacher: [
        {
          dcover: "./images/Avatar.png",
          name: "by Ram Gurung",
          totalTime: "50 lectures (100 hrs)",
        },
      ],
      priceAll: "\u20B90",
      pricePer: "Free",
    },
    {
      id: 3,
      cover: "./images/courses/3.png",
      coursesName: "Standard 3",
      courTeacher: [
        {
          dcover: "./images/Avatar.png",
          name: "by Ram Gurung",
          totalTime: "50 lectures (100 hrs)",
        },
      ],
      priceAll: "\u20B90",
      pricePer: "Free",
    },
    {
      id: 4,
      cover: "./images/courses/4.png",
      coursesName: "Standard 4",
      courTeacher: [
        {
          dcover: "./images/Avatar.png",
          name: "by Ram Gurung",
          totalTime: "50 lectures (100 hrs)",
        },
      ],
      priceAll: "\u20B90",
      pricePer: "Free",
    },
    {
      id: 5,
      cover: "./images/courses/5.png",
      coursesName: "Standard 5",
      courTeacher: [
        {
          dcover: "./images/Avatar.png",
          name: "by Ram Gurung",
          totalTime: "50 lectures (100 hrs)",
        },
      ],
      priceAll: "\u20B90",
      pricePer: "Free",
    },
    {
      id: 6,
      cover: "./images/courses/6.png",
      coursesName: "Standard 6",
      courTeacher: [
        {
          dcover: "./images/Avatar.png",
          name: "by Ram Gurung",
          totalTime: "50 lectures (100 hrs)",
        },
      ],
      priceAll: "\u20B90",
      pricePer: "Free",
    },
    {
      id: 7,
      cover: "./images/courses/7.png",
      coursesName: "Standard 7",
      courTeacher: [
        {
          dcover: "./images/Avatar.png",
          name: "by Ram Gurung",
          totalTime: "50 lectures (100 hrs)",
        },
      ],
      priceAll: "\u20B90",
      pricePer: "Free",
    },
    {
      id: 8,
      cover: "./images/courses/8.png",
      coursesName: "Standard 8",
      courTeacher: [
        {
          dcover: "./images/Avatar.png",
          name: "by Ram Gurung",
          totalTime: "50 lectures (100 hrs)",
        },
      ],
      priceAll: "\u20B90",
      pricePer: "Free",
    },
    {
      id: 9,
      cover: "./images/courses/9.png",
      coursesName: "Standard 9",
      courTeacher: [
        {
          dcover: "./images/Avatar.png",
          name: "by Ram Gurung",
          totalTime: "50 lectures (100 hrs)",
        },
      ],
      priceAll: "\u20B90",
      pricePer: "Free",
    }
   
  ]
function CourseCard() {
  return (
    <>
    <section className="homeAbout">
        
      <div className="container mx-auto">
        {/* <Heading subtitle="our courses" title="explore our popular online courses" /> */}
    
        <div className="coursesCard py-12">
        <h1 className="text-4xl font-bold text-customBlue pb-8">Best Courses...</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesCard.slice(0, 3).map((val) => (
              <div className="items bg-white p-8 text-center shadow-md" key={val.id}>
                <div className="content flex flex-col md:flex-row">
                  <div className="left flex justify-center md:justify-start mb-4 md:mb-0">
                    <div className="img w-20 h-20 rounded-full bg-customGreen p-4">
                      <img src={val.cover} alt={val.coursesName} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="text text-left md:ml-4">
                    <h1 className="text-2xl font-medium leading-tight">{val.coursesName}</h1>
                    <div className="rate my-4 text-customGreen">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <label htmlFor="">(5.0)</label>
                    </div>
                    <div className="details flex items-center space-x-4 text-gray-500">
                      {val.courTeacher.map((details) => (
                        <div className="box flex items-center" key={details.name}>
                          <div className="dimg w-12 h-12 rounded-full mr-4">
                            <img src={details.dcover} alt={details.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="para">
                            <h4>{details.name}</h4>
                          </div>
                        </div>
                      ))}
                      <span className="text-teal-500 font-medium text-sm">{val.courTeacher[0].totalTime}</span>
                    </div>
                  </div>
                </div>
                <div className="price my-8 bg-gray-100 py-2">
                  <h3 className="text-customGreen font-medium">
                    {val.priceAll} / {val.pricePer}
                  </h3>
                </div>
                <button className="outline-btn border-2 border-cutomGreen text-customGreen py-2 px-4 rounded hover:bg-customGreen hover:text-white transition">ENROLL NOW !</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <OnlineCourses /> */}
    </section>
  </>
  )
}

export default CourseCard
