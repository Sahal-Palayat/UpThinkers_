import React from 'react'
import logo from '/logoo.png'
import Navbar from '../../Components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie';







function UserHome() {

    const user = useSelector((state) => state.user.user)
   

    console.log(user, 'sdcsdssa')
    
        return (
            <div>
                <Navbar />
                
            </div>
        )
    
   
}

export default UserHome
