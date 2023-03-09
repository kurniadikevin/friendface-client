import './style.css';
import {  useParams } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import { useState, useEffect } from 'react';
import CommentForm from '../../components/commentForm';
import axios from 'axios';
import { toggleLoader } from '../../components/loader/loader-toggle';


export function UserProfilePage() {
  
  const [postData,setPostData]= useState([]);
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
  let currentUser = getUser();

  // fetch by parameter userId
   let {userId} = useParams(); 

   const fetchPostData = async ()=>{
    const url=`https://odin-book-api-production.up.railway.app/posts/${userId}`;
    const response = await fetch(url);
    var data = await response.json();
    setPostData(data);
    toggleLoader();
    }

    const fetchUserData = async ()=>{
        const url=`https://odin-book-api-production.up.railway.app/users/${userId}`;
        const response = await fetch(url);
        var data = await response.json();
        setUserData(data[0]);
        }
    

  const toggleCommentForm = (i)=>{
    const commentForm = document.querySelectorAll('.comment-section');
    if(commentForm[i].style.display === 'inline'){
        commentForm[i].style.display ='none';
    } else{  commentForm[i].style.display='inline'}
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
      url : `https://odin-book-api-production.up.railway.app/users/friendRequest/${userId}`
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
      fetchPostData();
      fetchUserData();
      
    },[userId])


  return (
    <div className="App">
      <Dashboard  dashIndex={1} />
      <div className='main' id='profile-main'>
        <div className='profile-head'>
          <div className='profile-pic-cont'>
            <img id='profileImgProfile' src= {userData?.profilePicture ? `https://odin-book-api-production.up.railway.app/${userData.profilePicture} `
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
                <div className='tag'>Friend</div>
                <div>{userData._id !== 'not set'? 
                  userData.friends?.length : '0'} </div>
              </div>
            </div>
            <div className='profile-row3'>
              <button id='friendReq-btn' onClick={sendFriendRequest}>Add Friend Request</button>
            </div>
          </div>
        </div>

        <div className='profile-body'>

        <div className='displayPostCont'>
          {postData.map(function(item,index){
            return(
              <div className='post-container'>
                <div className='post-sidebar'>    
                  <img  id='profileImg' src={item.author?.profilePicture ?  `https://odin-book-api-production.up.railway.app/${item.author.profilePicture} `
                     : (require('../../assets/profilepicturesSmall.png'))}
                   alt='profileImage'  width={50} height={50}/>
                </div>
                <div className='post-main'>
                  <div className='post-text'>{item.text}</div>
                  <div className='post-author'>{item.author ? item.author.username : 'anon'}</div>
                  <div className='post-date'>{item.date}</div>
                  <div className='action-cont'>
                    <div className='like-cont'>
                      <span id='like-icon' class="material-symbols-outlined">favorite</span>
                      <div>{item.likes.length}</div>
                    </div>
                    <div className='comment-cont'>
                    <span id='comment-icon' class="material-symbols-outlined"
                    onClick={()=> toggleCommentForm(index)}>mode_comment</span>
                    <div>{item.comment.length}</div>
                  </div>  
                 </div>
                 <div className='comment-section'>
                <CommentForm currentUser={currentUser} post= {item} index={index}/>
                <div className='comment-map'>{((item.comment)).map(function(comment,index){
                    return(
                      <div className='comment-content'>
                        <div className='comment-text'>{comment.text}</div>
                        <div className='comment-username'>{comment.author?.username}</div>
                        <div className='comment-date'>{comment.date}</div>
                      </div>
                    )
                })
                }</div>
                </div>
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

