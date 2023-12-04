import React, { useState } from 'react'
import { useSidebar } from '../../contexts/SidebarContext'
import Sidebar from '../../layouts/Sidebar'
import { useDarktheme } from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import axios from 'axios'
import { toast } from 'react-toastify'

function CreatePost() {
    const userInfo = localStorage.getItem("authen_token")
    const {userId,...rest} = userInfo ? JSON.parse(userInfo) : {}
    const currentTime = dayjs().format()

    const navigate = useNavigate()
    const {isSidebar,setIsSidebar} = useSidebar()
    const {darktheme} = useDarktheme()

    const [postTitle,setPostTitle] = useState('')
    const [postImage,setPostImage] = useState('')
    const [postContent,setPostContent] = useState('')

    //form clean up
    function clearForm(){
        setPostTitle('')
        setPostImage('')
        setPostContent('')
    }

    const createPost = async (e)=>{
        // if the button is clicked, the data are added to the posts data with relevant logged in user
        e.preventDefault()
        const postData = {
            title:postTitle,
            image_url:postImage,
            content:postContent,
            created_at:currentTime,
            userId:parseInt(userId)
        }
        await axios.post(`http://127.0.0.1:3030/posts/`,postData).then(toast("Your post has successfully added"))
        clearForm();
        navigate("/")
        window.location.reload()
    }
  return (
    <>
        {isSidebar && <Sidebar/>}
        <div className={`h-screen flex justify-center items-center ${isSidebar ? 'relative sm:w-[60%] sm:left-[40%] md:w-[70%] md:left-[30%]':'w-[100%]'}`}>
            <div className={`w-[90%] md:w-[70%] h-[70%] ${darktheme ? 'bg-slate-50':'bg-slate-900'} rounded-lg bg-opacity-20 p-2 flex flex-col items-center justify-center`}>
                <div className={`text-xl font-bold mb-3`}>
                    <h3>Make a blog post</h3>
                </div>
                <form onSubmit={createPost} className={`w-[90%] h-[90%] flex flex-col justify-evenly`}>
                    <div>
                        <input value={postTitle} onChange={(e)=>setPostTitle(e.target.value)} type="text" className={`w-[100%] px-2 py-2 rounded-lg`} name="post_title" placeholder="title of the post" required />
                    </div>
                    <div>
                        <input value={postImage} onChange={(e)=>setPostImage(e.target.value)} type="url" className={`w-[100%] px-2 py-2 rounded-lg`} name="image_url" placeholder="image url here" required />
                    </div>
                    <textarea value={postContent} onChange={(e)=>setPostContent(e.target.value)} className={`w-[100%] h-[60%] text-base rounded-lg px-2 py-2 resize-none`} placeholder='Enter your post content'></textarea>
                    <div className={`flex justify-end items-center gap-3`}>
                        <div onClick={()=> navigate("/")} className={`py-0.5 px-2 border-2 border-slate-900 rounded-lg cursor-default hover:bg-slate-900 hover:text-white hover:transition-colors ease-in-out duration-500`}>back</div>   
                        <button type='submit' className={`py-0.5 px-2 border-2 border-green-500 rounded-lg cursor-default hover:bg-green-500 hover:text-white hover:transition-colors ease-in-out duration-500`}>Post</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default CreatePost