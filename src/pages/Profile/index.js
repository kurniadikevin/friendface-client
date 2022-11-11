import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import { useState,useContext,createContext, useEffect } from 'react';
import UserContext from '../../App.js';
import ProfileForm from '../../components/profileForm';
import ImageForm from '../../components/imageForm';


export function ProfilePage(props) {
  
  const [postData,setPostData]= useState([])

  let currentUser ;
  if(!props.currentUser){
    currentUser = { 
      _id : 'not set',
      username : 'not signed in',
      email : 'not available',
    }} else {
      currentUser = props.currentUser;
    }
  
  
  const fetchPostData = async ()=>{
    const url=`http://localhost:5000/posts/${currentUser._id}`;
    const response = await fetch(url);
    var data = await response.json();
    setPostData(data);
    }
  

    const toggleForm = (form)=>{
      const Form = document.querySelector(`#${form}`);
      if(Form.style.display === 'inline'){
          Form.style.display ='none';
      } else{  Form.style.display='inline'}
  }

    useEffect(()=>{
      fetchPostData();
     
      
    },[])


  return (
    <div className="App">
      <Dashboard currentUser={props.currentUser} dashIndex={1} />
      <div className='main' id='profile-main'>
        <div className='profile-head'>
          <div className='profile-pic-cont'>
            <img id='profileImgProfile' src= {props.currentUser?.profilePicture ? `http://localhost:5000/${props.currentUser.profilePicture} `
                     : (require('../../assets/profilepicturesSmall.png'))} alt='userPicture'
                      width={100} height={100}/>
            <button id='edit-btn-profImg' onClick={()=> toggleForm('imageForm')}>
              Edit</button>
            <div id ='imageForm'>
            <ImageForm currentUser={props.currentUser}/>
            </div>
          </div>

          <div className='profile-detail'>
            <div className='profile-row1'>
              <div>Username : {currentUser?.username ? currentUser.username : 'Not Set'} </div>
              <div>Email : {currentUser? currentUser.email : 'Not available'}</div>
              <button id='edit-btn-username' onClick={()=> toggleForm('profileForm')}>Edit</button>
              <div id='profileForm'>
              <ProfileForm currentUser={props.currentUser}/>
              </div>
             
            </div>
            <div className='profile-row2'>
              <div>Friend</div>
              <div></div>
            </div>
            <div className='profile-row3'>
              botton panel
            </div>
          </div>
        </div>

        <div className='profile-body'>

        <div className='displayPostCont'>
          {postData.map(function(item,index){
            return(
              <div className='post-container'>
                <div className='post-sidebar'>    
                  <img  id='profileImg' src={item.author ?  `http://localhost:5000/${item.author.profilePicture} `
                     : (require('../../assets/profilepicturesSmall.png'))}
                   alt='profileImage'  width={50} height={50}/>
                </div>
                <div className='post-main'>
                  <div className='post-text'>{item.text}</div>
                  <div className='post-author'>{item.author ? item.author.username : 'anon'}</div>
                  <div className='post-date'>{item.date}</div>
                  <div className='action-cont'>
                    <span id='like-icon' class="material-symbols-outlined">favorite</span>
                    <span id='comment-icon' class="material-symbols-outlined">mode_comment</span>
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

