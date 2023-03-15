import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import axios from 'axios';
import { toggleLoader } from '../../components/loader/loader-toggle';
import { useEffect } from 'react';

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

  const acceptFriendRequest = (friendReq,friendData)=>{
   
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
      alertBox.textContent='Accept friend request'
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const declineFriendRequest= (friendReq,friendData)=>{
 
    axios({
        method : "POST",
        data : {
            requestData : friendReq,
            newFriend : friendData,
            newFriendReceiver : currentUser
        },
        url : `http://localhost:5000/users/friendRequest/decline/${currentUser._id}`
    }).then(function (response) {
      const alertBox = document.querySelector('#alert-box');
      alertBox.style.display='inline';
      alertBox.textContent='Decline friend request';
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(()=>{
    toggleLoader();
  })

  return (
    <div className="App">
      <Dashboard  dashIndex={4} />
      <div className='main'>
        <div className='notif-page'>
        <div className='friendReq-head'>Friend Request</div>
        <div className='friendReq-main'>

        {currentUser.friendRequest.length > 0 ? (currentUser.friendRequest).map((data)=>{
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
                    <button  id='accept-req' onClick={()=>acceptFriendRequest(requestData,senderInfo)}>Accept</button>
                    <button id='decline-req'onClick={()=>declineFriendRequest(requestData,senderInfo)}>Decline</button>
                </div>
                </div>
            )
        }): <div  className='friendReq-cont'> You have no friend request</div>}
        </div>
        </div>
      </div>
      
      <Sidebar/>
    </div>
  );
}
