import './style.css';
import {  useParams ,useHistory} from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DisplayPost } from '../../components/displayPost';
import { toggleForm,getUser } from '../../components/functions';



export function UserProfilePage() {

  const [postCount,setPostCount]= useState(0);
  const [userData,setUserData]= useState(
    { username : 'loading',
      email : 'loading' , profilePicture : ''});

  let history = useHistory();
  // current user
  let currentUser = getUser();
  // visited profile user fetch by parameter userId
   let {userId} = useParams(); 

  const fetchUserData = async ()=>{
        //redirect to profile if user visit their own profile
        if(userId === currentUser._id){
          history.push("/profile");
        }
       
        const url=`http://localhost:5000/users/${userId}`;
        const response = await fetch(url);
        var data = await response.json();
        setUserData(data[0]);
        //check for friend status on user visit
        checkFriendStatusAndRequest(data[0].friends,'Friend');
         //check for friend request  user visit
         checkFriendStatusAndRequest(data[0].friendRequest,'Friend request sent');

        }

  const fetchPostCount= async ()=>{
    const url=`http://localhost:5000/posts/${userId}/count`;
    const response = await fetch(url);
    var data = await response.json();
    setPostCount(data.postCount);
    }

  const sendFriendRequest=()=>{
    const senderInfo={
      _id : currentUser._id,
      username : currentUser.username,
      email : currentUser.email
    }

    axios({
      method : "POST",
      data : {
        requestData :{
            sender :  senderInfo,
            status : 'pending'
        }
      },
      headers : {  Authorization : `Bearer ${localStorage.getItem("token")}`},
      withCredentials : true,
      url : `http://localhost:5000/users/friendRequest/${userId}`
    }).then(function(response){
      const alertBox = document.querySelector('#alert-box');
      alertBox.textContent='Friend request sent!'
      alertBox.style.display='inline';

      //change button display when friend request send
      const requestButton = document.querySelector('#friendReq-btn');
      requestButton.textContent='Friend request sent';
      requestButton.style.backgroundColor='var(--green)';
      requestButton.style.color='var(--background00)';

    })
    .catch(function(error){
      console.log(error);
    })
  }

  const checkFriendStatusAndRequest = (type,textButton)=>{
    const userFriendsList = type;
    const checkIncludeFriend = userFriendsList.filter((item)=>{
     if(item.sender){
      return item.sender._id === currentUser._id;
     } else{
      return item._id === currentUser._id;
     }
      
    })
    if(checkIncludeFriend.length > 0){
      const requestButton = document.querySelector('#friendReq-btn');
      requestButton.textContent=textButton;
      requestButton.style.backgroundColor='var(--green)';
      requestButton.style.color='var(--background00)';
    }
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
                  <div className='text' id='user-username'> {userData?.username ? userData.username : 'Not Set'} </div>
              </div>
              <div className='profile-email'>
                <div className='tag'>Email :</div>
                <div className='text'> {userData? userData.email : 'Not available'}</div>
              </div>        
            </div>
            <div className='profile-row2'>
              <div className='friends-count'>
                <div className='tag'>Friends :</div>
                <div id='friend-count' onClick={()=>
                   toggleForm('friends-list')}>
                  {userData._id !== 'not set'? 
                  userData.friends?.length : '0'} </div>
              </div>
              <div id='friends-list'>
                Friend list
                  {userData.friends ?
                  (userData.friends).map((data)=>{
                      return(
                        <div className='friendList-cont'>
                          <div>{data.username }</div>
                          <div className='tag'>{data.email }</div>
                        </div>
                      )
                  }) : <div className='friendList-cont'>
                        <div>No friends yet</div>
                       </div>
                }
                </div>

              <div className='post-count-cont'>
                <div>Posts : </div>
                <div  id='post-count'>{postCount} </div>
              </div>
            </div>
            <div className='profile-row3'>
              <button id='friendReq-btn' /* onClick={sendFriendRequest} */
              onClick={(e)=>{
                if(e.target.textContent==='Friend'|| e.target.textContent==='Friend request sent'){
                  return;
                } else{
                  sendFriendRequest();
                }
              }}>
                Add Friend Request</button>
            </div>
          </div>
        </div>

        <div className='profile-body'>
          <DisplayPost currentUser={currentUser} urlExtension={`byUser/${userId}/`}/>
        </div>
      </div>
      
      <Sidebar/>
    </div>
  );
}

