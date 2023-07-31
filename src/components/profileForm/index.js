import { useState } from 'react';
import './style.css';
import axios from 'axios';
import { refreshLoginSession,toggleBluredBg,toggleForm,handleKeyEnter } from '../functions';

const ProfileForm = (props)=>{

    const [data,setData]= useState('');

    let currentUser ;
  
  if(!props.currentUser){
    currentUser = { 
      _id : 'not set',
      username : 'not signed in',
      email : 'not available',
    }} else {
      currentUser = props.currentUser;
    }
  

    const updateUsername = ()=>{
      const alertBox = document.querySelector('#alert-box');
      alertBox.textContent='Username updated!'
      alertBox.style.display='inline';
         axios({
           method: "POST",
           data: {
             username : data,
             _id : currentUser._id
           },
           headers : {  Authorization : `Bearer ${localStorage.getItem("token")}`},
           withCredentials: true,
           url: `https://encouraging-pig-cuff-links.cyclic.cloud/users/update/${currentUser._id}`,
         }).then(function (response) {
             console.log(response);
            const form = document.querySelector('#profileForm');
            form.style.display='none';
            refreshLoginSession(currentUser);
            const usernameDisplay=document.querySelector('#user-username');
            usernameDisplay.textContent=data;
            setTimeout(()=> window.location.reload(false),1000);
           })
           .catch(function (error) {
             console.log(error);
           });
    }

    
    return (
        <div className="profile-username-form">
            <label>Username</label>
            <input placeholder={currentUser? currentUser.username : ''} onChange={(e)=> setData(e.target.value)}
             onKeyDown={(event)=>{handleKeyEnter(event, updateUsername)}}
            ></input>
            <button id='confirmUser-btn' onClick={updateUsername}>Confirm change</button>
            <span id='close-box' class="material-symbols-outlined"
             onClick={()=>{toggleForm('profileForm'); toggleBluredBg()}}>
              close
            </span>
        </div>
    )
}

export default ProfileForm;