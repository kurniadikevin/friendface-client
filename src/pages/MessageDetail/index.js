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
    //console.log(data[0]);
    
    setChatRoomData(data[0]);
    //console.log(data[0].membersId[1].email);
   
    setChatData(data[0].messagesId);
    console.log(data[0].messagesId)
  }
  catch(err){
    console.log(err);
  }
 }

 const showOnlyForeignUserInfo =(chatRoomData,property)=>{
    const foreignInfo = (chatRoomData.membersId).filter((item)=>{
      return item._id !== currentUser._id;
    })
    console.log(foreignInfo);
    if(foreignInfo.length === 1){
      return foreignInfo[0][property];
    } else if (foreignInfo.length > 1){
      const mappedProperty = foreignInfo.map((item)=> {
        return item[property];
      })
    console.log(mappedProperty);
    return mappedProperty;
    }
 }

 const checkForForeignUser=(data)=>{
    if(data._id === currentUser._id){
      return false;
    } else {
      return true
    }
 }

/*  const seperateChatLayout =()=>{
  const chatBox= document.querySelectorAll('.message-container');
   for( let i =0;i< chatData.length; i++){
     if(chatData[i].author === currentUser._id){
      chatBox[i].setAttribute("id","message-container-currentUser");
     }
   }
 }
  */

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
            {chatRoomData.membersId ? 
            <img id='chat-user-img'
            src={showOnlyForeignUserInfo(chatRoomData,'profilePicture') 
            ?  `http://localhost:5000/${showOnlyForeignUserInfo(chatRoomData,'profilePicture')} `
            : (require('../../assets/profilepicturesSmall.png'))} width={60} height={60}
            /> : ''
            }
          </div>
          <div className='chat-user-info'>
            <div className='chat-user-username'>{chatRoomData.membersId ? showOnlyForeignUserInfo(chatRoomData,'username') : ''}</div>
            <div className='chat-user-email'>{chatRoomData.membersId ? showOnlyForeignUserInfo(chatRoomData,'email') : ''}</div>
         </div>
         </div>
         <div className='chat-container'>
          {chatData.map((item,index)=>{
            return(
              <div className='message-wrap'>
              {item.author !== currentUser._id ?
              <div className='message-container'>
                <div className='message-sender'>{ showOnlyForeignUserInfo(chatRoomData,'username')}</div>
                <div className='message-text'>{item.text}</div>
                <div className='message-sendAt'>{formatDate( item.sendAt) }</div>
              </div> :
              <div className='message-container-currentUser'>
                <div className='message-sender-currentUser'>You</div>
                <div className='message-text-currentUser'>{item.text}</div>
                <div className='message-sendAt'>{formatDate( item.sendAt) }</div>
            </div>
            }
            </div>
            )
          })}
         </div>

         <div className='message-input-container'> 
            <textarea className='message-input-text'></textarea>
            <button id='message-send-btn'>Send</button>
         </div>

        </div>
      </div>
      
      <Sidebar/>
    </div>
  );
}
