import React from 'react'
import styles from '../styles/UserDetails.module.css'
import profileSVG from '../assets/img.svg'
import personSVG from '../assets/person (2) - Copy.svg'
import phoneSVG from '../assets/mdi-light_phone - Copy.svg'
import emailSVG from '../assets/email - Copy.svg'



const UserDetails = ({selectedChat}) => {
  console.log(selectedChat);
  
  const userInfo = [
    {
      icon: personSVG,
      value: selectedChat?.name,
    },
    {
      icon: phoneSVG,
      value:selectedChat?.phone,
    },
    {
      icon: emailSVG,
      value: selectedChat?.email,
    },
  ];
  return (
    <div className={styles.userDetails}>
      <div className={styles.userDetailsTopSection}>
        <img src={profileSVG} alt="Profile" className={styles.profileImage} />
        <h5>Chat </h5>
      </div>
      <h5>Details</h5>
      <div className={styles.userDetailsMiddleSection}>
         <div className={styles.userInfo}>
          {userInfo.map((info, index) => (
            <div key={index} className={styles.userInfoItem}>
              <img src={info.icon} alt="Icon" className={styles.userInfoIcon} />
              <p className={styles.userInfoValue}>{info.value}</p>
            </div>
          ))}
         </div>
      </div>

    </div>
  )
}

export default UserDetails