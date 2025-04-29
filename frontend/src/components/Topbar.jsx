import React from 'react'
import styles from '../styles/Top.module.css'
import Logo from './Logo'
import { useNavigate } from 'react-router-dom'


const Topbar = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.topbarContainer}>
      <div className={styles.container}>
         <div className={styles.left}>
           <Logo/>
         </div>
         <div className={styles.right}>
           <button className={`${styles.btn} ${styles.loginBtn}`} onClick={() => navigate('/login')}>
            Login
           </button>
           <button className={`${styles.btn}`} onClick={() => navigate('/signup')}>
            Sign up
           </button>
         </div>
      </div>
    </div>
  )
}

export default Topbar