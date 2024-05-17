import React,{createContext,useState,useEffect} from "react";
import Cookies from 'js-cookie'




export const AuthContext= createContext()

export const AuthProvider= ({children})=>{
    const [token,setToken]= useState(null)
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const token = Cookies.get('token')
        console.log('token',token);
        setToken(token)
        setLoading(false)
    },[])

    return (
        <AuthContext.Provider value={{token,setToken,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}