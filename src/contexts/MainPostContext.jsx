import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';

//this context handles the mainposts, pagination of the posts which include the visibility of new and prev buttons

const MainPostContext = React.createContext()

const PaginateReducer = (state,action)=>{
    switch(action.type){
        case "nextPage":
            return ({count:state.count + 1})
        case "prevPage":
            return ({count:state.count - 1})
        default:
            return state
    }
}

export const MainPostProvider = ({children}) =>{
    const [mainPosts,setMainPosts] = useState([])
    //default value will true for both buttons
    //depending on the pagination of the post, it will change the booleon value
    const [nextButton,setNextButton] = useState(true) 
    const [prevButton,setPrevButton] = useState(true)
    const [state,dispatch] = useReducer(PaginateReducer,{count:1})

    const paginationLimit = 20;

    useEffect(()=>{
        async function fetchPosts(){
            try{
                const fetchMainPosts = await axios.get(`http://127.0.0.1:3030/posts?_page=${state.count}&_limit=${paginationLimit}`)
                .then(res=>{
                    const totalPosts = res.headers['x-total-count']//x-total-count gets the total number of posts
                    const totalPages = Math.ceil(totalPosts/paginationLimit)//this calulate the total pages for all the posts
                    //below indicates, if state.count(currentpage) reaches the end of posts, the total pages,
                    //it will hide the next button
                    if(state.count === totalPages){
                        setNextButton(false)
                    }else{
                        setNextButton(true)
                    }
                    //if state.count(currentPage) is 1(which is the firstPage), the prev button will be hidden
                    if(state.count === 1){
                        setPrevButton(false)
                    }else{
                        setPrevButton(true)
                    }
                    return res.data
                })
                setMainPosts(fetchMainPosts)
            }catch{
                console.log("encountered some errors while fetching main posts")
            }
        }
        fetchPosts();
    },[state.count])
    return (
        <MainPostContext.Provider value={{mainPosts,setMainPosts,dispatch,nextButton,prevButton}}>
            {children}
        </MainPostContext.Provider>
    )
}

export const useMainPosts = ()=>{
    return useContext(MainPostContext)
}