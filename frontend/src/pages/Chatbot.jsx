import React from 'react'
import ChatBotModel from '../components/ChatBotModel'
import styles from '../styles/ChatBot.module.css'
import ChatBotDemo from '../components/ChatBotDemo'
import ChatbotBubble from '../components/ChatbotBubble'
import SelectColor from '../components/SelectColor'
import { useState,useEffect } from 'react'
import { MdModeEdit } from "react-icons/md";
import debounce from 'lodash/debounce'
import { useAuth } from '../context/AuthProvider'
import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
import { useConfig } from '../context/WindgetConfigProvider';
import { toast } from 'react-toastify'
import { formateTime } from '../services/helper'

const Chatbot = () => {
  const {config} = useConfig()
  const [headerColor, setHeaderColor] = useState('#33475B')
  const  [bgColor,setBgColor] = useState('#EEEEEE')
  const [firstMsg, setFirstMsg] = useState('How can i help you?')
  const [secondMsg, setSecondMsg] = useState('Ask me anything!')
  const [phone, setPhone] = useState('+1 (000) 000-0000')
  const [email, setEmail] = useState('email@gmail.com')
  const [name, setName] = useState('Your name')
  const [welcomeMsg, setWelcomeMsg] = useState("👋 Want to chat about Hubly? I'm an chatbot here to help you find your way.")
  const [isEditMsg,setIsEditMsg] = useState(false)
  const {user} = useAuth()
  const [time, setTime] = useState('00:00:00'); 

  const convertToSeconds = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
};
const missedChatTimer = convertToSeconds(time);
  

  const getWordsCount = (welcomeMsg) => {
    const count = welcomeMsg.trim() === ''?0:welcomeMsg.trim().split(/\s+/).length;
    return count
  }
  const handleMsgChange = (e) =>{
    const {value} = e.target
    if (getWordsCount(value) <= 50) {
      setWelcomeMsg(e.target.value)
    }
  }
  useEffect(() => {
    if (config ) {
      setHeaderColor(config.headerColor || '#33475B')
      setBgColor(config.backgroundColor || '#EEEEEE')
      setFirstMsg(config.customMessage1 || 'How can i help you?')
      setSecondMsg(config.customMessage2 || 'Ask me anything!')
      setPhone(config.phonePlaceholder || '+1 (000) 000-0000')
      setEmail(config.emailPlaceholder || 'email@gmail.com')
      setName(config.namePlaceholder || 'Your name')
      setWelcomeMsg(config.welcomeMessage || "👋 Want to chat about Hubly? I'm an chatbot here to help you find your way.")
      
     
      if (typeof config.missedChatTimer === 'number') {
         setTime(formateTime(config.missedChatTimer))
      } else {
        setTime(config.missedChatTimer || "1:00:00")
      }
    }
  }, [config])
  useEffect(() => {
    if (user) {
      debouncedSaveConfig(); 
    }
  }, [headerColor, bgColor, firstMsg, secondMsg, phone, email, name, welcomeMsg, time,user]);

  const saveConfig = async() =>{
    if(!user) return
      const configData = {
        headerColor,
        backgroundColor: bgColor,
        customMessage1: firstMsg,
        customMessage2: secondMsg,
        phonePlaceholder: phone,
        emailPlaceholder: email,
        namePlaceholder: name,
        welcomeMessage: welcomeMsg,
        missedChatTimer,
        adminId: user?.role === 'admin' ? user.id : user.adminId
      }
      try {
  
          const response = await axios.post(`${API_BASE_URL}/api/config/`,configData)
        
        if(response.status === 200){
          toast.success(response.message)
        }
      } catch (error) {
        toast.error(error.message||'Something went wrong')
      }
    
  }

  const debouncedSaveConfig = debounce(saveConfig,500)

  useEffect(() => {
    return () => {
      debouncedSaveConfig.cancel();
    };
  }, []);

  return (
    <div className={styles.ChatBotConatiner}>
      <div className={styles.container}>
        <h3>Chat bot</h3>
        <div className={styles.mainContainer}>
          <div className={styles.demoChatBot}>
             <ChatBotDemo 
              headerColor={headerColor}
              bgColor={bgColor}
              firstMsg={firstMsg}
              secondMsg={secondMsg}
              phone={phone}
              email={email} 
              name={name}
              
             />
             <ChatbotBubble welcomeMsg={welcomeMsg}/>
          </div>
          <div className={styles.chatDesign}>
            <SelectColor
             heading={'Header Color'}
             selectedColor={headerColor}
             setSelectedColor={setHeaderColor}

            />
             <SelectColor
             heading={'Select background Color'}
             selectedColor={bgColor}
             setSelectedColor={setBgColor}

            />
            <ChatBotModel>
              <div className={styles.customInputContainer}>
                <h5 className={styles.heading}>Customize Message</h5>
                <div className={styles.messageGroup}>
                  <input type="text" name='firstMsg' value={firstMsg} onChange={(e)=>setFirstMsg(e.target.value)}/>
                  <MdModeEdit className={styles.icon} />
                </div>
                <div className={styles.messageGroup} >
                  <input type="text" value={secondMsg} onChange={(e)=>setSecondMsg(e.target.value)} />
                  <MdModeEdit  className={styles.icon}/>
                </div>
              </div>
            </ChatBotModel> 
            <ChatBotModel>
              <div className={styles.customInputContainer}>
                <h5 className={styles.heading}>Introduction Form</h5>
                <div className={styles.form}>
                  <div className={styles.groupInputs}>
                    <label htmlFor="name">Your name</label>
                    <input type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)}/>
                  </div>
                  <div className={styles.groupInputs}>
                    <label htmlFor="phone">Your phone</label>
                    <input type="text" name='phone' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                  </div>
                  <div className={styles.groupInputs}>
                    <label htmlFor="email">Your email</label>
                    <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  </div>
                  <button className={styles.thankYouBtn}>Thank you</button>
                </div>
              </div>
            </ChatBotModel>     
            <ChatBotModel>
              <div className={styles.customMsgContainer}>
                <h5 className={styles.heading}>Welcome Message</h5>               
                  <div  className={styles.welcmMsg}>
                    <textarea name="welcomeMsg" id="" cols="30" rows="10" value={welcomeMsg} onChange={(e)=>handleMsgChange(e)} />
                    <span className={styles.wordCount}>{getWordsCount(welcomeMsg)}/50</span>
                    <MdModeEdit className={styles.welcmEditIcon}  />
                  </div>
              </div>
              
            </ChatBotModel> 
            <ChatBotModel>
              <div className={styles.customInputContainer}>
                <h5 className={styles.heading}>Missed chat timer</h5>
                <input
                  type="time"
                  step="1"
                  value={time}
                  className={styles.timeInput}
                  onChange={(e)=>setTime(e.target.value)}
                />
                <button className={styles.saveButton}>Save</button>
              </div>
            </ChatBotModel>   
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot

