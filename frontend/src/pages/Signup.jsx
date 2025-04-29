import React, { useState } from 'react';
import styles from '../styles/signup.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { useScreenSize } from '../context/ScreenSizeProvider';
import Logo from '../components/Logo';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { toast } from 'react-toastify';



const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username:'',
    email: '',
    password: '',
    confirmPassword: '',
    toc: false,
  });
  const[loading,setLoading]=useState(false)
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast.error("First name is required.");
      return false;
    }
    if (!formData.lastName.trim()) {
      toast.error("Last name is required.");
      return false;
    }
    if (!formData.username.trim()) {
      toast.error("Username is required.");
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Enter a valid email.");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    if (!formData.toc) {
      toast.error("You must agree to the terms and conditions.");
      return false;
    }
    return true;
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      if (!validateForm()) return;
      setLoading(true)
     const response = await axios.post(`${API_BASE_URL}/api/users/register`,formData)
        if(response.status == 201){
          toast.success('User created successfully!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setFormData({
            firstName: '',
            lastName: '',
            username:'',
            email: '',
            password: '',
            confirmPassword: '',
            toc: false,
          })

          navigate('/login')
        }
      setLoading(false)
    } catch (error) {
      toast.error(error.message||'Something went wrong!', {
        position: 'top-right',
        autoClose: 3000, // Auto close in 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false)
    }


  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };  

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <Logo/>
        <div className={styles.formSection}>  
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <span>Create an account</span>
              <a href="#" onClick={()=>navigate('/login')}>Sign in instead</a>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              
              <div className={styles.inputGroupToc}>
                
                  <input
                    type="checkbox"
                    id="terms"
                    name="toc"
                    onChange={handleChange}
                    checked={formData.toc}
                  />
                  <label htmlFor="terms">
                  By creating an account, I agree to our <a href="#">terms of use</a> and <a href="#">privacy policy</a>
                </label>
              </div>
              
              <button type="submit" disabled={loading}>{loading?'Creating...':'Create an account'}</button>
            </form>
          </div>
         
        </div>
        <div className={styles.noticeContainer}>
            <p>
              This site is protected by reCAPTCHA and the
              <a href="#"> Google Privacy Policy </a> and
              <a href="#"> Terms of Service </a> apply.
            </p>
          </div>
      </div>
      <div className={styles.imgContainer}></div>
    </div>
  );
};

export default Signup;
