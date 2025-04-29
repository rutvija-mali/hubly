import React, { useEffect, useState } from 'react'
import Model from '../components/Modal'
import AddTeamMember from '../components/AddTeamMember'
import styles from '../styles/Analytics.module.css'
import MissedChatsChart from '../components/MissedChatsCharts'
import CircularDial from '../components/CircularDial'
import { getTotalChatCount } from '../services/ChatService'
import { getAvgReplyTime } from '../services/TicketService'

const Analytics = () => {
  const [totalChats , setTotalChats] = useState(0)
  const [avgReply , setAvgReply] =  useState(0)

  const formatTime = (timeInMs) => {
    
    const totalSeconds = Math.floor(timeInMs / 1000);
    
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  }

  useEffect(()=>{
    getTotalChatCount(setTotalChats)
    getAvgReplyTime(setAvgReply)
    
  },[])
  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.container}>
        
        <h3 className={styles.mainHeading}>Analytics</h3>

        <div className={styles.chartsSection}>
          <h3 className={styles.sectionHeading}>Missed charts</h3>
          <MissedChatsChart />
        </div>

        <div className={styles.replyTime}>
          <div className={styles.textBlock}>
            <h3 className={styles.sectionHeading}>Average Reply time</h3>
            <p className={styles.description}>
              For highest customer satisfaction rates you should aim to reply to an incoming customer's message in 15 seconds or less. Quick responses will get you more conversations, help you earn customers trust and make more sales.
            </p>
          </div>
          <span className={styles.timeValue}>{formatTime(avgReply)}</span>
        </div>

        <div className={styles.resolvedChats}>
          <div className={styles.textBlock}>
            <h3 className={styles.sectionHeading}>Resolved Tickets</h3>
            <p className={styles.description}>
              A callback system on a website, as well as proactive invitations, help to attract even more customers. A separate round button for ordering a call with a small animation helps to motivate more customers to make calls.
            </p>
          </div>
          <CircularDial />
        </div>

        <div className={styles.totalChats}>
          <div className={styles.textBlock}>
            <h3 className={styles.sectionHeading}>Total Chats</h3>
            <p className={styles.description}>
              This metric shows the total number of chats for all channels for the selected period.
            </p>
          </div>
          <span className={styles.total}>{totalChats.totalChats}</span>
        </div>

      </div>
    </div>
  )
}

export default Analytics
