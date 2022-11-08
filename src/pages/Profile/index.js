import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import { useState,useContext,createContext, useEffect } from 'react';
import UserContext from '../../App.js';
import ProfileForm from '../../components/profileForm';
import ImageForm from '../../components/imageForm';


export function ProfilePage(props) {
  let currentUser ;
  console.log(props.currentUser);
  
  if(!props.currentUser){
    currentUser = { 
      _id : 'not set',
      username : 'not signed in',
      email : 'not available',
    }} else {
      currentUser = props.currentUser;
    }
  

  const [postData,setPostData]= useState([])

  const url=`http://localhost:5000/posts/${currentUser.email}`;

  const fetchPostData = async ()=>{
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    setPostData(data);
    }

    const toggleForm = (form)=>{
      const Form = document.querySelector(`#${form}`);
      if(Form.style.display === 'inline'){
          Form.style.display ='none';
      } else{  Form.style.display='inline'}
  }

    useEffect(()=>{
      fetchPostData()
    },[])


  return (
    <div className="App">
      <Dashboard currentUser={props.currentUser}/>
      <div className='main' id='profile-main'>
        <div className='profile-head'>
          <div className='profile-pic-cont'>
            <img id='profileImgProfile' src={require('../../assets/profilepicturesSmall.png')} alt='profilePicture'
                          width={100} height={100}/>
            <button id='edit-btn-profImg' onClick={()=> toggleForm('imageForm')}>
              Edit</button>
            <div id ='imageForm'>
            <ImageForm currentUser={props.currentUser}/>
            </div>
          </div>

          <div className='profile-detail'>
            <div className='profile-row1'>
              <div>{currentUser ? currentUser.username : 'Not Signed in'} </div>
              <div>{currentUser? currentUser.email : 'Not available'}</div>
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
                 {(()=>{
                  if(item.profilePicture){
                    return(
                      <img  id='profileImg' src={require(item.profilePicture)} alt='profileImage'/>
                    )
                  } else{
                    return (
                      <img id='profileImg' src={require('../../assets/profilepicturesSmall.png')} alt='profilePicture'
                      width={50} height={50}/>
                    )
                  }
                 })()}
                </div>
                <div className='post-main'>
                  <div className='post-text'>{item.text}</div>
                  <div className='post-author'>{item.author}</div>
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

