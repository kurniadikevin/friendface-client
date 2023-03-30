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
        if((i.membersId).length > 2){
        return i.membersId;
        } else{
          return i.membersId[1];
        }
        
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
        }
      }
        )
    ).then((value)=>{
      console.log(value);
      const memberValue= value.map((i)=>{
        if(i.length === 1){
          return i[0];
        } else {
          return i;
        }
       
      })
      console.log(memberValue);
      setChatRoomUserInfoList(memberValue);
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
          {chatRoomUserInfoList.map((item,index)=>{

          return(
            <div className='chatRoom-container'>
              <div className='chatRoom-member'>
                { item.length > 1 ?
                 <div>
                  {item.map((i)=>{
                    return(<div>Group {i.username}  {i.email}</div>)
                  })}
                </div> 
                : <div>{item.username}  {item.email}</div>}
                </div>
              <div className='chatRoom-lastContent'>chat last content</div>
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
