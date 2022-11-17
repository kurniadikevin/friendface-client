import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import axios from 'axios';

export function NotificationPage(props) {

  let currentUser ;
  if(!props.currentUser){
    currentUser = { 
      _id : 'not set',
      username : 'not signed in',
      email : 'not available',
      friends : [],
      friendRequest : []
    }} else {
      currentUser = props.currentUser;
    }
  

  const acceptFriendRequest = (friendReq)=>{
    const alertBox = document.querySelector('#alert-box');
    alertBox.style.display='inline';
    alertBox.textContent='Accept friend request'
    axios({
        method : "POST",
        data : {
            requestData : friendReq,
            newFriend : friendReq.sender,
            newFriendReceiver : currentUser
        },
        url : `https://odin-book-api-production.up.railway.app/users/friendRequest/accept/${currentUser._id}`
    }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const declineFriendRequest= (friendReq)=>{
    const alertBox = document.querySelector('#alert-box');
    alertBox.style.display='inline';
    alertBox.textContent='Decline friend request'
    axios({
        method : "POST",
        data : {
            requestData : friendReq,
            newFriend : friendReq.sender,
            newFriendReceiver : currentUser
        },
        url : `https://odin-book-api-production.up.railway.app/users/friendRequest/decline/${currentUser._id}`
    }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <Dashboard currentUser={props.currentUser} dashIndex={4} />
      <div className='main'>
        <div className='notif-page'>
        <div className='friendReq-head'>Friend Request</div>
        <div className='friendReq-main'>
        {(currentUser.friendRequest).map((data)=>{
            return (
                <div className='friendReq-cont'>
                    <div className='friendReq-username'>{data.sender?.username}</div>
                    <div className='friendReq-email'>{data.sender?.email}</div>
                    <div className='friendReq-status'>Status : {data?.status}</div>
                <div className='friendReq-button-cont'>
                    <button  id='accept-req' onClick={()=>acceptFriendRequest(data)}>Accept</button>
                    <button id='decline-req'onClick={()=>declineFriendRequest(data)}>Decline</button>
                </div>
                </div>
            )
        })}
        </div>
        </div>
      </div>
      
      <Sidebar/>
    </div>
  );
}
