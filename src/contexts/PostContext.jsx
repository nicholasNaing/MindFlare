import React, { useEffect,useContext, useState } from 'react';
import axios from 'axios';

//this context handles the feature posts for the carousel

const PostContext = React.createContext()


export const FeaturePostsProvider = ({children})=>{
    useEffect(()=>{
        try {
            async function fetchPosts(){
                const posts = await axios.get("https://mindflarejsondata.onrender.com/posts?_sort=id&_order=desc&_limit=10").then(res=>res.data)
                setFeaturePosts(posts)
            }
            fetchPosts();
        }catch(error){
            console.error(error)
        }
    },[])
    const [featureposts,setFeaturePosts] = useState([])
    return (
        <PostContext.Provider value={{featureposts,setFeaturePosts}}>
            {children}
        </PostContext.Provider>
    )
}
export const useFeaturePost = ()=>{
    return useContext(PostContext)
}