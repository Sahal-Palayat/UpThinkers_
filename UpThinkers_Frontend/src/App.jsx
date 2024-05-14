import {} from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import LoginPage from './Assets/User/UserLogin/LoginPage' 
import RegisterPage from './Assets/User/UserRegister/RegisterPage' 


function App() {

  return (
   <Router>

    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage/>} />
    </Routes>

   </Router>
  )
}      

export default App
