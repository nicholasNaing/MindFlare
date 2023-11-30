import React,{useState, useContext} from 'react';

//this context handle for the change between day and night

const themeContext = React.createContext()
export const themeProvider = ({children})=>{
    const [darktheme,setDarkTheme] = useState(false)
    return <themeContext.Provider value={{darktheme,setDarkTheme}}>
        {children}
    </themeContext.Provider>
}
export const useDarktheme = ()=>{
    return useContext(themeContext)
}