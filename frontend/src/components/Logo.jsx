import React from 'react'
import logoSvg from '../assets/logo.svg'
import styles from '../styles/Logo.module.css'

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
        <img src={logoSvg} alt="logo" />
        <span>Hubly</span>
    </div>
  )
}

export default Logo