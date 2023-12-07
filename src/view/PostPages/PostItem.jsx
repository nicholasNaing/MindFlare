import React from 'react'
import { useDarktheme } from '../../contexts/ThemeContext'
import { useLocation, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

function PostItem({postItem}) {
  console.log(useLocation().pathname,)
  const navigate = useNavigate()
  const handleRoute = ()=>{
    navigate(`posts/detail/${postItem.id}`)
  }
  const {darktheme} = useDarktheme()
  return (
    <div onClick={handleRoute} className={`h-auto border-2 shadow-lg hover:scale-105 duration-200 p-1 rounded-md cursor-pointer ${darktheme?"text-white border-[#F6F1D5] hover:border-sky-400 hover:shadow-slate-50":"text-black border-amber-500 hover:border-black hover:shadow-orange-500"}`}>
        <div className="image-container">
            <img src={postItem.image_url} alt="image not found" className="rounded-sm"/>
        </div>
        <div className="heading">
            <div className='post-title'><b>{postItem.title}</b></div>
            <div className="text-muted" style={{fontSize: "13px"}}>posted on {dayjs(postItem.created_at).format("DD-MMM-YYYY")}</div>
        </div>
        <div className="post-body">{postItem.content}</div>
    </div>
  )
}

export default PostItem