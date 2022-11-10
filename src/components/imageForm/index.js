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
  


    return (
        <div className="profile-image-form">
            <form method='POST' action='http://localhost:5000/images/' enctype="multipart/form-data">
            <input type = "hidden" name = "byUser" value = {currentUser.email} />
            <input type = "hidden" name = "_id" value = {currentUser._id} />
            <label>Update Profile Image</label>         
            <input type='file' name='image' /* value={image}  */
           /*  onChange={(e)=> setImage(e.target.value)} */ ></input>
            <button type='submit'>Confirm change</button>
            </form>
        </div>
    )
}

export default ImageForm;