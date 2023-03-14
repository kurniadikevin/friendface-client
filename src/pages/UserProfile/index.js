import './style.css';
import {  useParams } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import { useState, useEffect } from 'react';
import CommentForm from '../../components/commentForm';
import axios from 'axios';
import { DisplayPost } from '../../components/displayPost';
import { toggleLoader } from '../../components/loader/loader-toggle';
import { formatDate } from '../../components/functions';



export function UserProfilePage() {

  const [postCount,setPostCount]= useState();
  const [userData,setUserData]= useState(
    { username : 'loading',
      email : 'loading' , profilePicture : ''});

  // get login user information
const getUser=()=>{
  const loggedInUser = localStorage.getItem("user");
  if (loggedInUser) {
    const foundUser = JSON.parse(loggedInUser);
    return foundUser;
  }
}
  // current user
  let currentUser = getUser();

  // visited profile user fetch by parameter userId
   let {userId} = useParams(); 

  const fetchUserData = async ()=>{
        const url=`http://localhost:5000/users/${userId}`;
        const response = await fetch(url);
        var data = await response.json();
        setUserData(data[0]);
        }

  const fetchPostCount= async ()=>{
    const url=`http://localhost:5000/posts/${currentUser._id}/count`;
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    setPostCount(data.postCount);
    }

  const sendFriendRequest=()=>{
    axios({
      method : "POST",
      data : {
        requestData :{
            sender :  currentUser,
            status : 'pending'
        }
      },
      withCredentials : true,
      url : `http://localhost:5000/users/friendRequest/${userId}`
    }).then(function(response){
      const alertBox = document.querySelector('#alert-box');
      alertBox.textContent='Friend request sent!'
      alertBox.style.display='inline';
    })
    .catch(function(error){
      console.log(error);
    })
  }

    useEffect(()=>{
      fetchUserData();
      fetchPostCount();
    },[userId])


  return (
    <div className="App">
      <Dashboard  dashIndex={2} />
      <div className='main' id='profile-main'>
        <div className='profile-head'>
          <div className='profile-pic-cont'>
            <img id='profileImgProfile' src= {userData?.profilePicture ? `http://localhost:5000/${userData.profilePicture} `
                     : (require('../../assets/profilepicturesSmall.png'))} alt='userPicture'
                      width={100} height={100}/>
          </div>

          <div className='profile-detail'>
            <div className='profile-row1'>
               <div className='profile-username'>
                  <div className='tag'>Username :</div>
                  <div className='text'> {userData?.username ? userData.username : 'Not Set'} </div>
              </div>
              <div className='profile-email'>
                <div className='tag'>Email :</div>
                <div className='text'> {userData? userData.email : 'Not available'}</div>
              </div>        
            </div>
            <div className='profile-row2'>
              <div className='friends-count'>
                <div className='tag'>Friends:</div>
                <div>{userData._id !== 'not set'? 
                  userData.friends?.length : '0'} </div>
              </div>
              <div className='post-count-cont'>
                <div>Posts: </div>
                <div>{postCount} </div>
              </div>
            </div>
            <div className='profile-row3'>
              <button id='friendReq-btn' onClick={sendFriendRequest}>Add Friend Request</button>
            </div>
          </div>
        </div>

        <div className='profile-body'>
          <DisplayPost currentUser={currentUser} urlExtension={`${userId}/`}/>
        </div>
      </div>
      
      <Sidebar/>
    </div>
  );
}

