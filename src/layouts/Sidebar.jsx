import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom'
import { useDarktheme } from '../contexts/ThemeContext'
import { useSidebar } from '../contexts/SidebarContext'
import { sidebarData } from './SidebarData';
import { useAuth } from '../contexts/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { usePostId } from '../contexts/PostDeleteContext';

function Sidebar() {
  const {validUserToPost} = usePostId()
  const {logout} = useAuth() //booleon value from context api
  const {darktheme} = useDarktheme()
  const {setIsSidebar} = useSidebar()
  return (
    
    <div className={`flex flex-col ${validUserToPost ? 'pt-28':'pt-14'} w-[100%]  sm:w-[40%] md:w-[30%] lg:w-[30%] bg-opacity-60 backdrop-blur-2xl md:bg-opacity-20 lg:bg-opacity-20 h-[100%] fixed ${darktheme ? 'bg-slate-50 border-2 border-slate-900':'bg-black border-2 border-sky-300'} z-10`}>
      <div className="text-right mr-2 my-2"><ClearIcon style={{fontSize:30,cursor:"pointer"}} onClick={()=>setIsSidebar(false)}/></div>
      <div className="w-[100%] flex flex-col text-center">
        {sidebarData.map((item)=>{
          return(
            <div key={item.title} className={`flex items-center py-2 ${darktheme ? 'hover:bg-slate-900 hover:text-slate-50' :'hover:bg-sky-300 hover:text-slate-900'}`}>
              <div className="flex-[30%] text-right mr-2">{item.icon}</div>
              <Link to={item.path} onClick={()=>setIsSidebar(false)} className="flex-[50%] text-left">{item.title}</Link>
            </div>
          )
          })}
          <div className={`flex items-center py-2 ${darktheme ? 'hover:bg-slate-900 hover:text-slate-50' :'hover:bg-sky-300 hover:text-slate-900'}`}>
            <div className="flex-[30%] text-right mr-2"><LogoutIcon/></div>
            <Link to="/login" onClick={()=>{ setIsSidebar(false);logout()}} className="flex-[50%] text-left">Log out</Link>
          </div>
      </div>
    </div>
  )
}

export default Sidebar