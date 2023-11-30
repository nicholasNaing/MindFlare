import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify';

function ProtectedRoutes() {
    const userInfo = localStorage.getItem("authen_token")
    const validatedUser = userInfo ? JSON.parse(userInfo) : {}
    const isAuthenticated = Object.keys(validatedUser).length > 0 
    if(isAuthenticated){
        return <Outlet/>
    }else{
        return <Navigate to="/login" replace={true}/>
    }
}

export default ProtectedRoutes