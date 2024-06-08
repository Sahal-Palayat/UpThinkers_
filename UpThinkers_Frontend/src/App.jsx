import { useContext } from 'react'
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom'
import LoginPage from './Assets/User/UserLogin/LoginPage' 
import RegisterPage from './Assets/User/UserRegister/RegisterPage' 
import UserHome from './Assets/User/UserHome/UserHome'
import { AuthContext } from './Context/AuthContext'
import TutorRegister from './Assets/Tutor/TutorRegister/TutorRegister'
import TutorLogin from './Assets/Tutor/TutorLogin/TutorLogin'
import TutorHome from './Assets/Tutor/TutorHome/TutorHome'
import AdminLogin from './Assets/Admin/AdminLogin/AdminLogin'
import AdminHome from './Assets/Admin/AdminDashboard/AdminHome'
import StudentsList from './Assets/Admin/ListStudents/StudentsList'
import TutorsList from './Assets/Admin/ListTutor/TutorsList'
import AddCategory from './Assets/Admin/Category/AddCategory'
import CategoryList from './Assets/Admin/Category/CategoryList'
import AdminNavbar from './Assets/Components/AdminComponents/AdminNavbar'
import AddCourse from './Assets/Tutor/Courses/AddCourse'
import CourseList from './Assets/Tutor/Courses/CourseList'
import EditCourse from './Assets/Tutor/Courses/EditCourse'


function App() {

  const {token,loading}= useContext(AuthContext)
  const {adminToken}= useContext(AuthContext)

  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }
  

  return (
   <Router>

    <Routes>
      <Route path="/login" element={token ?  <Navigate to='/home'/>   :<LoginPage />} />
      <Route path="/" element={<UserHome/>} />
      <Route path="/register" element={token ? <UserHome/>   :<RegisterPage/>} />
      <Route path="/home" element={token ? <UserHome/> :<Navigate to='/login'/>} />


      <Route path="/tutor/register" element={token ? <TutorHome/> :<TutorRegister/>}/>
      <Route path="/tutor" element={<TutorHome/>}/>
      <Route path="/tutor/login" element={token ? <Navigate to='/tutor/home'/>  : <TutorLogin/>}/>
      <Route path="/tutor/home" element={token ?<TutorHome/>: <Navigate to='/tutor/login'/>}/> 

      <Route path="/tutor/courselist" element={<CourseList/>}/>
      <Route path="/tutor/addcourse" element={<AddCourse/>}/>
      <Route path="/tutor/editcourse" element={<EditCourse/>}/>


      <Route path="/admin/login" element={token ?<Navigate to='/admin/home'/>: <AdminLogin/>}/> 
      <Route path="/admin/home" element={token ?<AdminHome/>: <Navigate to='/admin/login' />}/>
      <Route path="/admin/studentslist" element={<StudentsList/>}/>
      <Route path="/admin/tutorslist" element={<TutorsList/>}/>
      <Route path="/admin/addcategory" element={<AddCategory/>}/>
      <Route path="/admin/categorylist" element={<CategoryList/>}/>
      <Route path="/admin/navbar" element={<AdminNavbar/>}/>






    </Routes>

   </Router>
  )
}      

export default App
