import React,{createContext,useState,useEffect} from "react";
import Cookies from 'js-cookie'




export const AuthContext= createContext()

export const AuthProvider= ({children})=>{
    const [token,setToken]= useState(null)
    const [loading,setLoading]=useState(true)
    const [adminToken,setAdminToken]=useState(null)
    const [tutorToken,setTutorToken]=useState(null)
    useEffect(()=>{
        const token = Cookies.get('token')
        const adminToken = Cookies.get('adminToken')
        const tutorToken = Cookies.get('tutorToken')
        console.log('token',token);
        console.log(adminToken);
        setAdminToken(adminToken,'adminnnnnnnnnnnnnn')
        setTutorToken(tutorToken,'tutornnnnnnnnnnnnn')
        setToken(token)
        setLoading(false)
    },[])

    return (
        <AuthContext.Provider value={{token,setToken,loading,setLoading,adminToken,setAdminToken,tutorToken,setTutorToken}}>
            {children}
        </AuthContext.Provider>
    )
}