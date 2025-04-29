import React, { useState } from 'react'
import styles from '../styles/Dropdown.module.css'
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";

const Dropdown = ({options,onClick,icon,heading}) => {
    const [isOpen, setIsOpen] = useState(false)
    
  return (
    <div className={styles.dropdownContainer}>
        <div className={styles.head} onClick={()=>setIsOpen((prev)=>!prev)}>
            <div className={styles.left}>
                <span>{icon}</span>
                <span>{heading}</span> 
            </div>
            <span >
                {isOpen? <FaChevronUp />:<FaChevronDown />}
            </span>
        </div>
        { isOpen && 
          <ul>
            {options.map((option,index)=>(
                <li onClick={() => onClick(option)} key={index}>
                    {option.name != 'resolved' || option.name != 'unresolved'&&   <BsPersonCircle size={20}/>}
                    <span>{option.name}</span>
                </li>
            ))}
          </ul>
        }
    </div>
  )
}

export default Dropdown