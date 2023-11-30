import React from 'react'
import CarouselFunction from './Carousel/Carousel'
import MainPosts from './PostPages/MainPosts'
import { useSidebar } from '../contexts/SidebarContext';
import Sidebar from '../layouts/Sidebar';

function Home() {
  const {isSidebar,setIsSidebar} = useSidebar()
  return (
    <>
      {isSidebar && <Sidebar/>}
      <CarouselFunction/>
      <MainPosts/>
    </>
  )
}
export default Home