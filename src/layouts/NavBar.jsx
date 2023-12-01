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
            <Link to="/" className="text-amber-500 ml-5 text-2xl font-bold cursor-default flex justify-center items-end">
                Mindflare
                <svg fill="#ff7300" 
                height="40px" 
                width="40px" 
                version="1.1" 
                id="Capa_1" 
                xmlns="http://www.w3.org/2000/svg" 
                xmlns:xlink="http://www.w3.org/1999/xlink" 
                viewBox="-61.2 -61.2 734.40 734.40" 
                xml:space="preserve" 
                stroke="#ff7300" 
                transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0">
                </g><g id="SVGRepo_iconCarrier"> <g> 
                <path className="animate-pulse" d="M216.02,611.195c5.978,3.178,12.284-3.704,8.624-9.4c-19.866-30.919-38.678-82.947-8.706-149.952 c49.982-111.737,80.396-169.609,80.396-169.609s16.177,67.536,60.029,127.585c42.205,57.793,65.306,130.478,28.064,191.029 c-3.495,5.683,2.668,12.388,8.607,9.349c46.1-23.582,97.806-70.885,103.64-165.017c2.151-28.764-1.075-69.034-17.206-119.851 c-20.741-64.406-46.239-94.459-60.992-107.365c-4.413-3.861-11.276-0.439-10.914,5.413c4.299,69.494-21.845,87.129-36.726,47.386 c-5.943-15.874-9.409-43.33-9.409-76.766c0-55.665-16.15-112.967-51.755-159.531c-9.259-12.109-20.093-23.424-32.523-33.073 c-4.5-3.494-11.023,0.018-10.611,5.7c2.734,37.736,0.257,145.885-94.624,275.089c-86.029,119.851-52.693,211.896-40.864,236.826 C153.666,566.767,185.212,594.814,216.02,611.195z"></path> </g> </g>
                </svg>
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