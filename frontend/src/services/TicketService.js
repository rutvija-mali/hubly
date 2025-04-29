import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
import { toast } from "react-toastify";

export const getPercentage = async(setPercentage) =>{
    try {
        const response = await axios.get(`${API_BASE_URL}/api/tickets/get-percentage`)
        if(response.status === 200){
            setPercentage(response.data.percentage)
        }
    } catch (error) {
        toast.error(error.message||'Something went wrong')
    }
}

export const getAvgReplyTime = async(setAvgReply)=>{
   try {
    const response = await axios.get(`${API_BASE_URL}/api/tickets/get/average-reply-time`)
    if(response.status === 200){
        const timeInMs = response.data.totalAverageReplyTime
        setAvgReply(timeInMs)

    }
   } catch (error) {
      toast.error(error.message || 'Something went wrong')
   }
}

