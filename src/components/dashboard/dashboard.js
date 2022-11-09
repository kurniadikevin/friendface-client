import { Link } from 'react-router-dom';
import './style.css';
import {useState,useEffect} from 'react';
import axios from 'axios';

function Dashboard(props){

    const userData = props.currentUser;
    console.log(userData)
    const [ppUrl,setPpUrl]= useState(require('../../assets/profilepicturesSmall.png'));

    const fetchPpUrl = async ()=>{
        const url=`http://localhost:5000/images/${userData.email}`;
        const response = await fetch(url);
        var data = await response.json();
        let urlImage = `data:image/png;base64,${data}`
        setPpUrl(urlImage);
        updatePPUrlOnUser(urlImage);
        }

    //update user model with image url
    const updatePPUrlOnUser = (url)=>{
        console.log(ppUrl)
        axios({
            method: "POST",
            data: {
              profilePicture : url,
              _id : userData._id
            },
            withCredentials: true,
            url: `http://localhost:5000/users/update/${userData._id}`,
          }).then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
    }


    useEffect(()=>{
       if(userData ){
        //fetchPpUrl();
       
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
                     src={ppUrl}  alt='profilePicture'
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