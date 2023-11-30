import React,{useState} from 'react'
import Item from './Item';
import Carousel from "react-elastic-carousel";
import { useFeaturePost } from '../../contexts/PostContext';
import { useSidebar } from '../../contexts/SidebarContext';
import { useNavigate } from 'react-router-dom';
import { useDarktheme } from '../../contexts/ThemeContext';
import dayjs from 'dayjs';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
];
function CarouselFunction() {
    const navigate = useNavigate()
    const {featureposts,setFeaturePosts} = useFeaturePost()
    const {isSidebar,setIsSidebar} = useSidebar()
    const {darktheme} = useDarktheme()

    function handleRoute(postId){
        navigate(`posts/detail/${postId}`)
    }
    return (
        <div className={isSidebar ? `pt-16 relative sm:w-[60%] sm:left-[40%] md:w-[70%] md:left-[30%] lg:w-[70%] lg:left-[30%]`:`pt-16`}>
            <h1 className="text-center mt-3 text-2xl font-bold">Feature Posts</h1>
            <div className="carousel-wrapper">
                <Carousel breakPoints={breakPoints}>
                    {featureposts.map((post) => (
                        //here item is imported from Item.jsx and now its div
                        <Item className={`${darktheme ? 'text-slate-50 bg-black':'text-slate-900'} hover:scale-105 duration-200 `} key={post.id} onClick={()=>handleRoute(post.id)}>
                            <div className="image-container">
                                <img style={{borderRadius:"10px 10px 0px 0px"}} src={post.image_url} alt="image not found"/>
                            </div>
                            <div className={`heading ${darktheme ? 'text-slate-50':'text-slate-900'}`}>
                                <div className='post-title'><b>{post.title}</b></div>
                                <div className="text-muted" style={{fontSize: "13px"}}>posted on {dayjs(post.created_at).format("DD-MMM-YYYY")}</div>
                            </div>
                            <div className={`post-body ${darktheme ? 'text-slate-50':'text-slate-900'}`}>{post.content}</div>
                        </Item>
                    ))}
                </Carousel>
            </div>
        </div>
  )
}

export default CarouselFunction;