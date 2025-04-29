import React from 'react';
import styles from '../styles/ChatbotBubble.module.css';

const ChatbotBubble = ({welcomeMsg, onClick}) => {
  return (
    <div className={styles.chatbox}>
      <div className={styles.avatar}></div>
      <div className={styles.closeBtn} onClick={onClick}>&times;</div>
      <div className={styles.message}>
        <span role="img" aria-label="wave"></span> {welcomeMsg}
      </div>
    </div>
  );
};

export default ChatbotBubble;
