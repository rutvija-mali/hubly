import React, { useState,useRef, useEffect } from 'react';
import styles from '../styles/Chatbox.module.css';
import avatar from '../assets/Avatar.svg';
import { RiSendPlaneFill } from "react-icons/ri";
import { useConfig } from '../context/WindgetConfigProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const ChatBox = () => {
  const [currentMsg, setCurrentMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null)
  const [showForm, setShowForm] = useState(false)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') 
  const day = String(date.getDate()).padStart(2, '0')

  const Title = `Ticket# ${year}-0${month}${day}`
  const {config} = useConfig()
  let widgetConfig = ''
  if(config){
    widgetConfig = config[0]
  }

  let customerId = localStorage.getItem('customerId')
  const sessionId = localStorage.getItem('sessionId')

  
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(()=>{
    if(!localStorage.getItem('sessionId')){
      localStorage.setItem('sessionId',crypto.randomUUID())
    }
  },[])

  useEffect(()=>{
    const fetchChats = async(sessionId,customerId) =>{
      try {
        const response = await axios.get(`${API_BASE_URL}/api/chats/`,{
          params:{
            sessionId,
            customerId
          }
        })
        if(response.status === 200){
          setMessages(response.data)
        }
      } catch (error) {
        toast.error(error.message || 'Something went wrong')
      }
    }

    if(sessionId === null || sessionId === undefined) return
    fetchChats(sessionId,customerId)
  },[])



  const sendMessage = async()=>{
    if(currentMsg.trim() === '' )return;
    customerId = localStorage.getItem('customerId')
    const ticketId = localStorage.getItem('ticketID')
    const newMessages = [...messages,{        
        senderType: 'customer',
        message: currentMsg,
        timestamp: new Date(),
        missed: false,
        replyTo: null,
        sender: customerId||'', 
        ticketId: ticketId || ''

    }]

    try {
       await axios.post(`${API_BASE_URL}/api/chats/`,{
         message:currentMsg,
         senderType:'customer',
         sessionId,
         sender:customerId || '',
         ticketId: ticketId || ''
      })
      
    } catch (error) {
      toast.error(error.message||'Something went wrong')
    }

    setMessages(newMessages)
    setCurrentMsg('')

    if(customerId === null){
        setTimeout(()=>{
            setShowForm(true)
        },500)
    }
  }

  const handlePressKeyDown =(e)=>{
    if(e.key === 'Enter' && !e.shiftKey){
        e.preventDefault()
        sendMessage()
    }
  }

  const sendBotMessage =(msg)=>{
     setMessages((prev)=> [...prev,{
        senderType: 'bot',
        message: msg,
        timestamp: new Date(),
        missed: false,
        sender: 'adminId123', 
        ticketId: 'ticketId123'
     }])
  }

  const handleFormSubmit = async(e)=>{

    e.preventDefault()
    if(name === ''||email === '' || phone === ''){
        setShowForm(true)
        sendBotMessage('Plaese fill all fields')

    }
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/customer`,{name,phone,email,role:'customer'})
      if(response.status === 201){
        const customerId = response.data.user._id
        localStorage.setItem('customerId',customerId)

        const sessionId = localStorage.getItem('sessionId')
        
        const firstChatRes = await axios.get(`${API_BASE_URL}/api/chats/get-first-message`,{
          params:{sessionId}
        })
        const firstMessage = firstChatRes.data.message
        const ticketRes = await axios.post(`${API_BASE_URL}/api/tickets/add/`,{
          title:Title,
          description:firstMessage,
          createdBy:customerId

        })
        
        const ticketId = ticketRes.data._id
        localStorage.setItem('ticketId', ticketId)
        await axios.put(`${API_BASE_URL}/api/chats/assign/`,{sessionId,customerId,ticketId})

       
      }
    } catch (error) {
      console.error(error)
    }
    setShowForm(false)
    console.log("Form submitted:", { name, email, phone });
    
  }
  return (
    <div className={styles.mainContainer}>
      {/* Header */}
      <div className={styles.Header} style={{backgroundColor:widgetConfig?.headerColor }}>
        <div className={styles.HeaderProfile}>
          <div className={styles.img}>
            <img src={avatar} alt="avatar" />
          </div>
          <div className={styles.active}></div>
        </div>
        <h4>Hubly</h4>

      </div>

      {/* Body */}
      <div className={styles.Body} style={{backgroundColor:widgetConfig?.backgroundColor }}>
        {/* Messages Section */}
        <div className={styles.mainSection}>
            { customerId === null &&
              <div className={styles.SupportMsg}>
                <div className={styles.img}>
                    <img src={avatar} alt="avatar" />
                </div>
                <div className={styles.msg}>
                    <p className={styles.message}>{widgetConfig?.customMessage1||'How can i help you?'}</p>
                    <p className={styles.message}>{widgetConfig?.customMessage2 || 'Ask me anything!'}</p>
                </div>
              </div> 

            }
          {messages&& messages.map((msg,index)=>(
            msg.senderType === 'admin'|| msg.senderType === 'bot' || msg.senderType === 'member'?(
                <div className={styles.SupportMsg} key={index}>
                    <div className={styles.img}>
                      <img src={avatar} alt="avatar" />
                    </div>
                    <div className={styles.msg}>
                      <p className={styles.message}>{msg.message}</p>
                    </div>
                </div> 
            ):(
                <div className={styles.customerMsg} key={index}>
                    <p className={styles.message}>{msg.message}</p>
                </div>
            )
          ))}
          { showForm && 
            <div className={styles.SupportMsg}>
                <div className={styles.img}>
                    <img src={avatar} alt="avatar" />
                </div>
                <div className={styles.customInputContainer}>
                   <h5 className={styles.heading}>Introduce Yourself</h5>
                   <form className={styles.form}>
                        <div className={styles.groupInputs}>
                            <label htmlFor="name">Your name</label>
                            <input type="text" name='name' 
                            value={name} onChange={(e)=>setName(e.target.value)}
                            placeholder={widgetConfig?.namePlaceholder ||'Your name'}
                            />
                        </div>
                        <div className={styles.groupInputs}>
                            <label htmlFor="phone">Your phone</label>
                            <input type="text" 
                            name='phone' 
                            value={phone} 
                            onChange={(e)=>setPhone(e.target.value)}
                            placeholder={widgetConfig?.phonePlaceholder || '+1 (000) 000-0000'}
                            />
                        </div>
                        <div className={styles.groupInputs}>
                            <label htmlFor="email">Your email</label>
                            <input 
                            type="text" 
                            name='email' 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder={widgetConfig?.emailPlaceholder || 'example@gmail.com'}
                            />
                        </div>
                       <button className={styles.thankYouBtn} onClick={handleFormSubmit}>Thank you</button>
                    </form>
                </div>
            </div> 

          }
          <div ref={messageEndRef}></div>

        </div>

        {/* Input Section */}
        <div className={styles.msgSection}>
          <textarea
            placeholder="Write a message"
            value={currentMsg}
            onChange={(e) => setCurrentMsg(e.target.value)}
            onKeyDown={handlePressKeyDown}
          />
          <button onClick={sendMessage}>
            <RiSendPlaneFill
              color="#B0C1D4"
              size={18}
              className={styles.icon}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;          
