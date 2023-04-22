import { Link } from 'react-router-dom';
import './style.css';
import {useState,useEffect} from 'react';
import LoaderComponent from '../loader/loader';
import AlertBox from '../alertBox/index';
import { getAndAssignMessageNotifCount } from '../functions';
import NewPostMobile from '../newpostMobile';


function Dashboard(props){

  const [userData,setUserData]= useState(
            {
        username : 'not signed in',
        email : 'not available',
        profilePicture : (require('../../assets/profilepicturesSmall.png')),
        postNotification : []
        }
        );
  const [unSeenNotification,setUnSeenNotification]= useState();
  const [unSeenMessages,setUnSeenMessages]= useState(0);

   // get login user information
   const getUser=()=>{
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserData(foundUser);
      getUnSeenNotification(foundUser);
     
    }}

    const getMessageNotifCount=()=>{
        const notifCount = localStorage.getItem("userMessageNotification");
        if (notifCount) {
          const count = JSON.parse(notifCount);
          setUnSeenMessages( count);
          return count;
        }}


  const toggleColorSelect = (i)=>{
    //dash link text
    const dashLink = document.querySelectorAll('#dash-link');    
    dashLink[i].style.color='var(--green)';
    dashLink[i].style.transform = 'translateX(5px)';

    //dash link icon
    const linkIcon = document.querySelectorAll('#link-icon');    
    linkIcon[i].style.color='var(--pink)';
    
  }

 const getUnSeenNotification=(data)=>{
    const notifPost=  (data.postNotification).filter((item)=>{
        if(!item.seenAt){return item; }})
    const notifPostCount= notifPost.length;
    const notifFriendRequest= (data.friendRequest).filter((item)=>{
        if(!item.seenAt){return item; }})
    const notifFriendRequestCount = notifFriendRequest.length;

    setUnSeenNotification(notifPostCount + notifFriendRequestCount);
 }

  
   useEffect(()=>{
    getUser();
    toggleColorSelect(props.dashIndex);
    getAndAssignMessageNotifCount(userData._id);
    getMessageNotifCount();
   
    },[])

    return(
       <div className='dashboard-wrapper'>
        <div className="Dashboard">
            <div className='title-dashboard'>
            <Link to='/' id='title-link'>
                <div className='app-title'>Friendface</div>
                <NewPostMobile/>
            </Link>
            </div>
            <div className='links-cont'>
                <div id='home-tabs'>
                    <Link to='/home' id='link-cont' >
                        <div  id='dash-link'>Home</div>
                        <span id='link-icon' class="material-symbols-outlined">cottage</span>
                        </Link>
                </div>
                <div id='explore-tabs'>
                    <Link to='/' id='link-cont' >
                        <div  id='dash-link'>Explore</div>
                        <span id='link-icon' class="material-symbols-outlined">explore</span>
                        </Link>
                </div>
                <div id='profile-tabs'>
                    <Link to='/profile' id='link-cont' >
                        <div  id='dash-link'>Profile</div>
                        <span id='link-icon' class="material-symbols-outlined">account_circle</span>
                    </Link>
                </div>
                <div id='message-tabs'>
                    <Link to='/messages' id='link-cont' >
                        <div  id='dash-link'>Messages</div>
                        <div>
                        <span id='link-icon' class="material-symbols-outlined">forum</span>
                       {unSeenMessages > 0 ?  <span id='unseen-messages-count'>{unSeenMessages}</span> : ''}
                        </div>
                    </Link>
                </div>
                <div id='notification-tabs'>
                    <Link to='/notification' id='link-cont' > 
                        <div  id='dash-link'>Notification</div>
                        <div>
                        <span id='link-icon' class="material-symbols-outlined">notifications_active</span>
                        {unSeenNotification > 0 ? <span id='unseen-notification-count'>{unSeenNotification}</span>:''}
                        </div>
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
                     src= {userData.profilePicture ?
                      `http://localhost:5000/${userData.profilePicture}` :
                      (require('../../assets/profilepicturesSmall.png'))
                     } 
                      alt='profilePicture'
                        width={75} height={75}/>
                </div>
                <div className='profInfo-cont'>
                    <div className='profileInfoDash'>
                        <div className='currentUser-username'>{userData?.username ? userData.username : 'Not Set'}</div>
                        <div className='currentUser-email'>{userData ? userData.email : 'Not Sign in'}</div>    
                    </div>
                   
                </div>
            </div>
           <AlertBox/>
           <div className='blurred-bg-dash'></div>
        </div>
      
        <LoaderComponent/>
     
    </div>
    )
}

export default Dashboard;