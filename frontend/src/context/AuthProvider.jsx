import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext(null);
export const AuthProvider =({children})=>{
   const [user, setUser] =   useState(null);
   const [userName, setUserName] = useState('')
   const fetchUser = async ()=>{
    try {
     const response =  await axios.get(`${API_BASE_URL}/api/users/all/`)
        setUser(response.data)
        setUserName(`${response.data.firstName} ${response.data.lastName}`)
        
    } catch (error) {
        setUser(null)
    }
}
   useEffect(()=>{
    fetchUser();
   },[])

   return(
    <AuthContext.Provider value={{user,fetchUser,userName}}>
        {children}
    </AuthContext.Provider>
   )
}

export const useAuth = ()=>useContext(AuthContext);