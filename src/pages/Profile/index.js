import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import { useState,useContext,createContext } from 'react';
import UserContext from '../../App.js';


export function ProfilePage(props) {
  let currentUser = props.currentUser;

  return (
    <div className="App">
      <Dashboard currentUser={props.currentUser}/>
      <div className='main' id='profile-main'>
        <div className='profile-head'>
          <div className='profile-pic-cont'>
            <img id='profileImgProfile' src={require('../../assets/profilepicturesSmall.png')} alt='profilePicture'
                          width={100} height={100}/>
          </div>
          <div className='profile-detail'>
            <div className='profile-row1'>
              <div>{currentUser ? currentUser.username : 'Not Signed in'} </div>
              <div></div>
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
        <div className='profile-body'></div>
      </div>
      
      <Sidebar/>
    </div>
  );
}

