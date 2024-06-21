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


const UserRouter = () => {
  const { token } = useContext(AuthContext);


  return (
    <Routes>
    {/* Public Routes */}
    <Route path="/login" element={token ? <Navigate to="/home" /> : <LoginPage />} />
    <Route path="/register" element={token ? <Navigate to="/home" /> : <RegisterPage />} />

    {/* Private Routes */}
    <Route path="/" element={<PrivateRoute><UserHome /></PrivateRoute>} />
    <Route path="/home" element={<PrivateRoute><UserHome /></PrivateRoute>} />
    <Route path="/courselist" element={<PrivateRoute><CoursePage /></PrivateRoute>} />
    <Route path="/coursedetails" element={<PrivateRoute><SingleCourse /></PrivateRoute>} />
    <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
    <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
  </Routes>
  );
};

export default UserRouter;
