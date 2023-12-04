import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useSidebar } from '../../contexts/SidebarContext';
import Sidebar from '../../layouts/Sidebar';
import { usePostId } from '../../contexts/PostDeleteContext';
import PostComments from '../Comments/PostComments';
import CreateComment from '../Comments/CreateComment';
import dayjs from 'dayjs';
import { useDarktheme } from '../../contexts/ThemeContext';
import { FacebookIcon, RedditShareButton,FacebookShareButton, RedditIcon, TelegramIcon, TelegramShareButton, EmailShareButton, EmailIcon, ViberShareButton, ViberIcon } from "react-share";

function DetailPostPage() {
  const postId = useParams()
  const [detailPost,setDetailPost] = useState({})
  const {isSidebar,setIsSidebar} = useSidebar()
  const {setCurrentPostId,setValidUserToPost,validUserToPost} = usePostId()
  const {darktheme} = useDarktheme()

  // const [comment,setComment] = useState('')
    
  useEffect(()=>{
    setCurrentPostId(postId.id)
    fetchDeatilPost();
    return ()=>{
      //in the dependency array of useEffect in make the delete button hidden and display, i used pthis currentPostId,
      //so, if i dont clean up, if i click this detial page two times consecutively, the id will still the same and wont show up the delete button.
      //that's why i have to clean up this useState back to empty.
      setCurrentPostId('')
      setValidUserToPost(false)  //this is the clean up function which will make the booleon value false after we leave the compmonent
    }
  },[])

  const fetchDeatilPost = async ()=>{
    //fetch the post data with id from the url
    const data = await axios.get(`https://mindflarejsondata.onrender.com/posts/${postId.id}`).then(res=>res.data)
    //to put the author name below post title, had to call another api to get the postAutor data
    const userName = await axios.get(`https://mindflarejsondata.onrender.com/users/${data.userId}`).then(res=>res.data)
    //then use object destructuring, spread to add the additional data such as formatted date and author name
    const Detaildata = {...data,created_at:dayjs(data.created_at).format("DD-MMM-YYYY"),authorName:userName.name}
    setDetailPost(Detaildata)
  }

  const paragraphPost = detailPost.content && detailPost.content.split("\n") 
  return (
    <>
      {isSidebar && <Sidebar/>}
      <div className={`flex flex-col items-center ${isSidebar && 'relative sm:left-[40%] sm:w-[60%] md:left-[30%] md:w-[70%]'}`}>
        <div className={`bg-slate-600 bg-opacity-20 min-h-screen ${validUserToPost ? 'pt-24':'pt-12'} ${isSidebar ? 'w-[90%]':'w-[90%] sm:w-[80%]'}`}>
          <div className={`h-auto p-7 flex flex-col items-center justify-center text-center gap-2 ${darktheme ? 'text-slate-50':'text-slate-900'}`}>
            <div className={`text-3xl font-bold`}>{detailPost.title}</div>
            <div>posted on {detailPost.created_at}</div>
            <div>by {detailPost.authorName}</div>
          </div>
          <div className={`border-b-2 ${darktheme ? 'border-slate-50':'border-slate-900'}`}>
            <div className={`bg-black h-[500px] w-[100%]`}>
              <img src={detailPost.image_url}/>
            </div>
            <div className={`p-3 text-lg leading-7 ${darktheme ? 'text-slate-50':'text-slate-900'}`}>
              {paragraphPost && paragraphPost.map((paragraph,index)=>{
                return <p className={`first-letter:ml-8 mb-2`} key={index}>{paragraph}</p>
              })}
            </div>
          </div>
          <div className={`pb-8 pt-2`}>
            <div className={`flex items-center justify-between border-b-2 pb-2 ${darktheme ? 'border-slate-50':'border-slate-900'}`}>
              <div className={`${darktheme ? 'text-slate-50':'text-slate-900'} font-bold text-sm md:text-lg md:pl-5 pl-2`}>Share you post</div>
              <div className={`w-[70%] grid grid-flow-col justify-evenly gap-4 px-2`}>
                {/* below, url is the link you are going to share */}
                <FacebookShareButton url='https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs'>
                  <FacebookIcon className={`rounded-lg hover:rounded-2xl hover:transition-all duration-300 w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px]`} />
                </FacebookShareButton>
                <TelegramShareButton url='https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs'>
                  <TelegramIcon className={`rounded-lg hover:rounded-2xl hover:transition-all duration-300 w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px]`}/>
                </TelegramShareButton>
                <RedditShareButton url='https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs'>
                  <RedditIcon className={`rounded-lg hover:rounded-2xl hover:transition-all duration-300 w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px]`}/>
                </RedditShareButton>
                <EmailShareButton url='https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs'>
                  <EmailIcon className={`rounded-lg hover:rounded-2xl hover:transition-all duration-300 w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px]`}/>
                </EmailShareButton>
                <ViberShareButton url='https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs'>
                  <ViberIcon className={`rounded-lg hover:rounded-2xl hover:transition-all duration-300 w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px]`}/>
                </ViberShareButton>
              </div>
            </div>
            <PostComments postId={postId.id} />
            <CreateComment postId={postId.id} />
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailPostPage