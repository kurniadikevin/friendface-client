import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import { toggleLoader } from '../../components/loader/loader-toggle';
import { getUser } from '../../components/functions';
import {useState, useEffect } from 'react';

export function MessagePage() {

  let currentUser= getUser();

  const [chatRoomList,setChatRoomList]= useState([]);
  const [chatRoomUserInfoList,setChatRoomUserInfoList]= useState([]);

  const fetchUserChatRoomList= async (userId)=>{
    try{
      const url=`http://localhost:5000/userChat/byUserId/${userId}`
      const response = await fetch(url);
      var data = await response.json();
      const listChat =data[0].chatRoomList;
      console.log(data[0].chatRoomList);
      setChatRoomList(data[0].chatRoomList);
      const filterListChat = listChat.map((i)=>{
        return i.membersId[1];
      });
      console.log(filterListChat);
      getUserInfoOnChatRoom(filterListChat);
    }
    catch(err){
      console.log(err)
    }
  }


  const getUserInfoOnChatRoom=(sourceData)=>{
     const data = Promise.all(
        sourceData.map(async (i) => await (await fetch(`http://localhost:5000/users/simplified/${i}`, {
            method: "GET",
        })).json())
    ).then((value)=>{
      console.log(value)
      const emailValue= value.map((i)=>{
        return i[0].email;
      })
      console.log(emailValue);
      setChatRoomUserInfoList(emailValue);
  })
  }
  

  useEffect(()=>{
    fetchUserChatRoomList(currentUser._id);
    toggleLoader();
   
  },[])
  
  return (
    <div className="App">
      <Dashboard  dashIndex={3} />
      <div className='main' id='message-main'>
        <div className='message-userChat-container'>
        {chatRoomList.map((item,index)=>{

          return(
            <div>Chat room id : {item.membersId[1]}
         </div>
          )
        })}

{chatRoomUserInfoList.map((item,index)=>{

return(
  <div>Chat email: {item}
</div>
)
})}



        </div>
        <div className='message-content-container'></div>
      </div>
      
      <Sidebar/>
    </div>
  );
}
