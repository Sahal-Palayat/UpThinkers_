import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import TutorRegister from '../Assets/Tutor/TutorRegister/TutorRegister';
import TutorHome from '../Assets/Tutor/TutorHome/TutorHome';
import TutorLogin from '../Assets/Tutor/TutorLogin/TutorLogin';
import CourseList from '../Assets/Tutor/Courses/CourseList';
import AddCourse from '../Assets/Tutor/Courses/AddCourse';
import EditCourse from '../Assets/Tutor/Courses/EditCourse';
import CourseDetails from '../Assets/Tutor/Courses/CourseDetails';
import AddLessons from '../Assets/Tutor/Courses/AddLessons';

const TutorRouter = () => {
  const { tutorToken } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/register" element={tutorToken ? <Navigate to="/tutor/home" /> : <TutorRegister />} />
      <Route path="/" element={tutorToken ? <TutorHome /> : <Navigate to="/tutor/login" />} />
      <Route path="/login" element={tutorToken ? <Navigate to="/tutor/home" /> : <TutorLogin />} />
      <Route path="/home" element={tutorToken ? <TutorHome /> : <Navigate to="/tutor/login" />} />
      <Route path="/courselist" element={tutorToken ? <CourseList /> : <Navigate to="/tutor/login" />} />
      <Route path="/addcourse" element={tutorToken ? <AddCourse /> : <Navigate to="/tutor/login" />} />
      <Route path="/editcourse" element={tutorToken ? <EditCourse /> : <Navigate to="/tutor/login" />} />
      <Route path="/coursedetails" element={tutorToken ? <CourseDetails /> : <Navigate to="/tutor/login" />} />
      <Route path="/coursedetails/addlessons" element={tutorToken ? <AddLessons /> : <Navigate to="/tutor/login" />} />
    </Routes>
  );
};

export default TutorRouter;
