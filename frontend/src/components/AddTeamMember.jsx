import React, { useState } from 'react'
import styles from '../styles/AddTeam.module.css'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useAuth } from '../context/AuthProvider';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddTeamMember = ({ onCancel, team, setIsEdit, fetchTeamMembers }) => {
  const [formData, setFormData] = useState({
    username: team?.username || '',
    name: team?.name || '',
    email: team?.email || '',
    role: team?.role || 'admin'
  });

  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const validateForm = () => {
    if (!formData.username.trim()) {
      toast.error("Username is required.");
      return false;
    }
    if (!formData.name.trim()) {
      toast.error("Full name is required.");
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Enter a valid email.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) return;
    const adminId = user.role === 'admin' ? user.id : user.adminId
    console.log(" admin id is ", adminId
      
    );
    
    try {
      if (!validateForm()) return;
      setLoading(true);

      if (team) {
        const response = await axios.put(`${API_BASE_URL}/api/users/memberId/${team._id}/adminId/${user.id}`, formData);
        if (response.status === 200) {
          toast.success('User updated successfully!');
        }
      } else {
        const response = await axios.post(`${API_BASE_URL}/api/users/${user.id}`, formData);
        if (response.status === 200) {
          toast.success('User created successfully!');
        }
      }

      setFormData({ username: '', name: '', email: '', role: 'admin' });
      setIsEdit(false);
      fetchTeamMembers(adminId);
      setLoading(false);
    } catch (error) {
      toast.error(error.message || 'Something went wrong!');
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.addTeamModel}>
      <div className={styles.addTeamContainer}>
        <h2>Add Team members</h2>
        <p>
          Talk with colleagues in a group chat. Messages in this group are only visible to its participants.
          New teammates may only be invited by the administrators.
        </p>
        <div className={styles.addTeamForm}>
          <form>
            <div className={styles.inputGroup}>
              <label htmlFor="username">User name</label>
              <input type="text" id="username" name="username" placeholder="User name" value={formData.username} onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full name</label>
              <input type="text" id="name" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Email Id" value={formData.email} onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="role">Designation</label>
              <select id="role" name="role" value={formData.role} onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
              </select>
            </div>
          </form>
        </div>
        <div className={styles.buttonSection}>
          <button onClick={onCancel} className={`${styles.ModelBtn} ${styles.cancelBtn}`}>Cancel</button>
          <button className={`${styles.ModelBtn} ${styles.saveBtn}`} onClick={handleSubmit}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTeamMember;
