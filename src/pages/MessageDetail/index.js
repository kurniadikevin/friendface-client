import './style.css';
import Dashboard from '../../components/dashboard/dashboard';
import MessageDashboard from '../../components/messageDashboard/messageDashboard';
import Sidebar from '../../components/sidebar/sidebar';
import { toggleLoader } from '../../components/loader/loader-toggle';
import { getUser,formatDate } from '../../components/functions';
import {useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';


export function MessageDetailPage() {

 let currentUser= getUser();
 // visited use chatRoomId parameter
 let {chatRoomId} = useParams(); 

 const [chatRoomData,setChatRoomData]= useState({})
 const [chatData,setChatData]= useState([]);

 const fetchChatData= async (chatRoomId)=>{
  try{
    const url=`http://localhost:5000/chatRoom/byId/${chatRoomId}`
    const response = await fetch(url);
    var data = await response.json();
    setChatRoomData(data[0]);
    console.log(data[0]);
    console.log(data[0].membersId[1].email);
   
    setChatData(data[0].messagesId);
  }
  catch(err){
    console.log(err);
  }
 }

 

  useEffect(()=>{
    fetchChatData(chatRoomId);
    toggleLoader();
  },[chatRoomId])
  
  return (
    <div className="App">
      <Dashboard  dashIndex={3} />
      <div className='main' id='message-main'>
        <MessageDashboard/>
        <div className='message-content-container'>
         <div className='chat-user-head'>
          <div className='chat-user-imgCont'>
            <img id='chat-user-img'
            src={chatRoomData.membersId[1].profilePicture ?  `http://localhost:5000/${chatRoomData.membersId[1].profilePicture} `
            : (require('../../assets/profilepicturesSmall.png'))} width={60} height={60}
            />
          </div>
          <div className='chat-user-info'>
            <div className='chat-user-username'>{chatRoomData.membersId ? chatRoomData.membersId[1]?.username : ''}</div>
            <div className='chat-user-email'>{chatRoomData.membersId ? chatRoomData.membersId[1].email : ''}</div>
         </div>
         </div>
         <div className='chat-container'>
          {chatData.map((item)=>{
            return(
              <div className='message-container'>
                <div className='message-text'>{item.text}</div>
                <div className='message-sendAt'>{formatDate( item.sendAt) }</div>
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
