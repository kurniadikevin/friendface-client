import axios from 'axios';
import { useState } from 'react';
import './style.css';

const ImageForm = (props)=>{

    let currentUser = props.currentUser;
   //console.log(currentUser)
    const [image,setImage]= useState()

   /*  const updateProfileImage = ()=>{
        axios({
            method : "POST",
            data : {
                byUser: currentUser.email,
                image : image
            },
            withCredentials : true,
            url : 'http://localhost:5000/images/'
        }).then((res)=>{
            console.log(res)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
 */

    return (
        <div className="profile-image-form">
            <form method='POST' action='http://localhost:5000/images/'>
            <label>name</label>
            <input type='text' name='name'></input>
            <label>Desc</label>
            <input type='text' name='desc'></input>
            <label>Update Profile Image</label>         
            <input type='file' name='image' /* value={image}  */
           /*  onChange={(e)=> setImage(e.target.value)} */ ></input>
            <button type='submit'>Confirm change</button>
            </form>
        </div>
    )
}

export default ImageForm;