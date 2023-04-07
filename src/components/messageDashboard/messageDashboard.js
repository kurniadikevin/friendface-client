import { getUser } from '../functions';
import {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { toggleLoader } from '../loader/loader-toggle';
import axios from 'axios';
import { formatDate, displayDateDifferences } from '../functions';


const MessageDashboard=()=>{
    
  let currentUser= getUser();

  const [chatRoomList,setChatRoomList]= useState([]);
  const [chatRoomUserInfoList,setChatRoomUserInfoList]= useState([]);

  const fetchUserChatRoomList= async (userId)=>{
    try{
      const url=`http://localhost:5000/userChat/byUserId/${userId}`;
      const response = await fetch(url);
      var data = await response.json();
      const listChat = sortChatRooms( data[0].chatRoomList);
      setChatRoomList(listChat);
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
              const data= (await fetch(`http://localhost:5000/users/simplified/${j}`, {
              method: "GET",
              })).json();
              data.then((value)=>{
                resultArr.push(value[0]); 
              })
            })
          return resultArr;
          } else{
            const result= (await fetch(`http://localhost:5000/users/simplified/${i}`, {
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
      setChatRoomUserInfoList(memberValue);
  })
  }

  const updateUserChatData=(userId)=>{
  axios({
    method: "POST",
    withCredentials: true,
    url: `http://localhost:5000/userChat/update/${userId}`,
  }).then(function (response) {
      console.log(response);
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
    
  
  useEffect(()=>{
      updateUserChatData(currentUser._id);
      fetchUserChatRoomList(currentUser._id);
      // update chat room list every 5 seconds
      const interval = setInterval(() => {
        updateUserChatData(currentUser._id);
        fetchUserChatRoomList(currentUser._id);
      }, 3000);
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

          <div className='chatRoom-wrapper'>
          {chatRoomUserInfoList.map((item,index)=>{

          return(
            <div className='chatRoom-container'>
              <Link  to={`/messagechat/${chatRoomList[index]._id}`}>
               
              <div className='chatRoom-member'>
                { item.length > 1 ?
                 <div className='member-info-cont' >
                  <img id='chat-dashboard-user-img' src={(require('../../assets/group-default-image-square.jpg'))}
                   width={50} height={50}/>
                   <div className='chatroom-info-wrap'>
                      <div className='chatroom-username' id='chatroom-groupName'>{chatRoomList[index].groupName}</div>
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
                    src={`http://localhost:5000/users/profilePicture/${item._id}`} width={50} height={50}
                    />
                  <div className='chatroom-info-wrap'>
                    <div className='chatroom-username'>{item.username ? item.username : item.email}</div>
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
             
              </Link>
          </div>
          )
          })}
      </div>
  </div>
    )

}


export default MessageDashboard;