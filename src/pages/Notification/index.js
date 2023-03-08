import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import axios from 'axios';
import { toggleLoader } from '../../components/loader/loader-toggle';

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

  const acceptFriendRequest = (friendReq)=>{
   
    axios({
        method : "POST",
        data : {
            requestData : friendReq,
            newFriend : friendReq.sender,
            newFriendReceiver : currentUser
        },
        url : `https://odin-book-api-production.up.railway.app/users/friendRequest/accept/${currentUser._id}`
    }).then(function (response) {
      const alertBox = document.querySelector('#alert-box');
      alertBox.style.display='inline';
      alertBox.textContent='Accept friend request'
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const declineFriendRequest= (friendReq)=>{
 
    axios({
        method : "POST",
        data : {
            requestData : friendReq,
            newFriend : friendReq.sender,
            newFriendReceiver : currentUser
        },
        url : `https://odin-book-api-production.up.railway.app/users/friendRequest/decline/${currentUser._id}`
    }).then(function (response) {
      const alertBox = document.querySelector('#alert-box');
      alertBox.style.display='inline';
      alertBox.textContent='Decline friend request';
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <Dashboard  dashIndex={4} />
      <div className='main'>
        <div className='notif-page'>
        <div className='friendReq-head'>Friend Request</div>
        <div className='friendReq-main'>

        {(currentUser.friendRequest).map((data)=>{
            toggleLoader();
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
