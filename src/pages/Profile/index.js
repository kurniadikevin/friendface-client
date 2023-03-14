import './style.css';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import { DisplayPost } from '../../components/displayPost';
import ProfileForm from '../../components/profileForm';
import ImageForm from '../../components/imageForm';
import { useState, useEffect } from 'react';


export function ProfilePage() {
  
  let profilePicture = (require('../../assets/profilepicturesSmall.png'));
  const [postCount,setPostCount]= useState();

  // get login user information
  const getUser=()=>{
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      if(foundUser.profilePicture){
        profilePicture= `http://localhost:5000/${foundUser.profilePicture}`
        console.log(profilePicture);
      }
      return foundUser;
    }
  }

  let currentUser = getUser({ 
    _id : 'not set',
    username : 'not signed in',
    email : 'not available',
    friends : []
  });
  
  const toggleForm = (form)=>{
      const Form = document.querySelector(`#${form}`);
      if(Form.style.display === 'inline'){
          Form.style.display ='none';
      } else{  Form.style.display='inline'}
  }

  const fetchPostCount= async ()=>{
    const url=`http://localhost:5000/posts/${currentUser._id}/count`;
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    setPostCount(data.postCount);
    }

    useEffect(()=>{
     fetchPostCount()
    },[])



  return (
    <div className="App">
      <Dashboard  dashIndex={2} />
      <div className='main' id='profile-main'>
        <div className='profile-head'>
          <div className='profile-pic-cont'>
            <img id='profileImgProfile' src= {profilePicture} alt='userPicture'
                      width={100} height={100}/>
            <button id='edit-btn-profImg' onClick={()=> toggleForm('imageForm')}>
            <span class="material-symbols-outlined">photo_camera</span>
              </button>
            <div id ='imageForm'>
            <ImageForm currentUser={currentUser}/>
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
              <ProfileForm currentUser={currentUser}/>
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
              <div className='post-count-cont'>
                <div>Posts: </div>
                <div>{postCount} </div>
              </div>
            </div>
            <div className='profile-row3'>
             
            </div>
          </div>
        </div>

        <div className='profile-body'>
          <DisplayPost currentUser={currentUser} urlExtension={`${currentUser._id}/`}/>
        </div>
      </div>
      
      <Sidebar/>
    </div>
  );
}

