import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useParams } from 'react-router-dom'
import { useDarktheme } from '../contexts/ThemeContext'
import { Switch } from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import { useSidebar } from '../contexts/SidebarContext'
import { usePostId } from '../contexts/PostDeleteContext'

function NavBar() {
    const {logout,authToken} = useAuth() //booleon value from context api
    const {darktheme,setDarkTheme} = useDarktheme() 
    const storedData = localStorage.getItem("authen_token")//actual value in localstorage
    
    const {name,email,profile} = storedData ? JSON.parse(storedData) : {}  // if there is data in localstorage it will parse the object else it return empty
    //if data in localstorage, destructure that data, else destructure empty object
    const {isSidebar,setIsSidebar} = useSidebar()

    const {validUserToPost,setDeletePost} = usePostId() 
    console.log(validUserToPost);
    //valid user to post check if the author of the post is logged in user
    //and setDelete post set true to booleon and if its true, the post will be deleted in postdelete context
    const handleDeletePost = ()=>{
        setDeletePost(true)
    }
    return (
        <nav className={`flex flex-row items-center justify-between w-full min-h-[50px] ${darktheme ? 'bg-slate-900 text-slate-100 hover:shadow-slate-200 ':'bg-sky-300 text-slate-950 hover:shadow-slate-900'} fixed top-0 z-20 shadow-lg duration-300 mb-10`}>
            <Link to="/" className="ml-5 text-2xl font-bold cursor-default">
                Mindflare
            </Link>
            <div className="flex flex-col gap-2 items-center">
                <div className="flex flex-row gap-3 justify-evenly items-center my-3">
                    <NavLink to="/" className={`hidden sm:block`}>Home</NavLink>
                    {authToken ? 
                    <div onClick={()=>setIsSidebar(!isSidebar)} className={`flex justify-center items-center gap-2 cursor-default`}>
                        {name}<img src={profile} alt="profile_image" style={{width:"40px",height:"40px",borderRadius:"50%"}}/>
                    </div>: 
                    <NavLink to="/login">Log in</NavLink>
                    }
                    <Switch onClick={()=>setDarkTheme(!darktheme)}/>
                </div>
                {validUserToPost ? 
                <div onClick={handleDeletePost} className={`w-[50%] mb-3 text-center py-0.5 px-2 border-2 border-red-700 rounded-lg cursor-default hover:bg-red-700 hover:text-white hover:transition-colors ease-in-out duration-500`}>Delete</div>
                :
                ''}
            </div>
        </nav>
  )
}

export default NavBar