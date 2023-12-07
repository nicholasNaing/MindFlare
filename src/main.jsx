import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { FeaturePostsProvider } from './contexts/PostContext.jsx'
import { themeProvider as ThemeChangeProvider} from './contexts/ThemeContext'
import { MainPostProvider } from './contexts/MainPostContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { SidebarProvider } from './contexts/SidebarContext.jsx'
import ScrollToTop from './ScrollRestoration/ScrollToTop.jsx'
import { PostIdProvider } from './contexts/PostDeleteContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter basename={import.meta.env.DEV ? '/':'/MindFlare/'}>
      <AuthProvider>
        <ThemeChangeProvider>
          <PostIdProvider>
            <SidebarProvider>
              <MainPostProvider>
                <FeaturePostsProvider>
                  <App/>
                </FeaturePostsProvider>
                </MainPostProvider>
            </SidebarProvider>
          </PostIdProvider>
        </ThemeChangeProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>,
)
