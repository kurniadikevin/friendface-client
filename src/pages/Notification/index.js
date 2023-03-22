import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import axios from 'axios';
import { toggleLoader } from '../../components/loader/loader-toggle';
import { useEffect, useState } from 'react';
import { refreshLoginSession } from '../../components/functions';

export function NotificationPage() {

  // get login user information
  const getUser=()=>{
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      return foundUser;
    }
  }

  let currentUser = getUser();
  
  const acceptFriendRequest = (friendReq,friendData,index)=>{
    axios({
        method : "POST",
        data : {
            requestData : friendReq,
            newFriend : friendData,
            newFriendReceiver : currentUser
        },
        url : `http://localhost:5000/users/friendRequest/accept/${currentUser._id}`
    }).then(function (response) {
      const alertBox = document.querySelector('#alert-box');
      alertBox.style.display='inline';
      alertBox.textContent='Accept friend request';
      const requestContainer = document.querySelectorAll('.friendReq-cont');
      requestContainer[index].style.display='none';
      refreshLoginSession(currentUser);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const declineFriendRequest= (friendReq,friendData,index)=>{
    const alertBox = document.querySelector('#alert-box');
    alertBox.style.display='inline';
    alertBox.textContent='Decline friend request';
    const requestContainer = document.querySelectorAll('.friendReq-cont');
    requestContainer[index].style.display='none';
    refreshLoginSession(currentUser);
    axios({
        method : "POST",
        data : {
            requestData : friendReq,
            newFriend : friendData,
            newFriendReceiver : currentUser
        },
        url : `http://localhost:5000/users/friendRequest/decline/${currentUser._id}`
    }).then(function (response) {
      
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const switchNotif=(type)=>{
    const friendReqMain= document.querySelector('.friendReq-main');
    const likeAndCommentMain = document.querySelector('.likeAndComment-main');
    const friendReqHeader= document.querySelector('#friendReq-select');
    const likeAndCommentHeader= document.querySelector('#likeAndComment-select');
    if(type==='friend'){
      friendReqMain.style.display='block';
      likeAndCommentMain.style.display='none';
      friendReqHeader.style.color='var(--purple)';
      likeAndCommentHeader.style.color='var(--bg2)';

    } else if(type==='likeAndComment'){
      friendReqMain.style.display='none';
      likeAndCommentMain.style.display='block';
      friendReqHeader.style.color='var(--bg2)';
      likeAndCommentHeader.style.color='var(--purple)';
    }
  }

  const getUserInfoNotification=(authorId)=>{
    fetch(`http://localhost:5000/users/${authorId}`)
    .then((response) => response.json())
    .then((data) =>{ 
      console.log(data.email);
      return data.email;
    });
  }

  useEffect(()=>{
    toggleLoader();
    
  },[])

  return (
    <div className="App">
      <Dashboard  dashIndex={4} />
      <div className='main'>
        <div className='notif-page'>
        <div className='friendReq-head'>
          <div id='friendReq-select' onClick={()=>switchNotif('friend')}>
            Friend Request</div>
          <div id='likeAndComment-select' onClick={()=> switchNotif('likeAndComment')}>
            Like and Comment</div>
        </div>
        <div className='friendReq-main'>

        {currentUser.friendRequest.length > 0 ? (currentUser.friendRequest).map((data,index)=>{
            const senderInfo={
              _id : data.sender._id,
              username : data.sender.username,
              email : data.sender.email
            }
           const requestData ={
              sender :  senderInfo,
              status : 'pending'
          }
            return (
                <div className='friendReq-cont'>
                    <div className='friendReq-username'>{data.sender?.username}</div>
                    <div className='friendReq-email'>{data.sender?.email}</div>
                    <div className='friendReq-status'>Status : {data?.status}</div>
                <div className='friendReq-button-cont'>
                    <button  id='accept-req' onClick={()=>acceptFriendRequest(requestData,senderInfo,index)}>Accept</button>
                    <button id='decline-req'onClick={()=>declineFriendRequest(requestData,senderInfo,index)}>Decline</button>
                </div>
                </div>
            )
        }): <div  className='friendReq-cont'> You have no friend request</div>}
        </div>
        <div className='likeAndComment-main'>
           {(currentUser.postNotification).length > 0 ? (currentUser.postNotification).map((item,index)=>{
              return (
              <div>
                <div>{getUserInfoNotification(item.byUser)}</div>
                <div>{item.action} your post
                {item.byUser}</div>
              </div>
              )
           }):
           <div  className='friendReq-cont'> Notification clear</div>
           }
           </div>
        </div>
      </div>
      
      <Sidebar/>
    </div>
  );
}
