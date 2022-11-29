import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import { useState, useEffect } from 'react';
import UserContext from '../../App.js';
import ProfileForm from '../../components/profileForm';
import ImageForm from '../../components/imageForm';
import CommentForm from '../../components/commentForm';
import { toggleLoader } from '../../components/loader/loader-toggle';

export function ProfilePage(props) {
  
  const [postData,setPostData]= useState([])

  let currentUser ;
  if(!props.currentUser){
    currentUser = { 
      _id : 'not set',
      username : 'not signed in',
      email : 'not available',
      friends : []
    }} else {
      currentUser = props.currentUser;
    }
  
  
  const fetchPostData = async ()=>{
    const url=`http://localhost:5000/posts/${currentUser._id}`;
    const response = await fetch(url);
    var data = await response.json();
    setPostData(data);
    toggleLoader();
    }
  

    const toggleForm = (form)=>{
      const Form = document.querySelector(`#${form}`);
      if(Form.style.display === 'inline'){
          Form.style.display ='none';
      } else{  Form.style.display='inline'}
  }

  const toggleCommentForm = (i)=>{
    const commentForm = document.querySelectorAll('.comment-section');
    if(commentForm[i].style.display === 'inline'){
        commentForm[i].style.display ='none';
    } else{  commentForm[i].style.display='inline'}
  }

    useEffect(()=>{
      fetchPostData();
     
      
    },[])


  return (
    <div className="App">
      <Dashboard currentUser={props.currentUser} dashIndex={2} />
      <div className='main' id='profile-main'>
        <div className='profile-head'>
          <div className='profile-pic-cont'>
            <img id='profileImgProfile' src= {props.currentUser?.profilePicture ? `http://localhost:5000/${props.currentUser.profilePicture} `
                     : (require('../../assets/profilepicturesSmall.png'))} alt='userPicture'
                      width={100} height={100}/>
            <button id='edit-btn-profImg' onClick={()=> toggleForm('imageForm')}>
            <span class="material-symbols-outlined">photo_camera</span>
              </button>
            <div id ='imageForm'>
            <ImageForm currentUser={props.currentUser}/>
            </div>
          </div>

          <div className='profile-detail'>
            <div className='profile-row1'>
              <div className='profile-username'>
                <div className='tag'>Username :</div>
                <div className='text'> {currentUser?.username ? currentUser.username : 'Not Set'} </div>
                <button id='edit-btn-username' onClick={()=> toggleForm('profileForm')}>
                <span class="material-symbols-outlined">edit</span>
                </button>
              </div>
              <div className='profile-email'>
                <div className='tag'>Email :</div>
                <div className='text'> {currentUser? currentUser.email : 'Not available'}</div>
              </div>
              
              <div id='profileForm'>
              <ProfileForm currentUser={props.currentUser}/>
              </div>
             
            </div>
            <div className='profile-row2'>
              <div>
                <div className='friends-count' onClick={()=> toggleForm('friends-list')}>
                  <div className='tag'>Friends: </div>
                  <div> {currentUser._id !== 'not set'? 
                  currentUser.friends.length : '0'} </div>
                </div>
                <div id='friends-list'>
                  {(currentUser.friends).map((data)=>{
                      return(
                        <div className='friendList-cont'>
                          <div>{data.username}</div>
                          <div className='tag'>{data.email}</div>
                        </div>
                      )
                  })}
                </div>
              </div>
              <div></div>
            </div>
            <div className='profile-row3'>
             
            </div>
          </div>
        </div>

        <div className='profile-body'>

        <div className='displayPostCont'>
          {postData.map(function(item,index){
            return(
              <div className='post-container'>
                <div className='post-sidebar'>    
                  <img  id='profileImg' src={item.author?.profilePicture ?  `http://localhost:5000/${item.author.profilePicture} `
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

