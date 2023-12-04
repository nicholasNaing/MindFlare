import axios from "axios"
import React from 'react';
import { createContext, useContext, useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//this context handle the deletetion of the post by its author(logged in user)

const PostIdContext = React.createContext()

export const PostIdProvider = ({children})=>{
    const userInfo = localStorage.getItem("authen_token")
    const {userId,...rest} =  userInfo ? JSON.parse(userInfo) : {}
    const [currentPostId,setCurrentPostId] = useState('') //get the current postId from the detail page
    const [validUserToPost,setValidUserToPost] = useState(false) //this state checks if the logged in user is the same as the post owner
    const [deletePost,setDeletePost] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        if(deletePost){ //as i mentioned in detailPage component, the deletion process will begin as the value set to true
            try{
                axios.delete(`https://mindflarejsondata.onrender.com/posts/${currentPostId}`)//api call to delete
                navigate("/") //get back to the home page after deletion
                toast.info("You deleted the post") //informing the user
                setDeletePost(false) //set the value back to false after the post deletion
                setInterval(()=>{window.location.reload()},1000)
            }catch(error){
                console.log(error)
            }
        }
    },[deletePost]) //this useEffect will run if the state of the delete post is change. meaning as it turns true, will run this side-effect

    useEffect(()=>{
        //this function fetch the data of the post author and compare with the logged in user
        const fetchUser = async ()=>{
            try{
                //in below api call, i could have just call the post to check its userId which is another way
                const data = await axios.get(`https://mindflarejsondata.onrender.com/posts/${currentPostId}?_expand=user`).then(res=>res.data)
                console.log(data.user.id,userId)
                data.user.id === userId ? setValidUserToPost(true) : setValidUserToPost(false)
            }catch(error){
                console.log(error)
            }
        }
        currentPostId && fetchUser();  //the above async function will run only if the post id is there, or else, we will get errors
    },[currentPostId])//the useEffect run as we got the value for the currentPostId

    return (
        <PostIdContext.Provider value={{setCurrentPostId,validUserToPost,setValidUserToPost,setDeletePost}}>
            {children}
        </PostIdContext.Provider>
    )
}
export const usePostId = ()=>{
    return useContext(PostIdContext)
}