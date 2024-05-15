import {} from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import LoginPage from './Assets/User/UserLogin/LoginPage' 
import RegisterPage from './Assets/User/UserRegister/RegisterPage' 
import UserHome from './Assets/User/UserHome/UserHome'


function App() {

  return (
   <Router>

    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/home" element={<UserHome/>} />
    </Routes>

   </Router>
  )
}      

export default App
