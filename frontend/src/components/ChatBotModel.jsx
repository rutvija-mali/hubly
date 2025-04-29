import React, { Children } from 'react'
import styles from '../styles/ChatBotModel.module.css'

const ChatBotModel = ({children}) => {
  return (
    <div className={styles.chatModel}>
        {children}
    </div>
  )
}

export default ChatBotModel