import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import axios from 'axios';
import { toggleLoader } from '../../components/loader/loader-toggle';
import { useEffect, useState } from 'react';
import { refreshLoginSession, displayDateDifferences,getUser } from '../../components/functions';

export function NotificationPage() {

  let currentUser = getUser();
  const [notifState,  setNotifState]= useState('notification');
  
  const acceptFriendRequest = (friendReq,friendData,index)=>{
    axios({
        method : "POST",
        data : {
            requestData : friendReq,
            newFriend : friendData,
            newFriendReceiver : currentUser
        },
        url : `https://odin-book-api-production.up.railway.app/users/friendRequest/accept/${currentUser._id}`
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
        url : `https://odin-book-api-production.up.railway.app/users/friendRequest/decline/${currentUser._id}`
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
      setNotifState('friendRequest')

    } else if(type==='likeAndComment'){
      friendReqMain.style.display='none';
      likeAndCommentMain.style.display='block';
      friendReqHeader.style.color='var(--bg2)';
      likeAndCommentHeader.style.color='var(--purple)';
      setNotifState('notification')
    }
  }

  const seenNotificationForPostAndFriendRequest=(user,urlExt)=>{
    axios({
      method : "POST",
      url : `http://localhost:5000/users/${urlExt}/${user._id}`
  }).then(function (response) {
    console.log(urlExt)
   /* refreshLoginSession(currentUser); */
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const styleUnSeenNotification=(data,element)=>{
    const notificationContainer= document.querySelectorAll(element);
   data.forEach((element,index)=>{
    if(element.seenAt == null ){
      notificationContainer[index].id='unseen-notif';   
    } 
   })
  }


  useEffect(()=>{
    toggleLoader();
    seenNotificationForPostAndFriendRequest(currentUser,'seenNotification');
    refreshLoginSession(currentUser);
    styleUnSeenNotification(currentUser.postNotification,'.likeAndComment-cont');
    styleUnSeenNotification(currentUser.friendRequest,'.friendReq-cont');
  },[notifState])

  return (
    <div className="App">
      <Dashboard  dashIndex={4} />
      <div className='main'>
        <div className='notif-page'>
        <div className='friendReq-head'>
          <div id='likeAndComment-select' onClick={()=> {
            switchNotif('likeAndComment')
            seenNotificationForPostAndFriendRequest(currentUser,'seenNotification');
            }}>
            Notification</div>
          <div id='friendReq-select' onClick={()=>{
            switchNotif('friend');
            seenNotificationForPostAndFriendRequest(currentUser,'seenFriendReqNotif')}}>
            Friend Request</div>
        </div>
        <div className='friendReq-main'>

        {currentUser.friendRequest.length > 0 ? (currentUser.friendRequest).reverse().map((data,index)=>{
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
                    <img  src={data.sender._id ?  `http://localhost:5000/users/profilePicture/${data.sender._id} `
                    : (require('../../assets/profilepicturesSmall.png'))}
                    alt='profileImage' 
                     id='notif-image'/>
                   <div>
                    <div className='friendReq-username'>{data.sender?.username}</div>
                    <div className='friendReq-email'>{data.sender?.email}</div>
                    <div className='friendReq-status'>Status : {data?.status}</div>
                   </div>
                <div className='friendReq-button-cont'>
                    <button  id='accept-req' onClick={()=>acceptFriendRequest(requestData,senderInfo,index)}>Accept</button>
                    <button id='decline-req'onClick={()=>declineFriendRequest(requestData,senderInfo,index)}>Decline</button>
                </div>
              </div>
            )
        }): <div  className='friendReq-cont'> You have no friend request</div>}
        </div>
        {<div className='likeAndComment-main'>
           {(currentUser.postNotification).length > 0 ? ((currentUser.postNotification).reverse()).map((item,index)=>{
              return (
              <div className='likeAndComment-cont'>
                <img  src={item.byUser._id ?  `https://odin-book-api-production.up.railway.app/users/profilePicture/${item.byUser._id} `
                    : (require('../../assets/profilepicturesSmall.png'))}
                    alt='profileImage'
                     id='notif-image'/>
               <Link  to={`/userProfile/${item.byUser._id}`}>
                  <div className='likeAndComment-username'>{item.byUser?.username ? item.byUser.username : item.byUser._id}</div>
                </Link>
                <div id='notif-email'>{item.byUser.email}</div>  
               
                <Link  to={`/postDetail/${item.postId}`}>
                  <div id='notif-action'>{item.action} your post</div>
                </Link>
                {item.date ? <div id='notif-date'>{displayDateDifferences(item.date)}</div> : ''}
              </div>
              )
           }):
           <div  className='friendReq-cont'> Notification clear</div>
           }
           </div>}
        </div>
      </div>
      
      <Sidebar/>
    </div>
  );
}
