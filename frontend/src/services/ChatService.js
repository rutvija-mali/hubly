import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
import { toast } from "react-toastify";

export const fetchChats = async(ticketNo,setChats)=>{
    try {
      
      const response = await axios.get(`${API_BASE_URL}/api/chats/ticketId/${ticketNo}`)
      if(response.status === 200){
        setChats(response.data)
      }
    } catch (error) {
      toast.error(error.message||'Something went wrong')
    }
  }

  export const getTotalChatCount = async(setTotalChats) =>{
    try {
      const response = await axios.get(`${API_BASE_URL}/api/chats/get-count`)
      if(response.status === 200){
        setTotalChats(response.data)
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
    }
  }

  export const getMissedChatsPerWeek = async(setData) =>{
    try {
      const response = await axios.get(`${API_BASE_URL}/api/chats/get-missedChat-count`)
      if(response.status === 200){
        setData(response.data)
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
    }
  }