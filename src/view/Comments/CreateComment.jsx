import axios from 'axios'
import React, { useState } from 'react'
import { useDarktheme } from '../../contexts/ThemeContext'

function CreateComment({postId}) {
    const {darktheme} = useDarktheme()
    const userInfo = localStorage.getItem("authen_token")
    const {userId,...rest} = userInfo ? JSON.parse(userInfo) : {}
    const [comment,setComment] = useState('')

    //below async function adds the comment to the database then reload for the comment to appear
    async function submitComment(postId){
        const commentData = {comment,userId,postId:parseInt(postId)}
        console.log(commentData);
        await axios.post("http://localhost:3030/comments",commentData)
        window.location.reload()
    }
  

    return (
        <div>
            <h2 className={`px-2 py-2 font-bold text-lg ${darktheme ? 'text-slate-50':'text-slate-900'}`}>Leave your comment below</h2>
            <div className={`px-2 py-2 flex flex-col gap-2`}>
                <textarea value={comment} onChange={(e)=>setComment(e.target.value)} className={`w-[90%] md:w-[70%] lg:w-[60%] h-[100px] text-base rounded-lg px-3 py-2 resize-none`} placeholder='Enter your comment'></textarea>
                <button onClick={()=>submitComment(postId)} className={`relative left-[90%] md:left-[70%] lg:left-[60%] translate-x-[-100%] w-[25%] sm:w-[15%] py-0.5 px-2 border-2 border-white hover:text-black rounded-lg cursor-default hover:bg-white transition-colors ease-in-out duration-500`}>Submit</button>
            </div>
        </div>
    )
}

export default CreateComment