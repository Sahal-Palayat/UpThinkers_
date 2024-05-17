import { useContext } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import LoginPage from './Assets/User/UserLogin/LoginPage' 
import RegisterPage from './Assets/User/UserRegister/RegisterPage' 
import UserHome from './Assets/User/UserHome/UserHome'
import { AuthContext } from './Context/AuthContext'


function App() {

  const {token,loading}= useContext(AuthContext)

  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }
  

  return (
   <Router>

    <Routes>
      <Route path="/login" element={token ?  <UserHome/>   :<LoginPage />} />
      <Route path="/" element={<UserHome/>} />
      <Route path="/register" element={token ? <UserHome/>   :<RegisterPage/>} />
      <Route path="/home" element={token ? <UserHome/> :<LoginPage/>} />

      



    </Routes>

   </Router>
  )
}      

export default App
