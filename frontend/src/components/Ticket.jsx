import React, { useState } from 'react'
import styles from '../styles/Ticket.module.css'
import profileSvg from '../assets/img.svg'
import {Link} from 'react-router-dom'

const Ticket = ({ticket}) => {
    const [user,setUser] = useState(ticket.createdBy)

    const options = {
        hour:'numeric',
        minute:'numeric',
        hour12:true
    }
    const time = new Date(ticket.createdAt).toLocaleTimeString('en-US',options)
    const difference = new Date() - new Date(ticket.createdAt)

    const totalDiffMin = Math.floor(Number(difference)/(1000*60))
    const totalHour = Math.floor(totalDiffMin/60)
    const remMinute = Math.floor(totalDiffMin%60)

    const getPadStart = (string) =>{
      return  String(string).padStart(2,'0')
    }


  return (
    <div className={styles.mainTicketContainer}>
       <div className={styles.ticketContainer}>
           <div className={styles.ticket}>
               <div className={styles.ticketHeader}>
                   <div className={styles.ticketHeaderLeft}>
                      <span></span>
                      <h3>{ticket.title}</h3>
                   </div>
                   <span className={styles.ticketTime}>Posted at {time}</span>
               </div>
               <div className={styles.ticketBody}>
                     <div className={styles.ticketBodyLeft}>
                        <p>{ticket.description}</p>
                     </div>
                     <div className={styles.ticketBodyRight}>
                        <p>{`${getPadStart(totalHour)}:${getPadStart(remMinute)}`}</p>
                     </div>
               </div>
           </div>
           <div className={styles.ticketFooter}>
                <div className={styles.ticketFooterLeft}>
                    <img src={profileSvg} alt="" />
                    <div>
                        <p className={styles.name}>{user.name}</p>
                        <p>{user.phone}</p>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div className={styles.ticketFooterRight}>
                <Link 
                    className={styles.link}
                    to="/layout/contact-center"
                    state={{ ticket }}
                    >
                    Open Link
                </Link>
                </div>
           </div>
       </div>
    </div>
  )
}

export default Ticket