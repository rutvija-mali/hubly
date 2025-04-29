import React from 'react'
import styles from '../styles/ChatBotDemo.module.css'
import avatar from '../assets/Avatar.svg'
import { RiSendPlaneFill } from "react-icons/ri";

const ChatBotDemo = ({headerColor,bgColor,firstMsg,secondMsg,name,email,phone}) => {
  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoHeader} style={{backgroundColor: headerColor}}>
         <div className={styles.demoHeaderProfile}>
            <div  className={styles.img}><img src={avatar} alt="" /></div>
            <div className={styles.active}></div>
         </div>
         <h4>Hubly</h4>
      </div>
      <div className={styles.demoBody} style={{backgroundColor: bgColor}}>
        <div className={styles.mainSection}>
           <div className={styles.initialSection}>
              <div  className={styles.img}><img src={avatar} alt="" /></div>
              <div className={styles.msg}>
                <p>{firstMsg}</p>
                <p>{secondMsg}</p>
              </div>
           </div>
           <div className={styles.introSection}>
            <p className={styles.introHeading}>Introduction Yourself</p>
            <div className={styles.inputGroup}>
                <label htmlFor="">Your name</label>
                <p>{name}</p>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="">Your Phone</label>
                <p>{phone}</p>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="">Your email</label>
                <p>{email}</p>
            </div>
            <button className={styles.thankYouBtn}>Thank you</button>
           </div>
        </div>
        <div className={styles.msgSection}>
           <p>Write a message</p> 
           <RiSendPlaneFill  color='#B0C1D4' size={18} className={styles.icon}/>
        </div>
      </div>
    </div>
  )
}

export default ChatBotDemo