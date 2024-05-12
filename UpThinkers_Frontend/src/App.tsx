import {} from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import LoginPage from './Assets/UserLogin/LoginPage'
import RegisterPage from './Assets/UserRegister/RegisterPage'


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
