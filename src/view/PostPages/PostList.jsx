import React from 'react'
import PostItem from './PostItem'

function PostList({mainPosts}) {
  return (
    <>
        {
            mainPosts.map((postItem)=>{
                return(
                    <PostItem key={postItem.id} postItem={postItem}/>
                )
            })
        }
    </>
  )
}

export default PostList