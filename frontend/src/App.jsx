import {Routes,Route,BrowserRouter as Router} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { AuthProvider } from './context/AuthProvider'
import { ScreenSizeProvider } from './context/ScreenSizeProvider'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Layout from './pages/Layout'
import Settings from './pages/Settings'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import Chatbot from './pages/Chatbot'
import Team from './pages/Team'
import Analytics from './pages/Analytics'
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import axios from 'axios'
import { WindgetConfigProvider } from './context/WindgetConfigProvider'

function App() {

  axios.defaults.withCredentials = true
  return (
    
      <ScreenSizeProvider>
        <AuthProvider>
          <WindgetConfigProvider>
          <Router>
            <Routes>
              
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/layout/'element={<Layout/>}>
                <Route path='dashboard' element={<Dashboard/>} index/>
                <Route path='contact-center' element={<Contact/>}/>
                <Route path='analytics' element={<Analytics/>}/>
                <Route path='chatbot' element={<Chatbot/>}/>
                <Route path='team' element={<Team/>}/>
                <Route path='settings' element={<Settings/>}/>
                <Route path='*' element={<h1>404 Not Found</h1>}/>    
              </Route>
            </Routes>
          </Router>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          </WindgetConfigProvider>
        </AuthProvider>
      </ScreenSizeProvider>
    
  )
}

export default App
