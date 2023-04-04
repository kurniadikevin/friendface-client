import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import MessageDashboard from '../../components/messageDashboard/messageDashboard';
import Sidebar from '../../components/sidebar/sidebar';
import { toggleLoader } from '../../components/loader/loader-toggle';
import { getUser } from '../../components/functions';
import {useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import axios from 'axios';


export function MessagePage() {

  let currentUser= getUser();
  
  const [userData,setUserData]=useState([]);
  const [autoComplete,setAutoComplete]= useState([]);
  const [searchInput,setSearchInput]= useState();

  const checkUserChatAvailability= async(userId)=>{

    const url=`http://localhost:5000/userChat/byUserId/${userId}`
    const response = await fetch(url);
    var data = await response.json();
    if(data.length===0){
     console.log('no data');
     createOrUpdateUserChatData(userId,'create');
    } else{
      console.log('update data');
      createOrUpdateUserChatData(userId,'update');
    }
  }

  const createOrUpdateUserChatData=(userId,action)=>{
    axios({
      method: "POST",
      withCredentials: true,
      url: `http://localhost:5000/userChat/${action}/${userId}`,
    }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });  
  }

  const userDataToQuery = async ()=>{
    const url=`http://localhost:5000/users/search`;
    const response = await fetch(url);
    var data = await response.json();
    setUserData(data);
    setAutoComplete(data);
    }

 const filterDataQuery=()=>{
       let resultEmail = userData.filter((item)=>{
          if(item.email){
            return  ((item.email).toLowerCase()).includes(searchInput.toLowerCase());
          }
        })
        let resultUsername = userData.filter((item)=>{
            if(item.username){
            return  ((item.username).toLowerCase()).includes(searchInput.toLowerCase());
            }
          })
        setAutoComplete([...resultEmail,...resultUsername]);
        }

  const createPrivateChatRoom=(item)=>{
    const alertBox = document.querySelector('#alert-box');
    axios({
      method: "POST",
      data: {
        currentUser : currentUser._id,
      },
      withCredentials: true,
      url: `http://localhost:5000/chatRoom/createPrivate/${item._id}`,
    }).then(function (response) {
        console.log(response);
        alertBox.textContent=`New chat room with ${item.username ? item.username : item.email} created !`
      alertBox.style.display='inline';
       window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }
  
  useEffect(()=>{
       userDataToQuery();
       toggleLoader();
       checkUserChatAvailability(currentUser._id);
  },[])

  useEffect(()=>{
    if(searchInput){
      filterDataQuery();
    }
    
  },[searchInput]);
  
  return (
    <div className="App">
      <Dashboard  dashIndex={3} />
      <div className='main' id='message-main'>
        <MessageDashboard/>
        <div className='message-content-newChat'>
           <div className='search-bar' id='search-bar-chat'>
               <input type='text' id='search-input' value={searchInput} placeholder='Search user to start new chat with'
                    onChange={(e)=>{ setSearchInput(e.target.value); }} >
                </input>
                <div id='search-logo'>
                    <span class="material-symbols-outlined">search</span>
                </div>
            </div>
            <div className='map-search-new-chat' >
              {autoComplete.length === 0 ? <div>No result</div> :
              autoComplete.map((item)=>{
                return(
                  <div className='new-chat-query-result'>
                      <div id='query-message' >
                        <img id='new-chat-img'
                          src={item.profilePicture
                          ?  `http://localhost:5000/${item.profilePicture} `
                          : (require('../../assets/profilepicturesSmall.png'))} width={60} height={60}
                          />
                        <div className='new-chat-user-info'>
                          <div className='new-chat-username'>{item.username ? item.username : 'Not set'}</div>
                          <div className='new-chat-email'>{item.email}</div>
                          <button id='new-chat-btn' onClick={()=>createPrivateChatRoom(item)}>
                            New chat</button>
                        </div>
                      </div>
                  </div>
                  )    })}
                </div>    
        </div>
      </div>
      
      <Sidebar/>
    </div>
  );
}
