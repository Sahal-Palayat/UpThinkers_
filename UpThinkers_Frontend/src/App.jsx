import { useContext } from 'react'
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'
import UserRouter from './Routes/UserRouter'
import TutorRouter from './Routes/TutorRouter'
import AdminRouter from './Routes/AdminRouter'
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryPage from './Boundaries/ErrorBoundaryPage'


function App() {

  const { token, loading, tutorToken, adminToken } = useContext(AuthContext);


  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }
  

  return (
    <Router>
      <ErrorBoundary fallback={<ErrorBoundaryPage/>}>
      <Routes>
        {/* User Routes */}
        <Route path="/*" element={<UserRouter />} />

        {/* Tutor Routes */}
        <Route path="/tutor/*" element={<TutorRouter />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
      </ErrorBoundary>
    </Router>
  )
}      

export default App
