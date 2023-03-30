import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import MessageDashboard from '../../components/messageDashboard';
import Sidebar from '../../components/sidebar/sidebar';
import { toggleLoader } from '../../components/loader/loader-toggle';
import { getUser } from '../../components/functions';
import {useState, useEffect } from 'react';

export function MessagePage() {

  let currentUser= getUser();


  useEffect(()=>{
   
    toggleLoader();
  },[])
  
  return (
    <div className="App">
      <Dashboard  dashIndex={3} />
      <div className='main' id='message-main'>
        <MessageDashboard/>
        <div className='message-content-container'>
          <button>Create new message</button>
        </div>
      </div>
      
      <Sidebar/>
    </div>
  );
}
