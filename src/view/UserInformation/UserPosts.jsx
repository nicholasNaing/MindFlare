import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PostItem from '../PostPages/PostItem'
import { useDarktheme } from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../layouts/Sidebar'
import { useSidebar } from '../../contexts/SidebarContext'

//below is pretty much straight forward
//using the userId stored in localstorage, i query the corresponding post from that user
//if the post is clicked, it will be directed to detail page of that post
function UserPosts() {
  const navigate = useNavigate()

  const {userId,...rest} = JSON.parse(localStorage.getItem("authen_token"))
  const {darktheme} = useDarktheme()
  const {isSidebar,setIsSidebar} = useSidebar()

  const [userPosts,setUserPosts] = useState([])

  function handleRoute(postId){
    navigate(`/posts/detail/${postId}`)
  }
  useEffect(()=>{
    const fetchUserPosts = async ()=>{
      const postData = await axios.get(`http://localhost:3030/users/${userId}?_embed=posts`).then(res=>res.data)
      setUserPosts(postData.posts)
    }
    fetchUserPosts();
  },[])
  return (
    <>
      {isSidebar && <Sidebar/>}
      {userPosts.length>0 ? 
      <div className={`p-3 h-screen ${isSidebar ? 'w-[70%] relative left-[30%]' : 'w-screen'} flex flex-col justify-center items-center`}>
          <div className={`text-2xl font-bold my-3 ${darktheme ? 'text-slate-50':'text-slate-900'}`}>Below are you posts</div>
          <div className={`p-3 rounded-lg h-[80%] ${darktheme ? 'bg-slate-900':'bg-sky-300'} grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto justify-center items-center `}>
            {
              userPosts.map((postItem)=>{
                return (
                  <div onClick={()=> handleRoute(postItem.id)} key={postItem.id} className={`h-[100%] w-[80%] relative left-[50%] translate-x-[-50%] md:left-0 md:translate-x-0 md:w-auto flex flex-col border-2 rounded-md cursor-pointer shadow-md ${darktheme?"text-white border-[#F6F1D5] hover:border-sky-400 hover:shadow-orange-500":"text-black border-amber-500 hover:border-black hover:shadow-slate-50"}`}>
                    <div className="image-container">
                        <img src={postItem.image_url} alt="image not found" className="rounded-sm"/>
                    </div>
                    <div className="heading">
                        <div className='post-title'><b>{postItem.title}</b></div>
                        <div className="text-muted" style={{fontSize: "13px"}}>{postItem.created_at}</div>
                    </div>
                    <div className="post-body">{postItem.content}</div>
                  </div>
                )
              })
            }
          </div>
      </div>:
      <div className={`h-screen text-center flex justify-center items-center  ${isSidebar && 'relative left-[30%] w-[70%]'}`}>
            <div className={`text-2xl font-bold`}>You have not posted anything yet</div>
      </div>}
    </>
  )
}

export default UserPosts