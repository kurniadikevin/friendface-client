import { Link } from 'react-router-dom';
import './style.css';
import {useState,useEffect} from 'react';
import axios from 'axios';

function Dashboard(props){

  //  const [ppUrl,setPpUrl]= useState(require('../../assets/profilepicturesSmall.png'));
  const [userData,setUserData]= useState(
            {id : 'not set',
        username : 'not signed in',
        email : 'not available',
        profilePicture : (require('../../assets/profilepicturesSmall.png'))}
        )

    const [userPP,setUserPP]= useState('')

   useEffect(()=>{
        if(props.currentUser ){
        setUserData(props.currentUser);
        console.log(userData);
        setUserPP(props.currentUser.profilePicture)
       } 
      
    },[])

 
    return(
        <div className="Dashboard">
            <div className='title-dashboard'>
            <Link to='./' id='title-link'>
                <div className='app-title'>Friendface</div>
            </Link>
            </div>
            <div className='links-cont'>
                <div>
                    <Link to='./' id='link-cont'>
                        <div  id='dash-link'>Home</div>
                        <span id='link-icon' class="material-symbols-outlined">cottage</span>
                        </Link>
                </div>
                <div>
                    <Link to='/profile' id='link-cont'>
                        <div  id='dash-link'>Profile</div>
                        <span id='link-icon' class="material-symbols-outlined">account_circle</span>
                        </Link>
                </div>
                <div>
                    <Link to='/message' id='link-cont'>
                        <div  id='dash-link'>Message</div>
                        <span id='link-icon' class="material-symbols-outlined">forum</span>
                        </Link>
                </div>
                <div>
                    <Link to='/login' id='link-cont' className='sign-links'>
                        <div id='dash-link'>Sign in/out</div>
                        <span id='link-icon' class="material-symbols-outlined">login</span>
                    </Link>
                </div>
            </div>
            <div className='dashboard-bottom'>
                <div className='profPic-cont'>
                    <img id='profileImgDash'
                     src= {props.currentUser ? `http://localhost:5000/${userPP} `
                     : (require('../../assets/profilepicturesSmall.png'))}  alt='profilePicture'
                        width={75} height={75}/>
                </div>
                <div className='profInfo-cont'>
                    <div className='profileInfoDash'>{userData ? userData.email : 'Not Sign in'}</div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;