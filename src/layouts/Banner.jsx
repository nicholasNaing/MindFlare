import React from 'react'
import bgImageDay from '../assets/cityscape.jpg'
import bgImageDark from '../assets/nightsky.jpg'
import { useDarktheme } from '../contexts/ThemeContext'
import { useSidebar } from '../contexts/SidebarContext'
import { Link } from 'react-router-dom'

function Banner() {
    const {darktheme} = useDarktheme()
    const {isSidebar} = useSidebar()
  return (
    <div className={`pt-20 flex justify-center items-center ${isSidebar ? 'relative sm:left-[40%] sm:w-[60%] md:left-[30%] md:w-[70%]':''}`}>
        <div className={`h-[70vh] w-[95%] rounded-lg bg-center bg-cover`} style={{backgroundImage:`${darktheme ? `url('${bgImageDark}')`:`url('${bgImageDay}')`}`}}>
            <div className={`${darktheme ? 'bg-slate-900':'bg-slate-50'} flex flex-col lg:flex-row justify-between items-center bg-opacity-30 w-[100%] h-[100%]`} >
              <div className={`flex-[50%] text-center font-bold text-xl md:text-2xl leading-10 flex flex-col justify-center p-4 ${darktheme ? 'text-slate-50':'text-slate-900'}`}>
                <p>Welcome to Mindflare – Ignite Ideas, Spark Conversations!</p>
                <p>Your space to share, connect, and let your mind flare! </p>
              </div>
              <div className={`flex-[50%] flex justify-center items-start lg:items-center text-center`} >
                <Link to="/register" className={`py-2 px-3 text-lg font-bold w-[100%] lg:w-[70%] border-2 ${darktheme ? 'border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-50':'text-amber-700 border-amber-700 hover:bg-amber-700 hover:text-slate-50'} rounded-lg cursor-default hover:transition-colors ease-in-out duration-500`}>Register now</Link>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Banner