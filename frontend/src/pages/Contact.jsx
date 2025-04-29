import React, { useEffect } from 'react'
import styles from '../styles/Contact.module.css'
import profileSVG from '../assets/img.svg'
import { useState } from 'react'
import { PiHouseLight } from "react-icons/pi";
import { BiSolidSend } from "react-icons/bi";
import UserDetails from '../components/UserDetails'
import { IoIosPeople } from "react-icons/io";
import Dropdown from '../components/Dropdown';
import { LuTicket } from "react-icons/lu";
import Modal from '../components/Modal'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthProvider';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
import { BsPersonCircle } from "react-icons/bs";
import { useConfig } from '../context/WindgetConfigProvider';
import { fetchCustomers,fetchTeamMembers } from '../services/UserService';
import {fetchChats} from '../services/ChatService'


const Contact = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [msg, setMsg] = useState(null)
  const [isTeamModel, setTeamModel] = useState(false)
  const [isResolvedOpen , setIsResolvedOpen] = useState(false)
  const [status,setStatus] = useState()
  const [selectedMember,setSelectedMember] = useState()
  const [teamMembers, setTeamMembers] = useState([])
  const [customers,setCustomers] = useState([])
  const {user} = useAuth()
  const [chats,setChats] = useState([])
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const ticketStatusArray = [
    {
      name: "Resolved",
      value: "resolved"
    },
    {
      name: "Unresolved",
      value: "unresolved"
    }
  ];
  const {config} =useConfig()
 
  useEffect(()=>{
    if(user){
      if(user.role === 'admin'){
        fetchTeamMembers(user.id,setTeamMembers)
      }
      fetchCustomers(user.id,user.role,setCustomers)
    }
  },[user])

  useEffect(()=>{
      
      
    if (selectedChat && selectedChat.ticketId) {
      if (user.role === 'admin' && user.id !== selectedChat.ticketAssigned) {
        setIsUnauthorized(true);
        setChats([]); 
        return;
      }
      setIsUnauthorized(false)
      if(selectedChat.ticketStatus === 'resolved'){
        setChats([])
        return
      }
      fetchChats(selectedChat.ticketId,setChats);
    }
  },[selectedChat])

  const handleSelectTeamMember =(member)=>{
    setTeamModel(true)
    setSelectedMember(member)  
  }

  const handleStatusClick =(status)=>{
    setIsResolvedOpen(true)
    setStatus(status.name)
    
  }
  const showDateDivider =(chat,index)=>{
    if(index== 0) return false
    const chatDate = new Date(chat.timestamp).toDateString()
    const prevChatDate = new Date(chats[index-1].timestamp).toDateString()
    return chatDate != prevChatDate  
  }

  const handleSendMessage = async()=>{

    if(msg.trim() === '' )return;
    const currentChat = {    
      senderType: user.role === 'admin'?'admin':'member',
      message: msg,
      sender: user?.id, 
      ticketId:selectedChat.ticketId
    }
    const newChats = [...chats,currentChat]

    try {
       await axios.post(`${API_BASE_URL}/api/chats/create/chat`,currentChat)
      
    } catch (error) {
      toast.error(error.message||'Something went wrong')
    }

    setChats(newChats)
    setMsg('')

   
}

  const handleKeyDown =(e)=>{
      if(e.key === 'Enter' && !e.shiftKey){
        e.preventDefault()
         handleSendMessage()
      }
  }

  const handleAssignTicket = async()=>{

    try {
      const response = await axios.put(`${API_BASE_URL}/api/tickets/assign/ticket`,{
        adminId:user.role === 'admin'? user.id:null,
        memberId:selectedMember._id,
        ticketId:selectedChat.ticketId

      })
      if(response.status === 200){
        fetchCustomers(user.id, user.role, setCustomers)
        setTeamModel(false)
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
    }
  }

  const handleUpdateTicketStatus = async()=>{
    if(!user) return
    try{
       const response = await axios.put(`${API_BASE_URL}/api/tickets/update/status/${selectedChat.ticketId}`,{
          status:status,
          userId:user.id
        
       })

       if(response.status === 200){
        toast.success('Ticket status updated')
        setIsResolvedOpen(false)
       }
    }catch(error){
      toast.error(error.message||'Somthing went wrong')
    }
  }

 
  return (
    <div className={styles.contactMainContainer}>
      <div className={styles.contactContainer}>
        <div className={styles.contactInfo}>
           <h3>Contact center</h3>
           <div className={styles.contactHeader}>
             <button className={styles.chatBtn}>
              Chats
             </button>
           </div>
           <div className={styles.contactBody}>
             {customers && customers.length > 0 ? customers.map((customer)=>(
              <div className={`${styles.userContact} ${selectedChat?._id === customer._id ? styles.activeUserChat : ''}` }>
                <div className={`${styles.contact} ${selectedChat?._id === customer._id ? styles.activeChat : ''}`} onClick={() =>   setSelectedChat(customer)}>
                  <div className={styles.img}>
                    <img src={profileSVG} alt="" />
                  </div>
                  <div className={styles.chatInfo}>
                    <h5>{customer.name}</h5>
                    <p>{customer.lastChat}</p>
                  </div>
                </div>
              </div>
             )) : 
              <div>
                <p>No customers found</p>
              </div>
             }

           </div>
        </div>
        <div className={styles.chatBox}>
          <div className={styles.chatboxTopSection}>
            <h3>{selectedChat ? selectedChat.ticketTitle:'No ticket selected'}</h3>
            <PiHouseLight color='#424242'/>
          </div>
           <div className={styles.chatboxBody}>
             <div className={styles.chatSection}>
                { isUnauthorized ? 
                 (<>
                    <div className={styles.dateDivider}>
                      <div className={styles.line}></div>
                      <span className={styles.dateText}>{new Date().toDateString()}</span>
                      <div className={styles.line}></div>
                    </div>
                    <p className={styles.message}>This chat is assigned to new team member. you no longer have access </p>
                
                 </>) :(selectedChat?.ticketStatus == 'resolved')?
                 (
                  <>
                    <div className={styles.dateDivider}>
                      <div className={styles.line}></div>
                      <span className={styles.dateText}>{new Date().toDateString()}</span>
                      <div className={styles.line}></div>
                    </div>
                    <p className={styles.message}>This chat has been resolved </p>
                
                 </>
                 ):
                 ( chats&& chats.length > 0? chats.map((chat,index)=>(
                   <>
                    {showDateDivider(chat, index) && (
                      <div className={styles.dateDivider}>
                        <div className={styles.line}></div>
                        <span className={styles.dateText}>{new Date(chat.timestamp).toDateString()}</span>
                        <div className={styles.line}></div>
                      </div>
                    )}
                   {chat.senderType === 'admin'||chat.senderType === 'member'|| chat.senderType === 'bot'?(
                    <div className={styles.chatUser}>
                      <div className={styles.chatUserText}>
                        <h5>{user?.name}</h5>
                        <p>{chat.message}</p>
                      </div>
                      <BsPersonCircle size={20} className={styles.img} color='#808080'/>
                    </div>


                    ):(
                    <>
                      <div className={styles.chatCustomer}>
                         <BsPersonCircle size={20} className={styles.img} color='#808080'/>
                         <div className={styles.chatCustomerText}>
                            <h5>{selectedChat.name}</h5>
                              <p>{chat.message}</p>
                          </div>
                      </div>
                      {chat.missed && <p className={styles.warning}>Replying to missed chat </p>}
                    </>
                    )}
                    
                   </>
                  )):
                  <div>
                    <p className={styles.message}>No chats available</p>
                  </div>
                  )}

                  <div className={styles.chatInput}>
                    <textarea name="msg" id="" value={msg} placeholder='Type here' onChange={(e) =>setMsg(e.target.value)} onKeyDown={(e)=>handleKeyDown(e)}/>
                    <button className={`${styles.sendBtn} ${!msg? styles.diableBtn: styles.ableBtn}`} disabled={!msg} onClick={handleSendMessage}  >
                      <BiSolidSend size={16} color={msg? '#184E7F':'#D1D6DA'} />
                    </button>
                  </div>
             </div>
           </div>
        </div>
        <div className={styles.teamInfo}>
          <div className={styles}>
             {selectedChat && <UserDetails selectedChat={selectedChat}/>   }    
          </div>
          <div className={styles.teamDetails}>
            <h5>Teammates</h5>
            <Dropdown 
              options={teamMembers} 
              onClick={handleSelectTeamMember} 
              icon={<IoIosPeople size={20} 
              color='#808080'/>} 
              heading={'Select team member'}
            />
            { isTeamModel && 
            <Modal 
            message={'Chat would be assigned to Different team member  '} 
            onCancel={()=>setTeamModel(false)}
            onConfirm={handleAssignTicket} 
            />}

            <Dropdown 
              options={ticketStatusArray} 
              onClick={handleStatusClick} 
              icon={<LuTicket size={20} 
              color='#808080'
              />} 
              heading={'Ticket status'}
             />
            { isResolvedOpen && <Modal 
              message={'Chat will be closed '} 
              onCancel={()=>setIsResolvedOpen(false)}
              onConfirm={handleUpdateTicketStatus}
            />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
