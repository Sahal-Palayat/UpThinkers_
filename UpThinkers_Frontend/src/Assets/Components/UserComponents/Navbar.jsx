import React, { useContext } from 'react'
import logo from '/logoo.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import {clearUser } from '../../../Store/userAuthSlice';
import { AuthContext } from '../../../Context/AuthContext';
import { Nav, NavLink, Bars, NavMenu} from './NavbarElements';
import Head from './Head';

import './Navbar.css'


function Navbar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {setToken} = useContext(AuthContext)
    const user = useSelector((state) => state.user.user)
    console.log(user,'navbarrrrr');


    const logout = () => {
        Cookies.remove('token')
        setToken(null)
        dispatch(clearUser())
        navigate('/login')
    }

    return (
        <>
        {/* <Head /> */}
        
            
            
          <Nav className='' >
          <div className="ml-0">
          <img src={logo} alt="" className='h-[90px] pt-4 pr-4 ml-16' />
          </div>
          <Bars />
            
          
            <NavMenu className='' >
                
              <NavLink to='/'>Home</NavLink>
              <NavLink to='/view'>Docs</NavLink>
              <NavLink to='/courses'>Courses</NavLink>
              <NavLink to='/onlineExam'>OnlineExam</NavLink>
              <NavLink to='/admission'>Admission</NavLink>
              <NavLink to='/media'>Media</NavLink>
              <NavLink to='/about'>About</NavLink>
              <NavLink to='/contact'>Contact</NavLink>
              <div className='start'>
                <NavLink to='/login'>
                  <div onClick={logout}>Logout</div>
                </NavLink>
              </div>
            </NavMenu>
          </Nav> 
      </>            
    )
}

export default Navbar
