import React from 'react'
import styles from '../styles/Card.module.css'
import checkListIcon from '../assets/checklistIcon.svg'

export const Card = ({heading,info,money,includedIcons}) => {
    
  return (
    <div className={styles.cardContainer}>
       <div className={styles.cardHeading}>
         <h2>{heading}</h2>
         <p>{info}</p>
       </div>
       <div className={styles.middleSection}>
          <div className={styles.money}>
            <span className={styles.moneySection}>${money}</span> <span>/monthly</span>
          </div>
          <p>What’s included</p>
            <div>
             {includedIcons.map((item,index)=>(
                <div key={index} className={styles.feature}>
                    <span className={styles.checkListIcon}>
                      <img src={checkListIcon} alt="" />
                    </span>
                    <span>{item}</span>
                </div>
             ))}
          </div>
          
       </div>
       <button className={styles.starterBtn}>
         SIGN UP FOR STARTER
       </button>
    </div>
  )
}
