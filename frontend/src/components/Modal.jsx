import React from 'react'
import styles from '../styles/Modal.module.css'

const Modal = ({onCancel,onConfirm,message}) => {
  return (
    <div className={styles.modal}>
        <p>{message} </p>
        <div className={styles.buttonSection}>
            <button onClick={onCancel} className={`${styles.ModelBtn} ${styles.cancelBtn}`}>
                Cancel
            </button>
            <button onClick={onConfirm} className={`${styles.ModelBtn} ${styles.confirmBtn}`}>
                Confirm
            </button>
        </div>
    </div>
  )
}

export default Modal