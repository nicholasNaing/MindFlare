import React, { useEffect, useState } from 'react'
import bcrypt from 'bcryptjs'
import { useSidebar } from '../../contexts/SidebarContext'
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'
import axios from 'axios';
import Sidebar from '../../layouts/Sidebar';
import PhoneInput from 'react-phone-number-input'
import { toast } from 'react-toastify';
import { emailExist, phoneExist } from '../authenticationPages/CheckEmailAndPhone';
import { useDarktheme } from '../../contexts/ThemeContext';


function Profile() {
    const {name,email,profile} = JSON.parse(localStorage.getItem("authen_token"))
    const navigate = useNavigate()
    const {isSidebar,setIsSidebar} = useSidebar()
    const {darktheme} = useDarktheme()

    const [userInfo,setUserInfo] = useState({})  //store userinfo from the database
    const [isAlert,setIsAlert] = useState(false)    
    const [editProfilePassword,setEditProfilePassword] = useState('') 
    const [validateProfilePassword,setValidateProfilePassword] = useState(false)

    const [updateImage,setupdateImage] = useState()
    const [updateName,setupdateName] = useState('')
    const [updateEmail,setupdateEmail] = useState('')
    const [updatePhone,setupdatePhone] = useState('')
    const [largeImage,setLargeImage] = useState(false)

    const [oldPassword,setOldPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')

    const registeredDate = userInfo && dayjs(userInfo.created_at).format("DD-MM-YYYY")

    useEffect(()=>{
        async function fetchData(){
            try{
                const data = await axios.get(`http://localhost:3030/users/?email=${email}`).then(res=>res.data)
                setUserInfo(data[0])
            }catch(error){
                console.log(error)
            }
        }
        fetchData();
    },[])
    const handleChange = (e)=>{
        e.target.name === "editProfilePassword" && setEditProfilePassword(e.target.value)
        e.target.name === "image" && setupdateImage(e.target.value)
        e.target.name === "name" && setupdateName(e.target.value)
        e.target.name === "email" && setupdateEmail(e.target.value)
    }

    const handlePasswordForEditProfile = async ()=>{
        const passwordValidated = await bcrypt.compare(editProfilePassword,userInfo.password) 
        if(passwordValidated){
            setValidateProfilePassword(true)
            setEditProfilePassword('')
            setIsAlert(false)
        }else{
            toast.error("Your password is incorrect")
        }
    }

    const handleEditProfile = async (e)=>{
        e.preventDefault();
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        const validUrl = updateImage ? urlPattern.test(updateImage) : true //if no updateImage, it will just use the data from the database
        
        if(validUrl){
                const phoneAndEmailExist = await emailExist(updateEmail,userInfo.email) || await phoneExist(updatePhone,userInfo.phone)
                if(phoneAndEmailExist){
                    toast("Your email or phone is already in the database")
                }else{
                    const EditedValidInfo = {
                        profile_url:updateImage ? updateImage : userInfo.profile_url,
                        name:updateName ? updateName : userInfo.name,
                        email:updateEmail ? updateEmail : userInfo.email,
                        phone:updatePhone ? updatePhone : userInfo.phone,
                        password:userInfo.password,
                        created_at:userInfo.created_at
                    }
                    try{
                        await axios.put(`http://localhost:3030/users/${userInfo.id}`,EditedValidInfo)//here i used put method in place of patch.
                        .then(toast("You have edited the profile.refresh the page for the changes to take effect"))
                        const userData = { //if there is data in update field, its fine 
                                           //or else current data wont change, in other words, the same data will be set in the local storage again
                            name:updateName ? updateName : userInfo.name,
                            email:updateEmail ? updateEmail : userInfo.email, 
                            profile:updateImage ? updateImage : userInfo.profile_url,
                            userId:userInfo.id
                        }
                        localStorage.clear()
                        localStorage.setItem("authen_token",JSON.stringify(userData))
                        setValidateProfilePassword(false)
                    }catch(error){
                        console.log(error);
                    }
                }
        }else{
            toast("Your image url is not valid")
        }

    }

    const changePassword = async (e)=>{
        e.preventDefault()
        const checkPassword = await bcrypt.compare(oldPassword,userInfo.password)
        console.log(checkPassword);
        if(checkPassword){
            const hashNewpassword = await bcrypt.hash(newPassword,10)
            axios.patch(`http://localhost:3030/users/${userInfo.id}`,{password:hashNewpassword})
            setOldPassword('')
            setNewPassword('')
            toast.success("You successfully changed your password")
            setInterval(()=>{
                window.location.reload()
            },3000)

        }else{
            toast.error("Your password is incorrect")
        }
    }
    return (
        <div>
            {isSidebar && <Sidebar/>}

            {largeImage && 
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[300px] h-[300px] z-10">
                <div onClick={()=>setLargeImage(false)} className="absolute right-0 cursor-pointer py-1 px-2 text-xl border-2 border-red-600 hover:bg-red-600 hover:text-white">x</div>
                <img src={userInfo.profile_url} className="w-[100%] h-[100%]"/>
            </div>
            }

            {isAlert && 
            <div className={`flex flex-col justify-evenly items-center absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 ${darktheme ? 'bg-slate-900':'bg-sky-300'} rounded-lg w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] h-[20%]`}>
                <input placeholder='Enter your password' className={`py-[0.5rem] px-[1rem] rounded-xl`} type="password" name="editProfilePassword" value={editProfilePassword} onChange={handleChange}></input>
                <div className={`flex w-[50%] justify-evenly items-center`} >
                    <div onClick={()=>setIsAlert(false)} className={`py-0.5 px-2 border-2 border-white hover:text-black rounded-lg cursor-default hover:bg-white transition-colors ease-in-out duration-500 ${darktheme && 'text-white'}`}>cancel</div>
                    <div onClick={handlePasswordForEditProfile} className={`py-0.5 px-2 border-2 border-amber-400 rounded-lg cursor-default hover:bg-amber-400 hover:text-white hover:transition-colors ease-in-out duration-500 ${darktheme && 'text-white'}`} >confirm</div>
                </div>
            </div>}

            { validateProfilePassword ?
            <div className={`flex flex-col justify-center items-center pt-12 ${isSidebar? 'relative w-[100%] sm:w-[60%] md:w-[70%] lg:w-[70%] sm:left-[40%] md:left-[30%] lg:left-[30%]':'w-[100%]'} h-screen`}>
                <form onSubmit={handleEditProfile} className={`registerForm flex flex-col gap-3 border-2 rounded-md p-3 ${darktheme ? 'border-slate-900 bg-white bg-opacity-20':'border-sky-300 bg-black bg-opacity-10'} ${isSidebar ? 'w-[90%] lg:w-[70%]':'w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%]'}`}>
                    <h1 className="font-bold text-center text-xl">Edid User Information</h1>
                    <img className={`w-[70px] h-[70px] rounded-[50%] relative left-[50%] translate-x-[-50%]`} src={updateImage ? updateImage : userInfo.profile_url} alt="profile_image"/>
                    <div>
                        <input id='image' name="image" type="text" value={updateImage} onChange={handleChange} placeholder={userInfo.profile_url}/>
                    </div>
                    <div>
                        <input id='name' name="name" type="text" value={updateName} onChange={handleChange} placeholder={userInfo.name} />
                    </div>
                    <PhoneInput
                        defaultCountry='MM'
                        countrySelectProps={{ unicodeFlags: true }}
                        placeholder={userInfo.phone}
                        value={updatePhone}
                        onChange={setupdatePhone}
                    />
                    <div>
                        <input id='email' name="email" type="email" value={updateEmail} onChange={handleChange} placeholder={userInfo.email}/>
                    </div>
                    <div className={`flex justify-end items-center gap-3`}>
                        <div onClick={()=> setValidateProfilePassword(false)} className={`py-0.5 px-2 border-2 border-slate-900 rounded-lg cursor-default hover:bg-slate-900 hover:text-white hover:transition-colors ease-in-out duration-500`}>back</div>
                        <button type='submit' className={`py-0.5 px-2 border-2 border-amber-500 rounded-lg cursor-default hover:bg-amber-500 hover:text-white hover:transition-colors ease-in-out duration-500`}>confirm</button>
                    </div>
                </form>
            </div> :
            <div className={`flex flex-col justify-center items-center ${isSidebar? 'relative w-[100%] sm:w-[60%] md:w-[70%] lg:w-[70%] sm:left-[40%] md:left-[30%] lg:left-[30%]':'w-[100%]'} h-screen`}>
                <div className={`${isSidebar ? 'w-[90%] lg:w-[70%]':'w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%]'} flex flex-col mt-4`}>
                    <div className={`border-2 p-2 ${darktheme ? 'border-slate-900 bg-white bg-opacity-20':'border-sky-300 bg-black bg-opacity-10'} rounded-md`} >
                        <div className="flex flex-col gap-3 mb-3">
                            <h1 className="font-bold text-center text-xl">User Information</h1>
                            <img onClick={()=>setLargeImage(true)} className={`w-[70px] h-[70px] rounded-[50%] cursor-pointer relative left-[50%] translate-x-[-50%] hover:rounded-[40%] hover:transition-all ease-in-out duration-500`} src={userInfo.profile_url} alt="profile_image"/>
                            <div className={`flex py-1.5 px-2 rounded-lg bg-white`}>
                                <span className="flex-[50%] text-center font-bold">Name</span>
                                <span className="flex-[50%] text-center">{userInfo.name}</span>
                            </div>
                            <div className={`flex py-1.5 rounded-lg bg-white`}>
                                <span className="flex-[50%] text-center font-bold">Email</span>
                                <span className="flex-[50%] text-center">{userInfo.email}</span>
                            </div>
                            <div className={`flex py-1.5 rounded-lg bg-white`}>
                                <span className="flex-[50%] text-center font-bold">Phone</span>
                                <span className="flex-[50%] text-center">{userInfo.phone}</span>
                            </div>
                            <div className={`flex py-1.5 rounded-lg bg-white`}>
                                <span className="flex-[50%] text-center font-bold">Created at</span>
                                <span className="flex-[50%] text-center">{registeredDate}</span>
                            </div>
                        </div>
                        <div className={`flex justify-end items-center gap-3`}>
                            <div onClick={()=> navigate("/")} className={`py-0.5 px-2 border-2 border-slate-900 rounded-lg cursor-default hover:bg-slate-900 hover:text-white hover:transition-colors ease-in-out duration-500`}>back</div>   
                            <div onClick={()=> setIsAlert(true)} className={`py-0.5 px-2 border-2 border-amber-500 rounded-lg cursor-default hover:bg-amber-500 hover:text-white hover:transition-colors ease-in-out duration-500`}>update</div>
                        </div>
                    </div>
                    <fieldset className={` border-2 p-2 ${darktheme ? 'border-slate-900 bg-white bg-opacity-20':'border-sky-300 bg-black bg-opacity-10'} rounded-md`}>
                        <legend className={`font-bold text-lg`}>Change your password</legend>
                        <form onSubmit={changePassword} className={`flex flex-col gap-2`}>
                            <div>
                                <input id="oldpassword" name="oldpassword" type="password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} placeholder="Enter your old password" required/>
                            </div>
                            <div>
                                <input id="newpassword" name="newpassword" type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder="Enter your new password" required/>
                            </div>
                            <button type='submit' className={`text-center w-[25%] ml-auto py-0.5 px-2 border-2 border-red-600 rounded-lg cursor-default hover:bg-red-600 hover:text-white hover:transition-colors ease-in-out duration-500`}>Change</button>
                        </form>
                    </fieldset>
                </div>
            </div>}
        </div>
    )
}

export default Profile