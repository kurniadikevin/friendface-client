import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import MessageDashboard from '../../components/messageDashboard/messageDashboard';
import Sidebar from '../../components/sidebar/sidebar';
import { toggleLoader } from '../../components/loader/loader-toggle';
import { getUser } from '../../components/functions';
import {useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';


export function MessagePage() {

  let currentUser= getUser();

  // visited use chatRoomId parameter
   let {chatRoomId} = useParams(); 

  useEffect(()=>{
    console.log(chatRoomId);
    toggleLoader();
  },[])
  
  return (
    <div className="App">
      <Dashboard  dashIndex={3} />
      <div className='main' id='message-main'>
        <MessageDashboard/>
        <div className='message-content-container'>
          { chatRoomId ? <div>{chatRoomId}</div>:
            <button>new chat</button>
         }
        </div>
      </div>
      
      <Sidebar/>
    </div>
  );
}
