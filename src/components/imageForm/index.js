import axios from 'axios';
import { useState } from 'react';
import './style.css';

const ImageForm = (props)=>{

    let currentUser ;
 
    if(!props.currentUser){
      currentUser = { 
        _id : 'not set',
        username : 'not signed in',
        email : 'not available',
      }} else {
        currentUser = props.currentUser;
      }

      const imageSubmitAlert= ()=>{
        const alertBox = document.querySelector('#alert-box');
        alertBox.textContent='Profile Image Changed!'
        alertBox.style.display='inline';
      }
  


    return (
        <div className="profile-image-form">
            <form method='POST' action='https://odin-book-api-production.up.railway.app/images/' enctype="multipart/form-data">
            <input type = "hidden" name = "byUser" value = {currentUser.email} />
            <input type = "hidden" name = "_id" value = {currentUser._id} />
            <label>Update Profile Image</label>         
            <input type='file' name='image'  ></input>
            <button type='submit' id='fileInput'>Confirm change</button>
            </form>
        </div>
    )
}

export default ImageForm;