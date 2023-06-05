import { getUser, highlightCurrentChatRoom, toggleLoaderMessageDashboard } from '../functions';
import {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import { displayDateDifferences, removeMessageLoader, alertForEmptyCallChatRoom } from '../functions';
import LoaderMessenger from '../loaderMessenger';


const MessageDashboard=(props)=>{
    
  let currentUser= getUser();

  const [chatRoomList,setChatRoomList]= useState([]);
  const [chatRoomUserInfoList,setChatRoomUserInfoList]= useState([]);
  const [messageNotif,setMessageNotif]= useState(0);

  const fetchUserChatRoomList= async (userId)=>{
    try{
      const url=`https://friendface-api-production.up.railway.app/userChat/byUserId/${userId}`;
      const response = await fetch(url);
      var data = await response.json();
      const listChat = sortChatRooms( data[0].chatRoomList);
      setChatRoomList(listChat);
      setMessageNotif(data[0].messageNotification);
      //fetch notification on local
      localStorage.setItem('userMessageNotification', JSON.stringify((data[0].messageNotification).length));
      const filterListChat = listChat.map((i)=>{
        //group chat list show all id
        if((i.membersId).length > 2){
        return i.membersId;
        }
        //private chat list show only foreign id in string format
        else if((i.membersId).length === 2){
          const foreignMemberId= (i.membersId).filter((id)=> {
          return id !== currentUser._id;
          })
          return foreignMemberId[0];
        }
        
      });
      getUserInfoOnChatRoom(filterListChat);
    }
    catch(err){
      console.log(err)
    }
  }
  
  
  const getUserInfoOnChatRoom=(sourceData)=>{
      const data = Promise.all(
        sourceData.map(async (i) => {
          if(typeof i === 'object'){
              const resultArr=[];
              i.forEach(async(j)=>{
              const data= (await fetch(`https://friendface-api-production.up.railway.app/users/simplified/${j}`, {
              method: "GET",
              })).json();
              data.then((value)=>{
                resultArr.push(value[0]); 
              })
            })
          return resultArr;
          } else{
            const result= (await fetch(`https://friendface-api-production.up.railway.app/users/simplified/${i}`, {
            method: "GET",
          })).json()
          return result;
        }}
        )
    ).then((value)=>{
      const memberValue= value.map((i)=>{
        if(i.length === 1){
          return i[0];
        } else {
          return i;
        }
      })
      memberValue.length === 0 ? 
      alertForEmptyCallChatRoom(()=>toggleLoaderMessageDashboard('none')) : setChatRoomUserInfoList(memberValue);
      removeMessageLoader();
  })
  }

  const updateUserChatData=(userId)=>{
  axios({
    method: "POST",
    withCredentials: true,
    headers : {  Authorization : `Bearer ${localStorage.getItem("token")}`},
    url: `http://localhost:5000/userChat/update/${userId}`,
  }).then(function (response) {
    //console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });  
}

  const sortChatRooms=(data)=>{
   const sortedData= data.sort((a,b)=>{
    return (
      Date.parse(b.modifiedAt ? b.modifiedAt : b.createdAt) -
      Date.parse(a.modifiedAt ? a.modifiedAt : a.createdAt) 
    )
  })
  return sortedData;
  }
    
  // assign count on chat room for notification from userChat that have same chatroom Id
 const assignNotifToChatRoomCount=(data,chatRoomId)=>{
  let sum=0;
  for( let i=0; i< data.length; i++){
    if(data[i].chatRoomId == chatRoomId){
      sum += 1;
    }
  } return sum;
 }
  
  useEffect(()=>{
      updateUserChatData(currentUser._id);
      fetchUserChatRoomList(currentUser._id);

      // update chat room list every 5 seconds
      const interval = setInterval(() => {
        updateUserChatData(currentUser._id);
        fetchUserChatRoomList(currentUser._id);
      }, 5000);
      return () => clearInterval(interval);
     
    },[])

    return(
        <div className='message-dashboard'>
          <Link  to={`/messages/`}>
          <div className='new-chat-container'>
              <span class="material-symbols-outlined">
               loupe
              </span>
          </div>
          </Link>

          <div className='chatRoom-wrapper'  id={props.idChatDetail}>
          <div id='loader-msg-dash'>
            <LoaderMessenger/>
          </div>
          {chatRoomUserInfoList.map((item,index)=>{

          return(
            <Link  to={`/messagechat/${chatRoomList[index]._id}`}>
            <div className='chatRoom-container' onClick={()=>highlightCurrentChatRoom(index)}>   
              <div className='chatRoom-member'>
                { item.length > 1 ?
                 <div className='member-info-cont' >
                  <img id='chat-dashboard-user-img' src={(require('../../assets/group-default-image-square.jpg'))}
                   width={50} height={50}/>
                   <div className='chatroom-info-wrap'>
                    <div className='chatRoom-cont-username'>
                        <div className='chatroom-username' id='chatroom-groupName'>{chatRoomList[index].groupName}</div>
                        {assignNotifToChatRoomCount(messageNotif,chatRoomList[index]._id) > 0 ?
                      <span id='unseen-messages-count-chatroom'>
                        {assignNotifToChatRoomCount(messageNotif,chatRoomList[index]._id)}
                      </span>
                      : ''}
                    </div>
                      <div className='chatRoom-lastContent'>
                      {'last update   '} 
                      { displayDateDifferences(
                      chatRoomList[index].modifiedAt ? chatRoomList[index].modifiedAt : chatRoomList[index].createdAt
                      )}
                      </div>
                  </div>
                </div> 
                : 
                <div className='member-info-cont'>
                  <img id='chat-dashboard-user-img'
                    src={`https://friendface-api-production.up.railway.app/users/profilePicture/${item._id}`} width={50} height={50}
                    />
                  <div className='chatroom-info-wrap'>
                    <div className='chatRoom-cont-username'>
                      <div className='chatroom-username'>{item.username ? item.username : item.email}</div>
                      {assignNotifToChatRoomCount(messageNotif,chatRoomList[index]._id) > 0 ?
                      <span id='unseen-messages-count-chatroom'>
                        {assignNotifToChatRoomCount(messageNotif,chatRoomList[index]._id)}
                      </span>
                      : ''}
                    </div>
                    <div className='chatRoom-lastContent'>
                      {'last update   '} 
                      { displayDateDifferences(
                      chatRoomList[index].modifiedAt ? chatRoomList[index].modifiedAt : chatRoomList[index].createdAt
                      )}
                      </div>
                      
                  </div>
                </div>
                }
                </div>
             
             </div>
          </Link>
          )
          })}
      </div>
     
  </div>
    )

}


export default MessageDashboard;