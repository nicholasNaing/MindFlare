import React from 'react'
import { useMainPosts } from '../../contexts/MainPostContext'
import { useDarktheme } from '../../contexts/ThemeContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSidebar } from '../../contexts/SidebarContext'
import PostList from './PostList'

function MainPosts() {
    const navigate = useNavigate()
    const authen_token = localStorage.getItem("authen_token")
    const{darktheme} = useDarktheme()
    //mainpost ==> post data
    //dispatch ==> contain function to paginate between pages
    //nextButoon and prevBitton ==> they are booleon values to decide the visibility state of buttons
    //what i mean by that is if its the first page, there would be no prev button and booleon value for prevButton would false
    const {mainPosts,dispatch,nextButton,prevButton} = useMainPosts()
    const {isSidebar,setIsSidebar} = useSidebar()

    //below two function calls dispatch from useMainposts to go to next page or previous page
    const handleNext = ()=>{

        if(authen_token){
            dispatch({type:'nextPage'})
        }else{
            toast.error("You need to log in first")
            navigate("/login")
        }
    }
    const handlePrev = ()=>{
        
        if(authen_token){
            dispatch({type:'prevPage'})
        }else{
            toast.error("You need to log in first")
        }
    }

    return (
    <div className={isSidebar ? `pt-12 relative sm:left-[40%] sm:w-[60%] md:left-[30%] md:w-[70%]`:`pt-12`}>
        <h1 className="text-center text-xl font-bold my-3">Main Posts</h1>
        <div className="main-posts-container grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
        {
           mainPosts.length > 0 && <PostList mainPosts={mainPosts}/>
        }
        </div>
        <div className="flex flex-row justify-center items-center gap-3 pb-6">
            {prevButton && <div className={`py-0.5 px-2 border-2 rounded-lg cursor-default hover:transition-colors ease-in-out duration-500 ${darktheme ? 'border-slate-50 text-slate-50 hover:bg-slate-50 hover:text-slate-950':'border-slate-900 hover:bg-slate-900 hover:text-white'}`} onClick={handlePrev} >prev</div>}
            {nextButton && <div className={`py-0.5 px-2 border-2 rounded-lg cursor-default hover:transition-colors ease-in-out duration-500 ${darktheme ? 'border-slate-50 text-slate-50 hover:bg-slate-50 hover:text-slate-950':'border-slate-900 hover:bg-slate-900 hover:text-white'}`} onClick={handleNext} >next</div>}
        </div>
    </div>
  )
}

export default MainPosts