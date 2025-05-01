import React, { useState ,useEffect} from 'react'
import styles from '../styles/Dashboard.module.css'
import { RiSearch2Line } from "react-icons/ri"; 
import { PiShoppingBagLight } from "react-icons/pi";
import Ticket from '../components/Ticket';
import {useAuth} from '../context/AuthProvider'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
import axios from 'axios';
import {toast} from 'react-toastify'

const Dashboard = () => {
  const [isActiveTab, setActiveTab] = useState("All Tickets")

  const [tickets, setTickets] = useState()
  const [searchQuery, setSearchQuery] = useState()
  const {user} = useAuth()

  useEffect(()=>{
    const fetchAssignedTickets = async(userId)=>{
      try {
         const response = await axios.get(`${API_BASE_URL}/api/tickets/${userId}`,{
          params:{
            status:isActiveTab,
            name:searchQuery
          }
         })

         if(response.status === 200){
          setTickets(response.data)
         }
      } catch (error) {
        toast.error(error.message||'Something went wrong')
      }
    }

    if(user){
      fetchAssignedTickets(user.id)
    }
  },[user,isActiveTab,searchQuery])
  return (
    <div className={styles.dashboardMainContainer}>
       <div className={styles.dashboardContainer}>
         <h3>Dashboard</h3>
         <div className={styles.inputConatiner}>
           <RiSearch2Line className={styles.icon} size={20} />
           <input type="text" placeholder='Search for ticket' onChange={(e)=>setSearchQuery(e.target.value)} />
         </div>
         <div className={styles.mainConatiner}>
             <div className={styles.mainHeader}>
                
                {["All Tickets","Resolved","Unresolved"].map((tab,index)=>(
                  <button key={index} className={`${styles.tabButton} ${isActiveTab === tab? styles.activeTab :''} `} onClick={()=>setActiveTab(tab)}>
                    {tab === "All Tickets" ? <PiShoppingBagLight className={styles.iconBag} size={18} /> : ''} 
                    {tab }
                </button>
                ))}
             </div>
             <div className={styles.ticketContainer}>
               {tickets && tickets.length > 0? tickets.map((ticket)=>(
                <Ticket ticket={ticket} key={ticket._id}/>
               )):<div> No Resolved tickets available</div>}
             </div>
         </div>
       </div>
    </div>
  )
}

export default Dashboard
