import ArticleIcon from '@mui/icons-material/Article';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';

export const sidebarData = [
  {
    title:"Home",
    icon:<HomeIcon/>,
    path:"/"
  },
  {
    title:"Profile",
    icon:<AccountBoxIcon/>,
    path:"/profile"
  },
  {
    title:"Your Posts",
    icon:<ArticleIcon/>,
    path:"/user-posts"
  },
  {
    title:"Add post",
    icon:<PostAddIcon/>,
    path:"/create-post"
  }
]