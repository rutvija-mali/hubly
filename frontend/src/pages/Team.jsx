import React, { useEffect, useState } from 'react'
import styles from '../styles/Team.module.css'
import profileImg from '../assets/img.svg'
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Modal from '../components/Modal';
import AddTeam from '../components/AddTeamMember'
import AddTeamMember from '../components/AddTeamMember';
import Button from '../components/Button'
import { IoAddCircleOutline } from "react-icons/io5";
import {useAuth} from '../context/AuthProvider'
import axios from 'axios';
import { toast } from 'react-toastify';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const Team = () => {
  const [team, setTeam] = useState()
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedMember,setSelectedMember] =useState(null)
  const {user} = useAuth()
  
  const handleEditTeam =(team)=>{
   setIsEdit(true)
   setSelectedMember(team)
  }
 const fetchTeamMembers = async(adminId)=>{
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/admin/${adminId}`,{
      })
      if(response.status === 200){
        setTeam(response.data)
      }

    } catch (error) {
        toast.error(error.message || 'Something went wrong!');
    }
 }
  useEffect(()=>{
    if(user){
      const adminId = user.role === 'admin'? user.id : user.adminId
      fetchTeamMembers(adminId)
    }
  },[user])
    

  const handleDeleteClick = (team) => {
    setIsDelete(true);
    setSelectedMember(team)

  };

  const handleDelete = async(memberId,adminId) =>{
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/users/member/${memberId}/adminId/${adminId}`)
      if(response.status === 200){
         toast.success('Member deleted successfuly')
         fetchTeamMembers(adminId)
         setIsDelete(false)
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
    }
  }
  return (
    <div className={styles.teamMainContainer}>
    <div className={styles.teamContainer}>
      <h3>Team</h3>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Full name</th>
              <th>User name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              {user?.role === 'admin' &&<th> </th>}
            </tr>
          </thead>
        <tbody>
            {team && team.map((team,index)=>
                <tr key={index}>
                  <td>
                    {`${team.name}`}
                  </td>
                  <td>{team.username}</td>
                  <td>{team.phone}</td>
                  <td>{team.email}</td>
                  <td>{team.role}</td>
                 {user?.role === 'admin' && <td className={styles.action}>
                    <CiEdit size={20} className={styles.icon} onClick={()=>handleEditTeam(team)}/>
                    <MdDeleteOutline size={20} className={`${styles.icon} ${styles.deleteIcon}`} onClick={()=>handleDeleteClick(team)}/>
                  </td>}
              </tr>        
              )}
        </tbody>

      </table>
     {user?.role === 'admin' && <div className={styles.btnContainer}>
        <button onClick={()=>setIsEdit(true)} className={styles.addTeamBtn}>
          <IoAddCircleOutline size={20} /> 
          Add Team members
        </button>
      </div>}
      </div>
      {isEdit && <div className={styles.model}>
        <AddTeamMember onCancel={()=>setIsEdit(false)} team={selectedMember} setIsEdit={setIsEdit} fetchTeamMembers={fetchTeamMembers}/>
      </div>}
      {isDelete && <div className={styles.model}>
        <Modal message={'This teammate will be deleted.'} onCancel={()=>setIsDelete(false)} onConfirm={()=>handleDelete(selectedMember._id,user.id)}/>
      </div>}
    </div>
  </div>
  )
}

export default Team