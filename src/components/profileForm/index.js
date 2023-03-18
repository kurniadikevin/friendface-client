import { useState } from 'react';
import './style.css';
import axios from 'axios';
import { refreshLoginSession } from '../functions';

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
           withCredentials: true,
           url: `https://3088-2001-448a-3032-ed80-5d90-4b56-1649-edab.ap.ngrok.io/users/update/${currentUser._id}`,
         }).then(function (response) {
             console.log(response);
            const form = document.querySelector('#profileForm');
            form.style.display='none';
            refreshLoginSession(currentUser);
            const usernameDisplay=document.querySelector('#user-username');
            usernameDisplay.textContent=data;
           })
           .catch(function (error) {
             console.log(error);
           });
    }

    
    return (
        <div className="profile-username-form">
            <label>Username</label>
            <input placeholder={currentUser? currentUser.username : ''} onChange={(e)=> setData(e.target.value)}
            ></input>
            <button id='confirmUser-btn' onClick={updateUsername}>Confirm change</button>
        </div>
    )
}

export default ProfileForm;