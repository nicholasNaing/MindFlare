import { useContext,useState } from "react"
import React from 'react';

//this context handles the booleon state of the sidebar,

const SidebarContext = React.createContext()

export const SidebarProvider = ({children})=>{
    const [isSidebar,setIsSidebar] = useState(false)
    return (
        <SidebarContext.Provider value={{isSidebar,setIsSidebar}}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = ()=>{
    return useContext(SidebarContext)
}