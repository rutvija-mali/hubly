import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
import { toast } from "react-toastify";

export  const fetchCustomers = async(id,role,setCustomers) =>{
    console.log("fetch customer is called");
    
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/get/customers`,{
        params:{
          id,
          role 
        }
      }) 
      
      if(response.status === 200){
        setCustomers(response.data)
        
      }
    } catch (error) {
      toast.error(error.message||'Something went wrong')
    }
  }

export const fetchTeamMembers = async(adminId,setTeamMembers) =>{
      try {
        const response = await axios.get(`${API_BASE_URL}/api/users/admin/${adminId}`)
        if(response.status === 200){
         setTeamMembers(response.data)
        }
      } catch (error) {
        toast.error(error.message||'Something went wrong')
      }
    }