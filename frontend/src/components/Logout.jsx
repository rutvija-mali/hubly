import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useScreenSize} from '../context/ScreenSizeProvider'
import profileSVG from '../assets/gg_profile.svg'
import {useAuth} from '../context/AuthProvider';
import styles from '../styles/Logout.module.css'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import axios from 'axios'
import { toast } from 'react-toastify';

export default function Logout() {
  const[isOpen,setIsOpen] = useState(false)
  const navigate =useNavigate()
  const {isMobile} = useScreenSize()
//   const {fetchUser ,user} = useAuth()
  const handleLogout = ()=>{
      try {
        axios.post(`${API_BASE_URL}/api/users/logout`)
        .then((response)=>{
          if(response.status == 200){
            toast.success('User log out successfully!', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });           
            navigate("/")
            // fetchUser()
          }
        })
      } catch (error) {
        toast.error(error.message||'Something went wrong!', {
          position: 'top-right',
          autoClose: 3000, // Auto close in 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  return (
   <div className={styles.mainConatienre}>
    <img src={profileSVG} alt="" onClick={()=>setIsOpen((prev)=>!prev)}/>
        {isOpen && <button className={styles.logoutBtn}  onClick={handleLogout}>
          Sign out
        </button>}
   </div>
  )
}
