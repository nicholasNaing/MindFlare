import React,{useEffect} from 'react';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import dayjs from 'dayjs'
import { emailExist, phoneExist } from './CheckEmailAndPhone';
import { useDarktheme } from '../../contexts/ThemeContext';


function RegisterPage() {
    //below it the toast for showing the success message of account registration. It also include link to log in page
    const successCustomToast = () => (
        <div>
            <div>Your account has been successfully created!</div>
            <Link to="/login" className="underline hover:cursor-default hover:text-blue-700">Login Now</Link>
        </div>
    );
    const successRegistrationNoti = ()=> {
        toast.success(successCustomToast)
    }

    const [image,setImage] = useState()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [pass_1,setPass_1] = useState('')
    const [pass_2,setPass_2] = useState('')

    const [invalidPassword,setInvalidPassword] = useState(false) //this will set true if the password is not match with regex pattern

    const {darktheme} = useDarktheme()

    //below function is called after the account is created
    const clearInput = ()=>{
        setImage('')
        setName('')
        setEmail('')
        setPhone('')
        setPass_1('')
        setPass_2('')
    }

    const handleChange = (e)=>{
        e.target.name === "image" && setImage(e.target.value)
        e.target.name === "name" && setName(e.target.value)
        e.target.name === "email" && setEmail(e.target.value)
        e.target.name === "pass_1" && setPass_1(e.target.value)
        e.target.name === "pass_2" && setPass_2(e.target.value)
    }
    async function storeData(){
        const saltRounds = 10   //the number of times to hash password => higher the number, safer the password and higher the computationality
        const hashPassword = await bcrypt.hash(pass_1,saltRounds)  // has the password usiing bcrypt 
        const emailAlreadyExist = await emailExist(email,'') // checck if email is already existed in the database or not
        const phoneAlreadyExist = await phoneExist(phone,'') // checck if email is already existed in the database or not

        if(emailAlreadyExist || phoneAlreadyExist){
            const alreadyCreated = function (){
                toast.error("Your email or phone number is already used to creat an account")
            }
            alreadyCreated();
        }else{ //if its new email, set the State and post the data into the database
            const currentDatetime = dayjs().format()   //used daysjs to get time as moment js is in maintaince as its status says
            const latestValidInfo = {profile_url:image,name,email,phone,password:hashPassword,created_at:currentDatetime}
            await axios.post("https://mindflarejsondata.onrender.com/users",latestValidInfo)
            clearInput();
            successRegistrationNoti();
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        const passwordPattern = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
        const validPassword = passwordPattern.test(pass_1)
        if(validPassword){
            if(pass_1 === pass_2 ){
                storeData(); 
            }else{
                const unmatchPassword = function(){
                    toast.warn("Your passwords are not match")
                }
                unmatchPassword();
            }
        }else{
            setInvalidPassword(true)
        }
        
    }    
    return ( 
    <div className="w-screen h-screen flex justify-center items-center">
        <form className={`w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] flex flex-col gap-2 border-2 rounded-md p-3 ${darktheme ? 'border-slate-50 bg-white bg-opacity-10':'border-slate-900 bg-black bg-opacity-10'}`} onSubmit={handleSubmit}>
            <h2 className={`text-xl text-center font-bold ${darktheme ? 'text-slate-50':'text-slate-900'}`}>Register your account</h2>
            {image && <img src={image} alt="profile_picture" style={{width:'70px',height:'70px',borderRadius:'50%',margin:"auto"}}/>}
            <div>
                <input id='image' name="image" type="text" value={image} onChange={handleChange} placeholder='Your profile url here' required/>
            </div>
            <div>
                <input id='name' name="name" type="text" value={name} onChange={handleChange} placeholder='Enter your name'  required/>
            </div>
            <PhoneInput
                defaultCountry='MM'
                countrySelectProps={{ unicodeFlags: true }}
                placeholder="Enter your phone"
                value={phone}
                onChange={setPhone}
            />
            <div>
                <input id='email' name="email" type="email" value={email} onChange={handleChange} placeholder='Enter your email'  required/>
            </div>
            <div>
                <input onClick={()=>setInvalidPassword(false)} id='pass_1' name="pass_1" type="password" value={pass_1} onChange={handleChange} placeholder='Enter your Password' autoComplete='new-password' required/>
                {/* added autocomplete = 'new-password' so that it wont autocomoplete the password automatically */}
                {invalidPassword && 
                <>
                    <div className={`text-xs text-red-500`}> Your password must at least 6 characters and</div>
                    <div className={`text-xs text-red-500`}>needs to include a number, a special character, a lower case and an Upper case.</div>
                </>
                }
            </div>
            <div>
                <input id='pass_2' name="pass_2" type="password" value={pass_2} onChange={handleChange} placeholder='Confirm your password' autoComplete='new-password' required/>
            </div>
            <button type="submit" className={`w-[30%] mx-auto py-0.5 px-2 border-2 font-bold rounded-lg cursor-default ${darktheme? 'border-slate-50 text-slate-50 hover:bg-slate-50 hover:text-slate-900': 'border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'} hover:transition-colors ease-in-out duration-500`}>Submit</button>
        </form>
    </div> );
}

export default RegisterPage;