import React, { useEffect, useState } from 'react'
import styles from '../styles/Settings.module.css'
import Button from '../components/Button'
import {useScreenSize} from '../context/ScreenSizeProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthProvider'
import infoIcon  from '../assets/material-symbols_info-outline-rounded.svg'

const Settings = () => {
const {isMobile} = useScreenSize()
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [username , setUsername] = useState('')
const [phone, setPhone] = useState('')
const[loading,setLoading]=useState(false)
const {user} = useAuth()
const navigate = useNavigate()

useEffect(() => {
  const fetchUser = async () => {
    if (!user || !user.id) return;
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/${user.id}`);
      if (response.status === 200) {
        const {name,email,username,phone} = response.data
        const [fName = '', lName = ''] = name.split(' ');
        setFirstName(fName);
        setLastName(lName);
        setEmail(email);
        setUsername(username)
        setPhone(phone)
    
   
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong!');
     
    }
  };
  fetchUser();
}, [user]);



const validateForm = () => {
  console.log("first name :",firstName);
  console.log("last name :",lastName);
  console.log("email :",email);

  console.log("phone :",phone);
  
  if (!firstName.trim()) {
    toast.error("First name is required.");
    return false;
  }
  if (!lastName.trim()) {
    toast.error("Last name is required.");
    return false;
  }
  
  if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
    toast.error("Enter a valid email.");
    return false;
  }
  if (!phone.trim().length === 10) {
    toast.error("Enter a valid phone.");
    return false;
  }
  if (password && password.length < 6) {
    toast.error("Password must be at least 6 characters long.");
    return false;
  }
  if( password && password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return false;
  }

  return true;
};
const handleSubmit = async(event) => {
  event.preventDefault();
  try {
    if (!validateForm()) return;
    setLoading(true)
    const dataToSend = {
      name: `${firstName} ${lastName}`.trim(),
      email,
      username,
      phone
      
    };
    if (password.trim()) {
      dataToSend.password = password;
    }
  
   const response = await axios.put(`${API_BASE_URL}/api/users/${user.id}`,dataToSend)
      if(response.status == 200){
        toast.success('User updated successfully!');       
         const response = await axios.post(`${API_BASE_URL}/api/users/logout`)
         if(response.status == 200){
          toast.success('User logout successfully!');
          navigate('/login')
        }
      }
    setLoading(false)
  } catch (error) {
    toast.error(error.message||'Something went wrong!');
    setLoading(false)
  }


};

  return (
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          {/* Heading Section */}
          <div className={styles.headingSection}>
            <div>
              <h3>Settings</h3>
              
            </div>
            
          </div>
          <div className={styles.mainContent}>
             <div className={styles.heading}>
                 <button>Edit profile</button>
             </div>
             <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                 <div className={styles.inputLabelField}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                    className={styles.userInput}
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      onChange={(e)=>setFirstName(e.target.value)}
                    />
                 </div>
                </div>
                
                <div className={styles.inputGroup}>
                  <div className={styles.inputLabelField}>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      className={styles.userInput}
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={(e)=>setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <div className={styles.inputLabelField}>
                    <label htmlFor="username">username</label>
                    <input
                      className={styles.userInput}
                      type="text"
                      id="username"
                      name="username"
                      value={username}
                      onChange={(e)=>setUsername(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className={styles.inputGroup}>
                  <div className={styles.inputLabelField}>
                    <label htmlFor="email">Email</label>
                    <input
                      className={styles.userInput}
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      
                    />
                  </div>
                  
                  <span className={styles.infoIcon}>
                    <img src={infoIcon} alt="info"  />
                    <div className={styles.tooltip}>User will be logged out immediately</div>
                  </span>
                  
                </div>
                <div className={styles.inputGroup}>
                  <div className={styles.inputLabelField}>
                    <label htmlFor="phone">Phone</label>
                    <input
                      className={styles.userInput}
                      type="phone"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(e)=>setPhone(e.target.value)}
                      
                    />
                  </div>
                  
                  <span className={styles.infoIcon}>
                    <img src={infoIcon} alt="info"  />
                    <div className={styles.tooltip}>User will be logged out immediately</div>
                  </span>
                  
                </div>
                
                <div className={styles.inputGroup}>
                  <div className={styles.inputLabelField}>
                    <label htmlFor="password">Password</label>
                    <input
                    className={styles.userInput}
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                  </div>
                  <span className={styles.infoIcon}>
                    <img src={infoIcon} alt="info"  />
                    <div className={styles.tooltip}>User will be logged out immediately</div>
                  </span>
                </div>
                
                <div className={styles.inputGroup}>
                  <div className={styles.inputLabelField}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      className={styles.userInput}
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <span className={styles.infoIcon}>
                    <img src={infoIcon} alt="info"  />
                    <div className={styles.tooltip}>User will be logged out immediately</div>
                  </span>
                </div>
             </form>
             <div className={styles.buttonSection}>
              <Button type={'submit'} onClick={handleSubmit} disable={loading}>
               {loading?'Editing':'Edit'}

              </Button>
             </div>

          </div>
          
        </div>
      </div>
  
  )
}

export default Settings