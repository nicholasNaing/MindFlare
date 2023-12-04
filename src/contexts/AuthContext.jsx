import bcrypt from 'bcryptjs'
import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

//I used localstorage to stable the logged in user. It will not lose the data, until the user is voluntarily log out.

const AuthContext = React.createContext()

export const AuthProvider = ({children})=>{
    const navigate = useNavigate()
    const [user,setUser] = useState({})
    const [authToken,setAuthToken] = useState(()=>{   //callback function on the default state of setAuthToken
        const authen_token = localStorage.getItem("authen_token")
        return !!authen_token
    })
    const errorCustomToast = () => (
        <div>
            <div>You don't have an account with this email yet</div>
            <Link to="/register" className="underline hover:cursor-default hover:text-blue-700">Register Now</Link>
        </div>
    );
    const errorLoginNoti = ()=> {
        toast.error(errorCustomToast)
    }
    useEffect(()=>{
        if(Object.keys(user).length != 0){
            async function authenticate(){
                //below checked if the logged in info is email or phonenumber
                //if its email, call api with or else, call the api with phone
                const checkAuthenticateData = user.userInfo.includes("@") ? 
                await axios.get(`https://mindflarejsondata.onrender.com/users?email=${user.userInfo}`).then(res=>res.data) :
                await axios.get(`https://mindflarejsondata.onrender.com/users?phone=%2b${user.userInfo}`).then(res=>res.data)
                console.log(checkAuthenticateData[0]);
                if(Object.keys(checkAuthenticateData).length > 0){   
                    //wasted a lot of time here
                    //when i use typeof, tho its acting as array, saying object which is incorrect
                    //typeof is not sufficient to distinguish between array and regular objects
                    //js treat array as special type of object, so had to use index to get the data from api call
                    const passwordInDb = user.password ? await bcrypt.compare(user.password,checkAuthenticateData[0].password) : user.token  
                    //above use compare to check if password is in db
                    //OR if user is logged in with google, it will has token and thus there is no need for password, passwordInDb becomes user.token
                    
                    if(passwordInDb){
                        const userData = {
                            name:checkAuthenticateData[0].name,
                            email:checkAuthenticateData[0].email,
                            profile:checkAuthenticateData[0].profile_url,
                            userId:checkAuthenticateData[0].id
                        }
                        localStorage.setItem("authen_token",JSON.stringify(userData))
                        setAuthToken(true)
                        navigate("/")
                    }else {   //since password didnt match, error pop up
                        const errorPassword = function(){
                            toast.error("Your password is incorrect")
                        }
                        errorPassword();
                    }
                }else{
                    errorLoginNoti();
                }
            }
            authenticate();
        }
    },[user])
    const logout = ()=>{
        localStorage.clear()
        setAuthToken(false)
        toast.info("You have logged out!")
    }
    return (
        <AuthContext.Provider value={{user,setUser,logout,authToken,setAuthToken}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = ()=>{
    return useContext(AuthContext)
}