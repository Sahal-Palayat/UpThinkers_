import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext } from '../Context/AuthContext';
import AdminLogin from '../Assets/Admin/AdminLogin/AdminLogin';
import AdminHome from '../Assets/Admin/AdminDashboard/AdminHome';
import StudentsList from '../Assets/Admin/ListStudents/StudentsList';
import TutorsList from '../Assets/Admin/ListTutor/TutorsList';
import AddCategory from '../Assets/Admin/Category/AddCategory';
import CategoryList from '../Assets/Admin/Category/CategoryList';
import AdminNavbar from '../Assets/Components/AdminComponents/AdminNavbar';

const AdminRouter = () => {
  const { adminToken } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={adminToken ? <Navigate to="/admin/home" /> : <AdminLogin />} />
      <Route path="/home" element={adminToken ? <AdminHome /> : <Navigate to="/admin/login" />} />
      <Route path="/studentslist" element={adminToken ? <StudentsList /> : <Navigate to="/admin/login" />} />
      <Route path="/tutorslist" element={adminToken ? <TutorsList /> : <Navigate to="/admin/login" />} />
      <Route path="/addcategory" element={adminToken ? <AddCategory /> : <Navigate to="/admin/login" />} />
      <Route path="/categorylist" element={adminToken ? <CategoryList /> : <Navigate to="/admin/login" />} />
      <Route path="/navbar" element={adminToken ? <AdminNavbar /> : <Navigate to="/admin/login" />} />
    </Routes>
  );
};

export default AdminRouter;
