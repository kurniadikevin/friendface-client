import './style.css';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import HomeComp from '../../components/homecomp';
import CommentForm from '../../components/commentForm';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toggleLoader } from '../../components/loader/loader-toggle';
import { formatDate,formatTimeStamp } from '../../components/functions';


export function ExplorePage(props) {

  let currentUser = props?.currentUser;
 /*  console.log(currentUser) */
  const [postData,setPostData]=useState([]);


  //fetch all post 
  const fetchAllPostData = async ()=>{
    const url=`http://localhost:5000/posts/`;
    const response = await fetch(url);
    var data = await response.json();
    setPostData(data);
    toggleLoader();
    }
    

  const likePostFunction = (post)=>{
    if(post.author._id === currentUser._id){
      const alertBox = document.querySelector('#alert-box');
      alertBox.textContent='Cannot like your own post!'
      alertBox.style.display='inline';
    }
    else{
    axios({
      method: "POST",
      data: {
          _id :    post._id,
        likes:   post.likes,
        likeBy :  currentUser   
      },
      withCredentials: true,
      url: `http://localhost:5000/posts/likes/${post._id}`,
    }).then(function (response) {
       
        const alertBox = document.querySelector('#alert-box');
        alertBox.textContent='Post liked!'
        alertBox.style.display='inline';        

      })
      .catch(function (error) {
        console.log(error);
      });
    }
}

const toggleCommentForm = (i)=>{
  const commentForm = document.querySelectorAll('.comment-section');
  if(commentForm[i].style.display === 'inline'){
      commentForm[i].style.display ='none';
  } else{  commentForm[i].style.display='inline'}
}

//hide profile, message, and notification tap for guest user
const toggleTabsGuestMode = ()=>{
  const profileTab = document.querySelector('#profile-tabs');
  const messageTab = document.querySelector('#message-tabs');
  const notifTab = document.querySelector('#notification-tabs');
  const homeTab = document.querySelector('#home-tabs');
  profileTab.style.display='none';
  messageTab.style.display='none';
  notifTab.style.display='none';
  homeTab.style.display='none';
}
  

  useEffect(()=>{
    if(currentUser){
      fetchAllPostData();
    } else{
      fetchAllPostData();
      toggleTabsGuestMode();
    }
    })

  return (
  <div className="App">
    
    <Dashboard currentUser={props.currentUser} dashIndex={1}/>
    
    <div className='main'  id='home-page'>
      <HomeComp currentUser={props.currentUser}/>
      <div className='displayPostCont'>

        {postData.map(function(item,index){
          return(
            <div className='post-container'>
              <div className='post-sidebar'>  
                <img  id='profileImg' src={item.author?.profilePicture ?  `http://localhost:5000/${item.author.profilePicture} `
                    : (require('../../assets/profilepicturesSmall.png'))}
                    alt='profileImage' width={50} height={50}/> 
              </div>
            <div className='post-main'>
                <div className='post-text'>{item.text}</div>
                <Link to={`/userProfile/${item.author?._id}`} id='link-user' >
                  <div className='post-author'>{item.author?.username ? item.author.username : 'anon'}</div>
                </Link>
                <div className='post-date'>{formatDate(item.date)}</div>
              <div className='action-cont'>
                  <div className='like-cont'>
                    <span id='like-icon' class="material-symbols-outlined" onClick={()=> likePostFunction(item)}>
                      favorite</span>
                    <div className='likes-length'>{item.likes.length}</div>
                  </div>
                  <div className='comment-cont'>
                    <span id='comment-icon' class="material-symbols-outlined"
                    onClick={()=> toggleCommentForm(index)}>mode_comment</span>
                    <div className='comment-length'>{item.comment.length}</div>
                  </div>
              </div>
              <div className='comment-section'>
                <CommentForm currentUser={props.currentUser} post= {item} index={index}/>
                <div className='comment-map'>{((item.comment).reverse()).map(function(comment,index){
                    return(
                      <div className='comment-content'>
                        <div className='comment-text'>{comment.text}</div>
                        <div className='comment-username'>{comment.author?.username}</div>
                        <div className='comment-date'>{formatTimeStamp(comment.date)}</div>
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
    
    <Sidebar/>
  </div>
  );
}
