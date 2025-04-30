import React from 'react'
import styles from '../styles/DateDivider.module.css'

const DateDivider = () => {
  return (
    <div className={styles.dateDivider}>
        <div className={styles.line}></div>
            <span className={styles.dateText}>{new Date().toDateString()}</span>
        <div className={styles.line}></div>
    </div>
  )
}

export default DateDivider