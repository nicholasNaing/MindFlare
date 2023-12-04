import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CommentItem from './CommentItem'
import { useDarktheme } from '../../contexts/ThemeContext'

function PostComments({ postId }) {
    const {darktheme} = useDarktheme()
    const [comments,setComments] = useState([])
    useEffect(()=>{
        //gets the relevant comments for the current post and store it in state
        const fetchComments = async ()=>{
            try{
                const commentsData = await axios.get(`http://127.0.0.1:3030/posts/${postId}/?_embed=comments`).then(res=>res.data)
                setComments(commentsData.comments)
            }catch(error){
                console.log(error)
            }
        }
        fetchComments();
    },[])
    return (
        <div className={`p-2`}>
            <div>
                <div className={`text-lg font-bold ${darktheme ? 'text-slate-50':'text-slate-900'}`}>Comments</div>
                {
                    comments.map((comment)=>{
                        return(
                            <CommentItem key={comment.id} comment={comment}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PostComments