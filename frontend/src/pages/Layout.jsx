import React from 'react'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Layout.module.css'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className={styles.layoutContainer}>
        <div className={styles.sideContainer}>
            <Sidebar/>
        </div>
        <div className={styles.outletContainer}>
          <Outlet/>
        </div>    
    </div>
  )
}

export default Layout