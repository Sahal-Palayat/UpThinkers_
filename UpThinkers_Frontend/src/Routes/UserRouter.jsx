import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext } from '../Context/AuthContext';
import LoginPage from '../Assets/User/UserLogin/LoginPage';
import UserHome from '../Assets/User/UserHome/UserHome';
import RegisterPage from '../Assets/User/UserRegister/RegisterPage';
import CoursePage from '../Assets/User/Courses/CoursePage';
import SingleCourse from '../Assets/User/Courses/SingleCourse';
import CheckoutPage from '../Assets/User/Checkout/CheckoutPage';
import ProfilePage from '../Assets/User/Profile/ProfilePage';
import PrivateRoute from './PrivateRoute';
import TutorsPage from '../Assets/User/TutorDetails/TutorsPage';
import TutorDetails from '../Assets/User/TutorDetails/TutorDetails';
import UserCourse from '../Assets/User/UserCourse/UserCourse';
import UserCourseDetails from '../Assets/User/UserCourse/UserCourseDetails';
import About from '../Assets/Components/UserComponents/About';
import ContactPage from '../Assets/Components/UserComponents/ContactPage';
import ChatWithOpenAI from '../Assets/Components/OpenAi/ChatWithOpenAI';
import VideoTag from '../Assets/User/VideoTag/VideoTag';
import GetCertificate from '../Assets/User/Certificates/GetCertificate';
import MainPage from '../Assets/User/UserHome/MainPage';


const UserRouter = () => {
  const { token } = useContext(AuthContext);


  return (
    <Routes>
    {/* Public Routes */}
    <Route path="/login" element={token ? <Navigate to="/home" /> : <LoginPage />} />
    <Route path="/register" element={token ? <Navigate to="/home" /> : <RegisterPage />} />
    <Route path="/" element={ <MainPage />} />



    {/* Private Routes */}
    {/* <Route path="/" element={<PrivateRoute><UserHome /></PrivateRoute>} /> */}
    <Route path="/home" element={<PrivateRoute><UserHome /></PrivateRoute>} />
    <Route path="/courselist" element={<PrivateRoute><CoursePage /></PrivateRoute>} />
    <Route path="/coursedetails" element={<PrivateRoute><SingleCourse /></PrivateRoute>} />
    <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
    <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
    <Route path="/tutorspage" element={<PrivateRoute><TutorsPage /></PrivateRoute>} />
    <Route path="/tutordetails" element={<PrivateRoute><TutorDetails /></PrivateRoute>} />
    <Route path='/profile/usercourses' element={<PrivateRoute><UserCourse/></PrivateRoute>}/>
    <Route path='/singlecourse' element={<PrivateRoute><UserCourseDetails/></PrivateRoute>}/>
    <Route path='/about' element={<PrivateRoute><About/></PrivateRoute>}/>
    <Route path='/contact' element={<PrivateRoute><ContactPage/></PrivateRoute>}/>
    <Route path='/chatwithopenai' element={<PrivateRoute><ChatWithOpenAI/></PrivateRoute>}/>
    <Route path='/videotag' element={<PrivateRoute><VideoTag/></PrivateRoute>}/>
    <Route path='/getcertificate' element={<PrivateRoute><GetCertificate/></PrivateRoute>}/>


  </Routes>
  );
};

export default UserRouter;
