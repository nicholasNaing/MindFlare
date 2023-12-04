import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDarktheme } from '../../contexts/ThemeContext'

function CommentItem({comment}) {
  const [commentor,setCommentor] = useState({})
  const userInfo = localStorage.getItem("authen_token")
  const {userId,...rest} =  userInfo ? JSON.parse(userInfo) : {}
  const {darktheme} = useDarktheme()

  useEffect(()=>{
    const fetchCommentor = async()=>{
      try{
        const commentOwner = await axios.get(`https://mindflarejsondata.onrender.com/comments/${comment.id}?_expand=user`).then(res=>res.data)
        setCommentor(commentOwner.user)
      }catch(error){
        console.log(error)
      }
    }
    fetchCommentor();
  },[])

  function deleteComment(commentorId,commentId){
    //below check again if loggedIn user === commentowner 
    //thou its not necessarily needed, neve wrong to double check
    if(userId === commentorId){
      axios.delete(`https://mindflarejsondata.onrender.com/comments/${commentId}`) //delete the commend 
      window.location.reload()   //reload automatically for changes to take effect
    }
  }

  return (
    <div className={`mt-4 flex gap-3 items-center border-b-2 ${darktheme ? 'border-slate-50':'border-slate-900'} pb-4`}>
        <div>
          <img className={`w-[50px] h-[50px] rounded-[50%]`} src={commentor.profile_url} alt="commentor profile not found" />
        </div>
        <div className={`border-2 ${darktheme ? 'border-slate-50 text-slate-50':'border-slate-900'} w-[100%] rounded-xl`}>
          {commentor.id === userId && //if logged in user is the owner of comment
          <div className={`w-[50%] flex justify-start items-center`}>
            <div onClick={()=>deleteComment(commentor.id,comment.id)} className={`border-2 border-red-700 cursor-default hover:rounded-br-xl hover:bg-red-700 hover:text-white hover:transition-colors ease-in-out duration-500 rounded-tl-lg px-2 py-1`}>delete</div>
          </div>
          }
          <div className={`mb-1.5 font-bold px-3 pt-2`}>{commentor.name}</div>
          <div className={`px-3 pb-2`}>{comment.comment}</div>
        </div>

    </div>
  )
}

export default CommentItem