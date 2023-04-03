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

  useEffect(()=>{
    toggleLoader();
    checkUserChatAvailability(currentUser._id);
  },[])
  
  return (
    <div className="App">
      <Dashboard  dashIndex={3} />
      <div className='main' id='message-main'>
        <MessageDashboard/>
        <div className='message-content-container'>
         
            <button>new chat</button>
         
        </div>
      </div>
      
      <Sidebar/>
    </div>
  );
}
