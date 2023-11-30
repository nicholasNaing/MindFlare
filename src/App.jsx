import { Routes, Route } from 'react-router-dom'
import Home from './view/Home'
import NavBar from './layouts/NavBar'
import { themeProvider as ThemeChangeProvider, useDarktheme } from './contexts/ThemeContext'
import bgImageDay from './assets/cityscape.jpg'
import bgImageDark from './assets/nightsky.jpg'
import { Suspense } from 'react'
import RegisterPage from './view/authenticationPages/RegisterPage'
import LoginPage from './view/authenticationPages/LoginPage'
import { Flip, ToastContainer } from 'react-toastify'
import Profile from './view/UserInformation/Profile'
import DetailPostPage from './view/PostPages/DetailPostPage'
import ScrollToTop from './ScrollRestoration/ScrollToTop'
import UserPosts from './view/UserInformation/UserPosts'
import ProtectedRoutes from './ProtectedRoute/ProtectedRoutes'
import CreatePost from './view/PostPages/CreatePost'


function App() {
  const {darktheme,setDarkTheme} = useDarktheme() || {}  //darktheme value is not there yet in initial rendering thus put or with {}
  return (
      <Suspense fallback={<p>Loading.....</p>}>
        <div className={`w-screen min-h-screen bg-cover bg-center`} style={{background: `linear-gradient(145deg,${darktheme?'grey,#020617':'white,lightblue,skyblue'})`}}>   
          <ToastContainer
              position='top-center'
              transition={Flip}
          />
          <ScrollToTop/> 
          <NavBar/>
          <Routes>
            <Route element={<ProtectedRoutes/>}>
              <Route path="/posts/detail/:id" element={<DetailPostPage/>}/>
            </Route>
            <Route element={<ProtectedRoutes/>}>
              <Route path="/profile" element={<Profile/>}/>
            </Route>
            <Route element={<ProtectedRoutes/>}>
              <Route path="/user-posts" element={<UserPosts/>}/>
            </Route>
            <Route element={<ProtectedRoutes/>}>
              <Route path="/create-post" element={<CreatePost/>}/>
            </Route>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
          </Routes>
        </div>
      </Suspense>
  )
}

export default App
