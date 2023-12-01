import React from 'react'
import CarouselFunction from './Carousel/Carousel'
import MainPosts from './PostPages/MainPosts'
import { useSidebar } from '../contexts/SidebarContext';
import Sidebar from '../layouts/Sidebar';
import Banner from '../layouts/Banner';

function Home() {
  const {isSidebar,setIsSidebar} = useSidebar()
  return (
    <>    
      {isSidebar && <Sidebar/>}
      <Banner/>
      <CarouselFunction/>
      <MainPosts/>
    </>
  )
}
export default Home