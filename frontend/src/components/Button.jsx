import React from 'react'
import style from '../styles/Button.module.css'

const Button = ({children,backgroundColor,color,onClick,type}) => {
  return (
   <button className={style.Btn} style={{backgroundColor,color}} onClick={onClick} type={type}>
    {children}
   </button>
  )
}

export default Button