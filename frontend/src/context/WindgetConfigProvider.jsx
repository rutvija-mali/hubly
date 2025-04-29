import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
import {toast} from 'react-toastify'

const widgetContext = createContext()
export const WindgetConfigProvider = ({children}) => {
const [config,setConfig] = useState(null)
    const fetchConfig = async () =>{

        try {
            const response = await axios.get(`${API_BASE_URL}/api/config/widget`)
            if(response.status === 200){
                setConfig(response.data)
            }
        } catch (error) {
            toast.error(error|| 'Something went wrong')
        }
    }
    useEffect(()=>{
   
        fetchConfig()

    },[])
  return (
    <widgetContext.Provider value={{config}}>
      {children}
    </widgetContext.Provider>
  )
}

export const useConfig = () => useContext(widgetContext)