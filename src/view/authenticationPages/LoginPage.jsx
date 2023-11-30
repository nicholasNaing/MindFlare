import React from 'react'
import { useState,useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDarktheme } from '../../contexts/ThemeContext';

const google = window.google

function LoginPage() {
  const navigate = useNavigate()
  const {user,setUser} = useAuth()

  const [userInfo, setUserInfo] = useState('')
  const [password,setPassword] = useState('')

  const {darktheme} = useDarktheme()

  const handleChange = (e)=>{
    e.target.name === "userInfo" && setUserInfo(e.target.value)
    e.target.name === "password" && setPassword(e.target.value)
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(userInfo.includes("@")){
      setUser({userInfo,password})
    }else{
      const phoneNumber = userInfo.replace(/\D/g, '') 
      setUser({userInfo:phoneNumber,password})
      //here D serach for all non-numeric values that is + and 
      //g doesnt stop with the first values and 
      //search till the end then took it to the empty string
      //now we left with digits
    }

  }
  function handleCallbackResponse(response){    // this function runs after the google sign in
    let data = jwtDecode(response.credential)
    console.log(data.sub);
    setUser({userInfo:data.email,token:data.sub})
    navigate("/")
  }
  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
    client_id:"553759877244-2r31ter362b2d9b3rkt4qoiffhofihml.apps.googleusercontent.com",
    callback:handleCallbackResponse,
    scope:"profile email phone"
    });
    google.accounts.id.renderButton(
    document.getElementById('signInButton'),
    {theme:'outline',size:"medium"}
    );
    google.accounts.id.prompt();
  },[])
  return (
    <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="loginForm flex flex-col justify-center items-center gap-3">
        <div className={`text-xl font-bold ${darktheme ? 'text-slate-50':'text-slate-900'}`}>Log into your account</div>
        <div>
          <input name="userInfo" type="text" value={userInfo} onChange={handleChange} placeholder='Enter your email or phone number'/>
          {userInfo==="09" && <p className="text-sm text-left">
          <div>please includes the country code</div>
          <div>example phone number +95 xx xxxx xxx</div>
          </p>}
        </div>
        <div>
          <input name="password" type="password" value={password} onChange={handleChange} placeholder='Enter your Password'/>
        </div>
        <button type="submit" className="py-0.5 px-2 border-2 border-white hover:text-black rounded-lg cursor-default hover:bg-white transition-colors ease-in-out duration-500">Log In</button>
        <div id="signInButton" className="mt-2"></div>
      </form>
    </div>
  )
}

export default LoginPage