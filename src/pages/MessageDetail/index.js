import './style.css';
import Dashboard from '../../components/dashboard/dashboard';
import MessageDashboard from '../../components/messageDashboard/messageDashboard';
import Sidebar from '../../components/sidebar/sidebar';
import { toggleLoader } from '../../components/loader/loader-toggle';
import { getUser,displayDateDifferences,handleKeyEnter, toggleLoaderChatRoom} from '../../components/functions';
import {useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoaderMessenger from '../../components/loaderMessenger';

export function MessageDetailPage() {

 let currentUser= getUser();
 // visited use chatRoomId parameter
 let {chatRoomId} = useParams(); 

 const [chatRoomData,setChatRoomData]= useState({})
 const [chatData,setChatData]= useState([]);
 const [inputText,setInputText]= useState('');

 const fetchWithTimeout= async(resource, options = {})=> {
  const { timeout = 8000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal  
  });
  clearTimeout(id);
  return response;
}

 const fetchChatData= async (chatRoomId)=>{
  try{
    const url=`https://encouraging-pig-cuff-links.cyclic.cloud/chatRoom/byId/${chatRoomId}`
    const response = await fetchWithTimeout(url, {
      timeout: 6000
    });
    var data = await response.json();
    setChatRoomData(data[0]);
    setChatData(data[0].messagesId);
    toggleLoaderChatRoom('none')
  } catch(err){
    console.log(err);
  }
 }

 const showOnlyForeignUserInfo =(chatRoomData,property,type)=>{
    const foreignInfo = (chatRoomData.membersId).filter((item)=>{
      return item._id !== currentUser._id;
    })
    // for private chat
    if(foreignInfo.length === 1 || type ==='chat' ){
      return foreignInfo[0][property];
    }
    // for group chat title
    else if (foreignInfo.length > 1 && type ==='info'){
      const mappedProperty = (chatRoomData.membersId).map((item)=> {
        return item[property];
      })
      if( property === 'username'){
        return chatRoomData.groupName
      } else if( property === 'profilePicture'){
        return 'group-default.jpg'
      } else if(property === 'email'){
        return (mappedProperty.join(', '));
      } 
    }
 }

 const createChatMessage=()=>{
 
    if(inputText.length > 0 && inputText.length <= 140){
      axios({
        method: "POST",
        data: {
          text : inputText,
          currentUser : currentUser._id,
        },
        headers : {  Authorization : `Bearer ${localStorage.getItem("token")}`},
        withCredentials: true,
        url: `https://encouraging-pig-cuff-links.cyclic.cloud/message/new/${chatRoomId}`,
      }).then(function (response) {
          //console.log(response);
          setInputText('');
        })
        .catch(function (error) {
          console.log(error);
        }); 
    } else{
    alert('cannot be null or more than 140')
    }
 }

 const seenChatRoomToRemoveNotif=()=>{
  axios({
    method: "POST",
    data: {
      currentUser : currentUser._id,
    },
    headers : {  Authorization : `Bearer ${localStorage.getItem("token")}`},
    withCredentials: true,
    url: `https://encouraging-pig-cuff-links.cyclic.cloud/chatRoom/seen/${chatRoomId}`,
  }).then((response)=>{
    console.log(response);
  })
  .catch((error)=>{
    console.log(error);
  })
 }

 const scrollDefaulToBottom=()=>{
  const chatRoomBody= document.querySelector('.chat-container');
  chatRoomBody.scrollTop = chatRoomBody.scrollHeight;
 }

// Livechat with set Interval 1 second
  useEffect(() => {
    fetchChatData(chatRoomId);
    toggleLoader();
    seenChatRoomToRemoveNotif();
    toggleLoaderChatRoom('inline');
    setChatData([]);//**clear chat data when changed chatroom
    setChatRoomData([]);//** clear chat room data when changed chat room */ 

    // toggle to bottom scroll chat after load messages
    setTimeout(scrollDefaulToBottom,500);


    const interval = setInterval(() => {
      fetchChatData(chatRoomId);
      toggleLoader();
     
    }, 2000);
    return () =>{
       clearInterval(interval);
      }
  }, [chatRoomId]);


  //without interval for development mode to prevent infinite loop when hot reload
 /*  useEffect(() => {
    fetchChatData(chatRoomId);
      toggleLoader();
   seenChatRoomToRemoveNotif();
  }, [chatRoomId]); */

  
  return (
    <div className="App">
      <Dashboard  dashIndex={3} />
      <div className='main' id='message-main'>
        <MessageDashboard idChatDetail='dashboard-chat-detail'/>
        <div className='message-content-container'>
         <div className='chat-user-head'>
          <div className='chat-user-imgCont'>
            {chatRoomData.membersId ? 
            <img id='chat-user-img' alt='user-profile-picture'
            src={showOnlyForeignUserInfo(chatRoomData,'profilePicture') 
            ?  `https://encouraging-pig-cuff-links.cyclic.cloud/${showOnlyForeignUserInfo(chatRoomData,'profilePicture')} `
            : (require('../../assets/profilepicturesSmall.png'))} width={50} height={50}
            /> : ''
            }
          </div>
          <div className='chat-user-info'>
            { chatRoomData.membersId ?
            <Link  to={`/userProfile/${ showOnlyForeignUserInfo(chatRoomData,'_id','info')}`}>
            <div className='chat-user-username'>{chatRoomData.membersId ? showOnlyForeignUserInfo(chatRoomData,'username','info') : ''}</div>
            </Link>
            : ''}
            <div className='chat-user-email'>{chatRoomData.membersId ? showOnlyForeignUserInfo(chatRoomData,'email','info') : ''}</div>
         </div>
         </div>
         <div className='chat-container'>
          {chatData.map((item,index)=>{
            return(
              <div className='message-wrap'>
              {item.author !== currentUser._id ?
              <div className='message-container'>
                <div className='message-sender'>{ showOnlyForeignUserInfo(chatRoomData,'username','chat')}</div>
                <div className='message-text'>{item.text}</div>
                <div className='message-sendAt'>{displayDateDifferences( item.sendAt) }</div>
              </div> :
              <div className='message-container-currentUser'>
                <div className='message-sender-currentUser'>You</div>
                <div className='message-text-currentUser'>{item.text}</div>
                <div className='message-sendAt'>{displayDateDifferences( item.sendAt) }</div>
            </div>
            }
            </div>
            )
          })}
          <div id='loader-dash-chat'><LoaderMessenger/></div>
         </div>

         <div className='message-input-container'> 
              <textarea className='message-input-text'
                value={inputText} onChange={(e)=>setInputText(e.target.value)}
                onKeyDown={(event)=>{handleKeyEnter(event, createChatMessage)}}
                >
              </textarea> 
              <div id='text-area-count'>{inputText.length}/140</div>
            <button id='message-send-btn' onClick={createChatMessage}>
              <span class="material-symbols-outlined">send</span>
            </button>
         </div>

        </div>
      </div>
      
      <Sidebar/>
    </div>
  );
}
